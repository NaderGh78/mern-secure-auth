const EditableTodoItem = ({
  id,
  value,
  setEditTodoValue,
  editTodoHandler,
  setIsEditBtnClicked,
  setGetTodoId }) => {

  const handleSave = () => {
    const success = editTodoHandler(id, value);
    if (success) {
      // just when saving is success ,exit from edit mode
      setIsEditBtnClicked(false);
      setGetTodoId(null);
    }
  };

  /*=========================================*/

  return (
    <li className="mb-1 rounded-1">
      <input
        type="text"
        value={value}
        onChange={(e) => setEditTodoValue(e.target.value)}
        className="mb-0 edit-input"
      />
      <div className="btn-box">
        <button
          className="btn btn-primary me-2 save-btn"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </li>
  )
}

export default EditableTodoItem;