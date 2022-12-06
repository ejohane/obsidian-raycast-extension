import { Priority } from "../../todo-model";
import { priorityFormatter } from "../priority-formatter";

describe("priorityFormatter", () => {
  describe("toString", () => {
    test.each([
      {
        priority: Priority.HIGH,
        expectedResult: "⏫",
      },
      {
        priority: Priority.LOW,
        expectedResult: "🔽",
      },
      {
        priority: Priority.MEDIUM,
        expectedResult: "🔼",
      },
      {
        priority: Priority.NONE,
        expectedResult: "",
      },
    ])("should return expected priority string", ({ priority, expectedResult }) => {
      const actualResult = priorityFormatter.toString(priority);
      expect(actualResult).toEqual(expectedResult);
    });
  });

  describe("fromString", () => {
    test.each([
      {
        expectedResult: Priority.HIGH,
        input: "- [ ] #task test task ⏫ 📅 2022-11-27",
      },
      {
        expectedResult: Priority.MEDIUM,
        input: "- [ ] #task test task 🔼 📅 2022-11-27",
      },
      {
        expectedResult: Priority.LOW,
        input: "- [ ] #task test task 🔽 📅 2022-11-27",
      },
      {
        expectedResult: Priority.NONE,
        input: "- [ ] #task test task 📅 2022-11-27",
      },
    ])("should return expected priority string", ({ input, expectedResult }) => {
      const actualResult = priorityFormatter.fromString(input);
      expect(actualResult).toEqual(expectedResult);
    });
  });
});
