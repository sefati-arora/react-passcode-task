import { useNavigate} from "react-router-dom";
import { Bell, UserCog2 } from "lucide-react";
import {useAuth} from "../context/authProvider";
import useApi from "../components/useApi";
import ApiEndPoint from "../components/ApiEndPoint";
import Swal from "sweetalert2";
import "./NavBar.css";
function NavBar() {
  const navigate = useNavigate();
  const{postData}=useApi();
  const{logout}=useAuth();
  const handleLogout = async() => {
    console.log("logout ..")
   const result= await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    });
     if (!result.isConfirmed)
       {
         navigate('/Dash')
         return;
       }
     try
     {
       const response=await postData(ApiEndPoint.logOut)
       console.log(response)
       if(response.status==200)
       {
        logout()
        localStorage.removeItem("passcode");
         console.log("AFTER REMOVE")
        navigate('/')
       }
     }
     catch(error)
     {
      Swal.fire({
        icon:"error",
        title:"ERROR!",
        text:"ERROR!"
      })
     }
  };
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
            if (e.target.value) {
                
                navigate(e.target.value);
                
              }
              if(e.target.value=="logout")
              {
                handleLogout();
              }
            }}
          >
            <option value="">SELECT</option>
            <option value="logout">Logout</option>
            <option value="/pass">PassCode Change</option>
            <option>Setting</option>
            <option>Profile Update</option>
            <option>Complete Profile</option>
          </select>
        </label>
      </div>
    </>
  );
}

export default NavBar;
