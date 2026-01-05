import { useState } from 'react';
import './App.css';
import GameStartScreen from "./components/GameStartScreen";
import GameScreen from "./components/GameScreen";

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [turnTime, setTurnTime] = useState(15);
  const [wordLength, setWordLength] = useState(5);

  const handleStart = (time: number, length: number) => {
    setTurnTime(time);
    setWordLength(length);
    setGameStarted(true);
  };

  const handleBackToStart = () => {
    setGameStarted(false);
  };

  return (
    <>
      {!gameStarted ? (
        <GameStartScreen onStart={handleStart} />
      ) : (
        <GameScreen 
          turnTime={turnTime} 
          wordLength={wordLength}
          onBackToStart={handleBackToStart}
        />
      )}
    </>
  );
}

export default App;