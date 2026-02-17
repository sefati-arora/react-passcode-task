import { useEffect, useState } from "react";
import useApi from "../components/useApi";
import ApiEndPoint from "../components/ApiEndPoint";
import Swal from "sweetalert2";
import "./UserProfile.css";
import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
function UserProfile() {
  const [user, setUser] = useState([]);
  const { postData } = useApi();
  const navigate=useNavigate();
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
                    <button className="btn-action" onClick={() => navigate(`/user/view/${item.id}`)}>
                      <Eye size={26}/>
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
