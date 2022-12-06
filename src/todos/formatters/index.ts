export { todoFormatter } from "./todo-formatter";

export type Formatter<T> = {
  toString: (input: T) => string;
  fromString: (input: string) => T;
};
