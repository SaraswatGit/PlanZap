import "./CSSComponents/App.css";
import React, { useState, useEffect } from "react";
import Login from "./loginpage";
import Profile from "./profpage";
import { Routes, Route,NavLink } from "react-router-dom";
import Calender from "./calendar";
import Loader from "./LoadingScreen";
import Movies from "./movies";
import Ideas from "./ideas";
import Diary from "./diary";
import { usercontext } from "./Context/usercontext";
import { getRequest, postRequest, putRequest } from './axiosClient';
import Modal from "react-modal";
import ConfettiCeleb from "./ConfettiCeleb";
import MaintenanceImg from "./CSSComponents/maintenance.svg";
import HowToUse from "./HowToUse";
import Bookstoread from "./booksToRead";

import EditIcon from "@mui/icons-material/Edit";
import TaskIcon from "@mui/icons-material/Task";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import LogoutIcon from "@mui/icons-material/Logout";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";

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
    console.log("Clicked");
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
                  backgroundColor: "rgba(0, 0, 0, 0.75)",
                },
                content: {
                  width: "30vw",
                  height: "max-content",
                  margin: "auto",
                  padding: "10px",
                  borderRadius: "10px",
                  outline: "none",
                  border: "none",
                  backgroundImage:
                    "linear-gradient(to top left, rgba(255,255,255), teal)",
                },
              }}
            >
              <div className="quote-div">
                <label for="quote">New Quote</label>
                <textarea
                  id="quote"
                  name="userquote"
                  rows="5"
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
              </div>
            </Modal>
            {loading ? (
              <Loader />
            ) : notloggedin ? (
              <Login />
            ) : (
              <div>
                <div className="sidebar">
      {/*      <NavLink to="/Profile" className="barelement" activeClassName="selected">
                     <AccountCircleIcon />
                     &nbsp; &nbsp; Profile
              </NavLink>*/}
      <div className="quotearea">
        "{userquote}"<br />
        <EditIcon className="editbutton" onClick={toggleModal} />
      </div>
      <NavLink
        to="/TasksandProgress"
        className={({ isActive }) =>
          `link ${
            isActive
              ? "selected"
              : // Couldn't do this before!
                "barelement"
          }`
        }
      >
        <TaskIcon style={{ height: "2.8vh", marginRight: "1vw" }} />
        Tasks and Progress
      </NavLink>
      {/*  <NavLink to="/Performancegraphs" className="barelement" activeClassName="selected">
                     <ShowChartIcon/>      &nbsp; &nbsp;Performance Graphs
    </NavLink>*/}
      <NavLink
        to="/movieslist"
        className={({ isActive }) =>
          `link ${
            isActive
              ? "selected"
              : // Couldn't do this before!
                "barelement"
          }`
        }
      >
        <FormatListBulletedIcon
          style={{ height: "2.8vh", marginRight: "1vw" }}
        />{" "}
        Movies to Watch
      </NavLink>
      <NavLink
        to="/diary"
        className={({ isActive }) =>
          `link ${
            isActive
              ? "selected"
              : // Couldn't do this before!
                "barelement"
          }`
        }
      >
        <MenuBookIcon style={{ height: "2.8vh", marginRight: "1vw" }} />{" "}
        Personal Diary <br />
      </NavLink>
      <NavLink
        to="/ideasnotes"
        className={({ isActive }) =>
          `link ${
            isActive
              ? "selected"
              : // Couldn't do this before!
                "barelement"
          }`
        }
      >
        <CollectionsBookmarkIcon
          style={{ height: "2.8vh", marginRight: "1vw" }}
        />{" "}
        Ideas and Notes <br />
      </NavLink>
      <NavLink
        to="/bookstoread"
        className={({ isActive }) =>
          `link ${
            isActive
              ? "selected"
              : // Couldn't do this before!
                "barelement"
          }`
        }
      >
        <LocalLibraryIcon style={{ height: "2.8vh", marginRight: "1vw" }} />{" "}
        Books to Read <br />
      </NavLink>
      {/* <NavLink
                    to="/howtouse"
                    className={({ isActive }) =>
                      `link ${
                        isActive
                          ? "selected"
                          : // Couldn't do this before!
                            "barelement"
                      }`
                    }
                  >
                    <ListAltIcon
                      style={{ height: "2.8vh", marginRight: "1vw" }}
                    />{" "}
                    How To Use <br />
                  </NavLink> */}
      <div className="logout" onClick={logout} style={{ fontSize: "2.1vh" }}>
        <LogoutIcon style={{ height: "2.8vh", marginRight: "1vw" }} /> Log Out{" "}
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

                  <Routes>
                    ]
                    <Route
                      path="/"
                      element={<Calender setConfetti={setConfetti} />}
                    />
                    <Route path="/Profile" element={<Profile />}></Route>
                    <Route
                      path="/TasksandProgress"
                      element={<Calender setConfetti={setConfetti} />}
                    ></Route>
                    <Route path="/diary" element={<Diary />}></Route>
                    <Route path="/movieslist" element={<Movies />}></Route>
                    <Route path="/ideasnotes" element={<Ideas />}></Route>
                    <Route
                      path="/bookstoread"
                      element={<Bookstoread />}
                    ></Route>
                    <Route path="/howtouse" element={<HowToUse />}></Route>
                  </Routes>
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
