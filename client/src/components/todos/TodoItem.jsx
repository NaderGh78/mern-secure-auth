const TodoItem = ({
  id,
  text,
  setIsEditBtnClicked,
  setGetTodoId,
  setEditTodoValue,
  removeTodoHandler }) => {

  return (
    <li className="mb-1 rounded-1">
      <p className="mb-0 text-white">{text}</p>
      <div className="btn-box">
        <button
          className="btn btn-primary me-2"
          onClick={() => {
            setIsEditBtnClicked(true);
            setGetTodoId(id);
            setEditTodoValue(text);
          }}
        >
          Edit
        </button>
        <button
          className="btn btn-danger"
          onClick={() => removeTodoHandler(id)}
        >
          Delete
        </button>
      </div>
    </li>
  )
}

export default TodoItem;