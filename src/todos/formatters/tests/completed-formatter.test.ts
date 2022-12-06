import { parseISO } from "date-fns";
import { completedFormatter } from "../completed-formatter";

describe("completedFormatter", () => {
  describe("toString", () => {
    it("should return empty string when date is not defined", () => {
      const expectedResult = "";
      const actualResult = completedFormatter.toString(undefined);
      expect(actualResult).toEqual(expectedResult);
    });

    it("should return expected string when date is valid", () => {
      const expectedResult = "✅ 2022-11-23";
      const fakeDate = parseISO("2022-11-23");

      const actualResult = completedFormatter.toString(fakeDate);

      expect(actualResult).toEqual(expectedResult);
    });
  });

  describe("fromString", () => {
    it("should return undefined when todo string does not contain completed date", () => {
      const fakeTodo = "- [ ] #task fake task";

      const actualResult = completedFormatter.fromString(fakeTodo);

      expect(actualResult).toBeUndefined();
    });

    it("should return expected date when todo string does contain completed date", () => {
      const expectedResult = parseISO("2022-11-23");
      const fakeTodo = "- [x] #task fake task ✅ 2022-11-23";

      const actualResult = completedFormatter.fromString(fakeTodo);

      expect(actualResult).toEqual(expectedResult);
    });
  });
});
