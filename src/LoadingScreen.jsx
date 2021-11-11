import React from "react";
import './CSSComponents/App.css';
import CircularProgress from '@mui/material/CircularProgress';
import { blue } from "@mui/material/colors";

const Loader = () => {
  return  (<div ><CircularProgress style={{marginTop:"50vh", marginLeft:"50vw"}} color="secondary" />
  {/*<div style={{marginTop:"0vh", marginLeft:"45vw", color:"black",fontSize:"2vh" , fontWeight:"bold" }} >The PlannerApp is Loading </div>*/}
  </div> )
};

export default Loader;
