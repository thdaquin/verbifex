import type { WordList } from "../types/word";
import wordListRaw from "./wordListRaw";

type RawWordWithMeanings = {
  word: string;
  meanings: { def: string }[];
};

function hasMeanings(data: unknown): data is RawWordWithMeanings {
  return (
    typeof data === "object" &&
    data !== null &&
    Array.isArray((data as any).meanings)
  );
}

const wordList: WordList = Object.fromEntries(
  Object.entries(wordListRaw).flatMap(([key, data]) => {
    if (!hasMeanings(data)) return [];

    return [[
      key,
      {
        word: data.word,
        definitions: data.meanings.map(m => m.def),
      },
    ]];
  })
);

export default wordList;
