interface GameOverScreenProps {
  score: number;
  turnTime: number;
  wordLength: number;
  wordChain: string[];
  onBackToStart: () => void;
}

export default function GameOverScreen({ score, turnTime, wordLength, wordChain, onBackToStart }: GameOverScreenProps) {
  return (
    <div className="gameover-container">
      <h2>Game Over!</h2>
      <p className="final-score">Final Score: {score}</p>
      <p className="settings-display">Settings: {turnTime}s per turn, {wordLength}-letter words</p>
      
      <div className="word-chain">
        <h3>Your Word Chain:</h3>
        <div className="chain-list">
          {wordChain.map((word, index) => (
            <span key={index} className="chain-word">
              {word}
              {index < wordChain.length - 1 && " → "}
            </span>
          ))}
        </div>
      </div>
      
      <button onClick={onBackToStart} style={{ marginTop: "20px" }}>
        Back to Start
      </button>
    </div>
  );
}