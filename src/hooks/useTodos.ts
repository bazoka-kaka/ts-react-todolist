import { useReducer } from "react";

export interface Todo {
  id: number;
  text: string;
  complete: boolean;
}

type ActionType =
  | {
      type: "ADD";
      text: string;
    }
  | {
      type: "REMOVE";
      id: number;
    }
  | {
      type: "TOGGLE";
      id: number;
    };

const reducer = (state: Todo[], action: ActionType) => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        { id: state.length, text: action.text, complete: false },
      ];
    case "REMOVE":
      return state.filter((todo) => todo.id !== action.id);
    case "TOGGLE":
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, complete: !todo.complete } : todo
      );
    default:
      throw new Error();
  }
};

const useTodos = () => {
  const [todos, dispatch] = useReducer(reducer, []);

  const handleCreateTodo = (text: string) => {
    dispatch({ type: "ADD", text });
  };

  const handleRemoveTodo = (id: number) => dispatch({ type: "REMOVE", id });
  const handleToggleTodo = (id: number) => dispatch({ type: "TOGGLE", id });

  return { todos, handleCreateTodo, handleRemoveTodo, handleToggleTodo };
};

export default useTodos;
