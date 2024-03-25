import { create } from "zustand";

const useStore = create((set) => ({
  todos: [],
  text: "",
  showPopup: false,
  editTodoId: null,
  addTodo: (text) =>
    set((state) => ({
      todos: [
        ...state.todos,
        {
          id: Date.now(),
          text,
          completed: false,
        },
      ],
    })),

  toggleTodo: (id) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    })),

  deleteTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),

  setText: (text) =>
    set(() => ({
      text,
    })),

  setShowPopup: (showPopup) =>
    set(() => ({
      showPopup,
    })),

  setEditTodoId: (id) =>
    set(() => ({
      editTodoId: id,
    })),

  editTodo: (id, text) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, text: text } : todo
      ),
    })),
}));

export default useStore;
