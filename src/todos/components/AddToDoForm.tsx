import { Action, ActionPanel, Form, showToast, Toast, useNavigation } from "@raycast/api";
import { useForm } from "@raycast/utils";
import { FC, useEffect, useState } from "react";
import { useObsidianToDo } from "../hooks";
import { Priority, ToDo } from "../todo-model";

interface ToDoForm {
  name: string;
  priority: string;
  dueDate: Date | null;
}

interface AddToDoFormProps {
  onAddComplete: () => void;
}

export const AddToDoForm: FC<AddToDoFormProps> = ({ onAddComplete }) => {
  const { pop } = useNavigation();

  const [todo, setToDo] = useState<ToDo>({
    name: "",
    isDone: false,
    priority: Priority.NONE,
    tags: [],
  });

  const { add } = useObsidianToDo(todo);

  const { values, itemProps, handleSubmit } = useForm<ToDoForm>({
    onSubmit: () => {
      add()
        .then(() => {
          showToast({
            title: "Successfully Added ToDo",
            style: Toast.Style.Success,
          });
        })
        .catch(() => {
          showToast({
            title: "Failed To Add ToDo",
            style: Toast.Style.Failure,
          });
        })
        .finally(() => {
          pop();
          onAddComplete();
        });
    },
    initialValues: {
      name: "",
      priority: Priority.NONE.toString(),
    },
  });

  useEffect(() => {
    setToDo({
      ...todo,
      ...values,
      priority: parseInt(values.priority),
      dueDate: values.dueDate || undefined,
    });
  }, [values]);

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Submit" onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.TextField title="Title" {...itemProps.name} />
      <Form.Dropdown title="Priority" {...itemProps.priority}>
        <Form.Dropdown.Item value={Priority.NONE.toString()} title={"None"} />
        <Form.Dropdown.Item value={Priority.LOW.toString()} title={"Low"} />
        <Form.Dropdown.Item value={Priority.MEDIUM.toString()} title={"Medium"} />
        <Form.Dropdown.Item value={Priority.HIGH.toString()} title={"High"} />
      </Form.Dropdown>
      <Form.DatePicker title="Due Date" {...itemProps.dueDate} />
    </Form>
  );
};
