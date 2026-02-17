import { RouterProvider } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getMe } from './redux/apiCalls/authApiCall';
import { router } from "./routes/router";
import { ToastContainer } from 'react-toastify';

/*=========================================*/
/*=========================================*/
/*=========================================*/

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  /*=========================================*/

  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer autoClose={3000} />
    </div>
  )
}

export default App;