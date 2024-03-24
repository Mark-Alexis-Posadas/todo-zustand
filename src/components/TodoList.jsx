import { useState } from "react";
import useStore from "../useStore";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const todos = useStore((state) => state.todos);
  const addTodo = useStore((state) => state.addTodo);

  const [text, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() === "") {
      alert("Add title");
      return; // Stop the function execution if the input is empty
    }

    addTodo(text);
    setText("");
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
            Add Todo
          </button>
        </div>
      </form>
      <ul>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </>
  );
}
