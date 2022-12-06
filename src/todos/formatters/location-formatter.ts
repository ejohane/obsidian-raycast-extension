import { Formatter } from ".";
import { Location } from "../todo-model";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const toString = (location: Location) => "";

export const fromString = (input: string): Location => {
  const [filePath, lineNumber] = input.split(":");
  const fileName = filePath.substring(filePath.lastIndexOf("/"));
  return {
    filePath: filePath.trim(),
    lineNumber: parseInt(lineNumber) - 1,
    fileName,
  };
};

export const locationFormatter: Formatter<Location> = {
  toString,
  fromString,
};
