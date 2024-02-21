import Player from "./Player";
import Standard from "./gamemode/Standard";
import Tiebreak from "./gamemode/Tiebreak";

class Match {
  private players: Player[] = [];
  private isTiebreak: boolean = false;

  constructor(playerOneName: string, playerTwoName: string) {
    this.players.push(new Player(playerOneName));
    this.players.push(new Player(playerTwoName));
  }

  public pointWonBy = (playerName: string) => {
    const GameMode = this.isTiebreak ? Tiebreak : Standard;
    const gameMode = new GameMode(this.players);
    const pointWinner = this.players.find(
      (player) => player.getName() == playerName
    );
    // If there was no assumption that the input data was valid, this would be needed
    if (!pointWinner) {
      throw Error("Invalid Player Name");
    }

    gameMode.handlePointWin(pointWinner);
    if (gameMode.isGameFinished()) {
      this.handleGameWin(pointWinner);
      if (gameMode.isSetFinished()) {
        this.handleEndOfSet(pointWinner);
        return;
      }
      this.checkIsTiebreak();
    }
  };

  /**
   * Prints the current game score to the stdout
   */
  public score = (): void => {
    const GameMode = this.isTiebreak ? Tiebreak : Standard;
    const gameMode = new GameMode(this.players);
    console.log(gameMode.formatGameScore());
  };

  /**
   * Prints the current set score to the stdout
   */
  public tennisSetScore = (): void => {
    console.log(this.formatSetScore());
  };

  private checkIsTiebreak = () => {
    if (this.players.every((player) => player.getSetScore() === 6)) {
      console.log(`Tiebreaker!`);
      this.isTiebreak = true;
    }
  };

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

  /**
   * When it's the end of the set, print the winner and reset the set count.
   *
   * @param pointWinner
   */
  private handleEndOfSet = (pointWinner: Player) => {
    console.log(`Set ${pointWinner.getName()}!`);
    this.players.map((player) => player.setSetScore(0));
    // TODO Would increment the match count here
  };
}

export default Match;
