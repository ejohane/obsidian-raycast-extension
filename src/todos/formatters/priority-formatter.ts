import { Formatter } from ".";
import { Priority } from "../todo-model";

const toString = (priority: Priority): string => {
  switch (priority) {
    case Priority.LOW:
      return "🔽";
    case Priority.MEDIUM:
      return "🔼";
    case Priority.HIGH:
      return "⏫";
    default:
      return "";
  }
};

const fromString = (priorityStr: string): Priority => {
  if (priorityStr.indexOf("⏫") > 0) return Priority.HIGH;
  if (priorityStr.indexOf("🔼") > 0) return Priority.MEDIUM;
  if (priorityStr.indexOf("🔽") > 0) return Priority.LOW;
  return Priority.NONE;
};

export const priorityFormatter: Formatter<Priority> = {
  toString,
  fromString,
};
