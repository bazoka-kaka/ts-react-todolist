import Button from "./Button";
import { Todo } from "../hooks/useTodos";

const TodoList: React.FunctionComponent<{
  todos: Todo[];
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
}> = ({ todos, onDelete, onToggle }) => (
  <ul>
    {todos.map((todo) => (
      <li key={todo.id}>
        <span
          style={{
            color: todo.complete ? "#ccc" : "#fff",
            cursor: "pointer",
            userSelect: "none",
          }}
          onClick={() => onToggle(todo.id)}
        >
          {todo.text}
        </span>{" "}
        <Button onClick={() => onDelete(todo.id)}>Delete</Button>
      </li>
    ))}
  </ul>
);

export default TodoList;
