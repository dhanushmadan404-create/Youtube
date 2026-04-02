import React from 'react'
import '../styles/Home.css'
// components
import Scrolling from '../Components/Scrolling'
import VideoContainer from '../Components/VideoContainer'
import CategoryBlock from '../Components/CategoryBlock'
import ChannelContainer from '../Components/ChannelContainer'
// Data
import {useSelector} from 'react-redux'
import {getAllVideo} from '../Redux/Slice/VIdeoSlice'
import { useDispatch } from 'react-redux'
function Home() {
    const dispatch=useDispatch()
    const RaVideo=useSelector((state)=>state.video.raVideo)

    React.useEffect(() => {
  dispatch(getAllVideo())
}, [])

React.useEffect(() => {
  console.log("Updated:", RaVideo)
}, [RaVideo])
  return (
    <>
      <div className='Home'>
        <div className='Scrolling'>

        <Scrolling />
        </div>
        <div className='VideoContainer'>
        <CategoryBlock/>
        <ChannelContainer/>
        <VideoContainer Data={RaVideo} />
        </div>

      </div>
    </>

  )
}

export default Home