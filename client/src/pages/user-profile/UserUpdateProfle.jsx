import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editProfile, getProfile } from "../../redux/apiCalls/userApiCall";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const UserUpdateProfle = () => {

  const { id } = useParams();

  const dispatch = useDispatch();
  const { profile, getUpdateProfileLoading } = useSelector(state => state.profile);

  /*===========================================*/

  const [formData, setFormData] = useState({
    username: "",
    email: ""
  });

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  /*===========================================*/

  // get profile
  useEffect(() => {
    if (!id) return;
    dispatch(getProfile(id));
  }, [id]);

  /*===========================================*/

  // and here we fill setFormData in order to put it in updateUserHandler
  useEffect(() => {
    if (profile?.user) {
      setFormData(prev => ({
        // in order to avoid the console error
        username: prev.username || profile.user.username || "",
        email: prev.email || profile.user.email || "",
      }));
    }
  }, [profile]);

  /*===========================================*/

  // update user profile
  const updateUserHandler = (e) => {
    e.preventDefault();
    dispatch(editProfile(id, formData));
  }

  /*===========================================*/

  return (
    <div>
      <form onSubmit={updateUserHandler}>
        <h2 className="text-center">Update your account</h2>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            // in order to avoid the console error
            value={formData.username || ""}
            placeholder="Enter username"
            onChange={onChangeHandler}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={formData.email || ""}
            placeholder="Enter email"
            onChange={onChangeHandler}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary rounded-0 py-1 px-5"
        >
          {getUpdateProfileLoading ? "Editing ..." : "Edit account"}
        </button>
      </form>
    </div>
  )
}

export default UserUpdateProfle;