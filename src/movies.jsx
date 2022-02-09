import React, { useState, useEffect, useContext } from "react";
import "./CSSComponents/movies.css";
import Axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "react-modal";
import { usercontext } from "./Context/usercontext";
import "./CSSComponents/delete.css";
import CancelIcon from "@mui/icons-material/Cancel";

Modal.setAppElement("#root");

const Movies = () => {
  const [movie_name, setmoviename] = useState("");
  const [movie_rating, setmovierating] = useState(0);
  const [movie_desc, setmoviedesc] = useState("");
  const [movielist, setmovielist] = useState([]);
  const [newname, setnewname] = useState(0);
  const [newdesc, setnewdesc] = useState(0);
  const [tempname, settempname] = useState("");
  const [tempdesc, settempdesc] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  //const [defaulttext, setdefaulttext] = useState("");
  const [tempid, settempid] = useState(0);

  const [isLoading, setLoading] = useState(true);

  const { userid, setuserid } = useContext(usercontext);

  const [isPopup, setPopup] = useState(false);

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  // function updatedesc(num,text,text){

  //     setdefaulttext(text);
  //     setnewname(text);
  //     setnewdesc(text);
  //     settempid(num);
  //     toggleModal();
  // }

  const updatemovie = () => {
    console.log(tempid);
    Axios.put("https://planzap.herokuapp.com/updatedesc", {
      id: tempid,
      movie_name: newname,
      movie_desc: newdesc,
    }).then((response) => {
      console.log("updated");
    });
  };

  const addmovie = () => {
    Axios.post("https://planzap.herokuapp.com/create", {
      movie_name: movie_name,
      movie_rating: movie_rating,
      movie_desc: movie_desc,
      userid: userid,
    }).then(() => {
      Axios.post("https://planzap.herokuapp.com/getdata", {
        userid: userid,
      }).then((response) => {
        setmovielist(response.data);
      });
      console.log("success");
    });
  };

  useEffect(() => {
    setLoading(true);
    Axios.post("https://planzap.herokuapp.com/getdata", {
      userid: userid,
    }).then((response) => {
      setmovielist(response.data);
    });
    setLoading(false);
  }, []);

  const deletemovie = (id) => {
    Axios.delete(`https://planzap.herokuapp.com/deletemovie/${id}`).then(
      (respose) => {
        setmovielist(
          movielist.filter((val) => {
            return val.id !== id;
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
    <div className="moviesback">
      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="My dialog2"
        style={{
          overlay: {
            backgroundColor: "rgba(255, 255, 255, 0.75)",
          },
          content: {
            width: "40vw",
            height: "30vh",
            margin: "auto",
            padding: "0",
            borderRadius: "10px",
            borderColor: "red",
            backgroundColor: "green",
            paddingLeft: "15px",
            paddingTop: "15px",
          },
        }}
      >
        <div>
          <label for="mname">
            <b>Edit Movie Name</b>
          </label>
          <br />
          <textarea
            id="mname"
            name="moviename"
            rows="2"
            cols="40"
            maxlength="60"
            className="donkey"
            defaultValue={tempname}
            onChange={(event) => {
              setnewname(event.target.value);
            }}
          ></textarea>
          <br />

          <label for="mdesc">
            <b>Edit Movie Description</b>
          </label>
          <br />
          <textarea
            id="mdesc"
            name="moviedescription"
            rows="2"
            cols="40"
            maxlength="60"
            className="donkey"
            defaultValue={tempdesc}
            onChange={(event) => {
              setnewdesc(event.target.value);
            }}
          ></textarea>
          <br />
          <button
            onClick={() => {
              updatemovie();
              toggleModal();
            }}
          >
            Save
          </button>
        </div>
      </Modal>

      <div className="topbar">
        <div className="moviename">Title</div>
        <div className="movierating">IMDb</div>
        <div className="moviedesc">Description</div>
      </div>

      <div>
        {movielist.map((val, key) => {
          return (
            <div className="topbar2">
              <div className="moviename2">{val.movie_name}</div>
              <div className="movierating2">{val.movie_rating}</div>
              <div
                className="moviedesc2"
                style={{ paddingRight: "transparent" }}
              >
                {val.movie_desc}
                <EditIcon
                  style={{ paddingLeft: "30px", height: "3.2vh" }}
                  onClick={() => {
                    settempname(val.movie_name);
                    settempdesc(val.movie_desc);
                    setnewname(val.movie_name);
                    setnewdesc(val.movie_desc);
                    settempid(val.id);
                    toggleModal();
                  }}
                />

                <button
                  style={{
                    backgroundColor: "transparent",
                    height: "3vh",
                    marginLeft: "1vw",
                    fontSize: "1.6vh",
                    textAlign: "center",
                  }}
                  onClick={() => {
                    setPopup(true);
                  }}
                >
                  Delete
                </button>
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
                  Do you want to delete the movie?
                </h2>
                <div className="delete-btns">
                  <button
                    onClick={() => {
                      deletemovie(val.id);
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

      <div className="entrybox">
        <div className="Heading" style={{ fontSize: "3vh" }}>
          Enter the Movie Details here
        </div>
        <div className="formbox">
          <label for="mname" style={{ fontSize: "2vh" }}>
            Movie Name
          </label>
          <br />
          <input
            style={{ fontSize: "2vh" }}
            type="text"
            id="mname"
            maxlength="40"
            name="moviename"
            className="donkey"
            placeholder="Eg: Mission Impossible : Rogue Nation "
            onChange={(event) => {
              setmoviename(event.target.value);
            }}
          />
          <br />
          <label style={{ fontSize: "2vh" }} for="mrating">
            IMDb rating
          </label>
          <br />
          <input
            style={{ fontSize: "2vh" }}
            type="text"
            id="mrating"
            maxlength="3"
            name="movierating"
            className="donkey"
            placeholder="Eg: 8.4"
            onChange={(event) => {
              setmovierating(event.target.value);
            }}
          />
          <br />
          <label style={{ fontSize: "2vh" }} for="mdesc">
            Movie Description
          </label>
          <br />
          <textarea
            style={{ fontSize: "2vh" }}
            id="mdesc"
            name="moviedescription"
            rows="2"
            cols="40"
            maxlength="73"
            className="donkey"
            placeholder="Eg:Oscar Nominated, Action,Directed By : Michael Scott , Based on Iraq Wars"
            onChange={(event) => {
              setmoviedesc(event.target.value);
            }}
          ></textarea>
          <input
            type="submit"
            value="Submit"
            className="subm2"
            onClick={addmovie}
          />
        </div>
      </div>

      <div></div>
    </div>
  );
};

export default Movies;
