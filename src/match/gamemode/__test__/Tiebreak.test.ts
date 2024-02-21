import Player from "../../Player";
import Tiebreak from "../Tiebreak";

describe("Tiebreak Game Mode", () => {
  describe("isGameFinished", () => {
    it("should return false when the game score is 1-2", () => {
      const players: Player[] = [new Player("Test1"), new Player("Test2")];
      players[0].setGameScore(1);
      players[1].setGameScore(2);

      const tiebreak = new Tiebreak(players);
      expect(tiebreak.isGameFinished()).toBeFalsy();
    });
    it("should return false when the game score is 6-5", () => {
      const players: Player[] = [new Player("Test1"), new Player("Test2")];
      players[0].setGameScore(5);
      players[1].setGameScore(6);

      const tiebreak = new Tiebreak(players);
      expect(tiebreak.isGameFinished()).toBeFalsy();
    });
    it("should return true when the game score is 7-5", () => {
      const players: Player[] = [new Player("Test1"), new Player("Test2")];
      players[0].setGameScore(7);
      players[1].setGameScore(5);

      const tiebreak = new Tiebreak(players);
      expect(tiebreak.isGameFinished()).toBeTruthy();
    });
    it("should return false when the game score is 7-6", () => {
      const players: Player[] = [new Player("Test1"), new Player("Test2")];
      players[0].setGameScore(7);
      players[1].setGameScore(6);

      const tiebreak = new Tiebreak(players);
      expect(tiebreak.isGameFinished()).toBeFalsy();
    });
    it("should return true when the game score is 9-7", () => {
      const players: Player[] = [new Player("Test1"), new Player("Test2")];
      players[0].setGameScore(9);
      players[1].setGameScore(7);

      const tiebreak = new Tiebreak(players);
      expect(tiebreak.isGameFinished()).toBeTruthy();
    });
  });
  describe("isSetFinished", () => {
    it("should return false when the set score is less than 7", () => {
      const players: Player[] = [new Player("Test1"), new Player("Test2")];
      players[0].setSetScore(6);
      players[1].setSetScore(5);

      const tiebreak = new Tiebreak(players);
      expect(tiebreak.isSetFinished()).toBeFalsy();
    });
    it("should return true when the set score is 7 as they won the tiebreaker", () => {
      const players: Player[] = [new Player("Test1"), new Player("Test2")];
      players[0].setSetScore(7);
      players[1].setSetScore(6);

      const tiebreak = new Tiebreak(players);
      expect(tiebreak.isSetFinished()).toBeTruthy();
    });
  });
  describe("handlePointWin", () => {
    it("should add the score to a player when it 0-0", () => {
      const players: Player[] = [new Player("Test1"), new Player("Test2")];
      const tiebreak = new Tiebreak(players);
      tiebreak.handlePointWin(players[0]);
      expect(players[0].getGameScore()).toEqual(1);
    });

    it("should add the score to a player when it 3-3", () => {
      const players: Player[] = [new Player("Test1"), new Player("Test2")];
      players[0].setGameScore(3);
      players[1].setGameScore(3);
      const tiebreak = new Tiebreak(players);
      tiebreak.handlePointWin(players[1]);
      expect(players[1].getGameScore()).toEqual(4);
    });
    it("should add the score to a player when it 6-6", () => {
      const players: Player[] = [new Player("Test1"), new Player("Test2")];
      players[0].setGameScore(6);
      players[1].setGameScore(6);
      const tiebreak = new Tiebreak(players);
      tiebreak.handlePointWin(players[1]);
      expect(players[1].getGameScore()).toEqual(7);
    });
  });
  describe("formatGameScore", () => {
    it("should return 1-2when the the first player has won one point and the second player has won two", () => {
      const players: Player[] = [new Player("Test1"), new Player("Test2")];
      players[0].setGameScore(1);
      players[1].setGameScore(2);
      const tiebreak = new Tiebreak(players);
      expect(tiebreak.formatGameScore()).toEqual("1-2");
    });
    it("should return 3-3 when both players have won 3 points", () => {
      const players: Player[] = [new Player("Test1"), new Player("Test2")];
      players[0].setGameScore(3);
      players[1].setGameScore(3);
      const tiebreak = new Tiebreak(players);
      expect(tiebreak.formatGameScore()).toEqual("3-3");
    });
  });
});
