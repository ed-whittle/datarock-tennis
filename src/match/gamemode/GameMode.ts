import Player from "../Player";

export interface GameMode {
    isGameFinished: () => boolean;
    isSetFinished: () => boolean;
    handlePointWin: (pointWinner: Player) => void;
    formatGameScore: () => string;
}