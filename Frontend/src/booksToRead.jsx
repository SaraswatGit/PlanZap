import React, { useState, useEffect, useContext } from "react";
import "./CSSComponents/movies.css";
import "./CSSComponents/booksToRead.css";
import Axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "react-modal";
import { usercontext } from "./Context/usercontext";
import "./CSSComponents/delete.css";
import DeleteIcon from "@mui/icons-material/Delete";

Modal.setAppElement("#root");

const Books = () => {
  const [book_name, setbookname] = useState("");
  // const [book_author, setbookauthor] = useState("");
  // const [book_description, setbookdesc] = useState("");
	const [bookToDelete ,setBookToDelete] = useState(null);
  const [booklist, setbooklist] = useState([]);
  const [newname, setnewname] = useState("");
  const [newdesc, setnewdesc] = useState("");
  const [tempname, settempname] = useState("");
  const [tempdesc, settempdesc] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [tempid, settempid] = useState(0);
  const [searchedBooks, setSearchedBooks] = useState([]);

  const { userid, setuserid } = useContext(usercontext);
  const [isPopup, setPopup] = useState(false);
  const [isRatingAsc, setIsRatingAsc] = useState(null);
  const booksListOrder = isRatingAsc
    ? booklist.sort((a, b) => (a.book_author < b.book_author ? 1 : -1))
    : booklist.sort((a, b) => (a.book_author > b.book_author ? 1 : -1));

  const BookCard = ({
    curAuthors,
    curAverageRating,
    curDescription,
    curImageLinks,
    curTitle,
    index,
  }) => {
    return (
      <div className="bookCard">
        <div className="bookThumbnail">
          {curImageLinks ? (
            <img
              src={curImageLinks.thumbnail}
              alt="Book thumbnail"
              width="100"
              height="170"
            />
          ) : (
            "Image not available"
          )}
        </div>
        <div className="bookDescription">
          <p className="bookCardLabel">Title</p>
          <p>{curTitle}</p>
          <p className="bookCardLabel">Description</p>
          {curDescription ? (
            <p>
              {curDescription.length > 200
                ? curDescription.substring(0, 195) + "..."
                : curDescription}
            </p>
          ) : (
            "N/A"
          )}

          <p className="bookCardLabel">Authors</p>
          {curAuthors
            ? curAuthors.map((author, key) => {
                return <span>{`${author}, `}</span>;
              })
            : "N/A"}
          <p className="bookCardLabel">Rating</p>
          <p>{curAverageRating ? curAverageRating : "*Not Rated*"}</p>
          <input
            type="submit"
            value="ADD"
            className="subm2"
            onClick={(event) => {
              const { authors, averageRating, description, imageLinks, title } =
                searchedBooks[index];
              addbook(event, authors, description, title);
            }}
          />
        </div>
      </div>
    );
  };

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  const searchBoock = (event, title) => {
    event.preventDefault();
    if (title === "") {
      setSearchedBooks([]);
      alert("Enter tiile to search for books");
      return;
    }
    fetch(`https://www.googleapis.com/books/v1/volumes?q=+intitle:${title}`)
      .then((res) => res.json())
      .then((books) => {
        console.log(books);
        if (books.totalItems === 0) {
          setSearchedBooks([]);
          alert("No Result Found");
          return;
        }
        var searchedBooksList = [];
        books.items.forEach((book) => {
          const {
            authors,
            averageRating,
            description,
            imageLinks,
            title,
            ...rest
          } = book.volumeInfo;
          searchedBooksList.push({
            authors,
            averageRating,
            description,
            imageLinks,
            title,
          });
        });
        setSearchedBooks(searchedBooksList);
      });
  };

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

  const addbook = (event, authors, description, title) => {
    event.preventDefault();
    const data = Axios.post("https://planzap.herokuapp.com/book/create", {
      book_name: title,
      book_author: authors ? authors[0] : "N/A",
      book_description: description ? description : "N/A",
      userid: userid,
    }).then(() => {
      Axios.post("https://planzap.herokuapp.com/book/list", {
        userid: userid,
      }).then((response) => {
        console.log("New List of books : ", response.data);
        setbooklist(response.data);
      });
      console.log("success");
    });
  };

  console.log(setuserid); //This is for removing warning only
  useEffect(() => {
    Axios.post("https://planzap.herokuapp.com/book/list", {
      userid: userid,
    }).then((response) => {
      setbooklist(response.data);
    });
  }, [userid]);

  const deletebook = () => {
    Axios.delete(`https://planzap.herokuapp.com/book/delete/${bookToDelete}`).then(
      (respose) => {
        setbooklist(
          booklist.filter((val) => {
            return val.id !== bookToDelete;
          })
        );
      }
    );
  };

  return (
    <div className="moviesback">
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
                <p>
                  {val.book_description.length > 500
                    ? val.book_description.substring(0, 495) + " . . ."
                    : val.book_description}
                </p>
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
											setBookToDelete(val.id);
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
                      deletebook();
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

          <div className="center">
            <input
              type="submit"
              value="SEARCH"
              className="subm2"
              onClick={(event) => {
                searchBoock(event, book_name);
              }}
            />
          </div>
        </div>
      </div>
      <div className="booksSearchResultContainer">
        {searchedBooks.map((book, key) => {
          const { title, authors, averageRating, description, imageLinks } =
            book;
          console.log(book, " ", key);
          return (
            <BookCard
              key={key.toString()}
              curTitle={title}
              curAuthors={authors}
              curAverageRating={averageRating}
              curDescription={description}
              curImageLinks={imageLinks}
              index={key}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Books;
