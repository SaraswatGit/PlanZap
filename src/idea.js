import React, { useState, useEffect, useContext } from "react";
import "./CSSComponents/ideas.css";

import EditIcon from "@mui/icons-material/Edit";
import Modal from "react-modal";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import "./CSSComponents/delete.css";
import CancelIcon from "@mui/icons-material/Cancel";
import { Update } from "@mui/icons-material";

function Idea({
  idea_list,
  deletenote,
  update,
  tempidea,
  settempidea,
  tempideadesc,
  settempdesc,
  setnewidea,
  setnewdesc,
  settempid,
}) {
  const [isedit, setIsedit] = useState(false);
  const [isPopup, setPopup] = useState(false);

  // console.log(idea_list)

  return (
    <div>
      <div className="ideabox">
        <div className="ideaboxtop">
          {isedit ? (
            <div >
              <input
                type="text"
                defaultValue={tempidea}
                onChange={(event) => {
                  setnewidea(event.target.value);
                }}
                className="ideainput"
              />
            </div>
          ) : (
            idea_list.idea_name
          )}

          <div
            style={{
             
              fontSize: "1.5vh",
              display:"flex",
              flexDirection:"row"
            }}
          >
            {isedit ? (
              <div>
                <button className="savebtn"
                  onClick={() => {
                    update();

                    setIsedit(false);
                  }}
                >
                  Save
                </button>
              </div>
            ) : (
              <EditIcon
                onClick={() => {
                  settempidea(idea_list.idea_name);
                  settempdesc(idea_list.idea_desc);
                  setnewidea(idea_list.idea_name);
                  setnewdesc(idea_list.idea_desc);
                  settempid(idea_list.ideaid);
                  setIsedit(true);
                }}
              />
            )}
            &nbsp;{" "}
            <CloseIcon
              onClick={() => {
                setIsedit(false);
                setPopup(true);
              }}
            />{" "}
          </div>
        </div>

        <div className="ideaboxbottom">
          {isedit ? (
            <div>
              {" "}
              <input
                type="text"
                className="ideainput"
                defaultValue={tempideadesc}
                onChange={(event) => {
                  setnewdesc(event.target.value);
                }}
              />{" "}
            </div>
          ) : (
            idea_list.idea_desc.split("\n").map((text) => (
              <div>
                {text}
                <br />
              </div>
            ))
          )}
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
              height: "50vh",
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
          <h2 className="delete-message">Do you want to delete the idea?</h2>
          <div className="delete-btns">
            <button
              onClick={() => {
                deletenote(idea_list.ideaid);
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
    </div>
  );
}

export default Idea;
