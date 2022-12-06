import { useExec } from "@raycast/utils";
import { format } from "date-fns";
import fs from "fs";
import path from "path";
import { useEffect, useState } from "react";
import { todoFormatter } from "../formatters";
import { Location, ToDo } from "../todo-model";
import { todoService } from "../todo-service";
import { getPreferenceValues } from "@raycast/api";
import { Preferences } from "../../preferences";

export const useObsidianToDo = (todo: ToDo) => {
  const { vault } = getPreferenceValues<Preferences>();

  const openFileExec = useExec(
    "open",
    [
      `obsidian://advanced-uri?filepath=${encodeURI(todo?.location?.fileName || "")}&line=${
        todo?.location?.lineNumber
      }`,
    ],
    {
      execute: false,
    }
  );

  const markComplete = () => {
    if (!todo.location) return;
    const file = fs.readFileSync(todo.location.filePath, { encoding: "utf8" });
    const lines = file.split("\n");

    const originalToDo = todoFormatter.fromString(lines[todo.location.lineNumber]);
    originalToDo.isDone = true;
    originalToDo.completedDate = new Date();

    lines[todo.location.lineNumber] = todoFormatter.toString(originalToDo);

    const newFile = lines.reduce((val, line) => {
      return `${val}\n${line}`;
    }, "");

    fs.writeFileSync(todo.location.filePath, newFile);
  };

  const add = async () => {
    const filename = format(new Date(), "MMMM do yyyy") + ".md";
    const filepath = path.join(vault, "Daily Notes", filename);
    const todoStr = todoFormatter.toString(todo);
    return new Promise<void>((resolve, reject) => {
      fs.appendFile(filepath, "\n" + todoStr, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  };

  return {
    add,
    markComplete,
    openFile: () => openFileExec.mutate(),
  };
};
