import React,{useState,useEffect,useContext} from "react";
import './CSSComponents/diary.css';
import {usercontext} from './Context/usercontext';
import Modal from "react-modal";
import CloseIcon from '@mui/icons-material/Close';
import Axios  from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';

const {format} = require('date-fns');


const Diary = () => {
  const {userid,setuserid}=useContext(usercontext);    
  const [isOpen, setIsOpen] = useState(false);
  const [date,setdate]=useState(new Date());
  const [newdesc,setnewdesc]=useState("");
  const [desc,setdesc]=useState();
 const [entryexists,setentrystatus]=useState(false);
 const [errormessage,seterrormessage]=useState("");
 const [extracteddesc,setextracteddesc]=useState("");
 const [extractdate,setextractdate]=useState(false);

 const [id,setid]=useState(0);



 
  function toggleModal() {
    
       Axios.post("https://planzap.herokuapp.com/getentry",{userid:userid,entry_date:date}).then((response)=>{
    if(response.data.message)
    {
      setentrystatus(false);
      setextracteddesc("");
      setextractdate("");
        setIsOpen(!isOpen);

    } 
    else{
      setextractdate(response.data.entry_date);
 setentrystatus(true);
    setextracteddesc(response.data.data_entry);
    seterrormessage("");
    setnewdesc(response.data.data_entry)
    setIsOpen(!isOpen);

   setid(response.data.id)
  } });
    
  }
 /* useEffect(() => {
  
  }, [])*/
  const update=()=>{
   
   
    Axios.put("https://planzap.herokuapp.com/updatediary",{userid:userid,data_entry:newdesc,entry_date:date}).then((response)=>{console.log("updated")})
  
  }
  const add=()=>{
  
    Axios.post("https://planzap.herokuapp.com/insertdiary",{userid:userid,data_entry:desc,entry_date:date}).then((response)=>{console.log("inserted")})

  }
 /*const deleteentry=(tid)=>{
    
    Axios.delete(`http://localhost:3001/deleteentry/${tid}`).then((respose)=>{
      setentrystatus(false);

    })
  }*/
  const getentry=()=>{

    Axios.post("https://planzap.herokuapp.com/getentry",{userid:userid,entry_date:date}).then((response)=>{
    if(response.data.message)
    {
      seterrormessage(response.data.message);
      setentrystatus(false);
      setextracteddesc("");
      setextractdate("");

    } 
    else{
      setextractdate(response.data.entry_date);
 setentrystatus(true);
    setextracteddesc(response.data.data_entry);
    seterrormessage("")

   setid(response.data.id)
  } });
  
  }
  return <div  style={{display:"flex",flexDirection:"column",height:"100vh",width:"85vw",marginLeft:"15vw",alignItems:"center"}}>
      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="My dialog"
        style={
          {overlay:{
            backgroundColor: 'rgba(255, 255, 255, 0.75)',
            

          },
        content:{
          width:'40vw',
          height:'43vh',
          margin:'auto',
          padding:'0',
   borderRadius:'10px',
   display:'flex',
   flexDirection:"column",
   backgroundImage:"linear-gradient(to top left,grey, teal)",

        }
        }
        
        }
        >
     <div style={{position:"absolute",marginLeft:"38.3vw",marginTop:"0.2vh"}}>
       <CloseIcon onClick={toggleModal}/>
       
        </div>
<form style={{marginTop:"5vh",marginLeft:"2vw"}}>

    <label for="mdesc" style={{fontSize:"2.5vh"}}>{format(new Date(date),'PPPP')}</label>
    <br/>
<textarea id="mdesc" style={{fontSize:"2.2vh"}} name="entry" rows="10" cols="40"  className="fields" maxLength="9800" defaultValue={extracteddesc}  onChange={(event)=>{entryexists? setnewdesc(event.target.value) :setdesc(event.target.value)}}>

  </textarea>
  <br/>
<button style={{marginLeft:"40%",height:"3.6vh",fontWeight:"bold",fontSize:"2vh"}} onClick={()=>{if(entryexists){update()} else{add()}}}>{entryexists?"Update":"Add Entry"}</button>
  </form>
      </Modal>
   <div> <input type="date" style={{height:"3vh",width:"10vw",fontSize:"2vh",marginTop:"2vh"}}   onChange={(event)=>{setdate(event.target.value)}}/></div>
    <br/>
   
    <div style={{display:"flex",flexDirection:"row"}}>
    <button style={{height:"5vh",width:"10vw",background:`linear-gradient(to top left,teal, grey)`,fontWeight:"bold",fontSize:"2vh"}} onClick={toggleModal}>Update / Add</button>
    &nbsp;
    
    <button style={{height:"5vh",width:"10vw",background:`linear-gradient(to top left,teal, grey)`,fontWeight:"bold",fontSize:"2vh"}} onClick={getentry}>View</button>
</div>
<br/>
<div style={{width:"85vw",display:"flex",textAlign:"center",justifyContent:"center",alignItems:"center"}}>
  {errormessage}
  </div>
    <div style={{marginLeft:"2vw",width:"83vw",fontWeight:"bolder",fontSize:"3vh",display:"flex",alignItems:"center"}}>
    { entryexists ?  format(new Date(extractdate),'PPPP') : " "}
    { entryexists ? " ,": " "}
    { /*entryexists ? <DeleteIcon onClick={(id)=>{deleteentry(id)}} className="fhover"/>: " "*/}


      </div>
      
      <div style={{fontSize:"2.6vh",fontFamily:"cursive",marginTop:"0.5vh",marginLeft:"2vw",width:"83vw"}}>
           {entryexists ? extracteddesc.split("\n").map((text) => <div>{text}<br/></div>):" "}
        </div>
    </div>
};

export default Diary;
