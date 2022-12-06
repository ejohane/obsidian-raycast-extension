import { Formatter } from ".";

const toString = (tags: string[]): string =>
  tags
    .reduce((prev, curr) => {
      return `${prev} ${curr}`;
    }, "")
    .trim();

const fromString = (input: string): string[] => {
  const regex = /#[a-zA-Z0-9_-]+/g;

  const matches = [];

  let result = regex.exec(input);

  if (!result) return [];

  while (result && result.length > 0) {
    matches.push(result[0]);
    result = regex.exec(input);
  }

  return matches.filter((r) => r !== "#task");
};

export const tagFormatter: Formatter<string[]> = {
  toString,
  fromString,
};
