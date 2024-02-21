import Player from "../Player";
import { GameMode } from "./GameMode";

/**
 * Scoring for a tiebreak
 */
class Tiebreak implements GameMode {
  private players: Player[] = [];

  constructor(players: Player[]) {
    this.players = players;
  }

  /**
   * Checks if the game is finished after the score has been incremented
   * Early return if no players score is higher than 4
   * Otherwise check that the score difference is 2 (or higher in case of arithmetic error)
   *
   * @returns Boolean  - true if the game is finished, false if not
   */
  public isGameFinished = (): boolean => {
    const currentGame: number[] = this.players.map((player) => player.getGameScore());
    if (!currentGame.some((score) => score >= 7)) {
      return false;
    }
    const scoreDiff: number = Math.abs(currentGame[0] - currentGame[1]);
    if (scoreDiff >= 2) {
      return true;
    }
    return false;
  };

  /**
   * Checks if the set is finished after the game score has been incremented
   * Once score must be 7 or above if it's a tiebreaker
   *
   * @returns Boolean  - true if the set is finished, false if not
   */
  public isSetFinished = (): boolean => {
    const currentGame: number[] = this.players.map((player) => player.getSetScore());
    if (currentGame.some((score) => score >= 7)) {
      return true;
    }
    return false;
  };

  /**
   * Increments the winner of the points score
   *
   * @param pointWinner: Player
   */
  public handlePointWin = (pointWinner: Player) => {
    pointWinner.setGameScore(pointWinner.getGameScore() + 1);
  };

  /**
   * Formats the game score for printing when the game is still in progress
   *
   * @returns String: The game score in the format of "firstscore"-"second score"
   */
  public formatGameScore = (): string => {
    const currentGame: number[] = this.players.map((player) => player.getGameScore());
    return currentGame.slice(0).join("-");
  };
}

export default Tiebreak;
