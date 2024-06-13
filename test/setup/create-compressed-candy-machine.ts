import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { Metaplex, keypairIdentity, toMetaplexFile, toBigNumber, CreateCandyMachineInput, DefaultCandyGuardSettings, CandyMachineItem, toDateTime, sol, TransactionBuilder, CreateCandyMachineBuilderContext } from "@metaplex-foundation/js";
import fs from "fs";

// INFO: https://www.quicknode.com/guides/solana-development/nfts/how-to-create-a-solana-nft-collection-using-candy-machine-v3-and-typescript#mint-an-nft

// TODO: https://solana.com/developers/guides/javascript/compressed-nfts

async function main(walletFile: string) {
  const SOLANA_CONNECTION = new Connection("https://api.devnet.solana.com");
  const WALLET = Keypair.fromSecretKey(Uint8Array.from(JSON.parse(fs.readFileSync(walletFile, 'utf-8'))));
  const COLLECTION_NFT_MINT = 'G8aghEvM5UZMHNRsbUtVL5Tnw6Lw5Wr9vvDqNPgckEET';
  const CANDY_MACHINE_ID = '35EMRvcggvEcpWh6k3gAraUz5VHh6AM6bd68zquoqSFR';
  const NFT_METADATA = './devnet/sample-images/images.json';

  const METAPLEX = Metaplex.make(SOLANA_CONNECTION)
    .use(keypairIdentity(WALLET));

  // await createCollectionNft(METAPLEX, NFT_METADATA, WALLET);
  // await generateCandyMachine(COLLECTION_NFT_MINT, WALLET, METAPLEX);
  // await updateCandyMachine(METAPLEX, CANDY_MACHINE_ID);
  // await addItems(METAPLEX, CANDY_MACHINE_ID, NFT_METADATA);
  await mintNft(METAPLEX, CANDY_MACHINE_ID, WALLET);
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