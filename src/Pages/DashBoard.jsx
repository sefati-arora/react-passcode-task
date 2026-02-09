import { useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";
import useApi from "../components/useApi";
import ApiEndPoint from "../components/ApiEndPoint";
import Swal from "sweetalert2";
import "./DashBoard.css";
function DashBoard()
{
    const[count,setCount]=useState({})
    const{getData}=useApi();
    const navigate=useNavigate();
    const dashData=async()=>
    {
        try
        {
            if(!count)
            {
                Swal.fire({
                    icon:"info",
                    text:"COUNT ARE NOT AVAILABE"
                })
            }
            const data=count;
          const response=await getData(ApiEndPoint.DashBoardData,data)
          console.log(response)
          if(response.status==200)
          {
            setCount(response)
          }
          else
          {
            Swal.fire({
                icon:"error",
                text:"ERROR!"
            })
          }
        }
        catch(error)
        {
            Swal.fire({
                icon:"error",
                title:"ERROR!",
                text:"SERVER ERROR"
            })
        }
    }
    useEffect(()=>
    {
        dashData()
    },[])
    return(
        <>
        <div className="dash-container">
            <div className="dash-data">
                    <div className="box1">USER:{count?.user || 0}</div>
                      <div className="box2">BOOKING:{count?.booking || 0}</div>
            </div>
        </div>
        </>
    )
}
export default DashBoard;