const TodoForm = ({
  addNewTodoHandler,
  inputRef,
  todoText,
  setTodoText,
  emptyAllTodosHandler }) => {

  return (
    <form onSubmit={addNewTodoHandler}>
      <input
        type="text"
        ref={inputRef}
        placeholder="Add a task ..."
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
      />
      <button
        className="btn btn-success text-white rounded-1 px-3"
      >Add Task</button>
      <button
        className="btn btn-danger text-white rounded-1 px-3"
        onClick={emptyAllTodosHandler}
      >Delete All</button>
    </form>
  )
}

export default TodoForm;