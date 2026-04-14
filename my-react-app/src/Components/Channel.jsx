import React from 'react';
import Profile from '../assets/react.svg';
import "../styles/Channel.css";
import { useNavigate } from 'react-router-dom';

function Channel({ channel }) {
  const navigate = useNavigate();
  
  if (!channel) return null;
  
  return (
    <div 
      className='ChannelContainer' 
      onClick={() => navigate("/profile", { state: { User_id: channel.user_id || channel._id } })}
      style={{ cursor: 'pointer' }}
    >
      <img 
        className='ChannelImg' 
        src={channel.userInfo.profileImage || Profile} 
        alt={channel.userInfo.name || "Channel"} 
      />
      <h5 className='Title' style={{ color: 'white', margin: '10px 0' }}>
        {channel.userInfo.name || "Channel name"}
      </h5>
      {channel.followerCount && (
        <span style={{ color: '#aaa', fontSize: '12px' }}>
          {channel.followerCount} subscribers
        </span>
      )}
    </div>
  );
}

export default Channel;
