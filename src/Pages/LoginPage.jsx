import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authProvider";
import useApi from "../components/useApi";
import ApiEndPoint from "../components/ApiEndPoint";
import Swal from "sweetalert2";
import "./LoginPage.css";
import { LockIcon, MailCheck } from "lucide-react";
function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const { postData } = useApi();
  const navigate = useNavigate();
  const loginPage = async () => {
    try {
      if (!email) {
        Swal.fire({
          icon: "info",
          title: "REQUIRED!",
          text: "PLEASE ENTER EMAIL FIRST!",
        });
        return;
      }
      if (!password) {
        Swal.fire({
          icon: "info",
          title: "REQUIRED",
          text: "PLEASE ENTER PASSWORD FIRST!",
        });
        return;
      }
      const data = { email, password };
      const response = await postData(ApiEndPoint.adminLogin, data);
      console.log(response);
      const step = response.admin.step;
      console.log(step);
      if (response.status == 200) {
        login(response);
        if (step == 1) {
          navigate(`/otp/${email}`);
        } else {
          navigate("/Dash");
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "ERROR",
          text: "ERROR!!!!",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "ERROR",
        text: "ERROR",
      });
    }
  };
  return (
    <>
      <div className="login-container">
        <div className="login-data">
          <div className="pic">
            <img src="/login.png" />
          </div>
          <div className="login-page">
            <h1>LOGIN PAGE!</h1>
            <h3 className="email-data">
              <MailCheck size={20} />
              EMAIL:
            </h3>
            <input
              className="email-input"
              type="text"
              placeholder="EMAIL:"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <h3 className="password-data">
              <LockIcon size={20} />
              PASSWORD:
            </h3>
            <input
              className="password-input"
              type="password"
              placeholder="PASSWORD"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="btn-save" onClick={loginPage}>
              SAVE
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
