import { useState } from "react";

interface GameStartScreenProps {
  onStart: (turnTime: number, wordLength: number) => void;
}

export default function GameStartScreen({ onStart }: GameStartScreenProps) {
  const [turnTime, setTurnTime] = useState(15);
  const [wordLength, setWordLength] = useState(4);

  const handleStart = () => {
    onStart(turnTime, wordLength);
  };

  return (
    <div className="start-screen">
      <h1>Verbifex</h1>
      <h3>A Word Chaining Game</h3>
      
      <div className="setting-group">
        <label>
          Turn Time (seconds):
          <input
            type="number"
            value={turnTime}
            onChange={(e) => setTurnTime(Math.max(5, parseInt(e.target.value) || 15))}
            min="5"
            max="60"
          />
        </label>
      </div>

      <div className="setting-group">
        <label>
          Word Length:
          <input
            type="number"
            value={wordLength}
            onChange={(e) => setWordLength(Math.max(3, Math.min(10, parseInt(e.target.value) || 4)))}
            min="3"
            max="10"
          />
        </label>
      </div>

      <button onClick={handleStart}>Start Game</button>
    </div>
  );
}