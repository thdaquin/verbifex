export interface WordEntry {
  word: string;
  definitions: string[];
}

export type WordList = Record<string, WordEntry>;
