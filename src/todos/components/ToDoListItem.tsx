import { List, Icon } from "@raycast/api";
import { FC } from "react";
import { tagFormatter } from "../formatters/tag-formatter";
import { ToDo } from "../todo-model";
import ToDoActionPanel from "./ToDoActionPanel";

interface ToDoListItemProps {
  todo: ToDo;
  onActionPerformed: () => Promise<void>;
}

export const ToDoListItem: FC<ToDoListItemProps> = ({ todo, onActionPerformed }) => {
  return (
    <List.Item
      title={todo.name}
      icon={todo.isDone ? Icon.Checkmark : Icon.Circle}
      accessories={[
        {
          date: todo.dueDate ? new Date(todo.dueDate) : undefined,
          icon: todo.dueDate ? Icon.Calendar : undefined,
        },
      ]}
      keywords={todo.tags}
      subtitle={tagFormatter.toString(todo.tags)}
      actions={<ToDoActionPanel todo={todo} onActionPerformed={onActionPerformed} />}
    />
  );
};
