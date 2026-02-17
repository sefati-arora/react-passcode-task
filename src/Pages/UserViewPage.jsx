import { useEffect, useState } from "react";
import useApi from "../components/useApi";
import ApiEndPoint from "../components/ApiEndPoint";
import Swal from "sweetalert2";
import "./UserProfile.css";
import { useParams,Link } from "react-router-dom";
import { ArrowBigLeftDash } from "lucide-react";

function UserView()
{
 
    const{postData}=useApi();
     const[user,setUser]=useState({})
      const{id}=useParams();
     const userViewPage=async()=>
     {
        try
        {
            console.log(">>",id)
           const response=await postData(`${ApiEndPoint.viewUser}/${id}`)
           console.log(response)
           if(response.status==200)
           {
            setUser(response.user)
           }
           else
           {
            Swal.fire({
                icon:"error",
                text:"API ERROR"
            })
           }
        }
        catch(error)
        {
            Swal.fire({
                icon:"error",
                title:"ERROR",
                text:"SERVER ERROR"
            })
        }
     }
     useEffect(()=>
    {
        if(id)
        {
            userViewPage();
        }
    },[id])
    return(
        <>
        <div className="userView-container">
            <div className="userView-data">
                <div className="image-data">
                    <span className="user-arrow">
                        <Link to="/user">
                        <ArrowBigLeftDash size={25}/>
                        </Link>
                    </span>
                    <img src="/view.png" />
                </div>
                <h1>USER PROFILE</h1>
                <h4>NAME:</h4>
                <input type="text" placeholder="name" value={user?.firstName || ""} disabled/>
                <h4>EMAIL:</h4>
                <input type="email" placeholder="email" value={user?.email || ""} disabled/>
                <h4>PHONE NUMBER</h4>
                <input type="tel" placeholder="phoneNumber" value={user?.phoneNumber || ""} disabled/>
                <h4>COUNTRY CODE</h4>
                <input type="text" placeholder="code" value={user?.countryCode || ""} disabled/>
            </div>
        </div>
        </>
    )
}
export default UserView;