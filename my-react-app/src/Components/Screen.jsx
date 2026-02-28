import React from 'react'
import Video from "../assets/video.mp4"
import "../styles/Screen.css"
import Photo from '../assets/react.svg'
function Screen() {
  return (
   <div className='video-container'>
  <div className='video-wrapper'>
    <video src={Video} controls></video>
  </div>

  <div className='video-details'>
    <h2 className="video-title">Video Title Here</h2>

    <div className='channel-row'>
      <div className='channel-info'>
        <img src={Photo} alt="channel logo" className='channel-logo' />
        <div>
          <h3>Channel Name</h3>
          <p>2.9M subscribers</p>
        </div>
        <button className='subscribe-btn'>Subscribe</button>
      </div>

      <div className='action-buttons'>
        <button>👍 63k</button>
        <button>👎</button>
        <button>Share</button>
        <button>Download</button>
      </div>
    </div>
  </div>
</div>
  )
}

export default Screen