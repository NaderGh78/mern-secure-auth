import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, remvoUserAcc } from "../../redux/apiCalls/userApiCall";
import { logoutUser } from "../../redux/apiCalls/authApiCall";
import swal from 'sweetalert';

/*=========================================*/
/*=========================================*/
/*=========================================*/

const UserProfileView = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { profile, getProfileLoading, removeProfileLoading } = useSelector(state => state.profile);

  /*===========================================*/

  // get profile
  useEffect(() => {
    if (!id) return;
    dispatch(getProfile(id));
  }, [id]);

  /*===========================================*/

  // logiut
  const logoutHandler = () => {
    dispatch(logoutUser());
  }

  /*===========================================*/

  // remove user acc
  const removeAccHandler = () => {
    if (!id) return;

    swal({
      title: "Are you sure?",
      text: "This action will permanently delete the user.",
      icon: "warning",
      buttons: ["Cancel", "Yes, delete it!"]
    }).then((willDeleteUser) => {
      if (willDeleteUser) {
        dispatch(remvoUserAcc(id));
        navigate("/");
      }
    });
  };

  /*===========================================*/

  // get some user info from profile
  const firstName = profile?.user?.username?.split(" ")[0];
  const secondName = profile?.user?.username?.split(" ")[1];
  const userEmail = profile?.user?.email;

  /*===========================================*/

  // make daynmic path for image src
  const BASE_URL =
    import.meta.env.MODE === "development"
      ? "http://localhost:3001"
      : ""; // same porduction domain 

  /*===========================================*/

  return (
    <div className="text-center">
      {
        getProfileLoading ?
          <h4 className="text-center">Loading ...</h4> :
          <>
            <img
              src={
                profile?.user?.profilePicture.startsWith("http")
                  ? profile?.user.profilePicture
                  : `${BASE_URL}${profile?.user?.profilePicture}`
              }
              alt="profile avatar"
              style={{ width: "80px", marginBottom: "10px" }}
            />

            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col" className="text-center">{secondName ? "First" : "Username"}</th>
                  {/* when user register or login with gogle oAuth ,there is no second name its just the username */}
                  {secondName !== undefined && <th scope="col" className="text-center">Last</th>}
                  <th scope="col" className="text-center">Email</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-center text-capitalize">{firstName}</td>
                  {secondName !== undefined && <td className="text-center text-capitalize">{secondName}</td>}
                  <td className="text-center">{userEmail}</td>
                </tr>
                <tr>
                  <td colSpan={secondName !== undefined ? "2" : "1"} className="text-center">
                    <Link
                      className="btn btn-primary text-white rounded-0"
                      to={'edit'}>Update your account</Link>
                  </td>
                  <td colSpan="1" className="text-center">
                    <span
                      className="btn btn-secondary text-white rounded-0"
                      onClick={logoutHandler} style={{ cursor: "pointer" }}>logout</span>
                  </td>
                </tr>
              </tbody>
            </table>
            <button
              className="btn btn-danger text-white rounded-0 mt-5"
              onClick={removeAccHandler}
            >
              {removeProfileLoading ? "Removing ..." : "Remove your account"}
            </button>
          </>
      }
    </div>
  )
}

export default UserProfileView;