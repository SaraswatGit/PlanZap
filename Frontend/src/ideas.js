import React, { useState, useEffect, useContext } from "react";
import "./CSSComponents/ideas.css";
import { putRequest, postRequest, deleteRequest } from './axiosClient';

import Modal from "react-modal";
import { usercontext } from "./Context/usercontext";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import "./CSSComponents/delete.css";

import Idea from "./idea";

Modal.setAppElement("#root");

const Ideas = () => {
  const { userid, setuserid } = useContext(usercontext);
  const [idea_name, setideaname] = useState("");
  const [idea_desc, setideadesc] = useState("");
  const [idea_list, setidealist] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const [tempidea, settempidea] = useState("");
  const [tempideadesc, settempdesc] = useState("");
  const [newidea, setnewidea] = useState("");
  const [newdesc, setnewdesc] = useState("");
  const [tempid, settempid] = useState(0);

  console.log(setuserid); //This is for removing warning only

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  const addidea = () => {
    postRequest("addidea", {
      idea_name: idea_name,
      idea_desc: idea_desc,
      userid: userid,
    }).then(() => {
      postRequest("getideadata", {
        userid: userid,
      }).then((response) => {
        setidealist(response.data);
      });
      console.log("success");
    });
  };

  useEffect(() => {
    postRequest("getideadata", {
      userid: userid,
    }).then((response) => {
      setidealist(response.data);
    });
  }, [userid]);

  const update = () => {
    putRequest("updateideadesc", {
      id: tempid,
      new_idea: newidea,
      new_desc: newdesc,
    }).then((response) => {
      postRequest("getideadata", {
        userid: userid,
      }).then((response) => {
        setidealist(response.data);
      });

      console.log("updated");
    });
  };

  const deletenote = (id) => {
    deleteRequest(`deleteidea/${id}`).then(
      (respose) => {
        setidealist(
          idea_list.filter((val) => {
            return val.ideaid !== id;
          })
        );
      }
    );
  };

  return (
    <div className="ideaspage">
      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="My dialog"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.75)",
          },
          content: {
            width: "41vw",
            height: "55vh",
            margin: "auto",
            padding: "0",
            borderRadius: "5px",
            overflowX: "hidden",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "white",
          },
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #D9D9D9 ",
            paddingLeft: "1rem",
            fontWeight: "200",
            fontSize: "1.3rem",
          }}
        >
          Create New Note
          <CloseIcon onClick={toggleModal} className="hoverOnCursor dclose" />
        </div>
        <div style={{ marginLeft: "2vw" }}>
          <br />
          <input
            type="text"
            id="dname"
            maxLength="40"
            name="moviename"
            placeholder="Title"
            onChange={(event) => {
              setideaname(event.target.value);
            }}
          />

          <textarea
            style={{
              resize: "vertical",
            }}
            id="ddesc"
            name="moviedescription"
            rows="5"
            cols="40"
            placeholder="Your notes here..."
            onChange={(event) => {
              setideadesc(event.target.value);
            }}
          ></textarea>
          <div
            className="douter"
            onClick={() => {
              addidea();
              toggleModal();
            }}
          >
            <span className="dsubmit" b>
              ADD
            </span>
          </div>
        </div>
      </Modal>
      <div className="idea-box">
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
      </div>
      <div
        className="newideabutton hoverOnCursor"
        onClick={toggleModal}
        style={{ fontSize: "2.5vh" }}
      >
        <AddCircleOutlineIcon className="hoverOnCursor" sx={{fontSize: 40}} />
      </div>
    </div>
  );
};

export default Ideas;
