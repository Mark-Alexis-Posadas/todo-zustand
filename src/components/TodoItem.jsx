import useStore from "../useStore";
export default function TodoItem({ todo }) {
  const deleteTodo = useStore((state) => state.deleteTodo);
  const toggleTodo = useStore((state) => state.toggleTodo);
  return (
    <li className="border border-slate-300 p-2">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
      />
      <span
        style={{ textDecoration: todo.completed ? "line-through" : "none" }}
      >
        {todo.text}
      </span>
      <button onClick={() => deleteTodo(todo.id)}>Delete</button>
    </li>
  );
}
