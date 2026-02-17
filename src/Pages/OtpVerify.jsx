import { useState } from "react";
import { BadgeCheck } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import useApi from "../components/useApi";
import ApiEndPoint from "../components/ApiEndPoint";
import Swal from "sweetalert2";
import "./OtpVerify.css";
function OtpVerify() {
  const [otp, setOtp] = useState("");
  const { postData } = useApi();
  const { email } = useParams();
  const navigate = useNavigate();
  const OtpData = async () => {
    try {
      if (!email) {
        Swal.fire({
          icon: "error",
          text: "EMAIL NOT FOUND!",
        });
      }
      const response = await postData(`${ApiEndPoint.otpVerify}/${email}`, {
        otp,
      });
      console.log(response);
      console.log(otp);
      if (response.status == 200) {
        navigate("/Dash");
      } else {
        Swal.fire({
          icon: "error",
          title: "ERROR",
          text: "ERROR!",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "ERROR",
        text: "ERRRO",
      });
    }
  };
  const resendOtp = async () => {
    try {
      console.log(email);
      const otpResend = await postData(`${ApiEndPoint.resendOtp}/${email}`);
      console.log(otpResend);
      if (otpResend.status == 200) {
        Swal.fire({
          icon: "success",
          title: "SUCCESSFULLY!",
          text: "RESEND OTP!",
        });
        
      }
      else{
        Swal.fire({
          icon: "error",
          title: "ERROR!",
          text: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "ERROR!",
        text: "SERVER ERROR!",
      });
    }
  };
  const handleChange = (e, index) => {
    const value = e.target.value;
    const newOtp = otp.split("");
    newOtp[index] = value;
    setOtp(newOtp.join(""));
  };
  return (
    <>
      <div className="otp-container">
        <div className="otp-data">
          <div className="image">
            <img src="/OTP-Verification.png" />
          </div>
          <h1 className="otp-verification">
            <BadgeCheck size={20} />
            VERIFICATION!
          </h1>
          <h3 className="otp-here">ENTER YOUR OTP HERE!</h3>
          <div className="otp-box-container">
            <input
              type="text"
              maxLength="1"
              className="otp-box"
              onChange={(e) => handleChange(e, 0)}
            />
            <input
              type="text"
              maxLength="1"
              className="otp-box"
              onChange={(e) => handleChange(e, 1)}
            />
            <input
              type="text"
              maxLength="1"
              className="otp-box"
              onChange={(e) => handleChange(e, 2)}
            />
            <input
              type="text"
              maxLength="1"
              className="otp-box"
              onChange={(e) => handleChange(e, 3)}
            />
          </div>
          <span className="btn-send" onClick={resendOtp}>
            Resend OTP
          </span>
          <button className="btn-data" onClick={OtpData}>
            SUBMIT
          </button>
        </div>
      </div>
    </>
  );
}
export default OtpVerify;
