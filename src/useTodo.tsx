import { useReducer, useCallback } from "react";

interface Todo {
  id: number;
  text: string;
  complete: boolean;
}

type ActionType =
  | { type: "ADD"; text: string }
  | { type: "REMOVE"; id: number };

const reducer = (state: Todo[], action: ActionType) => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        { id: state.length, text: action.text, complete: false },
      ];
    case "REMOVE":
      return state.filter((item) => item.id !== action.id);
    default:
      throw new Error();
  }
};

const useTodo = (
  init: Todo[]
): {
  todos: Todo[];
  addTodo: (text: string) => void;
  removeTodo: (id: number) => void;
} => {
  const [todos, dispatch] = useReducer(reducer, init);

  const removeTodo = useCallback((id: number) => {
    dispatch({ type: "REMOVE", id });
  }, []);

  const addTodo = useCallback((text: string) => {
    dispatch({ type: "ADD", text });
  }, []);

  return { todos, removeTodo, addTodo };
};

export default useTodo;
