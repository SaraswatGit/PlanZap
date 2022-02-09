import React, { useState, useEffect, useContext } from "react";
import "./CSSComponents/ideas.css";
import Axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "react-modal";
import { usercontext } from "./Context/usercontext";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import "./CSSComponents/delete.css";
import CancelIcon from "@mui/icons-material/Cancel";

Modal.setAppElement("#root");

const Ideas = () => {
  const { userid, setuserid } = useContext(usercontext);
  const [idea_name, setideaname] = useState("");
  const [idea_desc, setideadesc] = useState("");
  const [idea_list, setidealist] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  const [tempidea, settempidea] = useState("");
  const [tempideadesc, settempdesc] = useState("");
  const [newidea, setnewidea] = useState("");
  const [newdesc, setnewdesc] = useState("");
  const [tempid, settempid] = useState(0);

  const [isLoading, setLoading] = useState(true);

  const [isPopup, setPopup] = useState(false);

  function toggleModal() {
    setIsOpen(!isOpen);
  }
  function toggleModal2() {
    setIsOpen2(!isOpen2);
  }
  const addidea = () => {
    Axios.post("https://planzap.herokuapp.com/addidea", {
      idea_name: idea_name,
      idea_desc: idea_desc,
      userid: userid,
    }).then(() => {
      Axios.post("https://planzap.herokuapp.com/getideadata", {
        userid: userid,
      }).then((response) => {
        setidealist(response.data);
      });
      console.log("success");
    });
  };

  useEffect(() => {
    setLoading(true);

    Axios.post("https://planzap.herokuapp.com/getideadata", {
      userid: userid,
    }).then((response) => {
      setidealist(response.data);
    });
    setLoading(false);
  }, []);

  const update = () => {
    Axios.put("https://planzap.herokuapp.com/updateideadesc", {
      id: tempid,
      new_idea: newidea,
      new_desc: newdesc,
    }).then((response) => {
      Axios.post("https://planzap.herokuapp.com/getideadata", {
        userid: userid,
      }).then((response) => {
        setidealist(response.data);
      });

      console.log("updated");
    });
  };

  const deletenote = (id) => {
    Axios.delete(`https://planzap.herokuapp.com/deleteidea/${id}`).then(
      (respose) => {
        setidealist(
          idea_list.filter((val) => {
            return val.ideaid !== id;
          })
        );
      }
    );
  };

  const mystyle = {
    color: "black",
    backgroundColor: "coral",

    fontFamily: "Arial",
    display: " flex",
    flexDirection: "column",
    width: "85vw",
    marginLeft: "15vw",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
  };

  if (isLoading) {
    return (
      <div style={mystyle}>
        <h2>Loading...</h2>
      </div>
    );
  }
  return (
    <div className="ideaspage">
      <Modal
        isOpen={isOpen2}
        onRequestClose={toggleModal}
        contentLabel="My dialog"
        style={{
          overlay: {
            backgroundColor: "rgba(255, 255, 255, 0.75)",
          },
          content: {
            width: "40vw",
            height: "43vh",
            margin: "auto",
            padding: "0",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            backgroundImage: "linear-gradient(to top left,grey, teal)",
          },
        }}
      >
        <div
          style={{
            position: "absolute",
            marginLeft: "38.3vw",
            marginTop: "0.2vh",
          }}
        >
          <CloseIcon onClick={toggleModal2} />
        </div>
        <div style={{ marginTop: "5vh", marginLeft: "2vw" }}>
          <label for="mname">Heading</label>
          <br />
          <input
            type="text"
            id="mname"
            maxlength="40"
            name="idea"
            className="fields"
            defaultValue={tempidea}
            onChange={(event) => {
              setnewidea(event.target.value);
            }}
          />
          <br />
          <br />
          <label for="mdesc">Description</label>
          <br />
          <textarea
            id="mdesc"
            name="description"
            rows="5"
            cols="40"
            className="fields"
            defaultValue={tempideadesc}
            onChange={(event) => {
              setnewdesc(event.target.value);
            }}
          ></textarea>
          <input
            type="submit"
            value="Submit"
            className="subm2"
            onClick={() => {
              update();
              toggleModal2();
            }}
          />
        </div>
      </Modal>
      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="My dialog"
        style={{
          overlay: {
            backgroundColor: "rgba(255, 255, 255, 0.75)",
          },
          content: {
            width: "40vw",
            height: "43vh",
            margin: "auto",
            padding: "0",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            backgroundImage: "linear-gradient(to top left,grey, teal)",
          },
        }}
      >
        <div
          style={{
            position: "absolute",
            marginLeft: "38.3vw",
            marginTop: "0.2vh",
          }}
        >
          <CloseIcon onClick={toggleModal} />
        </div>
        <div style={{ marginTop: "5vh", marginLeft: "2vw" }}>
          <label for="mname">Heading</label>
          <br />
          <input
            type="text"
            id="mname"
            maxlength="40"
            name="moviename"
            className="fields"
            onChange={(event) => {
              setideaname(event.target.value);
            }}
          />
          <br />
          <br />
          <label for="mdesc">Description</label>
          <br />
          <textarea
            id="mdesc"
            name="moviedescription"
            rows="5"
            cols="40"
            className="fields"
            onChange={(event) => {
              setideadesc(event.target.value);
            }}
          ></textarea>
          <input
            type="submit"
            value="Submit"
            className="subm2"
            onClick={() => {
              addidea();
              toggleModal();
            }}
          />
        </div>
      </Modal>

      <div>
        {idea_list.map((val, key) => {
          return (
            <div className="ideabox">
              <div className="ideaboxtop">
                {val.idea_name} &nbsp;{" "}
                <div
                  style={{
                    position: "absolute",
                    marginLeft: "77vw",
                    fontSize: "1.5vh",
                  }}
                >
                  <EditIcon
                    onClick={() => {
                      settempidea(val.idea_name);
                      settempdesc(val.idea_desc);
                      setnewidea(val.idea_name);
                      setnewdesc(val.idea_desc);
                      settempid(val.ideaid);
                      toggleModal2();
                    }}
                  />
                  &nbsp;{" "}
                  <CloseIcon
                    onClick={() => {
                      setPopup(true);
                    }}
                  />{" "}
                </div>
              </div>

              <div className="ideaboxbottom">
                {val.idea_desc.split("\n").map((text) => (
                  <div>
                    {text}
                    <br />
                  </div>
                ))}
              </div>

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
                    width: "35vw",
                    height: "45vh",
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
                <CancelIcon className="cross" />
                <h2 className="delete-message">
                  Do you want to delete the idea?
                </h2>
                <div className="delete-btns">
                  <button
                    onClick={() => {
                      deletenote(val.ideaid);
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
          );
        })}
      </div>
      <div
        className="newideabutton"
        onClick={toggleModal}
        style={{ fontSize: "2.5vh" }}
      >
        New Note &nbsp; <AddCircleOutlineIcon />
      </div>
    </div>
  );
};

export default Ideas;
