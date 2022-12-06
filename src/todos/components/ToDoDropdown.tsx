
import { List } from "@raycast/api";
import { FC } from "react";
import { ToDoFilter } from "../todo-model";

interface ToDoDropdownProps {
  onFilterChange: (filter: ToDoFilter) => void;
}

export const ToDoDropdown: FC<ToDoDropdownProps> = ({ onFilterChange }) => {
  return (
    <List.Dropdown
      tooltip="filter todos"
      onChange={(val) => onFilterChange(val as ToDoFilter)}
      defaultValue={ToDoFilter.ACTIVE}
    >
      <List.Dropdown.Item title={"All"} value={ToDoFilter.ALL} />
      <List.Dropdown.Item title={"Active"} value={ToDoFilter.ACTIVE} />
      <List.Dropdown.Item title={"Due"} value={ToDoFilter.DUE_DATE} />
    </List.Dropdown>
  );
};

 