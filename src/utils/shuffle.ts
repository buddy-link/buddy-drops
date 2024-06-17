// Define the structure of the input objects
import {RandomGenerator} from "@/utils/random";

// Fisher-Yates shuffle algorithm
export function fisherYatesShuffle(rng: RandomGenerator, array: any[])  {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(rng.next() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements at indices i and j
  }
  return array;
}

export function fisherYatesShuffleWithOffset(rng: RandomGenerator, offset: number, array: any[]) {
  // Rotate array by offset. Offset can be greater than array length
  const modulatedOffset = offset % array.length;
  for (let i = 0; i < modulatedOffset; i++) {
    array.push(array.shift());
  }
  return fisherYatesShuffle(rng, array);
}