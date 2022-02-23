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
import { style } from "@mui/system";
import Idea from "./idea";

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
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="My dialog"
        style={{
          overlay: {
            backgroundColor: "rgba(255, 255, 255, 0.75)",
          },
          content: {
            width: "41vw",
            height: "50vh",
            margin: "auto",
            padding: "0",
            borderRadius: "10px",
            overflowX: "hidden",
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
            maxLength="40"
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
            style={{
              resize: "vertical",
            }}
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

      {idea_list.map((val, key) => {
        return (
          <Idea
            idea_list={val}
            deletenote={deletenote}
            update={update}
            settempid={settempid}
            setnewdesc={setnewdesc}
            setnewidea={setnewidea}
            settempdesc={settempdesc}
            tempidea={tempidea}
            tempideadesc={tempideadesc}
            settempidea={settempidea}
          />
        );
      })}

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
