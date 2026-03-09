import React from 'react'
import '../styles/Vcn.css'
import Content from './Content'
import {Data} from '../Backend/Data'
function VideoContainer() {
  const value=Data
  return (
    <div className='Container'>

        {value.video.map((item) =>  <Content key={item.id} item={item} />        )}

    </div>
  )
}

export default VideoContainer