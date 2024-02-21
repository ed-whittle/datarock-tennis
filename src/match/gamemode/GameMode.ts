import Player from "../Player";

export interface GameMode {
    isGameFinished: () => boolean;
    handlePointWin: (pointWinner: Player) => void;
    formatGameScore: () => string;
}