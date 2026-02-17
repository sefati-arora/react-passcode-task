import { useEffect, useState } from "react";
import useApi from "../components/useApi";
import ApiEndPoint from "../components/ApiEndPoint";
import Swal from "sweetalert2";
import "./DashBoard.css";
import { Link, useNavigate } from "react-router-dom";
function DashBoard() {
  const [count, setCount] = useState({});
  const { getData, postData } = useApi();
  const navigate = useNavigate();
  const dashData = async () => {
    try {
      if (!count) {
        Swal.fire({
          icon: "info",
          text: "COUNT ARE NOT AVAILABE",
        });
      }
      const data = count;
      const response = await getData(ApiEndPoint.DashBoardData, data);
      console.log(response);
      if (response.status == 200) {
        setCount(response);
      } else {
        Swal.fire({
          icon: "error",
          text: "ERROR!",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "ERROR!",
        text: "SERVER ERROR",
      });
    }
  };
  const userProfile = async () => {
    const verifyData = localStorage.getItem("passcode");
    console.log(verifyData);
    if (verifyData == "true") {
      navigate("/user");
      return;
    }
    const result = await Swal.fire({
      title: "ENTER PASSCODE",
      input: "password",
      inputPlaceholder: "ENTER PASSCODE",
      showCancelButton:true,
      confirmButtonText: "submit",
      cancelButtonText: "cancel",
      cancelButtonColor: "rgb(224, 79, 79)",
    });
    if(!result.isConfirmed) return;
    const passCode = result.value;
    try {
      const response = await postData(ApiEndPoint.verifyPasscode, {
        passCode: passCode,
      });
      console.log(response);
      if (response.status == 200) {
        localStorage.setItem("passcode", "true");
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
        text: "SERVER ERROR",
      });
    }
  };
  const booking = async () => {
    try {
      const data = localStorage.getItem("passcode");
      if (data !== "true") {
        Swal.fire({
           icon: "info",
          title: "UNABLE TO ACCESS!",
          text: "YOU CAN'T ACCESS BOOKING!",
        });
      } else {
        navigate("/booking");
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
    dashData();
  }, []);
  return (
    <>
      <div className="dash-container">
        <div className="dash-data">
          <div className="box1" onClick={userProfile}>
            <img src="./user.png" />
            <h6 className="box1-data">{count?.user || 0}</h6>
            <h6 className="box1-datadata">USER</h6>
          </div>
          <div className="box2" onClick={booking}>
            <img src="./booking.png" />
            <h6 className="box2-data">{count?.booking || 0}</h6>
            <h6 className="box2-datadata">BOOKING</h6>
          </div>
          <div className="box3">
            <img src="./images.png" />
            <h6 className="box3-data">{count?.faq || 0}</h6>
            <h6 className="box3-datadata">FAQ</h6>
          </div>
          <div className="box4">
            <img src="./orderimage.png" />
            <h6 className="box4-data">{count?.order || 0}</h6>
            <h6 className="box4-datadata">ORDER's</h6>
          </div>
        </div>
      </div>
    </>
  );
}
export default DashBoard;
