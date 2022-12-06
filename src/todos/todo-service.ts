import { todoFormatter } from "./formatters";
import { ToDo, ToDoFilter } from "./todo-model";
export const todoService = {
  parseToDos: (input?: string) => {
    if (!input) return [];

    const lines = input.split("\n");

    const todos = lines.map((line) => todoFormatter.fromString(line)).sort((a, b) => b.priority - a.priority);

    const activeToDos = todos.filter((todo) => !todo.isDone);
    const completedToDos = todos.filter((todo) => todo.isDone);

    return [...activeToDos, ...completedToDos];
  },
  filterToDos: (todos: ToDo[], filter: ToDoFilter): ToDo[] => {
    switch (filter) {
      case ToDoFilter.ALL:
        return todos;
      case ToDoFilter.ACTIVE:
        return todos.filter((todo) => !todo.isDone);
      case ToDoFilter.DUE_DATE:
        return todos.filter((todo) => !todo.isDone && !!todo.dueDate);
    }
  },
};
