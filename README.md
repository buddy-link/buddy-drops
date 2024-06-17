# Buddy Drops

## Resolving the raffle for the Buddy Drops
Once the raffle is over, the Buddy Drops will be resolved in the following way:
1. Commit last block hash of the raffle to the Buddy Drops program.
2. Get list of entries from the raffle.
3. Expand the list of entries by the number of tickets ie, if Alice buys 3 tickets, she will have 3 objects in the array
4. Sort the list of entries by the public key of the entry.
5. we then calculate an offset into the array by the sum total of the ASCII values of the latest block hash.
6. finally we shuffle the array with fisher-yates and take the first # of winners.

## How do the winners claim their drop
1. Each winner will have a compressed NFT minted and transferred to their entry address.
   - If someone wins multiple times, they will be transferred multiple NFTs.
2. Winner can return to the site and claim their NFT from the collection by burning the NFT at our candy machine.
3. The candy machine will then mint the NFT for the winner and transfer it to their wallet.