import React from "react";
import Profile from "../assets/profile.png";
import Pro from "../assets/react.svg";
import "../styles/Content.css"
import { useNavigate } from "react-router-dom";
function Content({ item}) {

  const navigate=useNavigate()
  return (
    <div className="Content" onClick={()=>{
      navigate("/vdoplayer",{
              state:{
                item:item,
                personal:{name:item.userInfo.name,user_id:item.userInfo._id,profile:item.userInfo.profile_img}
              }
            })
    }}>
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
          <div className="middlePart">
          <p>{item.userInfo.name}</p>
          <p><b>Views:</b>78</p>
          </div>

          <p>{item.category}</p>
        </div>



      </div>
    </div>
  );
}

export default Content;
