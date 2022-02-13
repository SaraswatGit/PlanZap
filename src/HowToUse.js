import './howtouse.css';
import task1 from './images/task1.png'
import task2 from './images/task2.png'
import task3 from './images/task3.png'
import task4 from './images/task4.png'
import movie1 from './images/movie1.png'
import movie2 from './images/movie2.png'
import movie3 from './images/movie3.png'
import movie4 from './images/movie4.png'
import diary1 from './images/diary1.png'
import diary2 from './images/diary2.png'
import diary3 from './images/diary3.png'
import note1 from './images/note1.png'
import note2 from './images/note2.png'
import note3 from './images/note3.png'
import note4 from './images/note4.png'



function HowToUse()
{

    return(
        <div className="frame">
           
           <div className="task">
               <h1 className='center'>Task</h1>
               <div className="taskimg">
                   <img src={task1} alt="" />
                   <img src={task2} alt="" />
                   <img src={task3} alt="" />
                   <img src={task4}alt="" />


               </div>

               <div className="taskdetails">

                   <h2>How to add task?</h2>
                   <ol>
                       <li>
                         Go to add task and progress
                       </li>
                       <li>
                         Click the Add new Task button 
                       </li>
                       <li>
                        Fill the pop up modal 
                       </li>
                       <li>
                        Submit
                       </li>
                   </ol>

                   
                   <h2>How to sort task?</h2>
                   <ol>
                       <li>
                       Go to add task and progress
                       </li>
                       <li>
                        Click the Sort task button 
                       </li>
                       <li>
                        Chose the sorting option on the dropdown
                       </li>
                   </ol>

                   <h2>How to delete task?</h2>
                   <ol>
                       <li>
                       Go to add task and progress
                       </li>
                       <li>
                        Click the cross icon (on top right corner of exsisting task card) 
                       </li>
                       <li>
                       Click confirm on the popup modal
                       </li>
                   </ol>

               </div>

           </div>

           <div className="movie">
           <h1 className='center'>Movies to Watch</h1>
               <div className="movieimg">
                   <img src={movie1} alt="" />
                   <img src={movie2} alt="" />
                   <img src={movie3} alt="" />
                   <img src={movie4}alt="" />


               </div>

               <div className="movietails">

                   <h2>How to add movie?</h2>
                   <ol>
                       <li>
                         Go to movies to watch 
                       </li>
                       <li>
                         Fill the modal (details of the movie)
                       </li>
                       <li>
                       Click Submit
                       </li>
                   </ol>

                   
                   <h2>How to edit movies to watch?</h2>
                   <ol>
                       <li>
                         Go to movies to watch
                       </li>
                       <li>
                         Click the edit icon  
                       </li>
                       <li>
                        Fill the pop up modal (re enter what you want to edit)
                       </li>
                       <li>
                        Click Save
                       </li>
                   </ol>

                   <h2>How to delete movie from watch?</h2>
                   <ol>
                       <li>
                         Go to movies to watch
                       </li>
                       <li>
                         Click the delete icon (next to edit icon) 
                       </li>
                       <li>
                       Click confirm on the popup modal
                       </li>
                   </ol>

               </div>

           </div>


           <div className="diary">

           <h1 className='center'>Personal Diary</h1>
               <div className="diaryimg">
                   <img src={diary1} alt="" />
                   <img src={diary2} alt="" />
                   <img src={diary3} alt="" />
                  


               </div>

               <div className="diarydetails">

                   <h2>How to add in diary?</h2>
                   <ol>
                       <li>
                         Go to personal diary 
                       </li>
                       <li>
                         Click the calender icon and choose the date
                       </li>
                       <li>
                       Click update/add button
                       </li>
                       <li>
                       Write what you want to add on the pop up modal
                       </li>
                       <li>
                           Click add entry
                       </li>
                   </ol>

                   
                   <h2>How to update diary?</h2>
                   <ol>
                       <li>
                         Go to personal diary
                       </li>
                       <li>
                       Click the calender icon and choose the date
                       </li>
                       <li>
                       Click update/add button
                       </li>
                       <li>
                       Write what you want to update on the pop up modal 
                       </li>

                       <li>
                           Click Submit
                       </li>
                   </ol>

                   <h2>How to view existing diary entry?</h2>
                   <ol>
                       <li>
                         Go to personal diary
                       </li>
                       <li>
                       Click the calender icon and choose the date
                       </li>
                       <li>
                       Click the view button 
                       </li>
                   </ol>

               </div>

           </div>

          
           <div className="note">
           <h1 className='center'>Ideas and Notes</h1>
               <div className="noteimg">
                   <img src={note1} alt="" />
                   <img src={note2} alt="" />
                   <img src={note3} alt="" />
                   <img src={note4} alt="" />
                  


               </div>

               <div className="diarydetails">

                   <h2>How to add notes?</h2>
                   <ol>
                       <li>
                         Go to idea and notes
                       </li>
                       <li>
                         Click the plus icon ( add notes) 
                       </li>
                       <li>
                       Write your note on the popup modal
                       </li>
                       <li>
                       Click Submit
                       </li>
                      
                   </ol>

                   
                   <h2>How to edit note?</h2>
                   <ol>
                       <li>
                         Go to idea and notes
                       </li>
                       <li>
                       Click the edit icon
                       </li>
                       <li>
                       Write what you want to edit in the pop up modal
                       </li>
                       

                       <li>
                           Click Submit
                       </li>
                   </ol>

                   <h2>How to delete note?</h2>
                   <ol>
                       <li>
                         Go to idea and notes
                       </li>
                       <li>
                       Click delete icon
                       </li>
                       <li>
                       Click confirm on the popup modal
                       </li>
                   </ol>

               </div>

           </div>




        </div>
    )

}

export default HowToUse;