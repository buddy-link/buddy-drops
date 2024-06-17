import {RNGSfc32Generator} from "@/utils/random-rngsfc32";
import {fisherYatesShuffle} from "@/utils/shuffle";
import {describe, expect, test} from '@jest/globals';

describe("shuffle", () => {
  test("should shuffle the array", () => {
    const array = generateSampleData();
    const flattenedArray = expandTicketHolderArray(array);
    // const seed = [0, 2654435769, 1013904242, 3668340011]
    const seedHash = "HPpYXZ944SXpJB3Tb7Zzy2K7YD45zGREsGqPtEP43xBx"
    const seed = seedHash.split("").map((c) => c.charCodeAt(0));
    const rng = new RNGSfc32Generator(seed);

    const shuffledArray = fisherYatesShuffle(rng, [...flattenedArray]);

    for (let i = 0; i < 100; i++) {
      rng.setSeed(seed);
      const shuffledArray2 = fisherYatesShuffle(rng, [...flattenedArray]);
      expect(shuffledArray2).toEqual(shuffledArray);
    }
  })

  test("should give different results with different seed", () => {
    const array = generateSampleData();
    const flattenedArray = expandTicketHolderArray(array);
    const rng = new RNGSfc32Generator("HPpYXZ944SXpJB3Tb7Zzy2K7YD45zGREsGqPtEP43xBx");

    const shuffledArray = fisherYatesShuffle(rng, [...flattenedArray]);

    for (let i = 0; i < 100; i++) {
      const shuffledArray2 = fisherYatesShuffle(rng, [...flattenedArray]);
      expect(shuffledArray2).not.toEqual(shuffledArray);
    }
  })
});

interface TicketHolder {
  publicKey: string;
  quantityOfTickets: number;
}

function expandTicketHolderArray(ticketHolder: TicketHolder[]): TicketHolder[] {
  return ticketHolder.flatMap<TicketHolder>((ticket) => Array(ticket.quantityOfTickets).fill(ticket));
}

// Function to generate sample data
function generateSampleData(): TicketHolder[] {
  return [
    {publicKey: 'A', quantityOfTickets: 10},
    {publicKey: 'B', quantityOfTickets: 8},
    {publicKey: 'C', quantityOfTickets: 5},
    {publicKey: 'D', quantityOfTickets: 7},
    {publicKey: 'E', quantityOfTickets: 12},
    {publicKey: 'F', quantityOfTickets: 9},
    {publicKey: 'G', quantityOfTickets: 6},
    {publicKey: 'H', quantityOfTickets: 4},
    {publicKey: 'I', quantityOfTickets: 11},
    {publicKey: 'J', quantityOfTickets: 10},
    {publicKey: 'K', quantityOfTickets: 9},
    {publicKey: 'L', quantityOfTickets: 9},
  ];
}
