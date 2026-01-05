import { useEffect, useState } from "react";
import { isValidWord, getValidWord, getRandomLetter } from "../utils/wordUtils";
import InputBox from "./InputBox";
import Timer from "./Timer";
import GameOverScreen from "./GameOverScreen";
import Spinner from "./Spinner";
import type { GameStatus } from "../types/game";

interface GameScreenProps {
  turnTime: number;
  wordLength: number;
  onBackToStart: () => void;
}

export default function GameScreen({ turnTime, wordLength, onBackToStart }: GameScreenProps) {
  const [currentWord, setCurrentWord] = useState(getValidWord(getRandomLetter(), wordLength));
  const [wordChain, setWordChain] = useState<string[]>([]);
  const [chainLength, setChainLength] = useState(1);
  const [timeLeft, setTimeLeft] = useState(turnTime);
  const [status, setStatus] = useState<GameStatus>("playing");
  const [error, setError] = useState<string | null>(null);
  const [isComputerThinking, setIsComputerThinking] = useState(false);
  const lastLetter = currentWord.slice(-1);

  // Initialize chain with first word
  useEffect(() => {
    setWordChain([currentWord]);
  }, []);

  useEffect(() => {
    if (status !== "playing" || isComputerThinking) return;
    if (timeLeft === 0) {
      setStatus("gameover");
      return;
    }
    const timer = setTimeout(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, status, isComputerThinking]);

  function applyWord(word: string) {
    setCurrentWord(word);
    setWordChain((chain) => [...chain, word]);
    setChainLength((c) => c + 1);
    setTimeLeft(turnTime);
  }

  function handlePlayerSubmit(word: string) {
    // Check for repeats
    if (wordChain.includes(word)) {
      setError("Word already used!");
      return;
    }

    const validationError = isValidWord(word, lastLetter, wordLength);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);
    applyWord(word);
    
    // Computer's turn - show spinner and wait
    setIsComputerThinking(true);
    
    setTimeout(() => {
      const validWord = getValidWord(word.slice(-1), wordLength);
      applyWord(validWord);
      setIsComputerThinking(false);
    }, 1500); // Wait 1.5 seconds before computer plays
  }

  if (status === "gameover") {
    return (
      <GameOverScreen
        score={chainLength} 
        turnTime={turnTime}
        wordLength={wordLength}
        wordChain={wordChain}
        onBackToStart={onBackToStart}
      />
    );
  }

  return (
    <div className="game-container">
      <h2 className="current-word">
        {currentWord} (<span style={{ color: "red" }}>{lastLetter}</span>)
      </h2>
      <div className="game-info">
        <p>Chain: {chainLength}</p>
        <Timer timeLeft={timeLeft} />
        <p className="settings-info">{turnTime}s | {wordLength} letters</p>
      </div>
      
      {isComputerThinking ? (
        <Spinner />
      ) : (
        <InputBox
          onSubmit={handlePlayerSubmit}
          disabled={status !== "playing"}
          error={error}
          wordLength={wordLength}
        />
      )}
      
      <div className="word-chain">
        <h3>Word Chain:</h3>
        <div className="chain-list">
          {wordChain.map((word, index) => (
            <span key={index} className="chain-word">
              {word}
              {index < wordChain.length - 1 && " → "}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}