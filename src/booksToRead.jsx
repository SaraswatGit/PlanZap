import React from "react";
import "./CSSComponents/booksToRead.css";

function Bookstoread() {
  return (
    <div className="books">
      <div className="heading">
        <div className="bookname">Title</div>
        <div className="author">Author</div>
        <div className="bookdesc">Description</div>
      </div>
      {/* list of books */}
      <div className="list">
        <div className="bookname">Inferno</div>
        <div className="author">Dan Brown</div>
        <div className="bookdesc">
          {" "}
          Robert Langdon saves the earth from a madman.
        </div>
      </div>
      <div className="bookentry">
        <div className="bookDialog">
          <h1>Enter the book details</h1>
          <form>
            <label for="bname" style={{ fontSize: "2vh" }}>
              Book Name
            </label>
            <br />
            <input
              style={{ fontSize: "2vh" }}
              type="text"
              id="bname"
              maxLength="40"
              name="bookname"
              className="booktext"
              placeholder="Eg: Inferno "
            />
            <label style={{ fontSize: "2vh" }} for="bauthor">
              Author
            </label>
            <br />
            <input
              style={{ fontSize: "2vh" }}
              type="text"
              id="bauthor"
              maxLength="40"
              name="bookauthor"
              className="booktext"
              placeholder="Eg: Dan Brown"
            />
            <br />
            <label style={{ fontSize: "2vh" }} for="bdesc">
              Book Description
            </label>
            <br />
            <textarea
              style={{ fontSize: "2vh" }}
              id="bdesc"
              name="bookdescription"
              rows="2"
              cols="40"
              maxLength="73"
              className="booktext"
              placeholder="Eg: Robert Langdon saves the earth from a madman."
            ></textarea>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Bookstoread;
