import { useState } from "react";
import { useNavigate, useParams} from "react-router-dom";
import useApi from "../components/useApi";
import ApiEndPoint from "../components/ApiEndPoint";
import Swal from "sweetalert2";
import "./OtpVerify.css";
function OtpVerify()
{
    const[otp,setOtp]=useState("")
    const{postData}=useApi();
     const{email}=useParams();
     const navigate=useNavigate();
    const OtpData=async()=>
    {  
        try
        {
           const response = await postData( `${ApiEndPoint.otpVerify}/${email}`,
      { otp });
           console.log(response)
           if(response.status==200)
           {
             Swal.fire({
                icon:"success",
                title:"SUCCESS",
                text:response.message
             })
             navigate('/Dash')
           }
           else
           {
            Swal.fire({
                icon:"error",
                title:"ERROR",
                text:"ERROR!"
            })
           }
        }
        catch(error)
        {
            Swal.fire({
                icon:"error",
                title:"ERROR",
                text:"ERRRO"
            })
        }

    }
    return(
        <>
        <div className="otp-container">
            <div className="otp-data">
                <div className="image"><img src="/OTP-Verification.png"/></div>
                <h1 className="otp-verification">VERIFICATION!</h1>
                <h3 className="otp-here">ENTER YOUR OTP HERE!</h3>
                <input className="otp-input" type="text" min={4} placeholder="OTP:" value={otp} onChange={(e)=>setOtp(e.target.value)}/>
                <button className="btn-data" onClick={OtpData}>SUBMIT</button>
            </div>
        </div>
        </>
    )
}
export default OtpVerify;