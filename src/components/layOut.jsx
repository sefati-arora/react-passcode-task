import NavBar from "./navBar";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";
import './NavBar.css';

function Layout() {
  return (
    <>
    <div className="admin-layout">
      <NavBar />
      <div className="admin-body">
        <SideBar />
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
    </>
  );
}

export default Layout;
