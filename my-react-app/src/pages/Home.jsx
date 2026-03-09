import React from 'react'
import '../styles/Home.css'
// components
import Scrolling from '../Components/Scrolling'
import VideoContainer from '../Components/VideoContainer'
import CategoryBlock from '../Components/CategoryBlock'
import ChannelContainer from '../Components/ChannelContainer'
// Data
import {useSelector} from 'react-redux'

function Home() {
    const Data = useSelector((state) => state.Data)

  return (
    <>
      <div className='Home'>
        <div className='Scrolling'>

        <Scrolling />
        </div>
        <div className='VideoContainer'>
        <CategoryBlock/>
        <ChannelContainer/>
        <VideoContainer Data={Data} />
        </div>

      </div>
    </>

  )
}

export default Home