import EditIcon from "@mui/icons-material/Edit";
import { NavLink } from "react-router-dom";
import TaskIcon from "@mui/icons-material/Task";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import LogoutIcon from "@mui/icons-material/Logout";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import { putRequest } from "../../axiosClient";

const Sidebar = ({
  userquote,
  toggleModal,
  setlogout,
  setloginstatus,
  setloading,
}) => {
  const logout = () => {
    setlogout(true);
    setloginstatus(true);
    setloading(true);
    putRequest("logout", { status: true }).then((response) => {
      setloginstatus(true);
      setloading(false);
    });
  };
  return (
    <div className="sidebar">
      {/*      <NavLink to="/Profile" className="barelement" activeClassName="selected">
                     <AccountCircleIcon />
                     &nbsp; &nbsp; Profile
              </NavLink>*/}
      <div className="quotearea">
        "{userquote}"<br />
        <EditIcon className="editbutton" onClick={toggleModal} />
      </div>
      <NavLink
        to="/TasksandProgress"
        className={({ isActive }) =>
          `link ${
            isActive
              ? "selected"
              : // Couldn't do this before!
                "barelement"
          }`
        }
      >
        <TaskIcon style={{ height: "2.8vh", marginRight: "1vw" }} />
        Tasks and Progress
      </NavLink>
      {/*  <NavLink to="/Performancegraphs" className="barelement" activeClassName="selected">
                     <ShowChartIcon/>      &nbsp; &nbsp;Performance Graphs
    </NavLink>*/}
      <NavLink
        to="/movieslist"
        className={({ isActive }) =>
          `link ${
            isActive
              ? "selected"
              : // Couldn't do this before!
                "barelement"
          }`
        }
      >
        <FormatListBulletedIcon
          style={{ height: "2.8vh", marginRight: "1vw" }}
        />{" "}
        Movies to Watch
      </NavLink>
      <NavLink
        to="/diary"
        className={({ isActive }) =>
          `link ${
            isActive
              ? "selected"
              : // Couldn't do this before!
                "barelement"
          }`
        }
      >
        <MenuBookIcon style={{ height: "2.8vh", marginRight: "1vw" }} />{" "}
        Personal Diary <br />
      </NavLink>
      <NavLink
        to="/ideasnotes"
        className={({ isActive }) =>
          `link ${
            isActive
              ? "selected"
              : // Couldn't do this before!
                "barelement"
          }`
        }
      >
        <CollectionsBookmarkIcon
          style={{ height: "2.8vh", marginRight: "1vw" }}
        />{" "}
        Ideas and Notes <br />
      </NavLink>
      <NavLink
        to="/bookstoread"
        className={({ isActive }) =>
          `link ${
            isActive
              ? "selected"
              : // Couldn't do this before!
                "barelement"
          }`
        }
      >
        <LocalLibraryIcon style={{ height: "2.8vh", marginRight: "1vw" }} />{" "}
        Books to Read <br />
      </NavLink>
      {/* <NavLink
                    to="/howtouse"
                    className={({ isActive }) =>
                      `link ${
                        isActive
                          ? "selected"
                          : // Couldn't do this before!
                            "barelement"
                      }`
                    }
                  >
                    <ListAltIcon
                      style={{ height: "2.8vh", marginRight: "1vw" }}
                    />{" "}
                    How To Use <br />
                  </NavLink> */}
      <div className="logout" onClick={logout} style={{ fontSize: "2.1vh" }}>
        <LogoutIcon style={{ height: "2.8vh", marginRight: "1vw" }} /> Log Out{" "}
      </div>
    </div>
  );
};

export default Sidebar;