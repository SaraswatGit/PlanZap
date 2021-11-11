import './CSSComponents/App.css';
import React, { useState ,useEffect } from "react";
import Login from "./loginpage";
import Profile from "./profpage"; 
import { Switch, Route, Link , DefaultRoute, Navigate} from "react-router-dom";
import { useHistory } from "react-router-dom";
import Calender from './calendar';
import Pgraphs from './pgraphs';
import Loader from './LoadingScreen';
import Movies from './movies';
import Ideas  from './ideas';
import Diary from './diary';
import { NavLink } from 'react-router-dom';
import TaskIcon from '@mui/icons-material/Task';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import EditIcon from '@mui/icons-material/Edit';
import {usercontext} from './Context/usercontext';
import LogoutIcon from '@mui/icons-material/Logout';
import Axios from "axios";
import Modal from "react-modal";

Modal.setAppElement("#root");

function App() {

  Axios.defaults.withCredentials=true;

  const [notloggedin, setloginstatus] = useState(true);
  const [userquote,setuserquote]=useState("");
  const [usernewquote,setnewuserquote]=useState("");
  const [userid,setuserid]=useState(0);
  const [loading,setloading]=useState(true);

  const history=useHistory();
  const [isOpen, setIsOpen] = useState(false);

function toggleModal() {
  setIsOpen(!isOpen);
}

  const logout=()=>{
    setloginstatus(true);
 Axios.put("https://planzap.herokuapp.com/logout",{status:true})
  }

  //loggedin=
  useEffect(
    ()=>{
      
Axios.get("https://planzap.herokuapp.com/slogin").then(
  (response)=>{
    if(response.data.loggedin===true)
    {           
        setloginstatus(false);
        setuserid(response.data.user.userid);
        console.log("user ID :"+userid)
    }
    setloading(false);
  }
)
Axios.post("https://planzap.herokuapp.com/getquote",{userid:userid}).then(
  (response)=>{
         
        setuserquote(response.data.userquote);
        console.log(userquote);
    }
  
)
    }
    
  )
  const updateuserquote=()=>
  { console.log(userid+" ok "+userquote);
    Axios.put("https://planzap.herokuapp.com/updatequote",{id:userid,userquote:usernewquote}).then((response)=>{console.log("updated")})
  }
  console.log("user ID 2 :"+userid);
return (
    <div className="App">
      
     <usercontext.Provider value={{notloggedin,setloginstatus,userid,setuserid}}>
     <Modal
    isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="My dialog2"
        style={
          {overlay:{
            backgroundColor: 'rgba(255, 255, 255, 0.75)',
            

          },
        content:{
          width:'30vw',
          height:'19vh',
          margin:'auto',
          padding:'0',
   borderRadius:'10px',
   borderColor:'red',
   backgroundImage: 'linear-gradient(to top left, rgba(255,255,255), teal)',

   paddingLeft:'15px',
   paddingTop:'15px',
        }
        }
        
        }><form>
            <label for="quote">New Quote</label>
    <br/>
<textarea id="quote" name="userquote" rows="3" cols="20" maxlength="57"  onChange={(event)=>{setnewuserquote(event.target.value)}}>
</textarea>
  <br/>
  <button onClick={updateuserquote}>Save</button>
     </form> </Modal>
{loading?<Loader/>:notloggedin? <Login/>:   <div> <div className="sidebar">
               
               {/*      <NavLink to="/Profile" className="barelement" activeClassName="selected">
                     <AccountCircleIcon />
                     &nbsp; &nbsp; Profile
    </NavLink>*/}
    <div className="quotearea">"{userquote}"<br/><EditIcon className="editbutton" onClick={toggleModal}/></div>
                     <NavLink to="/Calendar" className="barelement"   activeClassName="selected">
                       <TaskIcon style={{height:"2.8vh",marginRight:"1vw"}}/>
                      Tasks and Progress
    </NavLink>
                   {/*  <NavLink to="/Performancegraphs" className="barelement" activeClassName="selected">
                     <ShowChartIcon/>      &nbsp; &nbsp;Performance Graphs
    </NavLink>*/}
                     <NavLink to="/movieslist" className="barelement" activeClassName="selected">
                     <FormatListBulletedIcon style={{height:"2.8vh",marginRight:"1vw"}}/>    Movies to Watch
                     </NavLink>      
                     <NavLink to="/diary" className="barelement"  activeClassName="selected">
                     <MenuBookIcon style={{height:"2.8vh",marginRight:"1vw"}}/>        Personal Diary <br/>
                     </NavLink>   
                     <NavLink to="/ideasnotes" className="barelement" activeClassName="selected">
                     <CollectionsBookmarkIcon style={{height:"2.8vh",marginRight:"1vw"}}/>       Ideas and Notes <br/>
    
                     </NavLink>     
                   <div className="logout" onClick={logout} style={{fontSize:"2.1vh"}}><LogoutIcon style={{height:"2.8vh",marginRight:"1vw"}}/> Log Out </div>
                </div>  

   
    
       
            <div>
            <Switch>
            <Route exact path="/" render={() => (
    <Navigate to="/Calendar"/>
)}/>
                 <Route exact path="/Profile">
               <Profile/>
               </Route>
               <Route exact path="/Calendar">
               <Calender/>
               </Route>
               <Route exact path="/diary">
               <Diary/>
               </Route>
               <Route exact path="/movieslist">
               <Movies/>
               </Route>
               <Route exact path="/ideasnotes">
               <Ideas/>
               </Route>
             
                  </Switch>
                  </div>
                  </div>}
                  
      </usercontext.Provider>

    </div>
  );
}


export default App;
