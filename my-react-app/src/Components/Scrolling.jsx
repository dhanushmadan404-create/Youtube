import React from 'react';
import "../styles/Scrolling.css";
import { useNavigate } from "react-router-dom";

function Scrolling({ videos }) {
  const navigate = useNavigate();

  if (!videos || videos.length === 0) {
    return null;
  }

  const handleVideoClick = (item) => {
    navigate("/vdoplayer", {
      state: {
        item: item,
        personal: { 
          name: item.userInfo.name, 
          user_id: item.userInfo._id, 
          profile: item.userInfo.profile_img 
        }
      }
    });
  };

  // Duplicate videos for seamless circular scrolling if needed, 
  // or just render the 5 videos. The user wants "top five".
  return (
    <div className="scroll-wrapper">
      <div className="scroll-content">
        {videos.map((video, index) => (
          <div key={video._id || index} className="scroll-item" onClick={() => handleVideoClick(video)}>
            <img src={video.thumbnail} alt={video.title} />
            <div className="video-title-overlay">{video.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Scrolling;