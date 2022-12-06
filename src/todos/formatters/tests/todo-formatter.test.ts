import { todoFormatter } from "../todo-formatter";
import { Priority, ToDo } from "../../todo-model";
import { locationFormatter } from "../location-formatter";
import { parseISO } from "date-fns";

describe("todoFormatter", () => {
  describe("toString", () => {
    it("should return expected string for completed todo", () => {
      const fakeTodo: ToDo = {
        name: "fake todo",
        priority: Priority.LOW,
        isDone: true,
        completedDate: parseISO("2022-11-23"),
        dueDate: parseISO("2022-10-15"),
        location: {
          fileName: "fakeTodo",
          filePath: "/",
          lineNumber: 0,
        },
        originalText: "fake original text",
        tags: [],
      };

      const expectedResult = "- [x] #task fake todo 🔽 📅 2022-10-15 ✅ 2022-11-23";

      const actualResult = todoFormatter.toString(fakeTodo);

      expect(actualResult).toEqual(expectedResult);
    });

    it("should return expected string for incomplete todo", () => {
      const fakeTodo: ToDo = {
        name: "fake todo",
        priority: Priority.LOW,
        isDone: false,
        dueDate: parseISO("2022-10-15"),
        location: {
          fileName: "fakeTodo",
          filePath: "/",
          lineNumber: 0,
        },
        originalText: "fake original text",
        tags: [],
      };

      const expectedResult = "- [ ] #task fake todo 🔽 📅 2022-10-15";

      const actualResult = todoFormatter.toString(fakeTodo);

      expect(actualResult).toEqual(expectedResult);
    });
  });

  describe("fromString", () => {
    it("should return expected ToDo", () => {
      const todoStr = "- [x] #task fake todo 🔽 📅 2022-10-15 ✅ 2022-11-23";

      const expectedResult: ToDo = {
        name: "fake todo",
        priority: Priority.LOW,
        isDone: true,
        completedDate: parseISO("2022-11-23"),
        dueDate: parseISO("2022-10-15"),
        location: {
          fileName: "fakeTodo",
          filePath: "/",
          lineNumber: 0,
        },
        originalText: todoStr,
        tags: [],
      };

      jest.spyOn(locationFormatter, "fromString").mockReturnValue({
        fileName: "fakeTodo",
        filePath: "/",
        lineNumber: 0,
      });

      const actualResult = todoFormatter.fromString(todoStr);

      expect(actualResult).toEqual(expectedResult);
    });
  });
});
