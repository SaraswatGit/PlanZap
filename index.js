const express=require("express");
const mysql=require("mysql");
const cors=require("cors");
const app=express();
const bodyParser=require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bcrypt=require("bcrypt");
const saltRounds =10;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
function updateResponse(req,res,next){
    res.set('Device-Type', 'Test');
    next();

}
app.use(updateResponse);
app.use(cors({ origin: ["http://localhost:3001","https://planzap.netlify.app","http://localhost:3000"],
  methods: ["GET", "POST","DELETE","PUT"],
  credentials: true,}) );
  app.use(cookieParser());
  app.enable('trust proxy')

  app.use(
    session({
      key: "",
      secret: "",
      resave: false,
      saveUninitialized: false,
      
      cookie: {
        httpOnly: true, 
        secure: true, 
         sameSite: 'none',
        expires: 60 * 60 * 24 *365*10,
      },
    })
  );


var db_config = {
 user:"",
        host:"",
        password:"",
        database:"",
};

var db;

function handleDisconnect() {
  db = mysql.createConnection(db_config); // Recreate the connection, since
                                                  // the old one cannot be reused.

  db.connect(function(err) {              // The server is either down
    if(err) {                                     // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    }                                     // to avoid a hot loop, and to allow our node script to
  });                                     // process asynchronous requests in the meantime.
                                          // If you're also serving http, display a 503 error.
  db.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
        handleDisconnect();                        
    }
  });
} 

handleDisconnect();

 

 
    
    
    
    app.post(
        "/getquote",(req,res)=>{
            const userid=req.body.userid;
            db.query("SELECT * FROM user_database WHERE userid=?",[userid],(err,result)=>{
                if(err){
                    console.log(err);
                }
                else
                {  
                    res.send(result[0]);
                }
            });
        });

   
    
        

//============================================== D I A R Y ====================================================================================================

app.put("/updatediary",(req,res,next)=>{
    const userid=req.body.userid;
    const data_entry=req.body.data_entry;
    const entry_date=req.body.entry_date;

    db.query("UPDATE diary_table SET data_entry=? WHERE entry_date=? AND userid=?",[data_entry,entry_date,userid],(err,result)=>{if(err)
    {
       next(err);
    }
    else{
        res.send(result);
    }
})
});
app.post("/insertdiary",(req,res)=>{
    const userid=req.body.userid;
    const data_entry=req.body.data_entry;
    const entry_date=req.body.entry_date;

    db.query("INSERT INTO diary_table (entry_date,data_entry,userid) VALUES (?,?,?)",[entry_date,data_entry,userid],(err,result)=>{if(err)
    {
        console.log(err);
    }
    else{
        res.send(result);
    }
})
});
app.post("/getentry",(req,res)=>{
    const userid=req.body.userid;
    const entry_date=req.body.entry_date;
    db.query("SELECT *  FROM diary_table WHERE entry_date=? AND userid=?",[entry_date,userid],(err,result)=>{if(err)
    {
        console.log(err);
    }
    else{     

               if(result.length>0)
               {
              res.send(result[0]);
               }
               else
               {
                  res.send({message:"No entry exists this date "}) 
               } 

            }
})
});
app.delete("/deleteentry/:tid",(req,res)=>{
    const id=req.params.tid;
    console.log(id);
    db.query("DELETE from diary_table WHERE id=?",id,(err,result)=>{
        if(err){
        console.log(err);
    }
    else{
        res.send(result);
    }
})
})
//====================================================I d e a & n o t e s ========================================================================
app.put("/updateideadesc",(req,res)=>{
    const id=req.body.id;
    const idea_name=req.body.new_idea;
    const idea_desc=req.body.new_desc;
    console.log(req.body);
    db.query("UPDATE ideas_table SET idea_name=?, idea_desc=? WHERE ideaid=?",[idea_name,idea_desc,id],(err,result)=>{if(err)
    {
        console.log(err);
    }
    else{
        res.send(result);
    }
})
});
app.post(
    "/addidea",(req,res)=>{
        const idea_name=req.body.idea_name;
        const idea_desc=req.body.idea_desc;
        const userid=req.body.userid;
       // console.log(name+rating+desc);
        db.query("INSERT INTO ideas_table (idea_name,idea_desc,userid) VALUES (?,?,?)",[idea_name,idea_desc,userid],(err,result)=>{
            if(err)
            {
console.log(err);
            }
            else
            {
res.send("Values Inserted");
            }
        });
    }

    );
app.post(
    "/getideadata",(req,res)=>{
        const user_id=req.body.userid;
        db.query("SELECT * FROM ideas_table WHERE userid=?",[user_id],(err,result)=>{
            if(err){
                console.log(err);
            }
            else
            {
                res.send(result);
            }
        });
    });
