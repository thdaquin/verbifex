import { validWordList } from "../data/validWordList"

export function isValidWord(
  word: string,
  requiredLetter: string,
  requiredLength: number,
): string | null {
  if (!(validWordList.has(word)))
    return "Not a valid English word";
  if (word.length !== requiredLength) 
    return `Word must be exactly ${requiredLength} letters long`;
  if (word[0] !== requiredLetter)
    return `Word must start with "${requiredLetter}"`;
  return null;
}

export function getValidWord(
  requiredLetter: string,
  requiredLength: number,
): string {
  const validWordChoices = Array.from(validWordList).filter((w) =>
    w.toLowerCase().startsWith(requiredLetter.toLowerCase()) && w.length == requiredLength
  );
  return validWordChoices[Math.floor(Math.random() * validWordChoices.length)];
}

export function getRandomLetter(): string {
  const letters = "abcdefghijklmnopqrstuvwxyz";
  const randomIndex = Math.floor(Math.random() * letters.length);
  return letters[randomIndex];
}