import { useEffect, useState } from "react";
import useApi from "../components/useApi";
import ApiEndPoint from "../components/ApiEndPoint";
import Swal from "sweetalert2";
import "./UserProfile.css";
import { Eye } from "lucide-react";
import { io } from "socket.io-client";
const Socket = io("http://localhost:4002");
import { useNavigate } from "react-router-dom";
function UserProfile() {
  const [user, setUser] = useState([]);
  const { postData } = useApi();
  const navigate = useNavigate();
  const userData = async () => {
    try {
      const response = await postData(ApiEndPoint.userFetch);
      console.log(response);
      if (response.status == 200) {
        setUser(response.user);
      } else {
        Swal.fire({
          icon: "error",
          text: "ERROR",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "ERROR",
        text: " SERVER ERROR!!",
      });
    }
  };
  const status = (id) => {
    try {
      Socket.emit("status_update", { userId: id });
      Socket.emit("connect_data", {
        message: "Hello from frontend",
        receiverId: id,
      });
      userData();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const loggedInUserId = localStorage.getItem("userId");
    Socket.emit("connect_user", { userId: loggedInUserId });
    Socket.on("socket_listener", (data) => {
      console.log("Message send:", data);
    });
    Socket.on("status_listener", (data) => {
      if (data.success_msg) {
        Swal.fire({
          icon: "success",
          text: "Status updated successfully",
        });
        userData();
      } else {
        Swal.fire({
          icon: "error",
          text: data.error_message,
        });
      }
    });
    return () => {
      Socket.off("socket_listener");
      Socket.off("status_listener");
    };
  }, []);
  useEffect(() => {
    userData();
  }, []);
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
      <div className="user-container">
        <div className="user-data">
          <table>
            <thead>
              <tr>
                <th>Sr No.</th>
                <th>firstName</th>
                <th>email</th>
                <th>phoneNumber</th>
                <th>countryCode</th>
                <th>status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {user.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.firstName}</td>
                  <td>{item.email}</td>
                  <td>{item.phoneNumber}</td>
                  <td>{item.countryCode}</td>
                  <td>
                    <button
                      className="btn-update"
                      onClick={() => status(item.id)}
                      style={{
                        backgroundColor:
                          item.status == 1 ? "#29ab38" : "#f14646e0",
                      }}
                    >
                      status
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn-action"
                      onClick={() => navigate(`/user/view/${item.id}`)}
                    >
                      <Eye size={26} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
export default UserProfile;
