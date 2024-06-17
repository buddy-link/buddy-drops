export interface RandomGenerator {
  setSeed(seed: string): void;
  next(): number;
}