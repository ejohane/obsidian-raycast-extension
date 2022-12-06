import { Formatter } from ".";
import { ToDo } from "../todo-model";
import { completedFormatter } from "./completed-formatter";
import { dueDateFormatter } from "./due-date-formatter";
import { locationFormatter } from "./location-formatter";
import { nameFormatter } from "./name-formatter";
import { priorityFormatter } from "./priority-formatter";
import { tagFormatter } from "./tag-formatter";

const toString = (todo: ToDo): string => {
  const priority = priorityFormatter.toString(todo.priority);
  const name = nameFormatter.toString(todo.name);
  const completedDate = completedFormatter.toString(todo.completedDate);
  const dueDate = dueDateFormatter.toString(todo.dueDate);
  const tags = tagFormatter.toString(todo.tags);

  let todoStr = todo.isDone ? "- [x]" : "- [ ]";

  todoStr = appendStr(todoStr, name);
  todoStr = appendStr(todoStr, tags);
  todoStr = appendStr(todoStr, priority);
  todoStr = appendStr(todoStr, dueDate);
  todoStr = appendStr(todoStr, completedDate);

  return todoStr.trim();
};

const fromString = (input: string): ToDo => {
  const name = nameFormatter.fromString(input);
  const completedDate = completedFormatter.fromString(input);
  const dueDate = dueDateFormatter.fromString(input);
  const priority = priorityFormatter.fromString(input);
  const location = locationFormatter.fromString(input);
  const tags = tagFormatter.fromString(input);

  return {
    name,
    completedDate,
    isDone: !!completedDate,
    dueDate,
    priority,
    location,
    originalText: input,
    tags,
  };
};

const appendStr = (current: string, append: string) => {
  return append === "" ? current : `${current} ${append}`;
};

export const todoFormatter: Formatter<ToDo> = {
  toString,
  fromString,
};
