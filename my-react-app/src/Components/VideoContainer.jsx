import React from 'react'
import '../styles/Vcn.css'
import Content from './Content'
function VideoContainer({Data}) {
 

   
    if (!Data || !Array.isArray(Data) || Data.length === 0) {
 
     return <></>
    }
console.log(Data)
  return (
    <div className='Container'>

        {Data.map((item) =>  <Content key={item._id} item={item}    />        )}

    </div>
  )
}

export default VideoContainer