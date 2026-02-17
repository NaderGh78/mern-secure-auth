import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../redux/apiCalls/authApiCall";
import { LiaEyeSolid, LiaEyeSlashSolid } from "react-icons/lia";
import { toast } from "react-toastify";

/*=========================================*/
/*=========================================*/
/*=========================================*/

const ResetPassword = () => {

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { resetPassLoading } = useSelector(state => state.auth);

  // pass state
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // pass icons
  const [passIcon, setPassIcon] = useState(false);
  const [confPassIcon, setConfPassIcon] = useState(false);
  const passIconHandler = () => setPassIcon((prev) => !prev);
  const confPassIconHandler = () => setConfPassIcon((prev) => !prev);

  const { token } = useParams();

  /*=========================================*/

  // reset pass func
  const resetPasswordHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    const res = await dispatch(resetPassword(password, token));
    if (res.success) {
      toast.success(res?.message);
      setTimeout(() => {
        navigate("/login")
      }, 3500);
    }
  }

  /*=========================================*/

  // input focus
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  /*=========================================*/

  return (
    <div className="custom-div reset-password">
      <form onSubmit={resetPasswordHandler}>
        <h2 className="text-center">Reset password</h2>
        <div className="form-group">
          <input
            type={passIcon ? "text" : "password"}
            className="form-control"
            placeholder="New password"
            onChange={(e) => setPassword(e.target.value)}
            ref={inputRef}
          />
          <span onClick={passIconHandler}>
            {passIcon ? <LiaEyeSlashSolid /> : < LiaEyeSolid />}
          </span>
        </div>
        <div className="form-group">
          <input
            type={confPassIcon ? "text" : "password"}
            className="form-control"
            placeholder="Confirm new password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <span onClick={confPassIconHandler}>
            {confPassIcon ? <LiaEyeSlashSolid /> : < LiaEyeSolid />}
          </span>
        </div>
        <button className="btn btn-primary w-100">
          {resetPassLoading ? "Loading ..." : "Set new password"}
        </button>
      </form>
    </div>
  )
}

export default ResetPassword;