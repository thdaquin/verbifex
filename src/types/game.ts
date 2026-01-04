export type GameStatus = "playing" | "gameover";

export interface GameState {
  currentWord: string;
  chainLength: number;
  timeLeft: number;
  status: GameStatus;
  error: string | null;
}
