import React, { useCallback, useReducer, useRef } from "react";
import "./App.css";

const Header: React.FunctionComponent<{ title: string }> = ({ title }) => {
  return <h2 className="text-4xl font-bold text-blue-400">{title}</h2>;
};

interface Todo {
  id: number;
  done: boolean;
  text: string;
}

type ActionType =
  | { type: "ADD"; text: string }
  | { type: "REMOVE"; id: number }
  | { type: "TOGGLE"; id: number };

function reducer(todos: Todo[], action: ActionType) {
  switch (action.type) {
    case "ADD":
      return [
        ...todos,
        {
          id: todos.length,
          text: action.text,
          done: false,
        },
      ];
    case "REMOVE":
      return todos.filter((todo) => todo.id !== action.id);
    case "TOGGLE":
      return todos.map((todo) => {
        if (todo.id === action.id) {
          return { ...todo, done: !todo.done };
        }
        return todo;
      });
    default:
      throw new Error();
  }
}

function App() {
  const [todos, dispatch] = useReducer(reducer, []);

  const newTodoRef = useRef<HTMLInputElement>(null);

  const onAddTodo = useCallback(() => {
    if (newTodoRef.current) {
      dispatch({
        type: "ADD",
        text: newTodoRef.current.value,
      });
      newTodoRef.current.value = "";
    }
  }, []);

  return (
    <div className="container">
      <div className="px-80">
        <Header title="Todos" />
        <div className="my-3">
          {todos.map((todo) => {
            return (
              <div className="my-1" key={todo.id}>
                <input
                  type="checkbox"
                  className={` bg-blue-500 mr-3 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}
                  onClick={() =>
                    dispatch({
                      type: "TOGGLE",
                      id: todo.id,
                    })
                  }
                />
                <span
                  className={`${
                    todo.done && "line-through text-red-500"
                  }  text-3xl mr-3`}
                >
                  {todo.text}
                </span>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                  onClick={() =>
                    dispatch({
                      type: "REMOVE",
                      id: todo.id,
                    })
                  }
                >
                  Remove
                </button>
              </div>
            );
          })}
        </div>
        <div>
          <input
            className="
          mt-3
          form-control
          block
          w-full
          px-4
          py-2
          text-xl
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            type="text"
            ref={newTodoRef}
          />
          <button
            className="mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={onAddTodo}
          >
            Add Todo
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