app.delete("/deleteidea/:id",(req,res)=>{
    const id=req.params.id;
    db.query("DELETE from ideas_table WHERE ideaid=?",id,(err,result)=>{
        if(err){
        console.log(err);
    }
    else{
        res.send(result);
    }
})
})
//===========================================================================C a l e n d a r================================================================
app.put("/updateprog",(req,res)=>{
    const taskid=req.body.id;
    const progress=req.body.progress;
    
    db.query("UPDATE task_database SET progress=? WHERE taskid=?",[progress,taskid],(err,result)=>{if(err)
    {   
        console.log(err);
    }
    else{
        res.send(result);
    }
})
});
app.post(
    "/addtask",(req,res)=>{
        const taskname=req.body.taskname;
        const priority=req.body.priority;
        const deadline=req.body.deadline;
        const userid=req.body.userid;
       // console.log(name+rating+desc);
        db.query("INSERT INTO task_database (taskname,priority,deadline,userid) VALUES (?,?,?,?)",[taskname,priority,deadline,userid],(err,result)=>{
            if(err)
            {
console.log(err);
            }
            else
            {
res.send("Values Inserted");
            }
        });
    }

    );
app.post(
    "/gettaskdata",(req,res)=>{
        const userid=req.body.userid;
        db.query("SELECT * FROM task_database WHERE userid=?",[userid],(err,result)=>{
            if(err){
                console.log(err);
            }
            else
            {
                res.send(result);
            }
        });
    });
app.delete("/deletetask/:id",(req,res)=>{
    const id=req.params.id;
    db.query("DELETE from task_database WHERE taskid=?",id,(err,result)=>{
        if(err){
        console.log(err);
    }
    else{
        res.send(result);
    }
})
})
//========================================================================M O V I E L I S T ======================================================
app.post(
    "/create",(req,res)=>{
        const movie_name=req.body.movie_name;
        const movie_rating=req.body.movie_rating;
        const movie_desc=req.body.movie_desc;
        const user_id=req.body.userid;
       // console.log(name+rating+desc);
        db.query("INSERT INTO movie_list (movie_name,movie_rating,movie_desc,user_id) VALUES (?,?,?,?)",[movie_name,movie_rating,movie_desc,user_id],(err,result)=>{
            if(err)
            {
console.log(err);
            }
            else
            {
res.send("Values Inserted");
            }
        });
    }

    );


app.put("/updatequote",(req,res)=>{
    const userid=req.body.id;
    const userquote=req.body.userquote;
    console.log(req.body);
    db.query("UPDATE user_database SET userquote=? WHERE userid=?",[userquote,userid],(err,result)=>{if(err)
    {   
        console.log(err);
    }
    else{
        console.log("no error");
        res.send(result);
    }
})
});
app.post(
    "/getdata",(req,res)=>{
        const user_id=req.body.userid;
        db.query("SELECT * FROM movie_list WHERE user_id=?",[user_id],(err,result)=>{
            if(err){
                console.log(err);
            }
            else
            {
                res.send(result);
            }
        });
    });
app.put("/updatedesc",(req,res)=>{
    const id=req.body.id;
    const movie_desc=req.body.movie_desc;
    db.query("UPDATE movie_list SET movie_desc=? WHERE id=?",[movie_desc,id],(err,result)=>{if(err)
    {
        console.log(err);
    }
    else{
        res.send(result);
    }
})
});
app.delete("/deletemovie/:id",(req,res)=>{
    const id=req.params.id;
    db.query("DELETE from movie_list WHERE id=?",id,(err,result)=>{
        if(err){
        console.log(err);
    }
    else{
        res.send(result);
    }
})
})
//================================================================L o g i n p a g e============================================================
app.put("/logout",(req,res)=>{
    req.session.destroy();

})

app.post(
    "/usercreate",(req,res)=>{
   
        const useremail=req.body.useremail;
        const password=req.body.password;

        // checking if email is already registered or not
        db.query("SELECT * FROM user_database WHERE useremail=?",[useremail],(err,result)=>{

            if(err)
            {
                console.log(err);
            }
            else
            {
                if(result.length>0)
                {
                    res.send({message:"Email Id already registered."});
                }
            }

        })

        // Adding the new user
       bcrypt.hash(password,saltRounds,(err,hash)=>{     
        if(err)
        {   
            console.log(err);
        }   
        db.query("INSERT INTO user_database (useremail,password) VALUES (?,?)",[useremail,hash],(err,result)=>{
        if(err)
        {
            
            console.log(err);
        }
        else
        {
            res.send({message:"User Added Successfully."});
        }
    });});
       // console.log(name+rating+desc);
 
    }

    );
   app.get("/slogin",(req,res)=>{
       if(req.session.user)
       {
           res.send({loggedin:true,user:req.session.user})
       }
       else
       {
           res.send({loggedin:false});
       }
   })
  app.post("/userlogin",(req,res)=>{
      const useremail=req.body.useremail;
      const password=req.body.password;
     // console.log(useremail+password+"logged in man!!");
      db.query("SELECT * FROM user_database WHERE useremail=?",[useremail],(err,result)=>{
        if(err)
        {
console.log(err);
        }
        else
        { //console.log("no error");
            if(result.length>0){
                bcrypt.compare(password,result[0].password,(error,response)=>{
                    if(response)
                    {
                       req.session.user=result[0];
                        res.send(result);

                    }
                    else
                    {
                        res.send({message:"Invalid Username/Password"});
                    }
                })
            }
            else
            {
                res.send({message:"Invalid Username/Password"});
            }
        }
    });
  })  


app.listen(process.env.PORT || 3001,()=>{
    console.log("message is running");
});