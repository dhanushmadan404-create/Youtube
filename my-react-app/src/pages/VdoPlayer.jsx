import React from 'react'
import { useState } from 'react'
import Screen from '../Components/Screen'
import Label from '../Components/Label'
import VideoContainer from '../Components/VideoContainer'
import { useSelector, useDispatch } from 'react-redux'
import '../styles/VideoPlayer.css'
import Comments from '../Components/Comments.jsx';
import { useLocation } from 'react-router-dom'
import { getVideoLikes } from '../Redux/Slice/LikesSlice'
import { createLikes } from '../Redux/Slice/LikesSlice'

function VdoPlayer() {
  const location = useLocation()
  const status = useSelector((state) => state.likes.likesCreate)

  const dispatch = useDispatch()
  const Data = useSelector((state) => state.Data)
  const [On, Seton] = useState(false)
  const [ScreenData, SetData] = useState(false)
  const [totalLikes, SetTotalLikes] = useState(false)


  // Add likes
  async function AddLike(user_id, video_id) {
    try {
      console.log("Started with:", user_id, video_id)
      const body = { user_id: user_id, video_id: video_id }
      console.log("Sending body:", body)
      const result = await dispatch(createLikes({ body: body })).unwrap()
      console.log("Success:", result)

    } catch (err) {
      console.log("Error:", err)
    }
  }

  React.useEffect(() => {

    async function fetchLikes() {
      if (Data && Data.item && Data.item._id) {
        SetTotalLikes(await dispatch(getVideoLikes({ videoId: Data.item._id })).unwrap())
        console.log(`hello:${totalLikes}`)
      }
    }
    fetchLikes()

    console.log(location.state)
    SetData(location.state)
  }, [])
  return (
    <div className='videoPlayer'>
      <div className='Screen'>

        <Screen Status={Seton} On={On} Data={ScreenData ? ScreenData : null} likes={totalLikes} add={AddLike} />

      </div>
      <div className='Label'>

        <Label />

      </div>
      <div className='VideoContainer'>
        {On && <Comments />}

        <VideoContainer Data={Data} />
      </div>


    </div>
  )
}

export default VdoPlayer