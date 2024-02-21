class Player {
  private name: string = "";
  private gameScore: number = 0;
  private setScore: number = 0;

  constructor(playerName: string) {
    this.name = playerName;
  }

  public getName = () => {
    return this.name;
  };

  public getGameScore = () => {
    return this.gameScore;
  };

  public setGameScore = (score: number) => {
    this.gameScore = score;
  };

  public getSetScore = () => {
    return this.setScore;
  };

  public setSetScore = (score: number) => {
    this.setScore = score;
  };
}

export default Player;
