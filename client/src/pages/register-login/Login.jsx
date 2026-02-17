import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/apiCalls/authApiCall";
import { OAuth } from "../../allPagesPaths";

/*=========================================*/
/*=========================================*/
/*=========================================*/

const Login = () => {

  const inputRef = useRef();

  const dispatch = useDispatch();
  const { loginLoading } = useSelector(state => state.auth);

  /*=========================================*/

  const [formData, setFormData] = useState({});
  const onChangeHandle = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  /*=========================================*/

  const onSubmitHandler = (e) => {
    e.preventDefault();

    dispatch(loginUser(formData));
  }

  /*=========================================*/

  // input focus
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  /*=========================================*/

  return (
    <div className="custom-div">
      <form onSubmit={onSubmitHandler}>
        <h2 className="text-center">Login</h2>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter email"
            onChange={onChangeHandle}
            ref={inputRef}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            onChange={onChangeHandle}
          />
        </div>
        <button
          type="submit"
          className="btn btn-success w-100"
        >{loginLoading ? "Loading ..." : "Sign in"}</button>
        <div className="or-div">
          <span>or</span>
        </div>
        <OAuth />
        <div className="text-center mt-2 d-flex justify-content-between">
          {/* uncomment this later */}
          {/* <Link to="/forgot-password" className="text-primary">Forgot your password?</Link> */}

          <Link className="text-primary">Forgot your password?</Link>
          <p>New here ? <Link to="/register" className="text-primary">Create an account</Link></p>
        </div>
      </form>
    </div>
  )
}

export default Login;