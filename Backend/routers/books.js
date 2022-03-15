const express = require("express");
const db = require("../db");

const bookRouter = express.Router();

bookRouter.post("/book/create", (req, res) => {
  const book_name = req.body.book_name;
  const book_author = req.body.book_author;
  const book_description = req.body.book_description;
  const user_id = req.body.userid;
  // console.log(name+rating+desc);
  db.query(
    "INSERT INTO book_list (book_name,book_author,book_description,user_id) VALUES (?,?,?,?)",
    [book_name, book_author, book_description, user_id],
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});

bookRouter.put("/updatequote", (req, res) => {
  const userid = req.body.id;
  const userquote = req.body.userquote;
  console.log(req.body);
  db.query(
    "UPDATE user_database SET userquote=? WHERE userid=?",
    [userquote, userid],
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        console.log("no error");
        res.send(result);
      }
    }
  );
});

bookRouter.post("/book/list", (req, res) => {
  const user_id = req.body.userid;
  db.query(
    "SELECT * FROM book_list WHERE user_id=?",
    [user_id],
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});

bookRouter.put("/update/description", (req, res) => {
  const id = req.body.id;
  const book_description = req.body.book_description;
  db.query(
    "UPDATE book_list SET book_description=? WHERE id=?",
    [book_description, id],
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});

bookRouter.delete("/book/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE from book_list WHERE id=?", id, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

module.exports = bookRouter;
