import { format, parseISO } from "date-fns";
import { Formatter } from ".";

const toString = (completedDate: Date | undefined): string => {
  if (!completedDate) return "";

  return `✅ ${format(completedDate, "yyyy-MM-dd")}`;
};

const fromString = (input: string): Date | undefined => {
  const regex = /✅ \d{4}-\d{2}-\d{2}/;

  const result = regex.exec(input);

  if (!result) return undefined;

  const dateStr = result[0].replace("✅ ", "").trim();

  return parseISO(dateStr);
};

export const completedFormatter: Formatter<Date | undefined> = {
  toString,
  fromString,
};
