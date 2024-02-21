import Player from "../../Player";
import Standard from "../Standard";

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
    it("should return false when the game score is deuce", () => {
      const players: Player[] = [new Player("Test1"), new Player("Test2")];
      players[0].setGameScore(3);
      players[1].setGameScore(3);

      const standard = new Standard(players);
      expect(standard.isGameFinished()).toBeFalsy();
    });
    it("should return false when the game score is advantage", () => {
      const players: Player[] = [new Player("Test1"), new Player("Test2")];
      players[0].setGameScore(3);
      players[1].setGameScore(4);

      const standard = new Standard(players);
      expect(standard.isGameFinished()).toBeFalsy();
    });
  });
  describe("isSetFinished", () => {
    it("should return false when the set score is 1-5", () => {
      const players: Player[] = [new Player("Test1"), new Player("Test2")];
      players[0].setSetScore(1);
      players[1].setSetScore(5);

      const standard = new Standard(players);
      expect(standard.isSetFinished()).toBeFalsy();
    });
    it("should return true when the set score is 1-6", () => {
      const players: Player[] = [new Player("Test1"), new Player("Test2")];
      players[0].setSetScore(6);
      players[1].setSetScore(1);

      const standard = new Standard(players);
      expect(standard.isSetFinished()).toBeTruthy();
    });
    it("should return false when the set score is 5-5", () => {
      const players: Player[] = [new Player("Test1"), new Player("Test2")];
      players[0].setSetScore(5);
      players[1].setSetScore(5);

      const standard = new Standard(players);
      expect(standard.isSetFinished()).toBeFalsy();
    });
    it("should return false when the set score is 6-5", () => {
      const players: Player[] = [new Player("Test1"), new Player("Test2")];
      players[0].setSetScore(6);
      players[1].setSetScore(5);

      const standard = new Standard(players);
      expect(standard.isSetFinished()).toBeFalsy();
    });
    it("should return true when the set score is 7-5", () => {
      const players: Player[] = [new Player("Test1"), new Player("Test2")];
      players[0].setSetScore(7);
      players[1].setSetScore(5);

      const standard = new Standard(players);
      expect(standard.isSetFinished()).toBeTruthy();
    });
  });
  describe("handlePointWin", () => {
    it("should add the score to a player when it 0-0", () => {
      const players: Player[] = [new Player("Test1"), new Player("Test2")];
      const standard = new Standard(players);
      standard.handlePointWin(players[0]);
      expect(players[0].getGameScore()).toEqual(1);
    });

    it("should add the score to a player when it Deuce", () => {
      const players: Player[] = [new Player("Test1"), new Player("Test2")];
      players[0].setGameScore(3);
      players[1].setGameScore(3);
      const standard = new Standard(players);
      standard.handlePointWin(players[1]);
      expect(players[1].getGameScore()).toEqual(4);
    });

    it("should set the score back to deuce when the non-advantage player win a point", () => {
      const players: Player[] = [new Player("Test1"), new Player("Test2")];
      players[0].setGameScore(4);
      players[1].setGameScore(3);
      const standard = new Standard(players);
      standard.handlePointWin(players[1]);
      expect(players[0].getGameScore()).toEqual(3);
      expect(players[1].getGameScore()).toEqual(3);
    });
  });
  describe("formatGameScore", () => {
    it("should return 15-30 when the the first player has won one point and the second player has won two", () => {
      const players: Player[] = [new Player("Test1"), new Player("Test2")];
      players[0].setGameScore(1);
      players[1].setGameScore(2);
      const standard = new Standard(players);
      expect(standard.formatGameScore()).toEqual("15-30");
    });
    it("should return deuce when both players have won 3 points", () => {
      const players: Player[] = [new Player("Test1"), new Player("Test2")];
      players[0].setGameScore(3);
      players[1].setGameScore(3);
      const standard = new Standard(players);
      expect(standard.formatGameScore()).toEqual("DEUCE");
    });
    it("should return advantage-40 when the first player wins a deuce point", () => {
      const players: Player[] = [new Player("Test1"), new Player("Test2")];
      players[0].setGameScore(4);
      players[1].setGameScore(3);
      const standard = new Standard(players);
      expect(standard.formatGameScore()).toEqual("ADV-40");
    });
  });
});
