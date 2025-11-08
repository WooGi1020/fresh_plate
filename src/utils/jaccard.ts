// utils/jaccard.ts
export function getNGrams(str: string, n = 2): Set<string> {
  const grams = new Set<string>();
  if (!str) return grams;
  for (let i = 0; i < str.length - n + 1; i++) {
    grams.add(str.slice(i, i + n));
  }
  return grams;
}

export function jaccardSimilarity(a: string, b: string): number {
  if (!a || !b) return 0;
  const setA = getNGrams(a);
  const setB = getNGrams(b);
  const intersection = new Set([...setA].filter((x) => setB.has(x)));
  const union = new Set([...setA, ...setB]);
  return union.size === 0 ? 0 : intersection.size / union.size;
}

export function jaccardSetSimilarity<T>(setA: Set<T>, setB: Set<T>): number {
  const intersection = new Set([...setA].filter((x) => setB.has(x)));
  const union = new Set([...setA, ...setB]);
  return union.size === 0 ? 0 : intersection.size / union.size;
}
