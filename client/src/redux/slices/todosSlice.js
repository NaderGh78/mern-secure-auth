import { createSlice } from "@reduxjs/toolkit";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const todosSlice = createSlice({
  name: "todos",
  initialState: {
    todos: localStorage.getItem("Todos") ?
      JSON.parse(localStorage.getItem("Todos")) : [],
    todo: null
  },
  reducers: {

    // add new todo
    addNewTodo(state, action) {
      state.todos.push({ id: Date.now(), text: action.payload });
      localStorage.setItem("Todos", JSON.stringify(state.todos))
    },

    /*==================*/

    // edit single todo
    editSingleTodo(state, action) {
      const { id, text } = action.payload;

      const isFindTodo = state.todos.find(e => e.id === id);
      if (isFindTodo) {
        isFindTodo.text = text;
      }

      localStorage.setItem("Todos", JSON.stringify(state.todos));

      // state.todos = state.todos.map(e =>
      //   e.id === id ? { ...e, text } : e
      // );
      // localStorage.setItem("Todos", JSON.stringify(state.todos)); 
    },

    /*==================*/

    // remove single todo
    removeTodo(state, action) {
      const id = action.payload;

      state.todos = state.todos.filter(e => e.id !== id);
      localStorage.setItem("Todos", JSON.stringify(state.todos));
    },

    /*==================*/

    // remove all todos
    emptyAllTodos(state) {
      state.todos = [];
      localStorage.setItem("Todos", JSON.stringify([]));
    },

    /*==================*/

    // this way in order to get the single todo
    // getSingletodo(state, action) {
    //   const id = action.payload;
    //   state.todo = state.todos.find(e => e.id === id);
    // }

  }
});

/*===========================================*/

const todosReducer = todosSlice.reducer;
export { todosReducer }
export const {
  addNewTodo,
  editSingleTodo,
  removeTodo,
  emptyAllTodos,
  // getSingletodo
} = todosSlice.actions;