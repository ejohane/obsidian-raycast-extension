import { Action, ActionPanel, Form, showToast, Toast, useNavigation } from "@raycast/api";
import { useExec } from "@raycast/utils";
import { useEffect, useState } from "react";

const BASE_URI = "obsidian://advanced-uri?daily=true&mode=append";

interface DailyNoteForm {
  heading: string;
  note: string;
}

export default function Command() {
  const { pop } = useNavigation();
  const [uri, setUri] = useState<string>("");
  const { mutate } = useExec("open", ["--background", uri], {
    execute: false,
  });

  const handleSubmit = async (form: DailyNoteForm) => {
    if (!form.note) return;

    const lines = form.note.trim().split("\n");
    const note = lines
      .reduce((curr, line) => {
        if (!line) return curr;
        if (line.startsWith("*")) return curr + "\n" + line;
        return curr + "\n * " + line;
      }, "")
      .replace("\n", "");

    setUri(`${BASE_URI}&heading=${form.heading}&data=${encodeURI(note)}`);
  };

  useEffect(() => {
    if (!uri) return;
    mutate()
      .then(() => {
        showToast({
          title: "add note",
          message: "success",
          style: Toast.Style.Success,
        });
      })
      .catch(() => {
        showToast({
          title: "add note",
          message: "fail",
          style: Toast.Style.Failure,
        });
      });

    pop();
  }, [uri]);

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Submit" onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.TextField id="heading" defaultValue={"Notes"} title="Section" />
      <Form.TextArea id="note" autoFocus enableMarkdown title="Note" />
    </Form>
  );
}
