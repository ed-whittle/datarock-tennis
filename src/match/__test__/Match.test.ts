import Match from "../Match";
import Standard from "../gamemode/Standard";

jest.mock("../gamemode/Standard");

describe("Match", () => {
  describe("constructor", () => {
    it("should initialise the Match instance correctly", () => {
      const match = new Match("Test1", "Test2");
      expect(match.pointWonBy).toBeDefined();
    });
  });
  describe("pointWonBy", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    it("should process the pointWonBy successfully for the first point", () => {
      // Mocks
      console.log = jest.fn();
      Standard.prototype.handlePointWin = jest.fn();
      Standard.prototype.isGameFinished = jest.fn();
      Standard.prototype.formatGameScore = jest.fn().mockReturnValue("15-0");
      Standard.prototype.isSetFinished = jest.fn();

      // Execute
      const match = new Match("Test1", "Test2");
      match.pointWonBy("Test1");

      // Assert
      expect(Standard.prototype.handlePointWin).toHaveBeenCalled();
      expect(Standard.prototype.isGameFinished).toHaveBeenCalled();
      expect(Standard.prototype.isSetFinished).not.toHaveBeenCalled();
    });
    it("should handle the end of a game", () => {
      // Mocks
      console.log = jest.fn();
      Standard.prototype.handlePointWin = jest.fn();
      Standard.prototype.isGameFinished = jest.fn().mockReturnValue(true);
      Standard.prototype.isSetFinished = jest.fn();

      // Execute
      const match = new Match("Test1", "Test2");
      match.pointWonBy("Test1");

      // Assert
      expect(Standard.prototype.handlePointWin).toHaveBeenCalled();
      expect(Standard.prototype.isGameFinished).toHaveBeenCalled();
      expect(Standard.prototype.isSetFinished).toHaveBeenCalled();
      expect(console.log).toHaveBeenCalledWith("Game Test1!");
    });

    it("should handle the end of a set", () => {
      // Mocks
      console.log = jest.fn();
      Standard.prototype.handlePointWin = jest.fn();
      Standard.prototype.isGameFinished = jest.fn().mockReturnValue(true);
      Standard.prototype.isSetFinished = jest.fn().mockReturnValue(true);

      // Execute
      const match = new Match("Test1", "Test2");
      match.pointWonBy("Test1");

      // Assert
      expect(Standard.prototype.handlePointWin).toHaveBeenCalled();
      expect(Standard.prototype.isGameFinished).toHaveBeenCalled();
      expect(Standard.prototype.isSetFinished).toHaveBeenCalled();
      expect(console.log).toHaveBeenCalledWith("Game Test1!");
      expect(console.log).toHaveBeenCalledWith("Set Test1!");
    });
    it('should handle a tiebreaker', () => {
      // Mocks
      console.log = jest.fn();
      Standard.prototype.handlePointWin = jest.fn();
      Standard.prototype.isGameFinished = jest.fn().mockReturnValue(true);
      Standard.prototype.isSetFinished = jest.fn().mockReturnValue(true);
    })
    it("should throw an error when an incorrect name is passed in", () => {
      const match = new Match("Test1", "Test2");
      expect(() => {
        match.pointWonBy("Test3");
      }).toThrow(Error("Invalid Player Name"));
    });
  });
  describe("score", () => {
    it("should call the format game score function", () => {
      const match = new Match("Test1", "Test2");
      Standard.prototype.formatGameScore = jest.fn();

      match.score();
      expect(Standard.prototype.formatGameScore).toHaveBeenCalled();
    });
  });
});
