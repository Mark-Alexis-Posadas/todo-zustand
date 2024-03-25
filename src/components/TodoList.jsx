import useStore from "../useStore";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const todos = useStore((state) => state.todos);
  const addTodo = useStore((state) => state.addTodo);
  const text = useStore((state) => state.text);
  const setText = useStore((state) => state.setText);
  const showPopup = useStore((state) => state.showPopup);
  const setShowPopup = useStore((state) => state.setShowPopup);
  const editTodo = useStore((state) => state.editTodo);
  const setEditTodoId = useStore((state) => state.setEditTodoId);
  const editTodoId = useStore((state) => state.editTodoId);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() === "") {
      setShowPopup(true);
      return;
    }

    if (editTodoId !== null) {
      editTodo(editTodoId, text);
      setEditTodoId(null);
    } else {
      addTodo(text);
    }
    setText("");
  };

  const handleEditClick = (id, text) => {
    setText(text);
    setEditTodoId(id);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="mt-10">
        <div className="flex items-center justify-center">
          <input
            className="shadow-md bg-slate-50 rounded p-2"
            type="text"
            placeholder="add todo..."
            value={text}
            onChange={handleChange}
          />
          <button type="submit" className="bg-green-500 rounded p-2 text-white">
            {editTodoId !== null ? "Save" : "Add Todo"}
          </button>
        </div>
      </form>
      <ul>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onEdit={handleEditClick} />
        ))}
      </ul>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>Please add a todo.</p>
            <button onClick={closePopup}>OK</button>
          </div>
        </div>
      )}
    </>
  );
}
