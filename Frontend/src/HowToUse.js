import { useState } from "react";
import "./howtouse.css";
import task1 from "./images/task1.png";
import task2 from "./images/task2.png";
import task3 from "./images/task3.png";
import task4 from "./images/task4.png";
import stask2 from "./images/stask2.png";
import stask3 from "./images/stask3.png";
import dtask4 from "./images/dtask4.png";
import movie1 from "./images/movie1.png";
import movie2 from "./images/movie2.png";
// import movie3 from './images/movie3.png';
import movie4 from "./images/movie4.png";
import movie5 from "./images/movie5.png";
import movie6 from "./images/movie6.png";
import diary1 from "./images/diary1.png";
import diary2 from "./images/diary2.png";
import diary3 from "./images/diary3.png";
import diary4 from "./images/diary4.png";
import diary5 from "./images/diary5.png";
import note1 from "./images/note1.png";
import note2 from "./images/note2.png";
import note3 from "./images/note3.png";
import note4 from "./images/note4.png";
import note5 from "./images/note5.png";
import rarrow from "./images/right-arrow.png";
import loadingImg from "./images/spinner.gif";

function HowToUse() {
  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, 1000);

  return (
    <div className="frame">
      <h1 className="head-txt">How to use PlanZap</h1>

      {/* Add Task */}
      <div className="sub-frame">
        <h3>How to add task?</h3>

        <div className="steps-container">
          <div className="steps">
            {loading ? (
              <img src={loadingImg} alt="" />
            ) : (
              <img src={task1} alt="" />
            )}
            <p>
              <span className="step-number">Step 1:</span>
              Go to add task and progress
            </p>
          </div>

          <img className="right-arrow" src={rarrow} alt="" />

          <div className="steps">
            {loading ? (
              <img src={loadingImg} width="30" alt="" />
            ) : (
              <img src={task2} alt="" />
            )}
            <p>
              <span className="step-number">Step 2:</span>
              Click the Add new Task button
            </p>
          </div>

          <img className="right-arrow" src={rarrow} alt="" />

          <div className="steps">
            {loading ? (
              <img src={loadingImg} width="30" alt="" />
            ) : (
              <img src={task3} alt="" />
            )}
            <p>
              <span className="step-number">Step 3:</span>
              Fill the pop up modal
            </p>
          </div>

          <img className="right-arrow" src={rarrow} alt="" />

          <div className="steps">
            {loading ? (
              <img src={loadingImg} width="30" alt="" />
            ) : (
              <img src={task4} alt="" />
            )}
            <p>
              <span className="step-number">Step 4:</span>
              Submit
            </p>
          </div>
        </div>
      </div>

      <hr></hr>

      {/* Sort Task */}
      <div className="sub-frame">
        <h3>How to sort task?</h3>

        <div className="steps-container">
          <div className="steps">
            {loading ? (
              <img src={loadingImg} width="30" alt="" />
            ) : (
              <img src={task1} alt="" />
            )}
            <p>
              <span className="step-number">Step 1:</span>
              Go to add task and progress
            </p>
          </div>

          <img className="right-arrow" src={rarrow} alt="" />

          <div className="steps">
            {loading ? (
              <img src={loadingImg} width="30" alt="" />
            ) : (
              <img src={stask2} alt="" />
            )}
            <p>
              <span className="step-number">Step 2:</span>
              Click the Sort task button
            </p>
          </div>

          <img className="right-arrow" src={rarrow} alt="" />

          <div className="steps">
            {loading ? (
              <img src={loadingImg} width="30" alt="" />
            ) : (
              <img src={stask3} alt="" />
            )}
            <p>
              <span className="step-number">Step 3:</span>
              Choose the sorting option on the dropdown
            </p>
          </div>
        </div>
      </div>

      <hr></hr>

      {/* Delete Task */}
      <div className="sub-frame">
        <h3>How to delete task?</h3>

        <div className="steps-container">
          <div className="steps">
            {loading ? (
              <img src={loadingImg} width="30" alt="" />
            ) : (
              <img src={task1} alt="" />
            )}
            <p>
              <span className="step-number">Step 1:</span>
              Go to add task and progress
            </p>
          </div>

          <img className="right-arrow" src={rarrow} alt="" />

          <div className="steps">
            {loading ? (
              <img src={loadingImg} width="30" alt="" />
            ) : (
              <img src={task4} alt="" />
            )}
            <p>
              <span className="step-number">Step 2:</span>
              Click the cross icon (on top right corner of exsisting task card)
            </p>
          </div>

          <img className="right-arrow" src={rarrow} alt="" />

          <div className="steps">
            {loading ? (
              <img src={loadingImg} width="30" alt="" />
            ) : (
              <img src={dtask4} alt="" />
            )}
            <p>
              <span className="step-number">Step 3:</span>
              Click confirm on the popup modal
            </p>
          </div>
        </div>
      </div>

      <hr></hr>

      {/* Add Movie */}
      <div className="sub-frame">
        <h3>How to add movie?</h3>

        <div className="steps-container">
          <div className="steps">
            {loading ? (
              <img src={loadingImg} width="30" alt="" />
            ) : (
              <img src={movie5} alt="" />
            )}
            <p>
              <span className="step-number">Step 1:</span>
              Go to movies to watch
            </p>
          </div>

          <img className="right-arrow" src={rarrow} alt="" />

          <div className="steps">
            {loading ? (
              <img src={loadingImg} width="30" alt="" />
            ) : (
              <img src={movie1} alt="" />
            )}
            <p>
              <span className="step-number">Step 2:</span>
              Fill the modal (details of the movie)
            </p>
          </div>

          <img className="right-arrow" src={rarrow} alt="" />

          <div className="steps">
            {loading ? (
              <img src={loadingImg} width="30" alt="" />
            ) : (
              <img src={movie1} alt="" />
            )}
            <p>
              <span className="step-number">Step 3:</span>
              Click Submit
            </p>
          </div>
        </div>
      </div>

      <hr></hr>

      {/* Edit movies */}
      <div className="sub-frame">
        <h3>How to edit movies to watch?</h3>

        <div className="steps-container">
          <div className="steps">
            {loading ? (
              <img src={loadingImg} width="30" alt="" />
            ) : (
              <img src={movie5} alt="" />
            )}
            <p>
              <span className="step-number">Step 1:</span>
              Go to movies to watch
            </p>
          </div>

          <img className="right-arrow" src={rarrow} alt="" />

          <div className="steps">
            {loading ? (
              <img src={loadingImg} width="30" alt="" />
            ) : (
              <img src={movie2} alt="" />
            )}
            <p>
              <span className="step-number">Step 2:</span>
              Click the edit icon
            </p>
          </div>

          <img className="right-arrow" src={rarrow} alt="" />

          <div className="steps">
            {loading ? (
              <img src={loadingImg} width="30" alt="" />
            ) : (
              <img src={movie6} alt="" />
            )}
            <p>
              <span className="step-number">Step 3:</span>
              Fill the pop up modal (re enter what you want to edit)
            </p>
          </div>

          <img className="right-arrow" src={rarrow} alt="" />

          <div className="steps">
            {loading ? (
              <img src={loadingImg} width="30" alt="" />
            ) : (
              <img src={movie6} alt="" />
            )}
            <p>
              <span className="step-number">Step 4:</span>
              Click Save
            </p>
          </div>
        </div>
      </div>

      <hr></hr>

      {/* Delete Movie */}
      <div className="sub-frame">
        <h3>How to delete movie from watch?</h3>

        <div className="steps-container">
          <div className="steps">
            {loading ? (
              <img src={loadingImg} width="30" alt="" />
            ) : (
              <img src={movie5} alt="" />
            )}
            <p>
              <span className="step-number">Step 1:</span>
              Go to movies to watch
            </p>
          </div>

          <img className="right-arrow" src={rarrow} alt="" />

          <div className="steps">
            {loading ? (
              <img src={loadingImg} width="30" alt="" />
            ) : (
              <img src={movie2} alt="" />
            )}
            <p>
              <span className="step-number">Step 2:</span>
              Click the delete icon (next to edit icon)
            </p>
          </div>

          <img className="right-arrow" src={rarrow} alt="" />

          <div className="steps">
            {loading ? (
              <img src={loadingImg} width="30" alt="" />
            ) : (
              <img src={movie4} alt="" />
            )}
            <p>
              <span className="step-number">Step 3:</span>
              Click confirm on the popup modal
            </p>
          </div>
        </div>
      </div>

      <hr></hr>

      {/* Add diary */}
      <div className="sub-frame">
        <h3>How to add in diary?</h3>

        <div className="steps-container">
          <div className="steps">
            {loading ? (
              <img src={loadingImg} width="30" alt="" />
            ) : (
              <img src={diary4} alt="" />
            )}
            <p>
              <span className="step-number">Step 1:</span>
              Go to personal diary
            </p>
          </div>

          <img className="right-arrow" src={rarrow} alt="" />

          <div className="steps">
            {loading ? (
              <img src={loadingImg} width="30" alt="" />
            ) : (
              <img src={diary1} alt="" />
            )}
            <p>
              <span className="step-number">Step 2:</span>
              Click the calender icon and choose the date
            </p>
          </div>

          <img className="right-arrow" src={rarrow} alt="" />

          <div className="steps">
            {loading ? (
              <img src={loadingImg} width="30" alt="" />
            ) : (
              <img src={diary2} alt="" />
            )}
            <p>
              <span className="step-number">Step 3:</span>
              Click add button
            </p>
          </div>

          <img className="right-arrow" src={rarrow} alt="" />

          <div className="steps">
            {loading ? (
              <img src={loadingImg} width="30" alt="" />
            ) : (
              <img src={diary2} alt="" />
            )}
            <p>
              <span className="step-number">Step 4:</span>
              Write what you want to add on the pop up modal and click entry
            </p>
          </div>
        </div>
      </div>

      <hr></hr>

      {/* Update diary */}
      <div className="sub-frame">
        <h3>How to update in diary?</h3>

        <div className="steps-container">
          <div className="steps">
            {loading ? (
              <img src={loadingImg} width="30" alt="" />
            ) : (
              <img src={diary4} alt="" />
            )}
            <p>
              <span className="step-number">Step 1:</span>
              Go to personal diary
            </p>
          </div>

          <img className="right-arrow" src={rarrow} alt="" />

          <div className="steps">
            {loading ? (
              <img src={loadingImg} width="30" alt="" />
            ) : (
              <img src={diary1} alt="" />
            )}
            <p>
              <span className="step-number">Step 2:</span>
              Click the calender icon and choose the date
            </p>
          </div>

          <img className="right-arrow" src={rarrow} alt="" />

          <div className="steps">
            {loading ? (
              <img src={loadingImg} width="30" alt="" />
            ) : (
              <img src={diary3} alt="" />
            )}
            <p>
              <span className="step-number">Step 3:</span>
              Click update button
            </p>
          </div>

          <img className="right-arrow" src={rarrow} alt="" />

          <div className="steps">
            {loading ? (
              <img src={loadingImg} width="30" alt="" />
            ) : (
              <img src={diary3} alt="" />
            )}
            <p>
              <span className="step-number">Step 4:</span>
              Write what you want to add on the pop up modal and click entry
            </p>
          </div>
        </div>
      </div>

      <hr></hr>

      {/* View diary */}
      <div className="sub-frame">
        <h3>How to view in diary?</h3>

        <div className="steps-container">
          <div className="steps">
            {loading ? (
              <img src={loadingImg} width="30" alt="" />
            ) : (
              <img src={diary4} alt="" />
            )}
            <p>
              <span className="step-number">Step 1:</span>
              Go to personal diary
            </p>
          </div>

          <img className="right-arrow" src={rarrow} alt="" />

          <div className="steps">
            {loading ? (
              <img src={loadingImg} width="30" alt="" />
            ) : (
              <img src={diary1} alt="" />
            )}
            <p>
              <span className="step-number">Step 2:</span>
              Click the calender icon and choose the date
            </p>
          </div>

          <img className="right-arrow" src={rarrow} alt="" />

          <div className="steps">
            {loading ? (
              <img src={loadingImg} width="30" alt="" />
            ) : (
              <img src={diary5} alt="" />
            )}
            <p>
              <span className="step-number">Step 3:</span>
              Click the view button
            </p>
          </div>
        </div>
      </div>

      <hr></hr>

      {/* Add Notes */}
      <div className="sub-frame">
        <h3>How to add notes?</h3>

        <div className="steps-container">
          <div className="steps">
            {loading ? (
              <img src={loadingImg} width="30" alt="" />
            ) : (
              <img src={note5} alt="" />
            )}
            <p>
              <span className="step-number">Step 1:</span>
              Go to idea and notes
            </p>
          </div>

          <img className="right-arrow" src={rarrow} alt="" />

          <div className="steps">
            {loading ? (
              <img src={loadingImg} width="30" alt="" />
            ) : (
              <img src={note1} alt="" />
            )}
            <p>
              <span className="step-number">Step 2:</span>
              Click the plus icon ( add notes)
            </p>
          </div>

          <img className="right-arrow" src={rarrow} alt="" />

          <div className="steps">
            {loading ? (
              <img src={loadingImg} width="30" alt="" />
            ) : (
              <img src={note3} alt="" />
            )}
            <p>
              <span className="step-number">Step 3:</span>
              Write your note on the popup modal
            </p>
          </div>

          <img className="right-arrow" src={rarrow} alt="" />

          <div className="steps">
            {loading ? (
              <img src={loadingImg} width="30" alt="" />
            ) : (
              <img src={note3} alt="" />
            )}
            <p>
              <span className="step-number">Step 4:</span>
              Click Submit
            </p>
          </div>
        </div>
      </div>
      <hr></hr>

      {/* Edit Notes */}
      <div className="sub-frame">
        <h3>How to edit note?</h3>

        <div className="steps-container">
          <div className="steps">
            {loading ? (
              <img src={loadingImg} width="30" alt="" />
            ) : (
              <img src={note5} alt="" />
            )}
            <p>
              <span className="step-number">Step 1:</span>
              Go to idea and notes
            </p>
          </div>

          <img className="right-arrow" src={rarrow} alt="" />

          <div className="steps">
            {loading ? (
              <img src={loadingImg} width="30" alt="" />
            ) : (
              <img src={note2} alt="" />
            )}
            <p>
              <span className="step-number">Step 2:</span>
              Click the edit icon
            </p>
          </div>

          <img className="right-arrow" src={rarrow} alt="" />

          <div className="steps">
            {loading ? (
              <img src={loadingImg} width="30" alt="" />
            ) : (
              <img src={note3} alt="" />
            )}
            <p>
              <span className="step-number">Step 3:</span>
              Write what you want to edit in the pop up modal
            </p>
          </div>
        </div>
      </div>

      <hr></hr>

      {/* Delete Notes */}
      <div className="sub-frame">
        <h3>How to delete note?</h3>

        <div className="steps-container">
          <div className="steps">
            {loading ? (
              <img src={loadingImg} width="30" alt="" />
            ) : (
              <img src={note5} alt="" />
            )}
            <p>
              <span className="step-number">Step 1:</span>
              Go to idea and notes
            </p>
          </div>

          <img className="right-arrow" src={rarrow} alt="" />

          <div className="steps">
            {loading ? (
              <img src={loadingImg} width="30" alt="" />
            ) : (
              <img src={note2} alt="" />
            )}
            <p>
              <span className="step-number">Step 2:</span>
              Click the cross icon
            </p>
          </div>

          <img className="right-arrow" src={rarrow} alt="" />

          <div className="steps">
            {loading ? (
              <img src={loadingImg} width="30" alt="" />
            ) : (
              <img src={note4} alt="" />
            )}
            <p>
              <span className="step-number">Step 3:</span>
              Click confirm on the popup modal
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HowToUse;
