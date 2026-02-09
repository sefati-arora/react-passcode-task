import { useEffect, useState } from "react";
import useApi from "../components/useApi";
import ApiEndPoint from "../components/ApiEndPoint";
import Swal from "sweetalert2";
import "./UserProfile.css";
function UserProfile() {
  const [user, setUser] = useState([]);
  const { postData } = useApi();
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
  useEffect(() => {
    userData();
  }, []);
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
              </tr>
            </thead>
            <tbody>
              {user.map((item, index) => (
                <tr key={index}>
                    <td>{index+1}</td>
                  <td>{item.firstName}</td>
                  <td>{item.email}</td>
                  <td>{item.phoneNumber}</td>
                  <td>{item.countryCode}</td>
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
