import React, { useState } from "react";
import "../Styles/SideBar.css";
import userImage from "../Images/user.png";
import img2 from "../Images/img2.png";
import img3 from "../Images/img3.png";
import img4 from "../Images/img4.png";
import img5 from "../Images/img5.png";
import img6 from "../Images/img6.png";
import img7 from "../Images/img7.png";
import img8 from "../Images/img8.png";
import img9 from "../Images/img9.png";
import { Link } from "react-router-dom";

function SideBar() {

  const [settingsOpen, setSettingsOpen] = useState(false);


  const toggleSettings = () => {
    setSettingsOpen(prevState => !prevState); 
  };

  return (
    <div className="sidebar">
      <img src={userImage} alt="User" className="user-image" />
      <h4 className="sidebar-title">Super Admin Page</h4>

      <div className="sidebar-icons">
        <img src={img2} alt="" />
        <Link className="p" to={"/dashboard"}>DashBoard</Link>
      </div>
      <div className="sidebar-icons">
        <img src={img3} alt="" />
        <Link className="p" to={"/users"}>Users</Link>
      </div>
      <div className="sidebar-icons">
        <img src={img4} alt="" />
        <Link className="p" to={"/chaletsowners"}>Chalets Owners</Link>
      </div>
      {/* <div className="sidebar-icons">
        <img src={img4} alt="" />
        <Link className="p" to={"/eventsowners"}>Events Owners</Link>
      </div>
      <div className="sidebar-icons">
        <img src={img4} alt="" />
        <Link className="p" to={"/landsowners"}>Lands Owners</Link>
      </div> */}
      <div className="sidebar-icons">
        <img src={img4} alt="" />
        <Link className="p" to={"/reservations"}>Reservations Details</Link>
      </div>

    
      <div className="sidebar-icons">
        <img src={img8} alt="" />
        <span
          className="p settings"
          onClick={toggleSettings} 
        >
         <Link className="p" to="/homesettings">Settings</Link>
        </span>
      </div>

      <div className="sidebar-icons">
        <img src={img9} alt="" />
        <Link className="p">Logout</Link>
      </div>
    </div>
  );
}

export default SideBar;
