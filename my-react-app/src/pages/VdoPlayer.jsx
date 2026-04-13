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
  const recommendedVideos = useSelector((state) => state.video.recommendedVideos)
  const [showComments, setShowComments] = useState(false)
  const [videoData, setVideoData] = useState(location.state || null)

  useEffect(() => {
    if (location.state) {
      const data = location.state;
      setVideoData(data);
      
      // 1. Increment view count
      if (data.item?._id) {
        dispatch(incrementViewCountThunk(data.item._id));
      }

      // 2. Fetch recommended videos
      if (data.item?._id && data.item?.category) {
        dispatch(getRecommendedVideos({ 
          videoId: data.item._id, 
          category: data.item.category, 
          title: data.item.title 
        }));
      }
    }
  }, [location.state, dispatch])

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
      <div className='Label'>
        <Label />
      </div>
      <div className='VideoContainer'>
        {showComments && <Comments videoId={videoData.item._id} />}
        <h3 className="section-title">Recommended Videos</h3>
        <VideoContainer Data={recommendedVideos} />
      </div>
    </div>
  )
}

export default VdoPlayer