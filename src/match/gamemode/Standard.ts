import Constants from "../../constants/constants";
import Player from "../Player";
import { GameMode } from "./GameMode";

/**
 * Scoring for a standard game (LOVE,15,30,40,ADV)
 */
class Standard implements GameMode {
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
    if (!currentGame.some((score) => score >= 4)) {
      return false;
    } else {
      const scoreDiff: number = Math.abs(currentGame[0] - currentGame[1]);
      if (scoreDiff >= 2) {
        return true;
      }
      return false;
    }
  };

  /**
   * Checks if the set is finished after the game score has been incremented
   * Early return if no players score is higher than 6
   * Otherwise check that the score difference is 2 (or higher in case of arithmetic error)
   *
   * @returns Boolean  - true if the set is finished, false if not
   */
  public isSetFinished = (): boolean => {
    const currentGame: number[] = this.players.map((player) => player.getSetScore());
    if (!currentGame.some((score) => score >= 6)) {
      return false;
    } else {
      const scoreDiff: number = Math.abs(currentGame[0] - currentGame[1]);
      if (scoreDiff >= 2) {
        return true;
      }
      return false;
    }
  };

  /**
   * Increments the winner of the points score, and if the point winner was 40-ADV down it will
   * reset the value to DEUCE
   *
   * @param pointWinner: Player
   */
  public handlePointWin = (pointWinner: Player): void => {
    pointWinner.setGameScore(pointWinner.getGameScore() + 1);
    if (this.players.every((player) => player.getGameScore() === 4)) {
      this.players.map((player) => player.setGameScore(3));
    }
  };

  /**
   * Formats the game score for printing when the game is still in progress
   *
   * @returns String: The game score in the format of "firstscore"-"second score"
   */
  public formatGameScore = (): string => {
    const currentGame: string[] = this.players.map(
      (player) =>
        Constants.GAME_SCORE[
          player.getGameScore() as keyof typeof Constants.GAME_SCORE
        ]
    );
    if (
      currentGame.every((gameScore) => gameScore === Constants.GAME_SCORE[3])
    ) {
      return "DEUCE";
    }
    return currentGame.slice(0).join("-");
  };
}

export default Standard;
