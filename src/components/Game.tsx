import { useEffect, useState } from "react";
import { isValidWord, getComputerWord } from "../utils/wordUtils";
import InputBox from "./InputBox";
import Timer from "./Timer";
import GameOver from "./GameOver";
import type { GameStatus } from "../types/game";
import wordList from "../utils/wordList";

const TURN_TIME = 10;
const REQUIRED_WORD_LENGTH = 5;

export default function Game() {
  const [currentWord, setCurrentWord] = useState("start");
  const [chainLength, setChainLength] = useState(1);
  const [timeLeft, setTimeLeft] = useState(TURN_TIME);
  const [status, setStatus] = useState<GameStatus>("playing");
  const [error, setError] = useState<string | null>(null);

  const lastLetter = currentWord.slice(-1);

  // Countdown timer
  useEffect(() => {
    if (status !== "playing") return;

    if (timeLeft === 0) {
      setStatus("gameover");
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, status]);

  function applyWord(word: string) {
    setCurrentWord(word);
    setChainLength((c) => c + 1);
    setTimeLeft(TURN_TIME);
  }

  function handlePlayerSubmit(word: string) {
    const validationError = isValidWord(word, lastLetter, REQUIRED_WORD_LENGTH, wordList);

    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    applyWord(word);

    // Computer responds instantly
    const computerWord = getComputerWord(word.slice(-1), REQUIRED_WORD_LENGTH, wordList);
    applyWord(computerWord);
  }

  if (status === "gameover") {
    return <GameOver score={chainLength} />;
  }

  return (
    <div>
      <h2>
        Current Word: {currentWord} (
        <span style={{ color: "red" }}>{lastLetter}</span>)
      </h2>

      <p>Chain Length: {chainLength}</p>

      <Timer timeLeft={timeLeft} />

      <InputBox
        onSubmit={handlePlayerSubmit}
        disabled={status !== "playing"}
        error={error}
      />
    </div>
  );
}
