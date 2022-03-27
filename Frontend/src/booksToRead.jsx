import React, { useState, useEffect, useContext } from "react";
import "./CSSComponents/movies.css";
import Axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "react-modal";
import { usercontext } from "./Context/usercontext";
import "./CSSComponents/delete.css";
import DeleteIcon from "@mui/icons-material/Delete";

Modal.setAppElement("#root");

const Books = (props) => {
  const [book_name, setbookname] = useState("");
  const [book_author, setbookauthor] = useState("");
  const [book_description, setbookdesc] = useState("");
  const [booklist, setbooklist] = useState([]);
  const [newname, setnewname] = useState("");
  const [newdesc, setnewdesc] = useState("");
  const [tempname, settempname] = useState("");
  const [tempdesc, settempdesc] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [tempid, settempid] = useState(0);
  const {sideOpen}=props;
  const { userid, setuserid } = useContext(usercontext);
  const [isPopup, setPopup] = useState(false);
  const [isRatingAsc, setIsRatingAsc] = useState(null);
  const booksListOrder = isRatingAsc
    ? booklist.sort((a, b) => (a.book_author < b.book_author ? 1 : -1))
    : booklist.sort((a, b) => (a.book_author > b.book_author ? 1 : -1));

  function toggleModal() {
    setIsOpen(!isOpen);
  }
  

  const updatebook = () => {
    console.log(tempid);
    Axios.put("https://planzap.herokuapp.com/update/description", {
      id: tempid,
      book_name: newname,
      book_description: newdesc,
    }).then((response) => {
      Axios.post("https://planzap.herokuapp.com/book/list", {
        userid: userid,
      }).then((response) => {
        setbooklist(response.data);
      });
      console.log("updated");
    });
  };

  const addbook = () => {
    if (!book_description || !book_name || !book_author) {
      alert("Enter all the fields");
      return;
    }
    const data = Axios.post("https://planzap.herokuapp.com/book/create", {
      book_name: book_name,
      book_author: book_author,
      book_description: book_description,
      userid: userid,
    }).then(() => {
      Axios.post("https://planzap.herokuapp.com/book/list", {
        userid: userid,
      }).then((response) => {
        setbooklist(response.data);
      });
      console.log("success");
    });
    if (data) {
      setbookdesc("");
      setbookname("");
      setbookauthor("");
    }
  };

  console.log(setuserid); //This is for removing warning only
  useEffect(() => {
    Axios.post("https://planzap.herokuapp.com/book/list", {
      userid: userid,
    }).then((response) => {
      setbooklist(response.data);
    });
  }, [userid]);

  const deletebook = (id) => {
    Axios.delete(`https://planzap.herokuapp.com/book/delete/${id}`).then(
      (respose) => {
        setbooklist(
          booklist.filter((val) => {
            return val.id !== id;
          })
        );
      }
    );
  };

  return (
    <div className={sideOpen?"moviesback":"moviesback increase"}>
      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="My dialog2"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            width: "40vw",
            height: "55vh",
            margin: "auto",
            padding: "0",
            borderRadius: "6px",
            borderColor: "red",

            background: "white",

            paddingLeft: "15px",
            paddingTop: "15px",
          },
        }}
      >
        <div className="movie-edit">
          <label for="mname">
            <b>Edit Book Title</b>
          </label>
          <br />
          <input
            id="mname"
            name="moviename"
            rows="2"
            cols="40"
            maxLength="60"
            className="donkey"
            defaultValue={tempname}
            onChange={(event) => {
              setnewname(event.target.value);
            }}
          />
          <br />
          <br />
          <label for="mdesc">
            <b>Edit Book Description</b>
          </label>
          <br />
          <textarea
            id="mdesc"
            name="moviedescription"
            rows="2"
            cols="40"
            maxLength="60"
            className="donkey"
            defaultValue={tempdesc}
            onChange={(event) => {
              setnewdesc(event.target.value);
            }}
          ></textarea>
          <br />
          <br />
          <button
            className="save-button"
            onClick={() => {
              updatebook();
              toggleModal();
            }}
          >
            Save
          </button>
        </div>
      </Modal>

      <div className="topbar">
        <div className="moviename">Title</div>
        <div className="movierating">
          Author
          <div
            className="rating-sort-btn"
            onClick={() =>
              isRatingAsc ? setIsRatingAsc(false) : setIsRatingAsc(true)
            }
            title="Sort by Rating"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              style={{ height: "20px", width: "20px", background: "none" }}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
        <div className="moviedesc">Description</div>
      </div>

      <div>
        {booksListOrder.map((val, key) => {
          return (
            <div className="topbar2">
              <div className="moviename2">
                <p>{val.book_name}</p>
              </div>
              <div className="movierating2">{val.book_author}</div>
              <div className="moviedesc2">
                <p>{val.book_description}</p>
                <div>
                  <EditIcon
                    className="edit-icon hoverOnCursor"
                    style={{ paddingLeft: "30px", height: "3.2vh" }}
                    onClick={() => {
                      settempname(val.book_name);
                      settempdesc(val.book_description);
                      setnewname(val.book_name);
                      setnewdesc(val.book_description);
                      settempid(val.id);
                      toggleModal();
                    }}
                  />
                  <DeleteIcon
                    className="trash-icon hoverOnCursor"
                    style={{ paddingLeft: "30px", height: "3.2vh" }}
                    onClick={() => {
                      setPopup(true);
                    }}
                  />
                </div>
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
                  Do you want to delete the book?
                </h2>
                <div className="delete-btns">
                  <button
                    onClick={() => {
                      deletebook(val.id);
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
        <div className="Heading">Enter the Book Details here</div>
        <br />
        <div className="formbox">
          <label for="mname">Book Title</label>
          <br />
          <br />
          <input
            type="text"
            id="mname"
            maxLength="40"
            name="moviename"
            className="donkey"
            value={book_name}
            placeholder="Harry Potter"
            onChange={(event) => {
              setbookname(event.target.value);
            }}
          />
          <br />
          <br />
          <label for="mrating">Author</label>
          <br />
          <br />
          <input
            type="text"
            id="mrating"
            // maxLength="3"
            name="movierating"
            className="donkey"
            value={book_author}
            placeholder="J.K Rowling"
            onChange={(event) => {
              setbookauthor(event.target.value);
            }}
          />
          <br />
          <br />
          <label for="mdesc">Book Description</label>
          <br />
          <textarea
            style={{
              resize: "vertical",
            }}
            id="mdesc"
            name="moviedescription"
            rows="2"
            cols="40"
            maxLength="73"
            value={book_description}
            placeholder="Description"
            onChange={(event) => {
              setbookdesc(event.target.value);
            }}
          ></textarea>
          <div className="center">
            <input
              type="submit"
              value="ADD"
              className="subm2"
              onClick={addbook}
            />
          </div>
        </div>
      </div>

      <div></div>
    </div>
  );
};

export default Books;