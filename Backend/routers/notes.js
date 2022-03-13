const express = require("express");
const db = require("../db");

const notesRouter = express.Router();

notesRouter.put("/updateideadesc", (req, res) => {
  const id = req.body.id;
  const idea_name = req.body.new_idea;
  const idea_desc = req.body.new_desc;
  console.log(req.body);
  db.query(
    "UPDATE ideas_table SET idea_name=?, idea_desc=? WHERE ideaid=?",
    [idea_name, idea_desc, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
notesRouter.post("/addidea", (req, res) => {
  const idea_name = req.body.idea_name;
  const idea_desc = req.body.idea_desc;
  const userid = req.body.userid;
  // console.log(name+rating+desc);
  db.query(
    "INSERT INTO ideas_table (idea_name,idea_desc,userid) VALUES (?,?,?)",
    [idea_name, idea_desc, userid],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});
notesRouter.post("/getideadata", (req, res) => {
  const user_id = req.body.userid;
  db.query(
    "SELECT * FROM ideas_table WHERE userid=?",
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
notesRouter.delete("/deleteidea/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE from ideas_table WHERE ideaid=?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

module.exports = notesRouter;
