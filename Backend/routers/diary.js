const express = require("express");
const db = require("../db");
const diaryRouter = express.Router();

diaryRouter.put("/updatediary", (req, res, next) => {
  const userid = req.body.userid;
  const data_entry = req.body.data_entry;
  const entry_date = req.body.entry_date;

  db.query(
    "UPDATE diary_table SET data_entry=? WHERE entry_date=? AND userid=?",
    [data_entry, entry_date, userid],
    (err, result) => {
      if (err) {
        next(err);
      } else {
        res.send(result);
      }
    }
  );
});
diaryRouter.post("/insertdiary", (req, res) => {
  const userid = req.body.userid;
  const data_entry = req.body.data_entry;
  const entry_date = req.body.entry_date;

  db.query(
    "INSERT INTO diary_table (entry_date,data_entry,userid) VALUES (?,?,?)",
    [entry_date, data_entry, userid],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
diaryRouter.post("/getentry", (req, res) => {
  const userid = req.body.userid;
  const entry_date = req.body.entry_date;
  db.query(
    "SELECT *  FROM diary_table WHERE entry_date=? AND userid=?",
    [entry_date, userid],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        if (result.length > 0) {
          res.send(result[0]);
        } else {
          res.send({ message: "No entry exists this date " });
        }
      }
    }
  );
});
diaryRouter.delete("/deleteentry/:tid", (req, res) => {
  const id = req.params.tid;
  console.log(id);
  db.query("DELETE from diary_table WHERE id=?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

module.exports = diaryRouter;
