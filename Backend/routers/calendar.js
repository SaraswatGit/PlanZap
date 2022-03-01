const express = require("express");
const db = require("../db");

const calendarRouter = express.Router();

calendarRouter.put("/updateprog", (req, res) => {
    const taskid = req.body.id;
    const progress = req.body.progress;

    db.query("UPDATE task_database SET progress=? WHERE taskid=?", [progress, taskid], (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    })
});
calendarRouter.post(
    "/addtask", (req, res) => {
        const taskname = req.body.taskname;
        const priority = req.body.priority;
        const deadline = req.body.deadline;
        const userid = req.body.userid;
        // console.log(name+rating+desc);
        db.query("INSERT INTO task_database (taskname,priority,deadline,userid) VALUES (?,?,?,?)", [taskname, priority, deadline, userid], (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                res.send("Values Inserted");
            }
        });
    }

);
calendarRouter.post(
    "/gettaskdata", (req, res) => {
        const userid = req.body.userid;
        db.query("SELECT * FROM task_database WHERE userid=?", [userid], (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                res.send(result);
            }
        });
    });
calendarRouter.delete("/deletetask/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE from task_database WHERE taskid=?", id, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    })
})

module.exports = calendarRouter;