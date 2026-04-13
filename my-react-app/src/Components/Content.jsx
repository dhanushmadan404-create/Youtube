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
        personal: { name: item.userInfo.name, user_id: item.userInfo._id, profile: item.userInfo.profile_img }
      }
    });
  };

  const handleProfileClick = () => {
    navigate("/profile", {
      state: {
        User_id: item.userInfo._id,
    
      }
    });
  };

  return (
    <div className="Content">
      <div className="thumbnail-container" onClick={handleVideoClick} style={{ cursor: 'pointer' }}>
        <img className="thumbnail" src={item.thumbnail} alt={item.title} />
      </div>

      <div className="card-info">
        <img 
          className="channel-avatar" 
          src={item.userInfo.profileImage || Pro} 
          alt={item.userInfo.name} 
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
              {item.userInfo.name}
            </span>
            <span>{item.views || 0} views • {item.category}</span>
          </div>
        </div>

        <button className="menuButton">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
          </svg>
        </button>
      </div>
    </div>
  );
});

export default Content;
