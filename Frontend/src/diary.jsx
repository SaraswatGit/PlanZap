import React, { useState, useContext } from "react";
import "./CSSComponents/diary.css";
import { usercontext } from "./Context/usercontext";
import Modal from "react-modal";
import { putRequest, postRequest } from "./axiosClient";

const { format } = require("date-fns");

const Diary = () => {
  const { userid, setuserid } = useContext(usercontext);
  const [isOpen, setIsOpen] = useState(false);
  const [date, setdate] = useState(new Date());
  const [newdesc, setnewdesc] = useState("");
  const [desc, setdesc] = useState();
  const [entryexists, setentrystatus] = useState(false);
  const [errormessage, seterrormessage] = useState("");
  const [extracteddesc, setextracteddesc] = useState("");
  const [extractdate, setextractdate] = useState(false);
  const today = new Date().toISOString().split("T")[0];

  const [id, setid] = useState(0);
  console.log(today);

  console.log(setuserid); //This is for removing warning only
  console.log(id); //This is for removing warning only

  const toggleModal = () => {
    postRequest("getentry", {
      userid: userid,
      entry_date: date,
    }).then((response) => {
      if (response.data.message) {
        setentrystatus(false);
        setextracteddesc("");
        setextractdate("");
        setIsOpen(!isOpen);
      } else {
        setextractdate(response.data.entry_date);
        setentrystatus(true);
        setextracteddesc(response.data.data_entry);
        seterrormessage("");
        setnewdesc(response.data.data_entry);
        setIsOpen(!isOpen);

        setid(response.data.id);
      }
    });
  };
  /* useEffect(() => {
  
  }, [])*/
  const update = (e) => {
    putRequest("updatediary", {
      userid: userid,
      data_entry: newdesc,
      entry_date: date,
    }).then((response) => {
      console.log("updated");
    });
  };
  const add = (e) => {
    postRequest("insertdiary", {
      userid: userid,
      data_entry: desc,
      entry_date: date,
    }).then((response) => {
      console.log("inserted");
    });
  };
  const getentry = (datadate) => {
    postRequest("getentry", {
      userid: userid,
      entry_date: datadate,
    }).then((response) => {
      if (response.data.message) {
        seterrormessage(response.data.message);
        setentrystatus(false);
        setextracteddesc("");
        setextractdate("");
      } else {
        setextractdate(response.data.entry_date);
        setentrystatus(true);
        setextracteddesc(response.data.data_entry);
        seterrormessage("");

        setid(response.data.id);
      }
    });
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "85vw",
        marginLeft: "15vw",
        alignItems: "center",
        color: "black",
      }}
    >
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
            height: "50vh",
            margin: "auto",
            padding: "0",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            backgroundImage: "linear-gradient(to top left,grey, teal)",
            overflowX: "hidden",
          },
        }}
      >
        <div style={{ marginTop: "5vh", marginLeft: "2vw" }}>
          <label style={{ fontSize: "2.5vh" }}>
            {format(new Date(date), "PPPP")}
          </label>
          <br />
          <textarea
            id="mdesc"
            style={{
              fontSize: "2.2vh",
              resize: "vertical",
            }}
            name="entry"
            rows="10"
            cols="40"
            className="fields"
            maxLength="9800"
            defaultValue={extracteddesc}
            onChange={(event) => {
              entryexists
                ? setnewdesc(event.target.value)
                : setdesc(event.target.value);
            }}
          ></textarea>
          <br />
          <div className="btn-entry">
            <button
              className="add-entry"
              onClick={() => {
                entryexists ? update() : add();
                toggleModal();
                getentry(date);
              }}
            >
              {entryexists ? "Update" : "Add Entry"}
            </button>
          </div>
        </div>
      </Modal>
      <div className="datepicker">
        <input
          type="date"
          max={today}
          style={{
            height: "3vh",
            width: "auto",
            fontSize: "2vh",
            marginTop: "2vh",
          }}
          onChange={(event) => {
            setdate(event.target.value);
            getentry(event.target.value);
          }}
        />
      </div>
      <br />

      <div style={{ display: "flex", flexDirection: "row" }}>
        <button
          style={{
            height: "auto",
            width: "auto",
            background: `linear-gradient(to top left,teal, grey)`,
            fontWeight: "bold",
            fontSize: "2vh",
          }}
          onClick={toggleModal}
        >
          Update / Add
        </button>
        &nbsp;
      </div>
      <br />
      <div
        style={{
          width: "85vw",
          display: "flex",
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {errormessage}
      </div>
      <div
        style={{
          marginLeft: "2vw",
          width: "83vw",
          fontWeight: "bolder",
          fontSize: "3vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        {entryexists ? format(new Date(extractdate), "PPPP") : " "}
        {entryexists ? " ," : " "}
        {/*entryexists ? <DeleteIcon onClick={(id)=>{deleteentry(id)}} className="fhover"/>: " "*/}
      </div>

      <div
        style={{
          fontSize: "2.6vh",
          fontFamily: "cursive",
          marginTop: "0.5vh",
          marginLeft: "2vw",
          width: "83vw",
        }}
      >
        {entryexists
          ? extracteddesc.split("\n").map((text) => (
              <div>
                {text}
                <br />
              </div>
            ))
          : " "}
      </div>
    </div>
  );
};

export default Diary;
