import fs from "fs";
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import {
  generateSigner,
  keypairIdentity as umiKeypairIdentity,
  Umi,
  publicKey, none, transactionBuilder, some, percentAmount
} from '@metaplex-foundation/umi'
import {PublicKey as UmiPublicKey} from '@metaplex-foundation/umi-public-keys'
import {
  createTree,
  fetchMerkleTree,
  parseLeafFromMintV1Transaction,
  mintV1,
  TokenStandard
} from "@metaplex-foundation/mpl-bubblegum";
import * as coreCandyMachine from "@metaplex-foundation/mpl-core-candy-machine";
import bs58 from "bs58";
import {setComputeUnitLimit} from "@metaplex-foundation/mpl-toolbox";
import * as candyMachine from "@metaplex-foundation/mpl-candy-machine";
import {create} from "@metaplex-foundation/mpl-candy-machine";

// INFO: https://www.quicknode.com/guides/solana-development/nfts/how-to-create-a-solana-nft-collection-using-candy-machine-v3-and-typescript#mint-an-nft

// TODO: https://solana.com/developers/guides/javascript/compressed-nfts


// We need to create a bubblegum tree to hold compressed NFTs
// These compressed nfts will be burnt to mint the NFTs from the candy machine

// To create a candy machine, we need to create a collection NFT
// To create a collection NFT, we need to create a metadata file

// 1. Create bubblegum tree
// 2. Create a collection NFT
// 3. Generate a candy machine with candy guard requirement of burning nft from bubblegum tree
// 4. Mint compressed NFTs and transfer to wallet
// 5. Mint NFTs from candy machine

async function findCNFTs(umi: Umi, merkleTree: string) {
  const resp = await umi.rpc.getAsset(publicKey(merkleTree))
  console.log({resp})
}

async function main(walletFile: string) {
  // const SOLANA_CONNECTION = new Connection("https://api.devnet.solana.com");
  // const WALLET = Keypair.fromSecretKey(Uint8Array.from(JSON.parse(fs.readFileSync(walletFile, 'utf-8'))));
  // Location of the NFT metadata file
  const NFT_METADATA = './devnet/sample-images/images.json';
  // Obtained from tx from createCollectionNft
  const COLLECTION_NFT_MINT = 'G8aghEvM5UZMHNRsbUtVL5Tnw6Lw5Wr9vvDqNPgckEET';
  const MERKLE_TREE = 'Gif14wdrBrju41DyxNpnS1iBNtZUVam6MwuPG47ePGj9'; // Actual merkle tree

  // Obtained from tx from generateCandyMachine
  const CANDY_MACHINE_ID = '35EMRvcggvEcpWh6k3gAraUz5VHh6AM6bd68zquoqSFR';

  // const METAPLEX = Metaplex.make(SOLANA_CONNECTION)
  //   .use(keypairIdentity(WALLET));

  const walletContent = fs.readFileSync(walletFile, 'utf-8');
  const intArr = Uint8Array.from(JSON.parse(walletContent));


  const umi = createUmi("https://api.devnet.solana.com")
  const signer = umi.eddsa.createKeypairFromSecretKey(intArr);
  umi.use(umiKeypairIdentity(signer))

  // await createCollectionNft(METAPLEX, NFT_METADATA, WALLET);
  await generateCandyMachine(umi, COLLECTION_NFT_MINT);
  // await updateCandyMachine(METAPLEX, CANDY_MACHINE_ID);
  // await addItems(METAPLEX, CANDY_MACHINE_ID, NFT_METADATA);
  // await createBubbleGumTree(umi, 120);
  // await fetchBubbleGumTree(umi, MERKLE_TREE);
  // await updateCandyMachine(umi, CANDY_MACHINE_ID, MERKLE_TREE);

  const compressedNFT = await mintCompressedNft(umi, MERKLE_TREE);
  await mintNft(umi, publicKey(CANDY_MACHINE_ID), publicKey(COLLECTION_NFT_MINT), publicKey(MERKLE_TREE), compressedNFT);
}

async function generateCandyMachine(umi: Umi, COLLECTION_NFT_MINT: string) {
  const candyMachine = generateSigner(umi)

  const createTx = await (await create(umi, {
    candyMachine,
    collectionMint: publicKey(COLLECTION_NFT_MINT),
    collectionUpdateAuthority: umi.identity,
    tokenStandard: TokenStandard.NonFungible,
    itemsAvailable: 5000,
    sellerFeeBasisPoints: percentAmount(9.99, 2),
    creators: [
      { address: umi.identity.publicKey, percentageShare: 100, verified: false }
    ]
  })).sendAndConfirm(umi)


  console.log(`✅ - Created Candy Machine: ${createTx.signature}`);
  console.log(`     https://explorer.solana.com/tx/${createTx.signature}?cluster=devnet`);
}

// async function addItems(METAPLEX: Metaplex, CANDY_MACHINE_ID: string, NFT_METADATA: string) {
//   const candyMachine = await METAPLEX
//     .candyMachines()
//     .findByAddress({ address: new PublicKey(CANDY_MACHINE_ID) });
//   const items = [];
//   for (let i = 0; i < 3; i++ ) { // Add 3 NFTs (the size of our collection)
//     items.push({
//       name: `QuickNode Demo NFT # ${i+1}`,
//       uri: NFT_METADATA
//     })
//   }
//   const { response } = await METAPLEX.candyMachines().insertItems({
//     candyMachine,
//     items: items,
//   },{commitment:'finalized'});
//
//   console.log(`✅ - Items added to Candy Machine: ${CANDY_MACHINE_ID}`);
//   console.log(`     https://explorer.solana.com/tx/${response.signature}?cluster=devnet`);
// }

