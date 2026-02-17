import { Outlet } from "react-router-dom";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const UserProfile = () => {
  return (
    <div className="custom-div">
      <div className="container">
        <Outlet />
      </div>
    </div>
  )
}

export default UserProfile; 