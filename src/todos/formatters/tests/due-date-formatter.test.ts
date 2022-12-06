import { parseISO } from "date-fns";
import { dueDateFormatter } from "../due-date-formatter";

describe("dueDateFormatter", () => {
  describe("toString", () => {
    it("shuold return expected string when date is defined", () => {
      const expectedResult = "📅 2022-11-27";

      const input = parseISO("2022-11-27");

      const actualResult = dueDateFormatter.toString(input);

      expect(actualResult).toEqual(expectedResult);
    });

    it("should return empty string when date is undefined", () => {
      const expectedResult = "";

      const actualResult = dueDateFormatter.toString(undefined);

      expect(actualResult).toEqual(expectedResult);
    });
  });

  describe("fromString", () => {
    it("should return expected date when todo contains due date", () => {
      const todoStr = "- [ ] #task test task 📅 2022-11-27";

      const expectedResult = parseISO("2022-11-27");

      const actualResult = dueDateFormatter.fromString(todoStr);

      expect(actualResult).toEqual(expectedResult);
    });

    it("should return undefined when todo does not have due date", () => {
      const todoStr = "- [ ] #task test task";

      const actualResult = dueDateFormatter.fromString(todoStr);

      expect(actualResult).toBeUndefined();
    });
  });
});
