import  Axios  from "axios";
import React, { useState ,useContext } from "react";
import { Link } from 'react-router-dom';
import './CSSComponents/loginpage.css';
import {  Route } from "react-router-dom";
import {usercontext} from './Context/usercontext';

import Calender from './calendar';
import { color } from "@mui/system";

const Login = () => {
const {notloggedin,setloginstatus,userid,setuserid}=useContext(usercontext);    
const [useremail,setuseremail]=useState("");
const [password,setpassword]=useState("");
const [lmail,setlmail]=useState("");
const [pass,setpass]=useState("");
const [message,setmessage]=useState("");

const registeruser=()=>{
    console.log(useremail+password);
    Axios.post("https://planzap.herokuapp.com/usercreate",{
        useremail:useremail,
        password:password}).then(()=>{console.log("SUCCESS USER ADDED")})
}



const loginuser=()=>{
    Axios.post("https://planzap.herokuapp.com/userlogin",{
        useremail:lmail,
        password:pass}).then((response)=>{
            if(response.data.message)
            {
setmessage(response.data.message);
            }
        else
        {      
            setuserid(response.data[0].userid);

            setloginstatus(false);
               
        }

        })

}

  return <div className="loginpage">
      <div style={{position:"Absolute",marginTop:"5vh", fontSize:"15vh",fontFamily:"Pacificio",fontWeight:"bolder",color:"rgb(255, 183, 1)",textAlign:"right",width:"100vw"}} >PlanZap &nbsp; </div>

      <div style={{position:"Absolute",marginTop:"21.7vh",fontSize:"3vh",fontFamily:"cursive",width:"100vw",textAlign:"right",color:"black"}} >One Place for your notes, goals, movies, personal diary and more ! &nbsp; &nbsp; &nbsp;</div>
      <img style={{position: "fixed", bottom: 0, right: "5vw", width: "30vw",}} src="https://image.freepik.com/free-vector/flat-creativity-concept-illustration_52683-64279.jpg"></img>
<div className="loginbox" >
    <div className="loginform">
        <center>
        <i>"A good plan today is better than a perfect plan tomorrow"</i>
        <br/>
        <br/>
        <div className="heading" style={{fontSize:"5vh",fontWeight:"400", color:"rgb(255, 183, 1)"}}>
        <b>LOGIN</b>
            </div>
            <br/>
            
        <br/>
        <form autocomplete="false">
        
    <input type="email" id="emailid" maxlength="40" name="emailid" className="holders" placeholder="Email" onChange={(event)=>{setlmail(event.target.value)}}/>
    <br/>
    <br/>

    <input type="password" id="lpassword" maxlength="10" name="password" className="holders" placeholder="Password" onChange={(event)=>{setpass(event.target.value)}}/>
    <br/>
    <br/>    <br/>
<button onClick={loginuser}><b>Sign In</b></button>
<div>{message}</div>
<br/>
<br/>
Visiting for the first time? &nbsp; &nbsp;<button>Register here!</button>
</form>
</center>
        </div>
        
    </div>

  </div>;
};
        


export default Login;