async function mintNft(umi: Umi, CANDY_MACHINE_ID: UmiPublicKey, nftCollectionPubKey: UmiPublicKey, requiredCollectionPublicKey: UmiPublicKey, nftToBurnPubKey: UmiPublicKey)  {
  const nftMint = generateSigner(umi)
  const mintTx = await transactionBuilder()
    .add(setComputeUnitLimit(umi, { units: 800_000 }))
    .add(
      candyMachine.mintV2(umi, {
        candyMachine: publicKey(CANDY_MACHINE_ID),
        nftMint,
        collectionMint: nftCollectionPubKey,
        collectionUpdateAuthority: nftMint.publicKey,
        mintArgs: {
          nftBurn: some({
            requiredCollection: requiredCollectionPublicKey,
            mint: nftToBurnPubKey,
            tokenStandard: TokenStandard.NonFungible,
          }),
        },
      })
    )
    .sendAndConfirm(umi)


  console.log(`✅ - Minted NFT: ${mintTx.signature}`);
  console.log(`     https://explorer.solana.com/tx/${mintTx.signature}?cluster=devnet`);
}

async function updateCandyMachine(umi: Umi, CANDY_MACHINE_ID: string, compressedNFTCollection: string) {
  const signer = generateSigner(umi)
  // remove all candy guards
  const guards = await coreCandyMachine.fetchAllCandyGuard(umi, [publicKey(CANDY_MACHINE_ID)])
  for (const guard of guards) {
    await coreCandyMachine.deleteCandyGuard(umi, {
      candyGuard: publicKey(guard.publicKey),
      authority: signer,
    }).sendAndConfirm(umi)
  }

  await coreCandyMachine.createCandyGuard(umi, {
    base: signer,
    guards: {
      nftBurn: {
        requiredCollection: publicKey(compressedNFTCollection),
      }
    }
  }).sendAndConfirm(umi)
  console.log(`✅ - Updated Candy Machine: ${CANDY_MACHINE_ID}`);
  console.log(`     https://explorer.solana.com/address/${CANDY_MACHINE_ID}?cluster=devnet`);
}

// async function createCollectionNft(METAPLEX: Metaplex, NFT_METADATA: string, WALLET: Keypair){
//   const { nft: collectionNft } = await METAPLEX.nfts().create({
//     name: "QuickNode Demo NFT Collection",
//     uri: NFT_METADATA,
//     sellerFeeBasisPoints: 0,
//     isCollection: true,
//     updateAuthority: WALLET,
//   });
//
//   console.log(`✅ - Minted Collection NFT: ${collectionNft.address.toString()}`);
//   console.log(`     https://explorer.solana.com/address/${collectionNft.address.toString()}?cluster=devnet`);
// }

main("./devnet/wallet.json").catch(console.error);

async function createBubbleGumTree(umi: Umi, entrants: number) {
  // TODO: Calculate the depth of the merkle tree based on the number of entrants and maxBufferSize
  const merkleTreeDepth = 14
  const maxBufferSize = 64

  const signer = generateSigner(umi)

  console.log(`🌳 - Creating bubblegum tree with ${entrants} entrants and depth of ${merkleTreeDepth}`)
  const builder =  await createTree(umi, {
    merkleTree: signer,
    maxDepth: merkleTreeDepth,
    maxBufferSize: maxBufferSize,
  })
  const resp = await builder.sendAndConfirm(umi)
  console.log(`✅ - Created bubblegum tree's merkle tree: ${bs58.encode(resp.signature)}`);
  console.log(`     https://explorer.solana.com/tx/${bs58.encode(resp.signature)}?cluster=devnet`);

  // TODO process ix and return the merkle tree address
  return resp
}

async function fetchBubbleGumTree(umi: Umi, pdaAddress: string) {
  const tree =  await fetchMerkleTree(umi, publicKey(pdaAddress))
  console.log({tree});
  return tree
}

async function mintCompressedNft(umi: Umi, merkleTree: string) {
  const signer = generateSigner(umi)
  console.log(`🌳 - Minting compressed NFT with merkle tree: ${merkleTree}`)
  console.log(`🌳 - Minting compressed NFT with signer: ${signer.publicKey.toString()}`)

  const resp = await mintV1(umi, {
    leafOwner: signer.publicKey,
    merkleTree: publicKey(merkleTree),
    metadata: {
      name: 'My Compressed NFT',
      uri: 'https://example.com/my-cnft.json',
      sellerFeeBasisPoints: 500, // 5%
      collection: none(),
      creators: [
        { address: umi.identity.publicKey, verified: false, share: 100 },
      ],
    },
  }).sendAndConfirm(umi)



  const tx = await parseLeafFromMintV1Transaction(umi, resp.signature)
  console.log(`✅ - Minted compressed NFT: ${tx.id}`)
  return tx.id
}