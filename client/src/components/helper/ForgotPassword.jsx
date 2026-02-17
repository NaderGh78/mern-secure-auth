import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../redux/apiCalls/authApiCall";

/*=========================================*/
/*=========================================*/
/*=========================================*/

const ForgotPassword = () => {

  const dispatch = useDispatch();
  const { forgotPassLoading } = useSelector(state => state.auth);
  const [email, setEmail] = useState("");

  /*=========================================*/

  // input focus
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  /*=========================================*/

  // reset pass fucn
  const resetPasswordHandler = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  }

  /*=========================================*/

  return (
    <div className="custom-div">
      <form onSubmit={resetPasswordHandler}>
        <h2 className="text-center mb-0">Forgot password</h2>
        <p className="text-center text-muted my-2 fs-6">
          Enter your email address and we'll send you a link to reset your password
        </p>
        <div className="form-group">
          <input
            type="email"
            className="form-control"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            ref={inputRef}
          />
        </div>
        <button className="btn btn-primary w-100">
          {forgotPassLoading ? "Loading ..." : "Send reset link"}
        </button>
      </form>
    </div>
  )
}

export default ForgotPassword;