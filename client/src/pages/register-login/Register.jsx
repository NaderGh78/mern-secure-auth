import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/apiCalls/authApiCall";
import { OAuth } from "../../allPagesPaths";

/*=========================================*/
/*=========================================*/
/*=========================================*/

const Register = () => {

  const navigate = useNavigate();

  const inputRef = useRef();

  const dispatch = useDispatch();
  const { registerLoading } = useSelector(state => state.auth);

  /*=========================================*/

  const [formData, setFormData] = useState({});
  const onChangeHandle = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  /*=========================================*/

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const res = await dispatch(registerUser(formData));
    if (res.success) {
      setTimeout(() => { navigate("/login") }, 3500);

      // uncomment this later
      // setTimeout(() => { navigate("/verify-email") }, 100);
    }
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
        <h2 className="text-center">Register</h2>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="Enter username"
            onChange={onChangeHandle}
            ref={inputRef}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter email"
            onChange={onChangeHandle}
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
        >{registerLoading ? "Loading ..." : "Sign up"}</button>
        <div className="or-div">
          <span>or</span>
        </div>
        <OAuth />
        <div className="text-center mt-2">
          <p>Have an account ? <Link to="/login" className="text-primary">Login</Link></p>
        </div>
      </form>
    </div>
  )
}

export default Register;