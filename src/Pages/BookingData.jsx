import { useEffect, useState } from "react";
import useApi from "../components/useApi";
import ApiEndPoint from "../components/ApiEndPoint";
import Swal from "sweetalert2";
import "./BookingData.css";
function BookingData() {
  const [booking, setBooking] = useState([]);
  const { postData } = useApi();
  const bookingData = async () => {
    try {
      const response = await postData(ApiEndPoint.bookingFetch);
      console.log(response);
      if (response.status == 200) {
        setBooking(response.booking);
      } else {
        Swal.fire({
          icon: "error",
          title: "ERROR",
          text: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "error",
        text: "SERVER ERROR!",
      });
    }
  };
  useEffect(() => {
    bookingData();
  }, []);
  return (
    <>
      <div className="booking-container">
        <div className="booking-data">
          <table>
            <thead>
              <tr>
                <th>Sr No.</th>
                <th>duration</th>
                <th>DateAndTime</th>
                <th>location</th>
                <th>comment</th>
                <th>latitude</th>
                <th>longitude</th>
              </tr>
            </thead>
            <tbody>
              {booking.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.duration}</td>
                  <td>{item.DateandTime}</td>
                  <td>{item.location}</td>
                  <td>{item.comment}</td>
                  <td>{item.latitude}</td>
                  <td>{item.longitude}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
export default BookingData;
