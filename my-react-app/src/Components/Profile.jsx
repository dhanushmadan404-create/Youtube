import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { TextField, InputAdornment } from "@mui/material";
import "../styles/Profile.css";
import profile from "../assets/react.svg"
import Banner from "../assets/profile.png"
import Btn from './Btn';
import Typography from '@mui/material/Typography';
function Profile() {
  return (
    <div className="profile">

      {/* Top Section */}
      <div className="profile-header">

        {/* Left Side - Channel Info */}
        <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
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
          <div>
       <Typography variant="h5" Content='h5' sx={{color:"white"}} >
      This is a paragraph using Material UI Typography component. 
      The "paragraph" prop automatically adds margin at the bottom 
      like a normal HTML paragraph tag.
    </Typography>
          </div>
        </div>

        {/* Right Side - Banner */}
        <div className="banner">
          <img src={Banner} alt="banner" />
        </div>

      </div>

      {/* Bottom Section */}
      <div className="profile-actions">
        <Btn Content={"Video"}/>

        <div className="search-box">
        <TextField
  placeholder="Search"
  variant="outlined"
  size="small"
  sx={{
    width: "600px",
    backgroundColor: "black",
    borderRadius: "40px",

    "& .MuiOutlinedInput-root": {
      borderRadius: "40px",
      color: "white",

      "& fieldset": {
        borderColor: "white",
        borderWidth: "2px",
      },

      "&:hover fieldset": {
        borderColor: "#2196f3",
      },

      "&.Mui-focused fieldset": {
        borderColor: "#2196f3",
      },
    },

    "& input::placeholder": {
      color: "white",
      opacity: 0.7,
    },
  }}
  InputProps={{
    endAdornment: (
      <InputAdornment position="end">
        <SearchIcon sx={{ color: "white" }} />
      </InputAdornment>
    ),
  }}
/>
        </div>
      </div>

    </div>
  )
}

export default Profile