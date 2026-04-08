import React from 'react'
import Video from "../assets/video.mp4"
import "../styles/Screen.css"
import Photo from '../assets/react.svg'

import Btn from './Btn'
function Screen({ Status, On, Data, likes, add }) {
  const [userId, SetUserId] = React.useState()
  React.useEffect(() => {
    SetUserId(localStorage.getItem("userid"))
  }, [])
  if (userId) {
    console.log(userId)
  }
  if (!Data || !Data.item || !Data.personal) {
    return <div>Loading...</div>
  }




  return (
    <div className='video-container'>
      <div className='video-wrapper'>
        <video src={Data.item.video_url} controls></video>
      </div>

      <div className='video-details'>
        <h2 className="video-title">{Data.item.title}</h2>

        <div className='channel-row'>
          <div className='channel-info'>
            <img src={Data.item.thumbnail} alt="channel logo" className='channel-logo' />
            <div>
              <h3>{Data.personal.name}</h3>
              <p>2.9M subscribers</p>
            </div>
            <button className='subscribe-btn'>Subscribe</button>
          </div>

          <div className='action-buttons'>
            <Btn Content={likes} fuc={() => {
              add(Data.personal.user_id, userId)
            }} />

            <Btn Content="Share" />
            <Btn Content="Download" />
            <Btn Content="Comments" fuc={() => { Status(!On) }} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Screen