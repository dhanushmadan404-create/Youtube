import React from "react";
import Profile from "../assets/profile.png";
import Pro from "../assets/react.svg";
import "../styles/Content.css"
function Content() {
  return (
    <div  className="Content">
      <div>
        <img src={Profile} alt="This is my thambnile" />
      </div>
      <div className="ContentBox">
        <img src={Pro} alt="This is my profile" />
        <div>

        <b>This is my first</b>
        <p>Channel</p>
        <p>Categories</p>
        </div>
      </div>
    </div>
  );
}

export default Content;
