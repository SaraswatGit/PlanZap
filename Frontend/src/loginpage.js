import Axios from "axios";
import React, { useState, useContext } from "react";
import "./CSSComponents/loginpage.css";
import "./CSSComponents/AppLogin.css";
import { usercontext } from "./Context/usercontext";
import ReactModal from "react-modal";
import image from "./CSSComponents/Vector Image.jpg";

import PasswordStrengthMeter from "./PasswordStrengthMeter";

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
  const [passM, setPasssword] = useState("");
  const [passLogin, setLoginPasssword] = useState("");
  const registeruser = (e) => {
    //console.log(useremail+password);
    console.log(userid); //This is for removing warning only
    console.log(notloggedin); //This is for removing warning only

    e.preventDefault(); // added this line so that the default submission of form (which caused refreshing of the page)can be prevented and we get submit using post method.
    if (password === confirmPassword) {
      Axios.post("https://planzap.herokuapp.com/usercreate", {
        useremail: useremail,
        password: password,
      }).then((response) => {
        setRegisterMessage(response.data.message);

        Axios.post("https://planzap.herokuapp.com/userlogin", {
          useremail: useremail,
          password: password,
        }).then((response) => {
          if (response.data.message) {
            setLoginMessage(response.data.message);
          } else {
            setuserid(response.data[0].userid);
            setloginstatus(false);
          }
        });
      });
    } else {
      setRegisterMessage("Please make sure your passwords match.");
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
      <div className="container">
        <div className="mx-auto">
          <h1
            className="text-center"
            style={{
              fontFamily: "Pacificio",
              fontWeight: "bolder",
              color: "rgb(255, 183, 1)",
              marginBottom: "0px",
            }}
          >
            {" "}
            PlanZap
          </h1>

          <p
            style={{
              fontSize: "3vh",
              fontFamily: "cursive",
              textAlign: "center",
              color: "black",
              marginTop: "0px",
              padding: "20px",
            }}
          >
            One Place for your notes, goals, movies, personal diary and more!
          </p>
        </div>
        <div className="row  mt-2 ">
          <div className="col-md-6 col-lg-6 col-12 d-flex justify-content-center ">
            <div className="logincard">
              <center>
                <i>
                  "A good plan today is better than a perfect plan tomorrow"
                </i>
                <br />
                <br />
                <div
                  className="heading-login"
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
                  <form autocomplete="on">
                    <input
                      type="email"
                      id="emailid"
                      maxLength="40"
                      name="emailid"
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
                      maxLength="10"
                      name="password"
                      autoComplete="new-password"
                      placeholder="Password"
                      onChange={(event) => {
                        setpass(event.target.value);
                        // setPasssword(event.target.value);
                      }}
                    />
                  </form>
                  {/* <PasswordStrengthMeter passM={passM} /> */}
                  {/* Write PasswordMeter Code Here  */}
                  <br />
                  <br />
                  <button className="button" type="button" onClick={loginuser}>
                    <b>Sign In</b>
                  </button>
                  <div
                    className={loginMessage.length < 2 ? null : "status mt-2"}
                  >
                    {loginMessage}
                  </div>
                  <br />
                  Visiting for the first time?
                  <br />
                  <br />
                  <button
                    className="button"
                    type="button"
                    onClick={() => setModalisOpen(true)}
                  >
                    Register here!
                  </button>
                </div>
              </center>
            </div>
          </div>
          {/* part for image */}
          <div className="col-md-6 col-lg-6 col-12 d-flex justify-content-center direction">
           
            {/* </div> */}
            <div className="imagewrap">
              <div className="img">
                <img
                  src={image}
                  alt="planzap graphics"
                  className="img-fluid imgcss"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalisOpen(false)}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.8)",
          },

          content: {
            position: "absolute",
            height: "90vh",
            borderRadius: "20px 20px 20px 20px",
            overflow: "visible",
            overflowY: "scroll",
            outline: "none",
            padding: "0px",
          },
        }}
        className="reg-modal regsiterouter mx-auto"
      >
        <div className="row mx-auto regrow">
          <div className="col-md-12 col-lg-12 col-12 d-flex justify-content-center direction registerwrap">
            <h1
              className="text-center"
              style={{
                fontFamily: "Pacificio",
                fontWeight: "bolder",
                color: "rgb(255, 183, 1)",
                marginBottom: "0px",
              }}
            >
              {" "}
              REGISTER
            </h1>
            <form autocomplete="false" className="form ">
              <input
                type="email"
                id="emailid"
                maxLength="40"
                name="hidden"
                className="registerinput mx-auto"
                autoComplete="false"
                placeholder="Email"
                onChange={(event) => {
                  setuseremail(event.target.value);
                }}
              />
              {/* <br />
              <br /> */}

              <input
                type="password"
                id="password"
                maxLength="10"
                autoComplete="new-password"
                name="password"
                className="registerinput"
                placeholder="Password"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />

              {/* <br />
              <br /> */}

              <input
                type="password"
                id="Cpassword"
                maxLength="10"
                name="Cpassword"
                className="registerinput"
                placeholder="Confirm Password"
                onChange={(event) => {
                  setConfirmPassword(event.target.value);
                  setPasssword(event.target.value);
                }}
              />
              <PasswordStrengthMeter passM={passM} />

              <div className="status">status: {registerMessage}</div>
              <button className="button" onClick={registeruser}>
                <b>Register Me!</b>
              </button>

              <div>{loginMessage}</div>
            </form>
          </div>
        </div>
      </ReactModal>
    </>
  );
};

export default Login;
