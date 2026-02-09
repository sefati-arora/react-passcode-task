import { useState } from "react";
import { useNavigate} from "react-router-dom";
import {useAuth} from "../context/authProvider";
import useApi from "../components/useApi";
import ApiEndPoint from "../components/ApiEndPoint";
import Swal from "sweetalert2";
import "./LoginPage.css";
function LoginPage()
{
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const{login}=useAuth();
    const{postData}=useApi();
    const navigate=useNavigate();
    const loginPage=async()=>
    {
       try
    {
        const data={email,password}
       const response=await postData(ApiEndPoint.adminLogin,data)
       console.log(response)
       if(response.status == 200)
       {
        login(response);
         Swal.fire({
            icon:"success",
            title:"SUCCESSFULL!",
            text:"SUCCESSFYLLY"
         })
         navigate('/pass')
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
            text:"ERROR"
        })
    }
    }
    return(
        <>
        <div className="login-container">
            <div className="login-data">
                <h1 className="login-page">LOGIN PAGE!</h1>
                <h3 className="email-data">EMAIL:</h3>
                <input className="email-input" type="text" placeholder="EMAIL:" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <h3 className="password-data">PASSWORD:</h3>
                <input className="password-input" type="password" placeholder="PASSWORD" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <button className="btn-save" onClick={loginPage}>SAVE</button>
            </div>
        </div>
        </>
    )
}

export default LoginPage;