import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { verifyEmail } from "../../redux/apiCalls/authApiCall";

/*=========================================*/
/*=========================================*/
/*=========================================*/

const VerificationEmail = () => {

  const navigate = useNavigate();

  const inputRefs = useRef([]);

  const dispatch = useDispatch();
  const { verifyLoading } = useSelector(state => state.auth);

  // 6 digits inputs
  const [values, setValues] = useState(Array(6).fill(""));

  /*=========================================*/

  // first input focus 
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  /*=========================================*/

  const handleInput = (e, index) => {
    const val = e.target.value;
    const newValues = [...values];
    newValues[index] = val;
    setValues(newValues);

    // if the previous input not empty and the index is less than the values lentgth,make the focus on next input
    if (val.length > 0 && index < values.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  /*=========================================*/

  // backspace fucn
  const handleKeyDown = (e, index) => {

    // if the key not Backspace, stop
    if (e.key !== "Backspace") return;

    // get the previous input
    const prevInput = inputRefs.current[index - 1];

    // if the current input is empty and there is previous input , make the focus on the previous input
    if (e.target.value === "" && prevInput) {
      prevInput.focus();
    }
  };

  /*=========================================*/

  // paste the full code, when user get it from his email inbox
  const handlePaste = (e) => {

    // get just the text data from teh code that user get it and split it 
    const pasteArray = e.clipboardData.getData("text").split("");
    const newValues = [...values];
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        newValues[index] = char;
      }
    });
    setValues(newValues);

    const lastIndex = Math.min(pasteArray.length, values.length) - 1;
    // inputRefs.current[lastIndex]?.focus();

    // focus the last input
    inputRefs.current[values.length - 1]?.focus();
  }

  /*=========================================*/

  // send the verification cdoe
  const sendCodeHandler = async (e) => {
    e.preventDefault();
    const code = values.join("");
    const res = await dispatch(verifyEmail(code));
    if (res.success) setTimeout(() => navigate("/login"), 100);
  }

  /*=========================================*/

  return (
    <div className="custom-div verify">
      <form onSubmit={sendCodeHandler}>
        <h2 className="text-center mb-0">Email verify OTP</h2>
        <p className="text-center text-muted my-2">Enter the 6-digits code sent to your email id</p>
        <div className="inputs-array d-flex justify-content-center gap-2" onPaste={handlePaste}>
          {values.map((val, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              required
              value={val}
              ref={e => inputRefs.current[index] = e}
              onChange={(e) => handleInput(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          ))}
        </div>
        <button className="btn btn-primary w-100">
          {verifyLoading ? "Loading ..." : "Verify email"}
        </button>
      </form>
    </div>
  )
}

export default VerificationEmail; 