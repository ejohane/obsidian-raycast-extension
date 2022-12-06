import { getPreferenceValues } from "@raycast/api";
import { useExec } from "@raycast/utils";
import { useEffect, useState } from "react";
import { Preferences } from "../../preferences";
import { ToDo, ToDoFilter } from "../todo-model";
import { todoService } from "../todo-service";

export const useToDos = (filter: ToDoFilter) => {
  const { vault } = getPreferenceValues<Preferences>();
  const [todos, setToDos] = useState<ToDo[]>([]);
  const [filteredToDos, setFilteredToDos] = useState<ToDo[]>([]);

  const { isLoading, data, mutate } = useExec(
    `find "${vault}" -type f -not -path '*/.obsidian/*' -print0 | xargs -0 grep "#task" -ni`,
    {
      shell: true,
    }
  );

  useEffect(() => {
    setToDos(todoService.parseToDos(data));
  }, [data]);

  useEffect(() => {
    setFilteredToDos(todoService.filterToDos(todos, filter));
  }, [todos, filter]);

  const load = (): Promise<void> => mutate();

  return {
    isLoading,
    load,
    todos: filteredToDos,
  };
};
