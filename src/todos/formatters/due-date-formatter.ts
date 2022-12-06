import { format, parseISO } from "date-fns";
import { Formatter } from ".";

const toString = (date: Date | undefined): string => {
  if (!date) return "";

  return `📅 ${format(date, "yyyy-MM-dd")}`;
};

const fromString = (todoStr: string): Date | undefined => {
  const regex = /📅 \d{4}-\d{2}-\d{2}/;

  const result = regex.exec(todoStr);

  if (!result) return undefined;

  const dateStr = result[0].replace("📅", "").trim();

  return parseISO(dateStr);
};

export const dueDateFormatter: Formatter<Date | undefined> = {
  toString,
  fromString,
};
