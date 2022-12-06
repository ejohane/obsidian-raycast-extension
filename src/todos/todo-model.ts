export interface ToDo {
  name: string;
  priority: Priority;
  dueDate?: Date;
  completedDate?: Date;
  isDone: boolean;
  location?: Location;
  originalText?: string;
  tags: string[];
}

export interface Location {
  filePath: string;
  lineNumber: number;
  fileName: string;
}

export enum Priority {
  LOW,
  NONE,
  MEDIUM,
  HIGH,
}

export enum ToDoFilter {
  ALL = "All",
  ACTIVE = "Active",
  DUE_DATE = "Due",
}
