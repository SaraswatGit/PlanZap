const express = require("express");
const db = require("../db");

const movieRouter = express.Router();

movieRouter.post("/create", (req, res) => {
  const movie_name = req.body.movie_name;
  const movie_rating = req.body.movie_rating;
  const movie_desc = req.body.movie_desc;
  const user_id = req.body.userid;
  // console.log(name+rating+desc);
  db.query(
    "INSERT INTO movie_list (movie_name,movie_rating,movie_desc,user_id) VALUES (?,?,?,?)",
    [movie_name, movie_rating, movie_desc, user_id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

movieRouter.put("/updatequote", (req, res) => {
  const userid = req.body.id;
  const userquote = req.body.userquote;
  console.log(req.body);
  db.query(
    "UPDATE user_database SET userquote=? WHERE userid=?",
    [userquote, userid],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("no error");
        res.send(result);
      }
    }
  );
});
movieRouter.post("/getdata", (req, res) => {
  const user_id = req.body.userid;
  db.query(
    "SELECT * FROM movie_list WHERE user_id=?",
    [user_id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
movieRouter.put("/updatedesc", (req, res) => {
  const id = req.body.id;
  const movie_desc = req.body.movie_desc;
  db.query(
    "UPDATE movie_list SET movie_desc=? WHERE id=?",
    [movie_desc, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
movieRouter.delete("/deletemovie/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE from movie_list WHERE id=?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

module.exports = movieRouter;
