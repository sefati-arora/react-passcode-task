import { useNavigate } from "react-router-dom";
import { Bell, UserCog2 } from "lucide-react";
import { useAuth } from "../context/authProvider";
import useApi from "../components/useApi";
import ApiEndPoint from "../components/ApiEndPoint";
import Swal from "sweetalert2";
import "./NavBar.css";
function NavBar() {
  const navigate = useNavigate();
  const { postData } = useApi();
  const { logout } = useAuth();
  const handleLogout = async () => {
    console.log("logout ..");
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    });
    if (!result.isConfirmed) {
      navigate("/Dash");
        window.location.reload();
      return;
    }
    try {
      const response = await postData(ApiEndPoint.logOut);
      console.log(response);
      if (response.status == 200) {
        logout();
        sessionStorage.removeItem("passcode");
        console.log("AFTER REMOVE");
        navigate("/");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "ERROR!",
        text: "ERROR!",
      });
    }
  };
   const passcode=async()=>
   {
    const data=sessionStorage.getItem("passcode")
    console.log(data)
    if(data !== "true")
    {
        
      navigate('/pass')
      window.location.reload();
    }
    else
    {
      sessionStorage.removeItem("passcode")
      console.log("remove passCode after navigate passCode change")
      navigate('/pass')
         window.location.reload();
    }
   }
  return (
    <>
      <div className="nav-bar">
        <label className="notify">
          <Bell size={25} />
        </label>
        <label className="Admin-controller">
          <UserCog2 size={18} />
          Admin
          <select
            className="select-row"
            onChange={(e) => {
              if (e.target.value == "pass") {
                passcode();
              }
              if (e.target.value == "logout") {
                handleLogout();
              }
            }}
          >
            <option value="">SELECT</option>
            <option value="logout">Logout</option>
            <option value="pass">PassCode Change</option>
          </select>
        </label>
      </div>
    </>
  );
}

export default NavBar;
