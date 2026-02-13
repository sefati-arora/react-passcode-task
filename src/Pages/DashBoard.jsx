import { useEffect, useState } from "react";
import useApi from "../components/useApi";
import ApiEndPoint from "../components/ApiEndPoint";
import Swal from "sweetalert2";
import "./DashBoard.css";
function DashBoard()
{
    const[count,setCount]=useState({})
    const{getData}=useApi();
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
                    <div className="box1"><img src="./user.png"/>
                    <h6 className="box1-data">{count?.user || 0}</h6>
                        <h6 className="box1-datadata">USER</h6></div>
                      <div className="box2"><img src="./booking.png"/>
                      <h6 className="box2-data">{count?.booking || 0}</h6>
                       <h6 className="box2-datadata">BOOKING</h6>
                        </div>
                        <div className="box3">
                            <img src="./images.png"/>
                            <h6 className="box3-data">{count?.faq || 0}</h6>
                             <h6 className="box3-datadata">FAQ</h6>
                          
                        </div>
                        <div className="box4">
                            <img src="./orderimage.png"/>
                            <h6 className="box4-data">{count?.order || 0}</h6>
                             <h6 className="box4-datadata">ORDER's</h6>
                        </div>
            </div>
        </div>
        </>
    )
}
export default DashBoard;