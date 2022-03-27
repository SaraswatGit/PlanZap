import React, { useState, useContext, useEffect } from "react";
import "./CSSComponents/calendarstyle.css";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "react-modal";
import { putRequest, postRequest, deleteRequest } from './axiosClient';
import { usercontext } from "./Context/usercontext";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";  
import "./CSSComponents/delete.css";
import CircularProgress from "@mui/material/CircularProgress";
const { format } = require("date-fns");

Modal.setAppElement("#root");

const Calender = (props) => {
  function daysLeft(a) {
    //calculates the number of days left
    var x = Date.now();
    var timeDiff = Date.parse(a.deadline) - x;
    var noOfDays = timeDiff / (1000 * 60 * 60 * 24);
    return noOfDays;
  }

  function weightedPriority(pr, d, progress) {
    var wP = d / ((100 - progress) * pr);
    return wP;
  }

  function getFormattedDate(val) {
    var ts = Date.parse(val);
    var n = new Date(ts);
    return n.getDate() + "/" + (n.getMonth() + 1) + "/" + n.getFullYear();
  }

  function priorityNumVal(a) {
    //gets priority as an integer (1-3)
    switch (a.priority) {
      case "Highest Priority":
        return 3;

      case "Medium Priority":
        return 2;

      case "Lowest priority":
        return 1;

      default:
        break;
    }
  }

  const [taskname, settask] = useState("");
  const [priority, setpriority] = useState("");
  const [deadline, setdeadline] = useState("");
  const [isPopup, setPopup] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { userid, setuserid } = useContext(usercontext);
  const [isLoader, setIsLoader] = useState(true);

  const [isSortPopup, setSortPopup] = useState(false);
  const today = new Date().toISOString().split("T")[0];
  const [deleteTaskID, setDeleteTaskID] = useState(null);

  console.log(setuserid); //This is for removing warning only

  const [tasklist, settasklist] = useState([]);

  var taskArr = [...tasklist];
  const [sortedTasks, setSortedTasks] = useState(taskArr);

  const [progress, setprogress] = useState();
  const [sortType, setSortType] = useState({ sortBy: "default" });

  const handleChange = (e) => {
    const value = e.target.value;
    setSortType({
      ...sortType,
      sortBy: value,
    });

    if (e.target.value === "deadline") {
      taskArr.sort((a, b) => {
        if (a.deadline < b.deadline) {
          return -1;
        } else if (a.deadline > b.deadline) {
          return 1;
        } else {
          return 0;
        }
      });

      setSortedTasks(taskArr);
    } else if (e.target.value === "workleft") {
      taskArr.sort((a, b) => {
        return a.progress - b.progress;
      });
      setSortedTasks(taskArr);
    } else {
      taskArr.sort((a, b) => {
        let prA = priorityNumVal(a),
          prB = priorityNumVal(b),
          dA = daysLeft(a),
          dB = daysLeft(b);
        return (
          weightedPriority(prA, dA, a.progress) -
          weightedPriority(prB, dB, b.progress)
        );
      });
      setSortedTasks(taskArr);
    }
  };

  const deletetask = (id) => {
    deleteRequest(`deletetask/${id}`).then(
      (response) => {
        settasklist(
          tasklist.filter((val) => {
            return val.taskid !== id;
          })
        );
      }
    );
  };

  const taskComplete = (id) => {
    //when finishes a task, confetti celeb action
    props.setConfetti(true);

    deleteRequest(`deletetask/${id}`).then(
      (response) => {
        settasklist(
          tasklist.filter((val) => {
            return val.taskid !== id;
          })
        );
      }
    );

    //after 5s remove confetti and delete task
    setTimeout(() => {
      props.setConfetti(false);
    }, 5000);
  };

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  function toggleTaskSort() {
    setSortPopup(!isSortPopup);
  }

  useEffect(() => {
    setIsLoader(true);

    postRequest("gettaskdata", {
      userid: userid,
    }).then((response) => {
      setIsLoader(false);
      settasklist(response.data);
    });
  }, [userid]);

  const checktask = () => {
    let tn = document.getElementById("taskname");
    let d = document.getElementById("date");
    let p = document.getElementById("priority");
    console.log(tn.value);
    if (tn.value !== "" && d.value !== "" && p.value !== "") {
      return 1;
    } else {
      return 0;
    }
  };

  const addtask = () => {
    postRequest("addtask", {
      taskname: taskname,
      priority: priority,
      deadline: deadline,
      userid: userid,
    }).then(() => {
      postRequest("gettaskdata", {
        userid: userid,
      }).then((response) => {
        settasklist(response.data);
      });
      // console.log(typeof deadline);
      // console.log("success");
      // console.log(taskname);
    });

    settask("");
    setpriority("");
    setdeadline("");

    toggleModal();
  };
  const updateprogess = (id) => {
    putRequest("updateprog", {
      id: id,
      progress: progress,
    }).then((response) => {
      postRequest("gettaskdata", {
        userid: userid,
      }).then((response) => {
        settasklist(response.data);
      });
      console.log("updated");
    });
  };

  if (isLoader) {
    return (
      <div>
        <div className="loader">
          <CircularProgress color="inherit" size="80px" value={progress} />
        </div>

        <div className="bottompart sider">
          <div className="prioritydesc">
            <div className="redbox"></div>
            High Priority
          </div>
          <div className="prioritydesc">
            <div className="yellowbox"></div>
            Medium Priority
          </div>
          <div className="prioritydesc">
            <div className="violetbox"></div>
            Low Priority
          </div>

          <div className="newtaskbutton" onClick={toggleModal}>
            Add new task
          </div>

          <div className="newtaskbutton" onClick={toggleTaskSort}>
            Sort tasks
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="calpage">
      <div className="toppart">
        {tasklist.map((val, index) => {
          return (
            <div
              key={index}
              className={
                val.priority === "Highest Priority"
                  ? "commonbox taskbox"
                  : val.priority === "Medium Priority"
                  ? "commonbox mediumtaskbox"
                  : "commonbox lowtaskbox"
              }
            >
              <div
                className="toppar2"
                style={{
                  width: "13vw",

                  paddingTop: "0.5vh",
                  height: "4vh",
                  fontSize: "2vh",
                }}
              >
                <span
                  className="forhover"
                  style={{
                    width: "1.3vw",
                    height: "1.4vw",
                    marginRight: "11vw",
                    padding: "0.5vh",
                    fontSize: "2vh",
                  }}
                >
                  {" "}
                </span>
                <span
                  className="forhover"
                  style={{ width: "2vw", height: "2vw" }}
                >
                  {" "}
                  <CloseIcon
                    className="hoverOnCursor"
                    onClick={() => {
                      setPopup(true);
                      setDeleteTaskID(val.taskid);
                    }}
                    style={{ width: "1.6vw", height: "1.6vw" }}
                  />
                </span>

                <Modal
                  isOpen={isPopup}
                  onRequestClose={() => {
                    setPopup(false);
                  }}
                  style={{
                    overlay: {
                      backgroundColor: "rgba(0, 0, 0, 0.75)",
                    },
                    content: {
                      width: "30vw",
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
                  <h2 className="delete-message">
                    Do you want to delete the task?
                  </h2>
                  <div className="delete-btns">
                    <button
                      onClick={() => {
                        deletetask(deleteTaskID);
                        setPopup(false);
                      }}
                      className="popupBtn confirm-btn"
                      style={{ backgroundColor: "red" }}
                    >
                      confirm
                    </button>

                    <button
                      onClick={() => {
                        setPopup(false);
                      }}
                      className="popupBtn cancel-btn"
                    >
                      cancel
                    </button>
                  </div>
                </Modal>
              </div>
              <div
                style={{
                  height: "10vh",
                  width: "13vw",
                  fontStyle: "italic",
                  fontWeight: "bold",
                  textAlign: "center",
                  fontSize: "2vh",
                }}
              >
                {val.taskname}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "13vw",
                  fontWeight: "bolder",
                  fontSize: "2.1vh",
                }}
              >
                {" "}
                Task Progress
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "2vh",
                }}
              >
                <Box style={{ textAlign: "center" }} width={150}>
                  <Slider
                    className="slider"
                    size="small"
                    defaultValue={val.progress}
                    aria-label="Small"
                    valueLabelDisplay="auto"
                    onChange={(event) => {
                      setprogress(event.target.value);
                      updateprogess(val.taskid);
                    }}
                    onChangeCommitted={(event) => {
                      setprogress(event.target.value);
                      updateprogess(val.taskid);
                    }}
                    // style={{ width: "10vw" }}
                  />
                </Box>
              </div>{" "}
              <div
                style={{
                  height: "7vh",
                  fontWeight: "bold",
                  textAlign: "center",
                  fontSize: "2vh",
                }}
              >
                Deadline : {format(new Date(val.deadline), "PPPP")}
              </div>
              <div
                style={{
                  height: "5vh",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  className="buthover"
                  onClick={() => {
                    taskComplete(val.taskid);
                  }}
                >
                  Done
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="bottompart">
        <div className="prioritydesc">
          <div className="redbox"></div>
          High Priority
        </div>
        <div className="prioritydesc">
          <div className="yellowbox"></div>
          Medium Priority
        </div>
        <div className="prioritydesc">
          <div className="violetbox"></div>
          Low Priority
        </div>

        <div className="newtaskbutton" onClick={toggleModal}>
          Add new task
        </div>

        <div className="newtaskbutton" onClick={toggleTaskSort}>
          Sort tasks
        </div>
      </div>

      <Modal
        className="Sort-Tasks"
        isOpen={isSortPopup}
        onRequestClose={toggleTaskSort}
        contentLabel="Sort Task"
        style={{
          overlay: {
            backgroundColor: "rgba(255, 255, 255, 0.75)",
          },
          content: {
            height: "70vh",
            padding: "0",
            borderRadius: "10px",
            backgroundImage:
              "linear-gradient(to top left,grey, rgb(200, 187, 0))",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-around",
          },
        }}
      >
        <label style={{ fontSize: "2.4vh" }}>
          {" "}
          Sort by &nbsp;
          <select
            value={sortType.sortBy}
            onChange={handleChange}
            className="select-option hoverOnCursor decorated"
          >
            <option value="default"> --Select-- </option>
            <option value="deadline"> By nearest deadline </option>
            <option value="workleft">By most work left</option>
            <option value="both"> By both(weighted) </option>
          </select>
        </label>

        <div className="sorted-wrapper">
          <div className="task-object">
            <p className="task-elem-heading">Task Name</p>
            <p className="task-elem-heading">Progress</p>
            <p className="task-elem-heading">Priority</p>
            <p className="task-elem-heading">Deadline</p>
          </div>
          {sortedTasks.map((val, key) => {
            return (
              <div className="task-object">
                <p className="task-elem">{val.taskname}</p>
                <p className="task-elem">{0+val.progress}%</p>
                <p className="task-elem">{val.priority}</p>
                <p className="task-elem">{getFormattedDate(val.deadline)}</p>
              </div>
            );
          })}
        </div>
      </Modal>

      <Modal
        className="New-Task"
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="My dialog"
        style={{
          overlay: {
            backgroundColor: "rgba(255, 255, 255, 0.75)",
          },
          content: {
            height: "43vh",
            padding: "0",
            borderRadius: "10px",
            backgroundColor: "#222",
            color: "#fff",

            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflowX: "hidden",
          },
        }}
        centered
      >
        <div className="new-task-div">
          <div className="formarea">
            <label
              style={{ fontSize: "2.2vh", marginBottom: "0vh" }}
              htmlFor="taskname"
            >
              Task Name
            </label>
            <input
              type="text"
              id="taskname"
              maxLength="50"
              name="taskname"
              className="fields"
              placeholder="Max Characters:32"
              onChange={(event) => {
                settask(event.target.value);
              }}
              required
            />

            <label
              style={{ fontSize: "2.2vh", marginTop: "1vh" }}
              htmlFor="date"
            >
              Deadline
            </label>

            <input
              type="date"
              id="date"
              name="date"
              className="fields"
              min={today}
              onChange={(event) => {
                setdeadline(event.target.value);
              }}
              required
            />

            <label style={{ fontSize: "2.2vh" }} htmlFor="priority">
              Priority
            </label>
            <select
              id="priority"
              name="country"
              className="fields"
              onChange={(event) => {
                setpriority(event.target.value);
              }}
              required
            >
              <option></option>

              <option value="Highest Priority" class = "high">Highest Priority</option>
              <option value="Medium Priority" class = "med">Medium Priority</option>
              <option value="Low Priority" class = "low">Low Priority</option>
            </select>
            <input
              type="submit"
              value="Submit"
              className="subbut"
              style={{ marginTop: "1.5vh", fontSize: "2vh" }}
              onClick={() => {
                let a = checktask();
                console.log(a);
                a === 1 ? addtask() : alert("please fill all the fields");
              }}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default Calender;
