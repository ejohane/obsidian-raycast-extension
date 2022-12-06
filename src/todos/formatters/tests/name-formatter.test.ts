import { nameFormatter } from "../name-formatter";

describe("nameFormatter", () => {
  describe("toString", () => {
    it("should return expected string", () => {
      const fakeName = "fake task";
      const expectedResult = "#task fake task";

      const actualResult = nameFormatter.toString(fakeName);
      expect(actualResult).toEqual(expectedResult);
    });
  });

  describe("fromString", () => {
    test.each([
      "- [ ] #task fake task",
      "- [ ] #task fake task 🔽",
      "- [ ] #task fake task 🔼",
      "- [ ] #task fake task ⏫",
      "- [ ] #task fake task 📅 2022-02-11",
      "- [ ] #task fake task ✅ 2022-02-11",
      "- [ ] #task fake task 📅 2022-02-11 ✅ 2022-02-11",
      "- [ ] #task fake task ⏫ 📅 2022-02-11 ✅ 2022-02-11",
    ])("should return expected name", (input) => {
      const expectedResult = "fake task";
      const actualResult = nameFormatter.fromString(input);
      expect(actualResult).toEqual(expectedResult);
    });
  });
});
