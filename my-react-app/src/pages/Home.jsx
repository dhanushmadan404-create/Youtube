import React from 'react'
// components
import Nav from '../Components/Nav'
import SideBar from '../Components/SideBar'
import VideoContainer from '../Components/VideoContainer'
// Data
import {useSelector} from 'react-redux'
function Home() {
  const Data = useSelector((state) => state.Data)
  return (
    <div>
      <Nav/>
      <SideBar/>
      <VideoContainer Data={Data.video}/>
      

        
    </div>
  )
}

export default Home