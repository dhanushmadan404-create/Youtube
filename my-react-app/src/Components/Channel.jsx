import React from 'react';
import Profile from '../assets/react.svg';
import "../styles/Channel.css";

function Channel() {
  return (
    <div className='ChannelContainer'>
      <img className='ChannelImg' src={Profile} alt="Channel Profile" />
      <h5 className='Title' style={{ color: 'white', margin: '10px 0' }}>Channel name</h5>
    </div>
  );
}

export default Channel;