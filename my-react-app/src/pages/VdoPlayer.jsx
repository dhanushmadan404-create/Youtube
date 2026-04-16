import React, { useState, useEffect } from 'react'
import Screen from '../Components/Screen'
import Label from '../Components/Label'
import VideoContainer from '../Components/VideoContainer'
import { useSelector, useDispatch } from 'react-redux'
import '../styles/VideoPlayer.css'
import Comments from '../Components/Comments.jsx';
import { useLocation } from 'react-router-dom'
import { incrementViewCountThunk, getRecommendedVideos } from '../Redux/Slice/VIdeoSlice'

function VdoPlayer() {
  const location = useLocation()
  const dispatch = useDispatch()
    const RaVideo = useSelector((state) => state.video.raVideo);
  
  const [showComments, setShowComments] = useState(false)
  const [videoData, setVideoData] = useState(location.state || null)

 useEffect(() => {
  if (location.state) {
    const data = location.state;
    setVideoData(data);

    if (data.item?._id) {
      // ONE USER = ONE VIEW LOGIC
      const viewedVideos = JSON.parse(sessionStorage.getItem('viewedVideos') || '[]');
      const hasViewed = viewedVideos.includes(data.item._id);
      
      if (!hasViewed) {
        dispatch(incrementViewCountThunk(data.item._id));
        viewedVideos.push(data.item._id);
        sessionStorage.setItem('viewedVideos', JSON.stringify(viewedVideos));
      }

     
    }
  }
}, [location.state, dispatch]);


  if (!videoData) {
    return <div className="loading">No video data found.</div>
  }

  return (
    <div className='videoPlayer'>
      <div className='Screen'>
        <Screen 
          Status={setShowComments} 
          On={showComments} 
          Data={videoData}   
        />
      </div>
     
      <div className='VideoContainer'>
        {showComments && <Comments videoId={videoData.item._id} />}
        <h3 className="section-title">Recommended Videos</h3>
        <VideoContainer Data={RaVideo} />
      </div>
    </div>
  )
}

export default VdoPlayer