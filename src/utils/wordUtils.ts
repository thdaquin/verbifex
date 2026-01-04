export function isValidWord(
  word: string,
  requiredLetter: string,
  requiredLength: number,
  wordList: WordList
): string | null {
  if (!(word in wordList))
    return "Not a valid English word";
  if (word.length !== requiredLength) 
    return "Word must be exactly 5 letters long";
  if (word[0] !== requiredLetter)
    return `Word must start with "${requiredLetter}"`;
  return null;
}

export function getComputerWord(
  requiredLetter: string,
  requiredLength: number,
  wordList: WordList
): string {
  const validWords = wordList.filter((w) =>
    w.startsWith(requiredLetter) && w.length == requiredLength
  );

  return validWords[Math.floor(Math.random() * validWords.length)];
}
