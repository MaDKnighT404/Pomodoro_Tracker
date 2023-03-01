export type TodoEvent = React.FormEvent<HTMLFormElement> | React.MouseEvent<SVGElement>;

export interface ITodo {
  text: string;
  isCompleted: boolean;
  id: string;
}

export interface ITodoItem {
  todo: ITodo;
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
}

export interface ITodoListProps {
  todos: ITodo[];
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
}

export interface ITodoAdd {
  addTodo: (id: string) => void;
}
