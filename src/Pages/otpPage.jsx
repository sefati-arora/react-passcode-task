import { useRef, useState } from "react";
import { BadgeCheck } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import useApi from "../components/useApi";
import ApiEndPoint from "../components/ApiEndPoint";
import Swal from "sweetalert2";
import "./otpPage.css";
function OtpPage() {
  const [otp, setOtp] = useState("");
  const { postData } = useApi();
  const { email } = useParams();
  const navigate = useNavigate();
  const otpPage = async () => {
    try {
      const response = await postData(`${ApiEndPoint.otpVerify}/${email}`, {
        otp,
      });
      console.log(response);
      if (response.status == 200) {
        setOtp(response.otp);
        navigate("/Dash");
        window.location.reload();
      } else {
        Swal.fire({
          icon: "error",
          title: "ERROR",
          text: "INVALID OTP",
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
      } else {
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

  const inputRef = useRef([]);
  const handleChange = (e, index) => {
    const value = e.target.value;
    const newOtp = otp.split("");
    newOtp[index] = value;
    setOtp(newOtp.join(""));
    if (value && index < 3) {
      inputRef.current[index + 1].focus();
    }
  };
  return (
    <>
      <div className="otpPage-container">
        <div className="otpPage-data">
          <div className="image">
            <img src="/view.png" />
          </div>
          <h1 className="otpPage-verification">
            <BadgeCheck size={20} />
            VERIFICATION!
          </h1>
          <h3 className="otpPage-here">ENTER YOUR OTP HERE!</h3>
          <div className="otpPage-enter">
            <input
              className="otpPage-otp"
              type="text"
              min={1}
              onChange={(e) => handleChange(e, 0)}
              ref={(el) => (inputRef.current[0] = el)}
            />
            <input
              className="otpPage-otp"
              type="text"
              min={1}
              onChange={(e) => handleChange(e, 1)}
              ref={(el) => (inputRef.current[1] = el)}
            />
            <input
              className="otpPage-otp"
              type="text"
              min={1}
              onChange={(e) => handleChange(e, 2)}
              ref={(el) => (inputRef.current[2] = el)}
            />
            <input
              className="otpPage-otp"
              type="text"
              min={1}
              onChange={(e) => handleChange(e, 3)}
              ref={(el) => (inputRef.current[3] = el)}
            />
          </div>
          <span className="btn-send" onClick={resendOtp}>
            Resend OTP
          </span>
          <button className="btn-data" onClick={otpPage}>
            SUBMIT
          </button>
        </div>
      </div>
    </>
  );
}
export default OtpPage;
