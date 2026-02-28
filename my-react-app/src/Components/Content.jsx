import React from "react";
import Profile from "../assets/profile.png";
import Pro from "../assets/react.svg";
import "../styles/Content.css"
function Content({item}) {
  return (
    <div  className="Content">
      <div>
        <img src={item.video.thumbnail} alt="This is my thambnile" />
      </div>
      <div className="ContentBox">
        <img src={item.user[(item.userId-1)].profilePicture} alt="This is my profile" />
        <div>

        <b>{item.video.title}</b>
        <p></p>
        <p>Categories</p>
        </div>
        <b>Views</b>
      </div>
    </div>
  );
}

export default Content;
