import "./CSSComponents/App.css";
import React, { useState, useEffect } from "react";
import Login from "./loginpage";
import Profile from "./profpage";
import { Routes, Route } from "react-router-dom";
import Calender from "./calendar";
import Loader from "./LoadingScreen";
import Movies from "./movies";
import Ideas from "./ideas";
import Diary from "./diary";
import { usercontext } from "./Context/usercontext";
import LogoutIcon from "@mui/icons-material/Logout";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { getRequest, postRequest, putRequest } from './axiosClient';
import Modal from "react-modal";
import ConfettiCeleb from "./ConfettiCeleb";
import MaintenanceImg from "./CSSComponents/maintenance.svg";
import HowToUse from "./HowToUse";
import Bookstoread from "./booksToRead";

import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";

import EditIcon from "@mui/icons-material/Edit";
import Sidebar from './Components/Sidebar'
Modal.setAppElement("#root");


function App() {
  const [confetti, setConfetti] = useState(false);
  const [notloggedin, setloginstatus] = useState(true);
  const underMaintenance = false;
  const [userquote, setuserquote] = useState(null);
  const [usernewquote, setnewuserquote] = useState(null);
  const [userid, setuserid] = useState(0);
  const [loading, setloading] = useState(true);
  const [logoutstatus, setlogout] = useState(false);
  //const history=useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const [isHowToUseModal, setIsHowToUseModal] = useState(false);
  const [sideOpen,issideOpen]=useState(false);

  function checkHowToUseModal() {
    if (!localStorage.getItem("isVisited")) {
      localStorage.setItem("isVisited", "yes");
      setIsHowToUseModal(true);
    }
  }

  useEffect(() => {
    checkHowToUseModal();
  }, [isHowToUseModal]);

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  const logout = () => {
    setlogout(true);
    setloginstatus(true);
    setloading(true);
    putRequest("logout", { status: true }).then(
      (response) => {
        setloginstatus(true);
        setloading(false);
      }
    );
  };

  //loggedin=
  useEffect(() => {
    getRequest("slogin").then((response) => {
      if (response.data.loggedin === true && logoutstatus === false) {
        setloginstatus(false);
        setuserid(response.data.user.userid);
        console.log("user ID :" + userid);
      }
      setloading(false);
    });
    postRequest("getquote", {
      userid: userid,
    }).then((response) => {
      setuserquote(response.data.userquote);
      console.log(userquote);
    });
  });
  const updateuserquote = () => {
    console.log(userid + " ok " + userquote);
    putRequest("updatequote", {
      id: userid,
      userquote: usernewquote ? usernewquote : userquote,
    }).then((response) => {
      postRequest("getquote", {
        userid: userid,
      }).then((response) => {
        setuserquote(response.data.userquote);
        console.log(userquote);
      });
      console.log("updated");
    });
  };
  console.log("user ID 2 :" + userid);
  return (
    <div>
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
          <h1 style={{ fontSize: "48px", textAlign: "center" }}>
            We're under maintenance now!👨‍🔧
          </h1>
          <p
            style={{
              fontSize: "24px",
              marginTop: "0",
              marginBottom: "0",
              textAlign: "center",
            }}
          >
            We expect this work to last about 1 hour. For any queries, please
            contact us via email at saraswatmajumder@gmail.com.
          </p>
          <p
            style={{
              fontSize: "24px",
              marginTop: "0",
              marginBottom: "0",
              textAlign: "center",
            }}
          >
            We apologize for any inconvenience.
          </p>
        </div>
      ) : (
        <div className="App">
          {confetti && <ConfettiCeleb />}

          <usercontext.Provider
            value={{ notloggedin, setloginstatus, userid, setuserid }}
          >
            <Modal
              isOpen={isOpen}
              onRequestClose={toggleModal}
              contentLabel="My dialog2"
              style={{
                overlay: {
                  backgroundColor: "rgba(255, 255, 255, 0.75)",
                },
                content: {
                  width: "30vw",
                  height: "max-content",
                  margin: "auto",
                  padding: "0",
                  borderRadius: "10px",
                  borderColor: "red",
                  backgroundImage:
                    "linear-gradient(to top left, rgba(255,255,255), teal)",

                  paddingLeft: "15px",
                  paddingTop: "15px",
                },
              }}
            >
              <div className="quote-div">
                <label for="quote">New Quote</label>
                <textarea
                  id="quote"
                  name="userquote"
                  rows="3"
                  cols="20"
                  maxLength="57"
                  defaultValue={userquote}
                  onChange={(event) => {
                    setnewuserquote(event.target.value);
                  }}
                ></textarea>
                <br />
                <button
                  className="quote-btn"
                  onClick={() => {
                    updateuserquote();
                    toggleModal();
                  }}
                >
                  Save
                </button>
              </div>{" "}
            </Modal>
            {loading ? (
              <Loader />
            ) : notloggedin ? (
              <Login />
            ) : (
              <div>
                {" "}
                <div className={sideOpen?"sidebar":"sidebar close"}>
                   <div className="back-icon-side"  onClick={()=>{
                   issideOpen((val)=>{
                     return !val
                   })
                 }}>
                   {
                     sideOpen?<ArrowBackIosNewIcon/>:<ArrowForwardIosIcon/>
                   }
                     
                   </div>

                  <div className="quotearea">
                    <span className={sideOpen?"disQuote":"disQuote disappear"}>
                    {userquote}<br />

                    </span>
                    
                    <EditIcon className="editbutton" onClick={toggleModal} />
                  </div>
                  <Sidebar sideOpen={sideOpen}></Sidebar>
                  <div className="logout" onClick={logout} style={{ fontSize: "2.1vh" }}>
                  <LogoutIcon style={{ height: "2.8vh", marginRight: "1vw" }} /> {sideOpen?"Log Out":""}
                </div>
                  
                 
                   
                     
                  
                </div> 
                <div>
                  <Modal
                    isOpen={isHowToUseModal}
                    onRequestClose={() => {
                      setIsHowToUseModal(false);
                    }}
                    style={{
                      overlay: {
                        backgroundColor: "rgba(0, 0, 0, 0.75)",
                      },
                      content: {
                        width: "25vw",
                        height: "30vh",
                        margin: "auto",
                        padding: "1%",
                        borderRadius: "7px",
                        backgroundColor: "white",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "space-around",
                      },
                    }}
                    centered
                  >
                    <h2>Welcome to Planzapp</h2>
                    {/* <h3>
                      You are new here so, you can check how to use it properly
                    </h3>
                    <Link to="/howtouse">
                      <button
                        onClick={() => {
                          setIsHowToUseModal(false);
                        }}
                      >
                        How To Use
                      </button>
                    </Link> */}
                  </Modal>
                  <div className={sideOpen?"Route_container":"Route_container closed"}>
                  <Routes>
                    
                    <Route
                      path="/"
                      element={<Calender setConfetti={setConfetti} />}
                    />
                    <Route path="/Profile" element={<Profile />}></Route>
                    <Route
                      path="/TasksandProgress"
                      element={<Calender setConfetti={setConfetti} sideOpen={sideOpen} />}
                    ></Route>
                    <Route path="/diary" element={<Diary />}></Route>
                    <Route path="/movieslist" element={<Movies sideOpen={sideOpen}/>}></Route>
                    <Route path="/ideasnotes" element={<Ideas sideOpen={sideOpen} />}></Route>
                    <Route
                      path="/bookstoread"
                      element={<Bookstoread sideOpen={sideOpen}/>}
                    ></Route>
                    <Route path="/howtouse" element={<HowToUse />}></Route>
                  </Routes>

                  </div>

                  
                </div>
              </div>
            )}
          </usercontext.Provider>
        </div>
      )}{" "}
    </div>
  );
}


export default App;