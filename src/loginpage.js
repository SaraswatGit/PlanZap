import Axios from "axios";
import React, { useState, useContext } from "react";
import "./CSSComponents/loginpage.css";
import { Route } from "react-router-dom";
import { usercontext } from "./Context/usercontext";
import ReactModal from "react-modal";
import MaintenanceImg from "./Context/maintenance.svg";

import Calender from "./calendar";
import { color } from "@mui/system";
import { visibleDays } from "react-big-calendar/lib/utils/dates";

const Login = () => {
  const { notloggedin, setloginstatus, userid, setuserid } =
    useContext(usercontext);
  const [useremail, setuseremail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [lmail, setlmail] = useState("");
  const [pass, setpass] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const [registerMessage, setRegisterMessage] = useState("");
  const [underMaintenance, setUnderMaintenance] = useState(true);

  const registeruser = (e) => {
    //console.log(useremail+password);


    e.preventDefault(); // added this line so that the default submission of form (which caused refreshing of the page)can be prevented and we get submit using post method.
    if (password === confirmPassword) {
      Axios.post("https://planzap.herokuapp.com/usercreate", {
        useremail: useremail,
        password: password,
      }).then(() => {
        setRegisterMessage("User Added Successfully.");
      });
    } else {
      setRegisterMessage("Please make sure your passwords match.");
    e.preventDefault();  // added this line so that the default submission of form (which caused refreshing of the page)can be prevented and we get submit using post method.
    if(password===confirmPassword){

    Axios.post("https://planzap.herokuapp.com/usercreate",{
        useremail:useremail,
        password:password}).then((response)=>{setRegisterMessage(response.data.message);})
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

const [modalIsOpen, setModalisOpen] = useState(false)

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
        <div >
        
    <input type="email" id="emailid" maxlength="40" name="emailid" className="holders" placeholder="Email" onChange={(event)=>{setlmail(event.target.value)}}/>
    <br/>
    <br/>

    <input type="password" id="lpassword" maxlength="10" name="password" autoComplete="new-password" className="holders" placeholder="Password" onChange={(event)=>{setpass(event.target.value)}}/>

<br/>
<br/>
<button onClick={loginuser}><b>Sign In</b></button>
            <div>{loginMessage}</div>

            <br/>
            
        
Visiting for the first time?
<br/>
<br/>

<button type="button" onClick={ () => setModalisOpen(true) }>Register here!</button>

</div>
</center>

<ReactModal isOpen = { modalIsOpen } onRequestClose = { () => setModalisOpen(false)} 

    style = {
        {
            overlay: {
            backgroundColor : "rgba(0, 0, 0, 0.8)",},

            content: {
                position: 'absolute',
                width: '44vw',
                height: '90vh',
                borderRadius: '20px 20px 20px 20px',
                overflow: 'visible',
                outline: 'none',
                padding: '0px',
                position: "fixed",
                left: '25vw',
                top: '5vh',

              }
        }
    }
  };

  const loginuser = () => {
    Axios.post("https://planzap.herokuapp.com/userlogin", {
      useremail: lmail,
      password: pass,
    }).then((response) => {
      if (response.data.message) {
        setLoginMessage(response.data.message);
      } else {
        setuserid(response.data[0].userid);

        setloginstatus(false);
      }
    });
  };

  const [modalIsOpen, setModalisOpen] = useState(false);

  return (
    <>
      {underMaintenance ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <img
            src={MaintenanceImg}
            alt="Maintenance"
            style={{
              height: "450px",
              width: "auto",
              marginTop: "3rem",
              paddingLeft: "1rem",
              paddingRight: "1rem",
            }}
          />
          <h1 style={{ fontSize: "48px", textAlign:"center" }}>We're under maintenance now!👨‍🔧</h1>
          <p style={{ fontSize: "24px", marginTop: "0", marginBottom: "0", textAlign:"center" }}>
            We expect this work to last about 1 hour. For any queries, please
            contact us via email at saraswatmajumder@gmail.com.
          </p>
          <p style={{ fontSize: "24px", marginTop: "0", marginBottom: "0", textAlign:"center" }}>
            We apologize for any inconvenience.
          </p>
        </div>
      ) : (
        <div className="loginpage">
          <div
            style={{
              position: "Absolute",
              marginTop: "5vh",
              fontSize: "15vh",
              fontFamily: "Pacificio",
              fontWeight: "bolder",
              color: "rgb(255, 183, 1)",
              textAlign: "right",
              width: "100vw",
            }}
          >
            PlanZap &nbsp;{" "}
          </div>

          <div
            style={{
              position: "absolute",
              marginTop: "21.7vh",
              fontSize: "3vh",
              fontFamily: "cursive",
              width: "100vw",
              textAlign: "right",
              color: "black",
            }}
          >
            One Place for your notes, goals, movies, personal diary and more !
            &nbsp; &nbsp; &nbsp;
          </div>
          <img
            style={{
              position: "fixed",
              bottom: 0,
              right: "5vw",
              width: "30vw",
            }}
            src="https://image.freepik.com/free-vector/flat-creativity-concept-illustration_52683-64279.jpg"
          />
          <div className="loginbox">
            <div className="loginform">
              <center>
                <i>
                  "A good plan today is better than a perfect plan tomorrow"
                </i>
                <br />
                <br />
                <div
                  className="heading"
                  style={{
                    fontSize: "5vh",
                    fontWeight: "400",
                    color: "rgb(255, 183, 1)",
                  }}
                >
                  <b>LOGIN</b>
                </div>
                <br />

                <br />
                <div>
                  <input
                    type="email"
                    id="emailid"
                    maxlength="40"
                    name="emailid"
                    className="holders"
                    placeholder="Email"
                    onChange={(event) => {
                      setlmail(event.target.value);
                    }}
                  />
                  <br />
                  <br />
                  <input
                    type="password"
                    id="lpassword"
                    maxlength="10"
                    name="password"
                    autoComplete="new-password"
                    className="holders"
                    placeholder="Password"
                    onChange={(event) => {
                      setpass(event.target.value);
                    }}
                  />
                  <br />
                  <br />
                  <button onClick={loginuser}>
                    <b>Sign In</b>
                  </button>
                  <div>{loginMessage}</div>
                  <br />
                  Visiting for the first time?
                  <br />
                  <br />
                  <button type="button" onClick={() => setModalisOpen(true)}>
                    Register here!
                  </button>
                </div>
              </center>

              <ReactModal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalisOpen(false)}
                style={{
                  overlay: {
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                  },

                  content: {
                    position: "absolute",
                    width: "44vw",
                    height: "90vh",
                    borderRadius: "20px 20px 20px 20px",
                    overflow: "visible",
                    outline: "none",
                    padding: "0px",
                    left: "25vw",
                    top: "5vh",
                  },
                }}
              >
                <div className="regform">
                  <center>
                    <br />
                    <div
                      className="heading"
                      style={{
                        fontSize: "5vh",
                        fontWeight: "400",
                        color: "rgb(255, 183, 1)",
                      }}
                    >
                      <b>REGISTER</b>
                    </div>
                    <br />

                    <br />
                    <form autocomplete="false">
                      <input
                        type="email"
                        id="emailid"
                        maxlength="40"
                        name="hidden"
                        className="holders"
                        autoComplete="false"
                        placeholder="Email"
                        onChange={(event) => {
                          setuseremail(event.target.value);
                        }}
                      />
                      <br />
                      <br />

                      <input
                        type="password"
                        id="password"
                        maxlength="10"
                        autoComplete="new-password"
                        name="password"
                        className="holders"
                        placeholder="Password"
                        onChange={(event) => {
                          setPassword(event.target.value);
                        }}
                      />

                      <br />
                      <br />

                      <input
                        type="password"
                        id="Cpassword"
                        maxlength="10"
                        name="Cpassword"
                        className="holders"
                        placeholder="Confirm Password"
                        onChange={(event) => {
                          setConfirmPassword(event.target.value);
                        }}
                      />

                      <br />
                      <br />
                      <br />
                      <div>
                        {registerMessage}
                        {}
                      </div>
                      <button onClick={registeruser}>
                        <b>Register Me!</b>
                      </button>

                      <div>{loginMessage}</div>
                    </form>
                  </center>
                  <br />
                </div>
              </ReactModal>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
