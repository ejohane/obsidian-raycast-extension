import { Formatter } from ".";
import { tagFormatter } from "./tag-formatter";

const endKeys = ["🔽", "🔼", "⏫", "📅", "✅"];

const toString = (name: string): string => {
  return `#task ${name}`;
};

const fromString = (input: string): string => {
  let endIndex = undefined;
  endKeys.every((key) => {
    const i = input.indexOf(key);
    endIndex = i < 0 ? undefined : i;
    return i < 0;
  });

  const startIndex = input.indexOf("#task") + 6;

  let name = input.substring(startIndex, endIndex).trim();

  const tags = tagFormatter.fromString(input);
  tags.forEach((tag) => (name = name.replace(tag, "")));

  return name;
};

export const nameFormatter: Formatter<string> = {
  toString,
  fromString,
};
