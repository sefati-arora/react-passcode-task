import { useState } from "react";
import { useNavigate} from "react-router-dom";
import { ShieldCheck,LockKeyhole,KeyRound,CheckCircle2,UserCircle} from "lucide-react";
import useApi from "../components/useApi";
import ApiEndPoint from "../components/ApiEndPoint";
import Swal from "sweetalert2";
import "./PassCode.css";
function PassCode()
{
    const[currentPassCode,setcurrent]=useState("")
    const[newPassCode,setNew]=useState("")
    const[confirmPassCode,setConfirm]=useState("")
    const{postData}=useApi();
    const navigate=useNavigate();
    const changePasscode=async()=>
    {
        try
        {
            if(!currentPassCode)
            {
               Swal.fire({
                icon:"info",
                text:"PLEASE ENTER YOUR CURRENT PASSCODE!"
               })
               return;
            }
            if(!newPassCode)
            {
                Swal.fire({
                    icon:"info",
                    text:"PLEASE ENTER YOUR NEW PASSCODE!"
                })
                return;
            }
            if(!confirmPassCode)
            {
                Swal.fire({
                    icon:"info",
                    text:"PLEASE ENTER YOUR CONFIRM PASSCODE!"
                })
                return;
            }
          const data={currentPassCode,newPassCode,confirmPassCode}
          const response=await postData(ApiEndPoint.EditPasscode,data)
          console.log(response)
          if(response.status == 200)
          {
            Swal.fire({
                icon:"success",
                title:"SUCCESSFULLY!",
                text:"SUCCESSFULL",
            })
            const email=response.update.email
            console.log(email)
            navigate(`/otp/${email}`)
          }
          else
          {
            Swal.fire({
                icon:"error",
                title:"ERROR",
                text:"ERROR"
            })
          }
        }
        catch(error)
        {
            Swal.fire({
                icon:"error",
                title:"ERROR",
                text:"SERVER ERROR!"
            })
        }
    }
    return(
        <>
        <div className="passcode-container">
            <div className="passcode-data">
                <div className="admin"><img src="./admin.png"/></div>
                <h1 className="pass-code"><ShieldCheck size={28}/>CHANGE PASSCODE!</h1>
                <h3 className="current-data"><LockKeyhole size={20}/>CURRENT PASSCODE:</h3>
                <input className="current-input" type="text" placeholder="CURRENT PASSCODE" value={currentPassCode}  onChange={(e)=>setcurrent(e.target.value)}/>
                <h3 className="new-data"><KeyRound size={20}/>NEW PASSCODE:</h3>
                <input className="new-input" type="text" placeholder="NEW PASSCODE" value={newPassCode} onChange={(e)=>setNew(e.target.value)}/>
                <h3 className="confirm-data"><CheckCircle2 size={20}/>CONFIRM PASSCODE:</h3>
                <input className="confirm-input" type="text" placeholder="CONFIRM PASSCODE" value={confirmPassCode} onChange={(e)=>setConfirm(e.target.value)}/>
                <button className="btn-submit" onClick={changePasscode}>SUBMIT</button>
            </div>
        </div>
        </>
    )
}
export default PassCode;