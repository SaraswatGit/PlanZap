import React,{useState,useEffect,useContext} from "react";
import './CSSComponents/movies.css';
import Axios  from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import Modal from "react-modal";
import {usercontext} from './Context/usercontext';


Modal.setAppElement("#root");

const Movies = () => {
  const [movie_name, setmoviename] = useState("");
  const [movie_rating, setmovierating] = useState(0);
  const [movie_desc, setmoviedesc] = useState("");
  const[movielist,setmovielist]=useState([]);
  const[newdesc,setnewdesc]=useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [defaulttext, setdefaulttext] = useState("");
  const[tempid,settempid]=useState(0);
  const {userid,setuserid}=useContext(usercontext);    


function toggleModal() {
  setIsOpen(!isOpen);
}
function updatedesc(num,text){

  setdefaulttext(
    text);
    setnewdesc(
      text);
 settempid(
   num
 );
    toggleModal();
  
  
 }
 const updatemoviedesc=()=>
 {console.log(tempid);
   Axios.put("https://planzap.herokuapp.com/updatedesc",{id:tempid,movie_desc:newdesc}).then((response)=>{console.log("updated")})
 }
const addmovie=()=>{
  Axios.post("https://planzap.herokuapp.com/create",{
    movie_name:movie_name,
    movie_rating:movie_rating,
    movie_desc:movie_desc,
  userid:userid}).then(()=>{
      console.log("success");
    })
}

useEffect(() => {
  Axios.post("https://planzap.herokuapp.com/getdata",{userid:userid}).then((response)=>{
 setmovielist(response.data) 

});
  
}, []);

const deletemovie=(id)=>{
  Axios.delete(`https://planzap.herokuapp.com/deletemovie/${id}`).then((respose)=>{
    setmovielist(movielist.filter((val)=>{return val.id !== id}))
  })
}

  return (

  <div className="moviesback">
    <Modal
    isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="My dialog2"
        style={
          {overlay:{
            backgroundColor: 'rgba(255, 255, 255, 0.75)',
            

          },
        content:{
          width:'40vw',
          height:'16vh',
          margin:'auto',
          padding:'0',
   borderRadius:'10px',
   borderColor:'red',
   backgroundColor:'green',
   paddingLeft:'15px',
   paddingTop:'15px',
        }
        }
        
        }><form>
            <label for="mdesc">New Movie Description</label>
    <br/>
<textarea id="mdesc" name="moviedescription" rows="2" cols="40" maxlength="60" className="donkey"   onChange={(event)=>{setnewdesc(event.target.value)}}>
{defaulttext}</textarea>
  <br/>
  <button onClick={updatemoviedesc}>Save</button>
     </form> </Modal>
    <div className="topbar">

      <div className="moviename">
           Title
          </div>
          <div className="movierating">
              IMDb
              </div>
          <div className="moviedesc">
              Description
              </div>
  </div>

  <div>
   { movielist.map((val,key)=>{
     return(
       <div className="topbar2">
            <div className="moviename2">
           {val.movie_name}
          </div>
          <div className="movierating2">
          {val.movie_rating}
              </div>
          <div className="moviedesc2" style={{paddingRight:"transparent"}}>
          {val.movie_desc}
          <EditIcon onClick={()=>updatedesc(val.id,val.movie_desc)} style={{paddingLeft:'30px',height:"3.2vh"}}/>
          <button style={{backgroundColor:"transparent", height:"3vh", marginLeft:"1vw",fontSize:"1.6vh",textAlign:"center"}} onClick={()=>{deletemovie(val.id)}}>
            Delete
          </button>
              </div>
         </div>

     )
   })}
    </div>
<div className="entrybox">
  <div className="Heading">Enter the Movie Details here</div>
  <form className="formbox">
  <label for="mname">Movie Name</label>
        <br/>
    <input type="text" id="mname" maxlength="40" name="moviename" className="donkey" placeholder="Eg: Mission Impossible : Rogue Nation " onChange={(event)=>{setmoviename(event.target.value)}}/>
    <br/>
    <label for="mrating">IMDb rating</label>
<br/>
    <input type="text" id="mrating" maxlength="3" name="movierating" className="donkey"  placeholder="Eg: 8.4"  onChange={(event)=>{setmovierating(event.target.value)}}/>
    <br/>
    <label for="mdesc">Movie Description</label>
    <br/>
<textarea id="mdesc" name="moviedescription" rows="2" cols="40" maxlength="73" className="donkey"  placeholder="Eg:Oscar Nominated, Action,Directed By : Michael Scott , Based on Iraq Wars" onChange={(event)=>{setmoviedesc(event.target.value)}}>

  </textarea>
  <input type="submit" value="Submit" className="subm2" onClick={addmovie}/>

        </form>
</div>

  </div>
  );
};

export  default Movies;