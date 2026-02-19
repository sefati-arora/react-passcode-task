import {
  LayoutDashboard,
  User,
  CalendarCheck,
  Repeat,
  ShoppingCart,
  DollarSign,
  HelpCircle,
} from "lucide-react";
import "./Side.css";
import Swal from "sweetalert2";
import useApi from "../components/useApi";
import ApiEndPoint from "../components/ApiEndPoint";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function SideBar() {
  const navigate = useNavigate();
  const { postData } = useApi();
  const userProfile = async () => {
    const verifiedData = sessionStorage.getItem("passcode");
    if (verifiedData == "true") {
      navigate("/user");
      return;
    }
    const result = await Swal.fire({
      title: "ENTER PASSCODE",
      input: "password",
      inputPlaceholder: "ENTER PASSCODE",
      showCancelButton: true,
      confirmButtonText: "submit",
      cancelButtonText: "cancel",
      cancelButtonColor: "rgb(219, 72, 72)",
    });
    const passCode = result.value;
    try {
      const response = await postData(ApiEndPoint.verifyPasscode, {
        passCode: passCode,
      });
      console.log(response);
      console.log(passCode);
      if (!passCode) return;
      if (response.status == 200) {
        sessionStorage.setItem("passcode", "true");
        navigate("/user");
      } else {
        Swal.fire({
          icon: "error",
          text: "Wrong PassCode",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "ERROR",
        text: "SERVER ERROR!",
      });
    }
  };
  const booking = async () => {
    try {
      const data = sessionStorage.getItem("passcode");
      console.log(data);
      if (data !== "true") {
        Swal.fire({
          icon: "info",
          title: "UNABLE TO ACCESS!",
          text: "YOU CAN'T ACCESS BOOKING!",
        });
        return;
      } else {
        navigate("/booking");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "SERVER ERROR",
        text: "ERROR!",
      });
    }
  };
  const dashBoard=async()=>
  {
    try
    {
        const data=sessionStorage.getItem("passcode")
        console.log(data)
        if(data !== "true")
        {
          navigate('/Dash')
        }
        else
        {
          sessionStorage.removeItem("passcode")
          navigate('/Dash')
        }
    }
    catch(error)
    {
      Swal.fire({
        icon:"error",
        title:"error",
        text:"SERVER ERROR"
      })
    }
  }
  const order=async()=>
  {
    try
    {
      alert("NO, the order hasn't been placed Yet!")
    }
    catch(error)
    {
      console.log(error)
    }
  }
  const sub=async()=>
  {
    try
    {
      alert("No,the subscription hasn't been paid yet!")
    }
    catch(error)
    {
      console.log(error)
    }
  }
  return (
    <>
      <div className="side-container">
        <ul>
          <li onClick={dashBoard}>
            <LayoutDashboard size={18} />
            DashBoard
          </li>
          <li onClick={userProfile}>
            <User size={18} />
            UserProfile
          </li>
          <li onClick={booking}>
            <CalendarCheck size={18} />
            Booking
          </li>
          <li onClick={sub}>
            <Repeat size={18} />
            Subscription
          </li>
          <li onClick={order}>
            <ShoppingCart size={18} />
            Orders
          </li>
          <li>
            <DollarSign size={18} />
            Revenue
          </li>
          <li>
            <HelpCircle size={18} />
            FAQ
          </li>
        </ul>
      </div>
    </>
  );
}
export default SideBar;
