import { Outlet } from "react-router-dom"
import { Footer, TopMenu } from "../allPagesPaths"

/*=========================================*/
/*=========================================*/
/*=========================================*/

const Layout = () => {
  return (
    <div className="page-wrapper">
      <TopMenu />
      <main className="page-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout;