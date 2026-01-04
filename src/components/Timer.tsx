interface TimerProps {
  timeLeft: number;
}

export default function Timer({ timeLeft }: TimerProps) {
  return <p>Time Left: {timeLeft}s</p>;
}
