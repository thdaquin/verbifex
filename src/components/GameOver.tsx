interface GameOverProps {
  score: number;
}

export default function GameOver({ score }: GameOverProps) {
  return (
    <div>
      <h2>Game Over!</h2>
      <p>Final Score: {score}</p>
    </div>
  );
}
