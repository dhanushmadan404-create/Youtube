import React from 'react'
import '../styles/Vcn.css'
import Content from './Content'
function VideoContainer({Data}) {
 

   
    if (!Data || !Array.isArray(Data) || Data.length === 0) {
 
     return <div style={{color:"white",position:"absolute",left:"48%",top:"70%"}}>No Video Uploaded </div>; // 👈 prevents crash
    }


  return (
    <div className='Container'>

        {Data.map((item) =>  <Content key={item._id} item={item}    />        )}

    </div>
  )
}

export default VideoContainer