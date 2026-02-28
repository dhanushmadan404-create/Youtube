import React from 'react'
import '../styles/Vcn.css'
import Content from './Content'
function VideoContainer({Data}) {
  return (
    <div className='Container'>

        {Data.map((item) => (
          <Content key={item.id} item={item} />
        ))}

    </div>
  )
}

export default VideoContainer