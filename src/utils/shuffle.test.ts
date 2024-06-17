import {RNGSfc32Generator} from "@/utils/random-rngsfc32";
import {fisherYatesShuffle, fisherYatesShuffleWithOffset} from "@/utils/shuffle";
import {describe, expect, test} from '@jest/globals';

describe("fisher-yates shuffle", () => {
  test("should shuffle the array", () => {
    const array = generateSampleData();
    const flattenedArray = expandTicketHolderArray(array);
    const seedHash = "HPpYXZ944SXpJB3Tb7Zzy2K7YD45zGREsGqPtEP43xBx"
    const seed = seedHash.split("").map((c) => c.charCodeAt(0));
    const rng = new RNGSfc32Generator(seed);

    const shuffledArray = fisherYatesShuffle(rng, [...flattenedArray]);
    expect(shuffledArray).toMatchSnapshot();
    expect(rng).toMatchSnapshot();
  })

  test("should shuffle the array differently", () => {
    const array = generateSampleData();
    const flattenedArray = expandTicketHolderArray(array);
    const seedHash = "thisIsAStoryAllAboutHowMyLifeGotFlippedTurnedUpsideDown"
    const seed = seedHash.split("").map((c) => c.charCodeAt(0));
    let rng = new RNGSfc32Generator(seed);

    const shuffledArray = fisherYatesShuffle(rng, [...flattenedArray]);

    rng = new RNGSfc32Generator("momsSpaghettiOnTheSurfaceHeLooksCalmAndReady".split("").map((c) => c.charCodeAt(0)));
    const shuffledArray2 = fisherYatesShuffle(rng, [...flattenedArray]);
    expect(shuffledArray).not.toEqual(shuffledArray2)
  })
});

describe("fisher-yates shuffle with offset", () => {
  const asciiSum = (s: string) => s.split("").map((c) => c.charCodeAt(0)).reduce((a, b) => a + b, 0);

  test("should shuffle the array", () => {
    const array = generateSampleData();
    const flattenedArray = expandTicketHolderArray(array);
    const seedHash = "HPpYXZ944SXpJB3Tb7Zzy2K7YD45zGREsGqPtEP43xBx"
    const seed = seedHash.split("").map((c) => c.charCodeAt(0));
    const rng = new RNGSfc32Generator(seed);

    const offset = asciiSum(seedHash);
    const shuffledArray = fisherYatesShuffleWithOffset(rng, offset, [...flattenedArray]);
    expect(shuffledArray).toMatchSnapshot();
    expect(rng).toMatchSnapshot();
  })
  test("should shuffle the array differently", () => {
    const array = generateSampleData();
    const flattenedArray = expandTicketHolderArray(array);
    let seedHash = "thisIsAStoryAllAboutHowMyLifeGotFlippedTurnedUpsideDown"
    let seed = seedHash.split("").map((c) => c.charCodeAt(0));
    const rng = new RNGSfc32Generator(seed);

    const offset = asciiSum(seedHash);
    const shuffledArray = fisherYatesShuffleWithOffset(rng, offset, [...flattenedArray]);

    seedHash = "HPpYXZ944SXpJB3Tb7Zzy2K7YD45zGREsGqPtEP43xBx"
    seed = seedHash.split("").map((c) => c.charCodeAt(0));
    rng.setSeed(seed)
    const shuffledArray2 = fisherYatesShuffleWithOffset(rng, offset, [...flattenedArray]);

    expect(shuffledArray).not.toEqual(shuffledArray2);
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
