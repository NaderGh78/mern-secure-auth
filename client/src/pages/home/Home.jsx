import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewTodo, editSingleTodo, emptyAllTodos, removeTodo } from "../../redux/slices/todosSlice";
import TodoItem from "../../components/todos/TodoItem";
import EditableTodoItem from "../../components/todos/EditableTodoItem";
import { TodoForm } from "../../allPagesPaths";
import swal from 'sweetalert';
import { toast } from "react-toastify";

/*=========================================*/
/*=========================================*/
/*=========================================*/

const Home = () => {

  const dispatch = useDispatch();
  const { todos, todo } = useSelector(state => state.todos);
  const [todoText, setTodoText] = useState("");
  const [isEditBtnClicked, setIsEditBtnClicked] = useState(false);
  const [editTodoValue, setEditTodoValue] = useState("");
  const [getTodoId, setGetTodoId] = useState("");

  /*=========================================*/

  // useEffect(() => { 
  //   dispatch(getSingletodo(getTodoId))
  // }, [getTodoId]);

  /*=========================================*/

  // input focus
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  /*=========================================*/

  // add new todo handler
  const addNewTodoHandler = (e) => {
    e.preventDefault();

    // some validate
    if (todoText.trim() === "") return toast.error("Please add something!");
    if (todoText.length < 7) return toast.error("Todo should be more than 7 characters!");
    if (todos.some(e => e.text.trim() === todoText.trim())) return toast.error("Todo already exists!");

    dispatch(addNewTodo(todoText));
    setTodoText("");
  }

  /*=========================================*/

  // empty all todos
  const emptyAllTodosHandler = (e) => {
    e.preventDefault();

    if (!todos.length) return toast.error("Already no todo yet!");
    swal({
      title: "Are you sure?",
      text: "This action will permanently empty all todos.",
      icon: "warning",
      buttons: ["Cancel", "Yes, delete it!"]
    }).then((willEmptyTodos) => {
      if (willEmptyTodos) {
        dispatch(emptyAllTodos());
      }
    });
  };

  /*=========================================*/

  // remove single todo
  const removeTodoHandler = (id) => {
    if (!id) return;
    swal({
      title: "Are you sure?",
      text: "This action will permanently remove the todo.",
      icon: "warning",
      buttons: ["Cancel", "Yes, delete it!"]
    }).then((willDeleteTodo) => {
      if (willDeleteTodo) {
        dispatch(removeTodo(id));
      }
    });
  };

  /*=========================================*/

  // eidt todo with some validation
  const editTodoHandler = (id, editText) => {

    // Validation
    if (editText.trim() === "") {
      toast.error("Todo cannot be empty!");
      return false;
    }

    if (editText.trim().length < 7) {
      toast.error("Todo should be more than 7 characters!");
      return false;
    }

    // in case we edit the task with the same current value,we use  e.id !== id,to avoid [Todo already exists!] msg
    if (todos.some(e => e.text.trim() === editText.trim() && e.id !== id)) {
      toast.error("Todo already exists!");
      return false;
    }

    // if pass all the validatons , return true
    dispatch(editSingleTodo({ id, text: editText }));
    return true;
  }

  /*=========================================*/

  return (
    <div className="custom-div">
      <div className="todos">
        <div className="top-todos">
          <TodoForm
            addNewTodoHandler={addNewTodoHandler}
            inputRef={inputRef}
            todoText={todoText}
            setTodoText={setTodoText}
            emptyAllTodosHandler={emptyAllTodosHandler}
          />
        </div>
        <ul className="todos-list mt-2 p-0">
          {
            todos && todos.length ?
              <>
                {
                  [...todos].reverse().map((ele) => (
                    getTodoId === ele.id && isEditBtnClicked ?
                      <EditableTodoItem
                        key={ele.id}
                        id={ele.id}
                        value={editTodoValue}
                        setEditTodoValue={setEditTodoValue}
                        editTodoHandler={editTodoHandler}
                        setIsEditBtnClicked={setIsEditBtnClicked}
                        setGetTodoId={setGetTodoId}
                      />
                      :
                      <TodoItem
                        key={ele.id}
                        id={ele.id}
                        text={ele.text}
                        setIsEditBtnClicked={setIsEditBtnClicked}
                        setGetTodoId={setGetTodoId}
                        setEditTodoValue={setEditTodoValue}
                        removeTodoHandler={removeTodoHandler}
                      />
                  ))
                }
              </> :
              <li className="justify-content-center no-todo">
                <h2 className="text-muted">No Todo yet.</h2>
              </li>
          }
        </ul>
      </div>
    </div>
  )
}

export default Home;