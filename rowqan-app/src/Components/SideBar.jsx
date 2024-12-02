import React from "react";
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
import {Link} from "react-router-dom"



function SideBar() {
  return (
    <>
      <div className="sidebar">
        <img src={userImage} alt="" />
        <h4>Super Admin Page</h4>
        <div className="sidebar-icons">
          <img src={img2} alt="" />
          <Link className="p" to={'/dashboard'}>DashBoard</Link>
        </div>
        <div className="sidebar-icons">
          <img src={img3} alt="" />
          <Link className="p" to={'/users'}>Users</Link>
        </div>
        <div className="sidebar-icons">
          <img src={img4} alt="" />
          <Link className="p" to={'/chaletsowners'}>Chalets Owners</Link>
        </div>
        <div className="sidebar-icons">
          <img src={img4} alt="" />
          <Link className="p" to={'/eventsowners'}>Events Owners</Link>
        </div>
        <div className="sidebar-icons">
          <img src={img4} alt="" />
          <Link className="p" to={'/landsowners'}>Lands Owners</Link>
        </div>
        <div className="sidebar-icons">
          <img src={img4} alt="" />
          <Link className="p" to={'/bookingdetails'}>Booking details</Link>
        </div>
        <div className="sidebar-icons">
          <img src={img5} alt="" />
          <Link className="p" to={'/refunds'}>Refunds</Link>
        </div>{" "}
        <div className="sidebar-icons">
          <img src={img6} alt="" />
          <Link className="p" to={'/messages'}>Messages</Link>
        </div>
        <div className="sidebar-icons">
          <img src={img8} alt="" />
          <Link className="p" to={'/settings'}>Settings</Link>
        </div>
        <div className="sidebar-icons">
          <img src={img9} alt="" />
          <Link className="p">Logout</Link>
        </div>
      </div>
    </>
  );
}

export default SideBar;
