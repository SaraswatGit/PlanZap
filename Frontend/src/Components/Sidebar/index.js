
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

import TaskIcon from "@mui/icons-material/Task";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import EditIcon from "@mui/icons-material/Edit";
import ListAltIcon from "@mui/icons-material/ListAlt";
// import { usercontext } from "./Context/usercontext";
import LogoutIcon from "@mui/icons-material/Logout";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";

function Sidebar(props) {
    const menuItems=[
        {name:"Tasks and Progress",to:"/TasksandProgress",icon:<TaskIcon/> },
        {name:"Movies to Watch" ,to:"/movieslist",icon:<FormatListBulletedIcon/>},
    {name:"Personal Diary",to:"/diary",icon:<MenuBookIcon/>},
    {name:"Ideas and Notes",to:"/ideasnotes",icon:<CollectionsBookmarkIcon/>},
    {name:"Books to Read",to:"/bookstoread",icon:<LocalLibraryIcon/>},
   


    ]
    const {sideOpen}=props
    
  return (
    <div>
        
        
        
            {
                menuItems.map((vals)=>{
                    return (
                        <div >
                            {/* this will contain  for loop for holding all the elements in the sidemenu */}
                            <NavLink
                            
                            to={vals.to}
                            className={({ isActive }) =>
                            `link ${
                              isActive
                                ? "selected"
                                : // Couldn't do this before!
                                  "barelement"
                            }`
                          }
                            >
                                <div className='menu-overall'>
                                {vals.icon}
                                <div className='menu-item'>
                                {vals.name}
                                </div>

                            </div>
                            
                            <br />
                           

                            </NavLink>
                            
                            </div>
                    )

                })
            }
                 
                 
    </div>
  )
}

export default Sidebar