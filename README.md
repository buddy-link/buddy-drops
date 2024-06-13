# Buddy Drops

## Prerequisites
```bash
solana config set --url https://api.devnet.solana.com
solana-keygen new --outfile ./devnet/wallet.json
export SOLANA_WALLET=$(pwd)/devnet/wallet.json
solana airdrop 2
```