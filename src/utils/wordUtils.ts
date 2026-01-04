import { validWordList } from "../data/validWords"

export function isValidWord(
  word: string,
  requiredLetter: string,
  requiredLength: number,
): string | null {
  if (!(validWordList.has(word)))
    return "Not a valid English word";
  if (word.length !== requiredLength) 
    return "Word must be exactly 5 letters long";
  if (word[0] !== requiredLetter)
    return `Word must start with "${requiredLetter}"`;
  return null;
}

export function getValidWord(
  requiredLetter: string,
  requiredLength: number,
): string {
  const validWordChoices = Array.from(validWordList).filter((w) =>
    w.startsWith(requiredLetter) && w.length == requiredLength
  );

  return validWordChoices[Math.floor(Math.random() * validWordChoices.length)];
}
