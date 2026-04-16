import React from "react";
import Profile from "../assets/profile.png";
import Pro from "../assets/react.svg";
import "../styles/Content.css"
import { useNavigate } from "react-router-dom";

const Content = React.memo(({ item }) => {
  const navigate = useNavigate();

  const handleVideoClick = () => {
    navigate("/vdoplayer", {
      state: {
        item: item,
        personal: { name: item.userInfo?.name, user_id: item.userInfo?._id, profile: item.userInfo?.profile_img }
      }
    });
  };

  const handleProfileClick = () => {
    if (!item.userInfo?._id) return;
    navigate(`/profile?user_id=${item.userInfo._id}`);
  };

  return (
    <div className="Content">
      <div className="thumbnail-container" onClick={handleVideoClick} style={{ cursor: 'pointer' }}>
        <img className="thumbnail" src={item.thumbnail} alt={item.title} />
      </div>

      <div className="card-info">
        <img 
          className="channel-avatar" 
          src={item.userInfo?.profileImage || Pro} 
          alt={item.userInfo?.name || "Channel"} 
          onClick={handleProfileClick}
          style={{ cursor: 'pointer' }}
        />
        
        <div className="details">
          <div onClick={handleVideoClick} style={{ cursor: 'pointer' }}>
            <h3 className="Title">{item.title}</h3>
          </div>
          
          <div className="meta">
            <span 
              className="channel-name" 
              onClick={handleProfileClick}
              style={{ cursor: 'pointer', fontWeight: '500' }}
            >
              {item.userInfo?.name || "Unknown Channel"}
            </span>
            <span>{item.views || 0} views • {item.category}</span>
          </div>
        </div>

      </div>
    </div>
  );
});

export default Content;
