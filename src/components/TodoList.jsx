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
  const editFormStyle = useStore((state) => state.editFormStyle);
  const setEditFormStyle = useStore((state) => state.setEditFormStyle);

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
      setEditFormStyle(null);
    } else {
      addTodo(text);
    }
    setText("");
  };

  const handleEditClick = (id, text) => {
    setText(text);
    setEditTodoId(id);
    setEditFormStyle({
      width: "100%",
      height: "100%",
      overflow: "auto",
      position: "fixed",
      zIndex: 2,
      backgroundColor: "rgba(0, 0, 0, 0.4)",
      top: 0,
      left: 0,
      bottom: 0,
    });
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="mt-10">
        <div style={editFormStyle}>
          <div className="flex items-center justify-center mt-20">
            <input
              className="shadow-md bg-slate-50 rounded p-2 mr-3"
              type="text"
              placeholder="add todo..."
              value={text}
              onChange={handleChange}
            />
            <button
              type="submit"
              className="bg-green-500 rounded p-2 text-white"
            >
              {editTodoId !== null ? "Save" : "Add Todo"}
            </button>
          </div>
        </div>
      </form>
      <ul className="mt-4">
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
