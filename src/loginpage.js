import  Axios  from "axios";
import React, { useState ,useContext } from "react";
import './CSSComponents/loginpage.css';
import {  Route } from "react-router-dom";
import {usercontext} from './Context/usercontext';

import Calender from './calendar';

const Login = () => {
const {notloggedin,setloginstatus,userid,setuserid}=useContext(usercontext);    
const [useremail,setuseremail]=useState("");
const [password,setPassword]=useState("");
const [confirmPassword,setConfirmPassword]=useState("");
const [lmail,setlmail]=useState("");
const [pass,setpass]=useState("");
const [loginMessage,setLoginMessage]=useState("");
const [registerMessage,setRegisterMessage]=useState("");

const registeruser=(e)=>{
    //console.log(useremail+password);

    e.preventDefault();  // added this line so that the default submission of form (which caused refreshing of the page)can be prevented and we get submit usinfg post method.
    if(password===confirmPassword){

    Axios.post("https://planzap.herokuapp.com/usercreate",{
        useremail:useremail,
        password:password}).then(()=>{setRegisterMessage("User Added Successfully.");})
    }
    else
    {
        setRegisterMessage("Please make sure your passwords match.");
    }
}
const loginuser=()=>{
    
    Axios.post("https://planzap.herokuapp.com/userlogin",{
        useremail:lmail,
        password:pass}).then((response)=>{
            if(response.data.message)
            {
setLoginMessage(response.data.message);
            }
        else
        {      
            setuserid(response.data[0].userid);

            setloginstatus(false);
               
        }

        })

}

  return <div className="loginpage">
      <div style={{position:"Absolute",marginTop:"5vh",fontSize:"15vh",fontFamily:"serif",fontWeight:"bolder",color:"grey",textAlign:"center",width:"100vw"}} >PlanZap</div>
      <div style={{position:"Absolute",marginTop:"21.7vh",fontSize:"3vh",fontFamily:"cursive",width:"100vw",textAlign:"center",color:"white"}} >One Place for managing Tasks, Personal Diary, Notes, movielist ! </div>
<div className="loginbox" >
    <div className="signinbox">
        <div className="heading" style={{fontSize:"5vh",fontWeight:"400"}}>
            Login
            </div>
            <br/>
            <br/>

        <label style={{fontSize:"2.5vh",fontWeight:"300"}} for="emailid"><b>E-Mail ID</b></label>
        <br/>
        
    <input style={{fontSize:"2.5vh"}} type="email" id="emailid" maxlength="40" name="emailid" className="holders" placeholder="Eg:abc@gmail.com" onChange={(event)=>{setlmail(event.target.value)}}/>
    <br/>
    <br/>
    <label style={{fontSize:"2.5vh",fontWeight:"300"}} for="lpassword"><b>Password</b></label>
        <br/>
    <input style={{fontSize:"2.5vh"}} type="password" id="lpassword" maxlength="40" name="password" className="holders"  onChange={(event)=>{setpass(event.target.value)}}/>
    <br/>
<br/>
<br/>
<button style={{backgroundColor:"teal",fontSize:"2vh", height:"auto",width:"auto",padding:"0.5vh",borderRadius:"10%",marginLeft:"10vw"}} onClick={loginuser}><b>Sign In</b></button>
            <div>{loginMessage}</div>
        </div>
        <div className="signinbox"  style={{border:"none",borderRight:"none"}}>
        <div className="heading"  style={{fontSize:"5vh",fontWeight:"400"}}>
            Register
            </div>
            <br/>
           

        <form autoComplete="false"   >
        <label style={{fontSize:"2.5vh",fontWeight:"300"}} for="emailid"><b>E-Mail ID</b></label>
        <br/>
        
    <input style={{fontSize:"2.5vh"}}  type="email" id="emailid" maxLength="40" name="hidden" autoComplete="false"  className="holders" placeholder="Eg:abc@gmail.com" onChange={(event)=>{setuseremail(event.target.value)}} />
    <br/>
    <br/>
    <label style={{fontSize:"2.5vh",fontWeight:"300"}} for="password"><b>Password</b></label>
        <br/>
    <input style={{fontSize:"2.5vh"}}  type="password" id="password" maxLength="10" name="password"  autoComplete="new-password" className="holders" onChange={(event)=>{setPassword(event.target.value)}} />
    <br/>
<br/>
<label style={{fontSize:"2.5vh",fontWeight:"300"}} for="Cpassword"><b>Confirm Password</b></label>
        <br/>
    <input style={{fontSize:"2.5vh"}} type="password" id="Cpassword" maxLength="10" name="Cpassword" className="holders" onChange={(event)=>{setConfirmPassword(event.target.value)}} />
    <br/>
<br/>
<br/>
<div>{registerMessage}</div>
<button style={{backgroundColor:"teal",fontSize:"2vh", height:"auto",width:"auto",padding:"0.5vh",borderRadius:"10%",marginLeft:"10vw"}} onClick={registeruser}><b>Sign Up</b></button>
    
            </form>
            </div>
    </div>

  </div>;
};

export default Login;
