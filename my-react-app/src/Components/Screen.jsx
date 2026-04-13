import React, { useState, useEffect } from 'react';
import "../styles/Screen.css";
import profileIcon from '../assets/react.svg';
import { useDispatch } from 'react-redux';
import { getVideoLikes, createLikes } from '../Redux/Slice/LikesSlice';
import { createFollowers } from '../Redux/Slice/FollowerSlice';
import Btn from './Btn';

function Screen({ Status, On, Data }) {
  const dispatch = useDispatch();
  const [totalLikes, setTotalLikes] = useState(0);
  const [userId, setUserId] = useState(localStorage.getItem("userid"));
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const fetchLikes = async () => {
    if (Data?.item?._id) {
      try {
        const total = await dispatch(getVideoLikes({ videoId: Data.item._id })).unwrap();
        setTotalLikes(total);
      } catch (err) {
        console.error("fetchLikes error:", err);
      }
    }
  };

  const handleLike = async () => {
    if (!userId) {
      showStatus("Please login to like");
      return;
    }
    try {
      await dispatch(createLikes({ body: { user_id: userId, video_id: Data.item._id } })).unwrap();
      await fetchLikes();
    } catch (err) {
      console.error("Like error:", err);
    }
  };

  const handleSubscribe = async () => {
    if (!userId) {
      showStatus("Please login to subscribe");
      return;
    }
    try {
      const action = await dispatch(createFollowers({ user_id: userId, fan_id: Data.item.user_id }));
      if (createFollowers.fulfilled.match(action)) {
        setIsSubscribed(action.payload.status === "followed");
        showStatus(action.payload.status === "followed" ? "Subscribed!" : "Unsubscribed");
      }
    } catch (err) {
      console.error("Subscribe error:", err);
    }
  };

  const handleShare = () => {
    const videoUrl = window.location.href; 
    navigator.clipboard.writeText(videoUrl);
    showStatus("Link copied to clipboard!");
  };

  const showStatus = (msg) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(""), 3000);
  };

  useEffect(() => {
    fetchLikes();
    // In a real app, you'd check if the user is already subscribed to this channel
  }, [Data, dispatch]);

  if (!Data || !Data.item || !Data.personal) {
    return <div className="loading-text">Loading video...</div>;
  }

  const description = Data.item.description || "";
  const shortDescription = description.length > 100 ? description.substring(0, 100) + "..." : description;

  return (
    <div className='video-container'>
      {statusMessage && (
        <div className="status-toast" style={{
          position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)',
          background: 'var(--purple-main)', color: 'white', padding: '10px 24px', borderRadius: '12px', zIndex: 1000,
          border: '1px solid var(--purple-accent)', boxShadow: '0 8px 32px rgba(0,0,0,0.5)'
        }}>
          {statusMessage}
        </div>
      )}

      <div className='video-wrapper'>
        <video src={Data.item.video_url} controls autoPlay className="custom-vdo-player"></video>
      </div>

      <div className='video-details'>
        <h2 className="video-title">{Data.item.title}</h2>

        <div className='channel-row'>
          <div className='channel-info'>
            <img 
              src={Data.item.thumbnail || profileIcon} 
              alt="channel logo" 
              className='channel-logo' 
            />
            <div>
              <h3>{Data.personal.name}</h3>
              <p>{Data.item.views || 0} views</p>
            </div>
            <button 
              className={`subscribe-btn ${isSubscribed ? 'subscribed' : ''}`} 
              onClick={handleSubscribe}
            >
              {isSubscribed ? "Subscribed" : "Subscribe"}
            </button>
          </div>

          <div className='action-buttons'>
            <button className="action-btn" onClick={handleLike}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/>
              </svg>
              {totalLikes}
            </button>
            <button className="action-btn" onClick={handleShare}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
              </svg>
              Share
            </button>
            <button className="action-btn" onClick={() => Status(!On)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
              </svg>
              Comments
            </button>
          </div>
        </div>

        <div className="description-box" onClick={() => setShowFullDescription(!showFullDescription)}>
          <p style={{ fontWeight: '700', marginBottom: '8px' }}>Description</p>
          <p>
            {showFullDescription ? description : shortDescription}
          </p>
          {description.length > 100 && (
            <span style={{ color: 'var(--purple-accent)', fontWeight: 'bold', display: 'block', marginTop: '8px', fontSize: '13px' }}>
              {showFullDescription ? "Show Less" : "Show More"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Screen;
