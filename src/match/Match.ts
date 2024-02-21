import Constants from "../constants/constants";
import Player from "./Player";
import Standard from "./gamemode/standard";
import Tiebreak from "./gamemode/tiebreak";

class Match {
  private players: Player[] = [];
  private isTiebreak: boolean = false;

  constructor(playerOneName: string, playerTwoName: string) {
    this.players.push(new Player(playerOneName));
    this.players.push(new Player(playerTwoName));
  }

  public pointWonBy = (playerName: string) => {
    const GameMode = this.isTiebreak ? Tiebreak : Standard
    const gameMode = new GameMode(this.players);
    const pointWinner = this.players.find(
      (player) => player.getName() == playerName
    );
    if (!pointWinner) {
      throw Error("Invalid Player Name");
    }
    gameMode.handlePointWin(pointWinner);
    const gameFinished = gameMode.isGameFinished();
    if (gameFinished) {
      this.handleGameWin(pointWinner);
      this.checkIsTiebreak();
      console.log(this.formatSetScore());
    } else {
      console.log(gameMode.formatGameScore());
    }
  };

  private checkIsTiebreak = () => {
    if (this.players.every(player => player.getGameScore() === 6)) {
      console.log(`Tiebreaker!`)
      this.isTiebreak = true;
    }
  }

  /**
   * When a player wins a game, their set score is incremented by 1 and the game scores are set back to zero
   *
   * @param pointWinner - Player who won the last point
   */
  private handleGameWin = (pointWinner: Player) => {
    console.log(`Game ${pointWinner.getName()}!`);
    pointWinner?.setSetScore(pointWinner.getSetScore() + 1);
    this.players.map((player) => player.setGameScore(0));
  };

  /**
   * Formats the set score for printing when the set is still in progress
   *
   * @returns String: The set score in the format of "firstscore"-"second score"
   */
  private formatSetScore = () => {
    const currentGame = this.players.map((player) => player.getSetScore());
    return currentGame.slice(0).join("-");
  };
}

export default Match;
