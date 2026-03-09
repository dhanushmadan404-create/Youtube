import React from "react";
import Profile from "../assets/profile.png";
import Pro from "../assets/react.svg";
import "../styles/Content.css"

function Content({ item }) {
  return (
    <div className="Content">
      <div className="Top">
        <img className="thumbnail" src={item.thumbnail} alt="This is my thambnile" />
      </div>
      <div>

        <b className="Title">{item.title}</b>
      </div>
      <div className="ContentBox">


        <div>
          <img src={item.thumbnail} alt="This is my profile" />

        </div>
        <div>
          <p><b>Views:</b>{item.views}</p>

          <p>{item.category}</p>
        </div>



      </div>
    </div>
  );
}

export default Content;
