import useStore from "../useStore";

export default function TodoItem({ todo, onEdit }) {
  const deleteTodo = useStore((state) => state.deleteTodo);
  const toggleTodo = useStore((state) => state.toggleTodo);

  const handleEdit = () => {
    onEdit(todo.id, todo.text);
  };

  return (
    <li className="mb-2 rounded bg-slate-50 shadow-md p-2 flex items-center justify-between">
      <input
        type="checkbox"
        className="bg-slate-50 w-10"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
      />
      <span
        className="mr-auto"
        style={{ textDecoration: todo.completed ? "line-through " : "none" }}
      >
        {todo.text}
      </span>
      <div className="flex items-center">
        <button
          onClick={handleEdit}
          className="text-white rounded p-2 bg-blue-700"
        >
          Edit
        </button>
        <button
          onClick={() => deleteTodo(todo.id)}
          className="bg-red-600 text-white rounded p-2 ml-3"
        >
          Delete
        </button>
      </div>
    </li>
  );
}
