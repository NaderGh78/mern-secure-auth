import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaInfoCircle, FaEnvelope } from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";

/*=========================================*/
/*=========================================*/
/*=========================================*/

const TopMenu = () => {

  const { pathname } = useLocation();
  const { currentUser } = useSelector(state => state.auth);

  /*=========================================*/

  return (
    <div className="top-menu">
      <div className="container d-flex justify-content-between align-items-center">
        <span className="fs-5">
          <Link to={"/"}>Mern Auth</Link>
        </span>
        <ul className="d-flex gap-3 m-0 p-0">
          <li>
            <Link to={"/"} className={pathname === "/" ? "link-active" : ""}>
              <span className={pathname === "/" ? "show-icon" : ""}><GoHomeFill /></span>
              Home
            </Link>
          </li>
          <li>
            <Link to={"/about"} className={pathname === "/about" ? "link-active" : ""}>
              <span className={pathname === "/about" ? "show-icon" : ""}><FaInfoCircle /></span>
              About
            </Link>
          </li>
          <li>
            <Link to={"/contact"} className={pathname === "/contact" ? "link-active" : ""}>
              <span className={pathname === "/contact" ? "show-icon" : ""}><FaEnvelope /></span>
              Contact
            </Link>
          </li>
        </ul>
        {
          currentUser ?
            <>
              <span
                className="text-capitalize">
                <Link to={`/user-profile/${currentUser?._id}`}>{currentUser?.username}</Link>
              </span></> :
            <h5 className="mb-0 fs-6"><Link to={"/login"}>Login/Register</Link></h5>
        }
      </div>
    </div >
  )
}

export default TopMenu;