import { useDispatch } from 'react-redux';
import { googleAuth } from '../../redux/apiCalls/authApiCall';
import { FaGoogle } from "react-icons/fa6";
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../../utils/firebase';

/*=========================================*/
/*=========================================*/
/*=========================================*/

const OAuth = () => {

  const dispatch = useDispatch();
  const auth = getAuth(app);

  // google click func
  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      const user = resultsFromGoogle.user;

      const userData = {
        email: user.email,
        name: user.displayName,
        googlePhotoUrl: user.photoURL
      };
      dispatch(googleAuth(userData));
    } catch (error) {
      console.log(error);
    }
  };

  /*=========================================*/

  return (
    <button
      type='button'
      onClick={handleGoogleClick}
      className="google-btn"
    >
      <FaGoogle />  Continue with google
    </button>
  )
}

export default OAuth;