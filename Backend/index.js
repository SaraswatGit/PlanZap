const express=require("express");
const cors=require("cors");
const app=express();
const mysql = require("mysql");
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
      key: process.env.KEY,
      secret: process.env.SECRET,
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
    user: process.env.DATABASE_USERNAME,
    host: "remotemysql.com",
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_USERNAME,
};

let db;

function handleDisconnect() {
    db = mysql.createConnection(db_config); // Recreate the connection, since
    // the old one cannot be reused.

    db.connect(function (err) {              // The server is either down
        if (err) {                                     // or restarting (takes a while sometimes).
            console.log('error when connecting to db:', err);
            setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
        }                                     // to avoid a hot loop, and to allow our node script to
    });                                     // process asynchronous requests in the meantime.
    // If you're also serving http, display a 503 error.
    db.on('error', function (err) {
        console.log('db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
            handleDisconnect();                         // lost due to either server restart, or a
        } else {                                      // connnection idle timeout (the wait_timeout
            handleDisconnect();
        }
    });
    return db;
}    

handleDisconnect();

module.exports={default: handleDisconnect()};

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
app.use("/", require('./routers/diary.js'));

//====================================================I d e a & n o t e s ========================================================================
app.use("/", require('./routers/notes.js'));
//===========================================================================C a l e n d a r================================================================
app.use("/", require('./routers/calendar.js'));
//========================================================================M O V I E L I S T ======================================================
app.use("/", require('./routers/movies.js'));
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
                else{
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
                }
            }

        })

        // Adding the new user
   
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