import { useRef } from "react";
import useTodos from "./hooks/useTodos";
import Button from "./components/Button";
import TodoList from "./components/TodoList";

const App = () => {
  const { todos, handleCreateTodo, handleRemoveTodo, handleToggleTodo } =
    useTodos();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    if (inputRef.current) {
      handleCreateTodo(inputRef.current.value);
      inputRef.current.value = "";
    }
  };

  return (
    <div
      style={{
        backgroundColor: "black",
        color: "white",
        height: "100vh",
        padding: "20px 40px",
      }}
    >
      <h1>Todo List App</h1>
      <input type="text" placeholder="Enter todo text here" ref={inputRef} />
      <Button onClick={handleSubmit}>Add</Button>
      <TodoList
        todos={todos}
        onDelete={handleRemoveTodo}
        onToggle={handleToggleTodo}
      />
    </div>
  );
};

export default App;
