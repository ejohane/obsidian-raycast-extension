import { tagFormatter } from "../tag-formatter";

describe("tagFormatter", () => {
  describe("fromString", () => {
    it("should return expected tags", () => {
      const expectedResult = ["#t-home", "#fakeTag2"];
      const fakeTodo = "- [ ] #task fake todo #t-home #fakeTag2 ⏫";

      const actualResult = tagFormatter.fromString(fakeTodo);

      expect(actualResult).toEqual(expectedResult);
    });
  });
});
