import { useEffect, useState } from "react";
import useApi from "../components/useApi";
import ApiEndPoint from "../components/ApiEndPoint";
import Swal from "sweetalert2";
import "./UserProfile.css";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowBigLeftDash,
  FlagIcon,
  Mail,
  Phone,
  User,
  UserCheck2,
} from "lucide-react";
function UserView() {
  const { postData } = useApi();
  const [user, setUser] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const userViewPage = async () => {
    try {
      console.log(">>", id);
      const response = await postData(`${ApiEndPoint.viewUser}/${id}`);
      console.log(response);
      if (response.status == 200) {
        setUser(response.user);
      } else {
        Swal.fire({
          icon: "error",
          text: "API ERROR",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "ERROR",
        text: "SERVER ERROR",
      });
    }
  };
  useEffect(() => {
    if (id) {
      userViewPage();
    }
  }, [id]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const passCode = sessionStorage.getItem("passcode");
    if (!token) {
      Swal.fire({
        icon: "error",
        text: "Unable to access, login first",
      });
      navigate("/");
      return;
    }
    if (passCode !== "true") {
      Swal.fire({
        icon: "error",
        title: "UNABLE",
        text: "You can't able to access userProfile Directly!",
      });
      navigate("/Dash");
      return;
    }
  }, [navigate]);
  return (
    <>
      <div className="userView-container">
        <div className="userView-data">
          <div className="image-data">
            <span className="user-arrow">
              <Link to="/user">
                <ArrowBigLeftDash size={25} />
              </Link>
            </span>
            <img src="/view.png" />
          </div>
          <h1>
            <UserCheck2 size={27} /> USER PROFILE
          </h1>
          <h4>
            <User size={18} /> NAME:
          </h4>
          <input
            type="text"
            placeholder="name"
            value={user?.firstName || ""}
            disabled
          />
          <h4>
            <Mail size={18} /> EMAIL:
          </h4>
          <input
            type="email"
            placeholder="email"
            value={user?.email || ""}
            disabled
          />
          <h4>
            <Phone size={18} /> PHONE NUMBER
          </h4>
          <input
            type="tel"
            placeholder="phoneNumber"
            value={user?.phoneNumber || ""}
            disabled
          />
          <h4>
            <FlagIcon size={18} /> COUNTRY CODE
          </h4>
          <input
            type="text"
            placeholder="code"
            value={user?.countryCode || ""}
            disabled
          />
        </div>
      </div>
    </>
  );
}
export default UserView;
