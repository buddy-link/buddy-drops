import RNGSfc32 from "@lazy-random/generators-sfc32";
import {RandomGenerator} from "@/utils/random";

export class RNGSfc32Generator implements RandomGenerator {
  private rng: RNGSfc32;

  constructor(seed: any) {
    this.rng = new RNGSfc32(seed, {
      arguments: {

      }
    });
  }

  setSeed(seed: any) {
    this.rng = new RNGSfc32(seed);
  }

  next(): number {
    return this.rng.next()
  }
}