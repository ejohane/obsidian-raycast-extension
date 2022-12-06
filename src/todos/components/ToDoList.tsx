import { List } from "@raycast/api";
import { useState } from "react";
import { ToDoFilter } from "../todo-model";
import { useToDos } from "../hooks";
import { ToDoDropdown } from "./ToDoDropdown";
import { ToDoListItem } from "./ToDoListItem";

export const ToDoList = () => {
  const [filter, setFilter] = useState<ToDoFilter>(ToDoFilter.ACTIVE);
  const { isLoading, todos, load } = useToDos(filter);

  return (
    <List
      navigationTitle="To Dos"
      isLoading={isLoading}
      searchBarAccessory={<ToDoDropdown onFilterChange={(f) => setFilter(f)} />}
    >
      {todos.map((todo, i) => (
        <ToDoListItem todo={todo} key={i} onActionPerformed={load} />
      ))}
    </List>
  );
};
