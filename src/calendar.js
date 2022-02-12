import React,{useState,useContext,useEffect} from "react";
import './CSSComponents/calendarstyle.css';
import CloseIcon from '@mui/icons-material/Close';
import Modal from "react-modal";
import Axios  from 'axios';
import {usercontext} from './Context/usercontext';
import EditIcon from '@mui/icons-material/Edit';
import { dividerClasses } from "@mui/material";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
const {format} = require('date-fns');



Modal.setAppElement("#root");





const Calender = () => {


function daysLeft(a){  //calculates the number of days left
  var x = Date.now()
  var timeDiff = Date.parse(a.deadline) - x;
  var noOfDays = timeDiff/(1000*60*60*24);
  return noOfDays;
}

function weightedPriority(pr, d, progress){
  var wP = d / ((100-progress)*pr)
  return wP;

}

function getFormattedDate(val){
  var ts = Date.parse(val);
  var n = new Date(ts);
  return n.getDate()+'/'+(n.getMonth()+1)+'/'+n.getFullYear();
}


function priorityNumVal(a){   //gets priority as an integer (1-3)
  switch(a.priority){
    case 'Highest Priority':
      return 3;

    case 'Medium Priority':
      return 2;

    case 'Lowest priority':
      return 1;
  }
}


  const[taskname,settask]=useState("");
  const[priority,setpriority]=useState("");
  const[deadline,setdeadline]=useState("");
  const [isPopup, setPopup] = useState(false);  
  const [isOpen, setIsOpen] = useState(false);
  const {userid,setuserid}=useContext(usercontext); 
  const [isLoading, setLoading] = useState(true);
  const [isSortPopup, setSortPopup] = useState(false);
 
  const [tasklist,settasklist]=useState([]);
  var taskArr = [...tasklist]
  const [sortedTasks, setSortedTasks] = useState(taskArr);
  const [progress,setprogress]=useState();

  const [sortType, setSortType] = useState({sortBy: "default"});

const handleChange = (e) => {

    const value = e.target.value;
    setSortType({
        ...sortType,
        sortBy: value
    });


    if (e.target.value === 'deadline'){
      taskArr.sort((a,b) => {
        if (a.deadline < b.deadline){
          return -1;
        }
        else if (a.deadline > b.deadline){
          return 1;
        }
        else {
          return 0;
        }
      })

      setSortedTasks(taskArr);

    }
    else if (e.target.value === 'workleft'){
      taskArr.sort((a,b) => {
        return a.progress - b.progress;
      })
      setSortedTasks(taskArr);
    }
    else {
        taskArr.sort((a,b) => {
          let prA=priorityNumVal(a),
          prB=priorityNumVal(b),
          dA=daysLeft(a),
          dB=daysLeft(b);
          return (weightedPriority(prA, dA, a.progress) - weightedPriority(prB, dB, b.progress));
        })
        setSortedTasks(taskArr);
    }
}

  const deletetask=(id)=>{
    Axios.delete(`https://planzap.herokuapp.com/deletetask/${id}`).then((respose)=>{
      settasklist(tasklist.filter((val)=>{return val.taskid !== id}))
    })
  }
  function toggleModal() {
    setIsOpen(!isOpen);
  }

  function toggleTaskSort() {
    setSortPopup(!isSortPopup);
  }
  useEffect(() => {
    setLoading(true); 
    
        Axios.post("https://planzap.herokuapp.com/gettaskdata",{userid:userid}).then((response)=>{
          settasklist(response.data) }); 
          setLoading(false);      
  }, []);



  const addtask=()=>{
    Axios.post("https://planzap.herokuapp.com/addtask",{
      taskname:taskname,
      priority:priority,
      deadline:deadline,
    userid:userid}).then(()=>{
      Axios.post("https://planzap.herokuapp.com/gettaskdata",{userid:userid}).then((response)=>{
        settasklist(response.data) }); 
        console.log("success");
      })
  }
  const updateprogess=(id)=>{
    
    
    Axios.put("https://planzap.herokuapp.com/updateprog",{id:id,progress:progress}).then((response)=>{
      console.log(response.data);
    })
    
  }

  const mystyle = {
    color: "black",
    backgroundColor: "coral",    
    fontFamily: "Arial",
    display:" flex",
    flexDirection: "column",
    width: "85vw",
    marginLeft: "15vw",
    height: "100vh",
    justifyContent:"center",
    alignItems:"center"
    
  }

  if(isLoading){
    return(
      <div style={mystyle}  >
        <h2 >Loading...</h2>
      </div>

    );
  };




  return <div className="calpage">
  

    <div className="toppart">


    { tasklist.map((val,key)=>{
     return(
      <div className={(val.priority==="Highest Priority")?"taskbox":val.priority==="Medium Priority"?"mediumtaskbox":"lowtaskbox"}>
        <div className="toppar2" style={{width:"13vw",marginTop:"0vh",paddingTop:"0.5vh",height:"4vh",fontSize:"2vh"}}>
     <span className="forhover" style={{width:"1.3vw",height:"1.4vw",marginRight:"11vw",padding:"0.5vh",fontSize:"2vh"}}> </span>
      <span className="forhover"   style={{width:"2vw",height:"2vw"}} > <CloseIcon onClick={()=>{setPopup(true)}}style={{width:"1.6vw",height:"1.6vw"}}/></span>
  
      <Modal isOpen={isPopup}
      onRequestClose={()=>{setPopup(false)}}
      style={
        {overlay:{
          backgroundColor: 'rgba(255, 255, 255, 0.75)',
                },
      content:{
        width:'30vw',
        height:'33vh',
        margin:'auto',
        padding:'0',
        borderRadius:'10px',
        backgroundImage: "linear-gradient(to top left,grey, rgb(200, 187, 0))",

        display: "flex",
        flexDirection: "column",
        alignItems:"center",
        justifyContent:"space-around"
      }
      }
      
      }
      centered>

        <h2>
          are you sure to delete?
        </h2>
       <div>
       <button  onClick={()=>{deletetask(val.taskid) ;setPopup(false)}} className ="popupBtn"  style={{backgroundColor:"red"}} >
          confirm
        </button>

        <button onClick={()=>{setPopup(false)}} className="popupBtn">
          cancel
        </button>
       </div>
       

      </Modal>



          </div>
        <div style={{height:"10vh",width:"13vw",fontStyle:"italic",fontWeight:"bold",textAlign:"center",fontSize:"2vh"}}>{val.taskname}</div>
        <div style={{display:"flex",justifyContent:"center",alignItems:"center", width:"13vw",fontWeight:"bolder",fontSize:"2.1vh" }}> Task Progress</div>
     <div style={{display:"flex",justifyContent:"center",alignItems:"center", width:"13vw" ,fontSize:"2vh"}}> 
       <Box style={{textAlign:"center"}} width={150}>
      <Slider
        size="small"
        defaultValue={val.progress}
        aria-label="Small"
        valueLabelDisplay="auto"
        onChange={((event)=>{setprogress(event.target.value);updateprogess(val.taskid)})} 
        onChangeCommitted={((event)=>{setprogress(event.target.value);updateprogess(val.taskid)})} 
        style={{width:"10vw"}}
        
     />
    </Box>
</div>        <div style={{height:"7vh",fontWeight:"bold" ,textAlign:"center" ,fontSize:"2vh"}} >Deadline : {format(new Date(val.deadline),'PPPP')}</div>
        <div style={{height:"5vh",display:"flex",alignItems:"center",justifyContent:"center"}} >
          <div className="buthover" style={{fontSize:"2vh",borderRadius:"15%",width:"4vw",textAlign:"center",}} onClick={()=>{deletetask(val.taskid)}}>Done</div>
</div>
        </div>)}
    )}</div>
      <div className="bottompart">
        <div className="prioritydesc">
          <div className="redbox">
            </div>
            High Priority 
            </div>
            <div className="prioritydesc">
          <div className="yellowbox">
            </div>
            Medium Priority 
            </div>
            <div className="prioritydesc">
          <div className="violetbox">
            </div>
Low Priority

            </div>
          
<div className="newtaskbutton" onClick={toggleModal}>
  Add new task
  </div>
<div className="newtaskbutton" onClick={toggleTaskSort}>
  Sort tasks
</div>

      </div>

      <Modal
        isOpen={isSortPopup}
        onRequestClose={toggleTaskSort}
        contentLabel="Sort Task"
        style={

          {
            overlay:{
            backgroundColor: 'rgba(255, 255, 255, 0.75)',
            
  
            },
            content:{
              width:'40vw',
              height:'70vh',
              margin:'auto',
              padding:'0',
              borderRadius:'10px',
              backgroundImage: "linear-gradient(to top left,grey, rgb(200, 187, 0))",      
              display: "flex",
              flexDirection: "column",
              alignItems:"center",
              justifyContent:"space-around"
            }
          }
        }
      >
        <label style={{fontSize: '2.4vh'}}> Sort by &nbsp; 
          <select value={sortType.sortBy} onChange={handleChange} className='select-option'>
          <option value = "default"> --Select-- </option>
            <option value = "deadline"> By nearest deadline </option>
            <option value="workleft">By most work left</option> 
            <option value="both"> By both(weighted) </option>
          </select>
        </label>  

        <div className='sorted-wrapper'>
          <div className='task-object'>
            <p className='task-elem-heading'>Task Name</p>
            <p className='task-elem-heading'>Progress</p>
            <p className='task-elem-heading'>Priority</p>
            <p className='task-elem-heading'>Deadline</p>
          </div>
          {sortedTasks.map((val, key) => {
            return(
            <div className='task-object'>
              <p className='task-elem'>{val.taskname}</p>
              <p className='task-elem'>{val.progress}%</p>
              <p className='task-elem'>{val.priority}</p>
              <p className='task-elem'>{getFormattedDate(val.deadline)}</p>
            </div>
            )
          })
          }
        </div>       

      </Modal>

      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="My dialog"
        style={
          {overlay:{
            backgroundColor: 'rgba(255, 255, 255, 0.75)',
            

          },
        content:{
          width:'45vw',
          height:'43vh',
          margin:'auto',
          padding:'0',
   borderRadius:'10px',
   backgroundImage: "linear-gradient(to top left,grey, rgb(200, 187, 0))",

display: "flex",
flexDirection: "column",
        }
        }
        
        }
        centered
      >
        <div >
      <div classname="topbar">
      <span className="crossbutton" onClick={toggleModal}>
        <CloseIcon />
      </span>

        </div>
        <div className="formarea">
        <label style={{fontSize:"2.2vh",marginBottom:"0vh"}} for="taskname">Task Name</label>
    <input type="text" id="taskname" maxlength="50" name="taskname" className="fields" placeholder="Max Characters:32" onChange={(event)=>{settask(event.target.value)}}  required/>
  
    <label style={{fontSize:"2.2vh",marginTop:"1vh"}} for="date">Deadline</label>

    <input type="date" id="date" name="date" className="fields" onChange={(event)=>{setdeadline(event.target.value)}}  required/>

    <label style={{fontSize:"2.2vh"}} for="priority">Priority</label>
    <select id="priority" name="country" className="fields"  onChange={(event)=>{setpriority(event.target.value)}}  required>
    <option></option>

      <option value="Highest Priority">Highest Priority</option>
      <option Value="Medium Priority">Medium Priority</option>
      <option value="Low Priority">Low Priority</option>
    </select>
    <input type="submit" value="Submit" className="subbut" style={{marginTop:"1.5vh",fontSize:"2vh"}} onClick={()=>{addtask();toggleModal()}}/>
          </div>
        </div>

      </Modal>

</div>



}
export  default Calender;