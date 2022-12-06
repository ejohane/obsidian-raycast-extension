import { Action, ActionPanel, Icon, showToast, Toast } from "@raycast/api";
import { FC } from "react";
import { AddToDoForm } from "./AddToDoForm";
import { useObsidianToDo } from "../hooks";
import { ToDo } from "../todo-model";

interface ToDoActionPanelProps {
  todo: ToDo;
  onActionPerformed: () => Promise<void>;
}

const ToDoActionPanel: FC<ToDoActionPanelProps> = ({ todo, onActionPerformed }) => {
  const { openFile, markComplete } = useObsidianToDo(todo);

  const handleComplete = () => {
    markComplete();
    showToast({
      title: "To Do Completed!",
      style: Toast.Style.Success,
    });
    onActionPerformed();
  };

  const handleOpen = () => {
    openFile();
    onActionPerformed();
  };

  return (
    <ActionPanel>
      {!todo.isDone && <Action title="Mark Completed" onAction={handleComplete} />}
      <Action title="Open in Obsidian" onAction={handleOpen} shortcut={{ modifiers: ["cmd"], key: "o" }} />
      <Action.Push
        title="Create New To Do"
        target={<AddToDoForm onAddComplete={onActionPerformed} />}
        shortcut={{ modifiers: ["cmd"], key: "t" }}
        icon={Icon.PlusCircle}
      />
    </ActionPanel>
  );
};

export default ToDoActionPanel;
