import React from 'react'
import { useState } from 'react'
import Screen from '../Components/Screen'
import Label from '../Components/Label'
import VideoContainer from '../Components/VideoContainer'
import {useSelector} from 'react-redux'
import '../styles/VideoPlayer.css'
import Comments from '../Components/Comments.jsx';
function VdoPlayer() {
    const Data = useSelector((state) => state.Data)
    const[On,Seton]=useState(false)
  return (
    <div className='videoPlayer'>
      <div className='Screen'>

        <Screen Status={Seton} On={On} />

      </div>
      <div className='Label'>

        <Label/>
      
      </div>
      <div className='VideoContainer'>
        {On && <Comments />}

        <VideoContainer Data={Data}/>
      </div>
        

    </div>
  )
}

export default VdoPlayer