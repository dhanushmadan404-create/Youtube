import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import "../styles/Profile.css";
import profile from "../assets/react.svg"
import Banner from "../assets/profile.png"

function Profile() {
  return (
    <div className="profile">

      {/* Top Section */}
      <div className="profile-header">

        {/* Left Side - Channel Info */}
        <div className="channel-info">
          <div className="avatar">
            <img src={profile} alt="profile" />
          </div>

          <div className="channel-details">
            <h1>Channel Name</h1>
            <b>email@gmail.com</b>
            <h4 className="subscribe">Subscribe</h4>
            <button className="customize-btn">Customize Channel</button>
          </div>
        </div>

        {/* Right Side - Banner */}
        <div className="banner">
          <img src={Banner} alt="banner" />
        </div>

      </div>

      {/* Bottom Section */}
      <div className="profile-actions">
        <button className="video-btn">Videos</button>

        <div className="search-box">
          <TextField 
            placeholder="Search"
            variant="outlined"
            size="small"
          />
          <IconButton>
            <SearchIcon />
          </IconButton>
        </div>
      </div>

    </div>
  )
}

export default Profile