import Player from "../../Player";
import Standard from "../standard";

describe("Standard Game Mode", () => {
  describe("isGameFinished", () => {
    it("should return false when the game score is 15-30", () => {
      const players: Player[] = [new Player("Test1"), new Player("Test2")];
      players[0].setGameScore(1);
      players[1].setGameScore(2);

      const standard = new Standard(players);
      expect(standard.isGameFinished()).toBeFalsy();
    });
    it("should return true when the game score is 15-GAME", () => {
      const players: Player[] = [new Player("Test1"), new Player("Test2")];
      players[0].setGameScore(1);
      players[1].setGameScore(4);

      const standard = new Standard(players);
      expect(standard.isGameFinished()).toBeTruthy();
    });
  });
});
