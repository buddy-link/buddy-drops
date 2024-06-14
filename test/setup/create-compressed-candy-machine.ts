import {Connection, Keypair, PublicKey} from "@solana/web3.js";
import {
  Metaplex,
  toBigNumber,
  CreateCandyMachineInput,
  DefaultCandyGuardSettings,
  toDateTime,
  sol,
  keypairIdentity
} from "@metaplex-foundation/js";
import fs from "fs";
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import {
  generateSigner,
  keypairIdentity as umiKeypairIdentity,
  Umi,
  publicKey, none
} from '@metaplex-foundation/umi'
import {createTree, fetchMerkleTree, mintV1} from "@metaplex-foundation/mpl-bubblegum";
import bs58 from "bs58";

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

async function main(walletFile: string) {
  const SOLANA_CONNECTION = new Connection("https://api.devnet.solana.com");
  const WALLET = Keypair.fromSecretKey(Uint8Array.from(JSON.parse(fs.readFileSync(walletFile, 'utf-8'))));
  // Location of the NFT metadata file
  const NFT_METADATA = './devnet/sample-images/images.json';
  // Obtained from tx from createCollectionNft
  const COLLECTION_NFT_MINT = 'G8aghEvM5UZMHNRsbUtVL5Tnw6Lw5Wr9vvDqNPgckEET';
  const MERKLE_TREE = 'Gif14wdrBrju41DyxNpnS1iBNtZUVam6MwuPG47ePGj9';

  // Obtained from tx from generateCandyMachine
  const CANDY_MACHINE_ID = '35EMRvcggvEcpWh6k3gAraUz5VHh6AM6bd68zquoqSFR';

  const METAPLEX = Metaplex.make(SOLANA_CONNECTION)
    .use(keypairIdentity(WALLET));

  const umi = createUmi("https://api.devnet.solana.com")
  const signer = umi.eddsa.createKeypairFromSecretKey(WALLET.secretKey);
  umi.use(umiKeypairIdentity(signer))

  // await createCollectionNft(METAPLEX, NFT_METADATA, WALLET);
  // await generateCandyMachine(COLLECTION_NFT_MINT, WALLET, METAPLEX);
  // await updateCandyMachine(METAPLEX, CANDY_MACHINE_ID);
  // await addItems(METAPLEX, CANDY_MACHINE_ID, NFT_METADATA);
  // await createBubbleGumTree(umi, 120);
  // await fetchBubbleGumTree(umi, MERKLE_TREE);
  await mintCompressedNft(umi, MERKLE_TREE);
  // await mintNft(METAPLEX, CANDY_MACHINE_ID, WALLET);
}

async function generateCandyMachine(COLLECTION_NFT_MINT: string, WALLET: Keypair, METAPLEX: Metaplex) {
  const candyMachineSettings: CreateCandyMachineInput<DefaultCandyGuardSettings> =
    {
      itemsAvailable: toBigNumber(3), // Collection Size: 3
      sellerFeeBasisPoints: 1000, // 10% Royalties on Collection
      symbol: "DEMO",
      maxEditionSupply: toBigNumber(0), // 0 reproductions of each NFT allowed
      isMutable: true,
      creators: [
        { address: WALLET.publicKey, share: 100 },
      ],
      collection: {
        address: new PublicKey(COLLECTION_NFT_MINT), // Can replace with your own NFT or upload a new one
        updateAuthority: WALLET,
      },
    };
  const { candyMachine } = await METAPLEX.candyMachines().create(candyMachineSettings);
  console.log(`✅ - Created Candy Machine: ${candyMachine.address.toString()}`);
  console.log(`     https://explorer.solana.com/address/${candyMachine.address.toString()}?cluster=devnet`);
}

async function addItems(METAPLEX: Metaplex, CANDY_MACHINE_ID: string, NFT_METADATA: string) {
  const candyMachine = await METAPLEX
    .candyMachines()
    .findByAddress({ address: new PublicKey(CANDY_MACHINE_ID) });
  const items = [];
  for (let i = 0; i < 3; i++ ) { // Add 3 NFTs (the size of our collection)
    items.push({
      name: `QuickNode Demo NFT # ${i+1}`,
      uri: NFT_METADATA
    })
  }
  const { response } = await METAPLEX.candyMachines().insertItems({
    candyMachine,
    items: items,
  },{commitment:'finalized'});

  console.log(`✅ - Items added to Candy Machine: ${CANDY_MACHINE_ID}`);
  console.log(`     https://explorer.solana.com/tx/${response.signature}?cluster=devnet`);
}

async function mintNft(METAPLEX: Metaplex, CANDY_MACHINE_ID: string, WALLET: Keypair) {
  const candyMachine = await METAPLEX
    .candyMachines()
    .findByAddress({ address: new PublicKey(CANDY_MACHINE_ID) });
  let { nft, response } = await METAPLEX.candyMachines().mint({
    candyMachine,
    collectionUpdateAuthority: WALLET.publicKey,
  },{commitment:'finalized'})

  console.log(`✅ - Minted NFT: ${nft.address.toString()}`);
  console.log(`     https://explorer.solana.com/address/${nft.address.toString()}?cluster=devnet`);
  console.log(`     https://explorer.solana.com/tx/${response.signature}?cluster=devnet`);
}

async function updateCandyMachine(METAPLEX: Metaplex, CANDY_MACHINE_ID: string) {
  const candyMachine = await METAPLEX
    .candyMachines()
    .findByAddress({ address: new PublicKey(CANDY_MACHINE_ID) });

  const { response } = await METAPLEX.candyMachines().update({
    candyMachine,
    guards: {
      startDate: { date: toDateTime("2022-10-17T16:00:00Z") },
      mintLimit: {
        id: 1,
        limit: 2,
      },
      solPayment: {
        amount: sol(0.1),
        destination: METAPLEX.identity().publicKey,
      },
    }
  })

  console.log(`✅ - Updated Candy Machine: ${CANDY_MACHINE_ID}`);
  console.log(`     https://explorer.solana.com/tx/${response.signature}?cluster=devnet`);
}

async function createCollectionNft(METAPLEX: Metaplex, NFT_METADATA: string, WALLET: Keypair){
  const { nft: collectionNft } = await METAPLEX.nfts().create({
    name: "QuickNode Demo NFT Collection",
    uri: NFT_METADATA,
    sellerFeeBasisPoints: 0,
    isCollection: true,
    updateAuthority: WALLET,
  });

  console.log(`✅ - Minted Collection NFT: ${collectionNft.address.toString()}`);
  console.log(`     https://explorer.solana.com/address/${collectionNft.address.toString()}?cluster=devnet`);
}

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
  await mintV1(umi, {
    treeCreatorOrDelegate: signer,

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
}