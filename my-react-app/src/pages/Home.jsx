import React, { useState, useEffect } from 'react'
import '../styles/Home.css'
// components
import Scrolling from '../Components/Scrolling'
import VideoContainer from '../Components/VideoContainer'
import CategoryBlock from '../Components/CategoryBlock'
import ChannelContainer from '../Components/ChannelContainer'
import { getTopChannelsThunk } from '../Redux/Slice/FollowerSlice'
// Data
import { useSelector, useDispatch } from 'react-redux'
import { getPaginatedVideos } from '../Redux/Slice/VIdeoSlice'

function Home() {
    const dispatch = useDispatch()
    const RaVideo = useSelector((state) => state.video.raVideo)
    const isLoading = useSelector((state) => state.video.isLoading)
    const [skip, setSkip] = useState(0)
    const limit = 10;

    // Get user age for restriction (optional, defaults to null)
    const userAge = localStorage.getItem("userAge") || 20; 
    const getTopFive=()=>{
       const temp= dispatch(getTopChannelsThunk())
       console.log(temp)
    }
    useEffect(() => {

        // Initial fetch
        dispatch(getPaginatedVideos({ skip: 0, limit, age: userAge }))
        getTopFive()
    }, [dispatch, userAge])

    const handleSeeMore = () => {
        const nextSkip = skip + limit;
        setSkip(nextSkip);
        dispatch(getPaginatedVideos({ skip: nextSkip, limit, age: userAge }))
    }

    return (
        <div className='Home'>
            <div className='Scrolling'>
                <Scrolling />
            </div>
            
            <div className='VideoContainer'>
                <CategoryBlock />
                <ChannelContainer />
                
                {RaVideo.length === 0 && !isLoading ? (
                    <div className="no-videos">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor" style={{ opacity: 0.3, marginBottom: '16px' }}>
                            <path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zM8 15c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2H8z"/>
                        </svg>
                        <p>No videos found. Check back later!</p>
                    </div>
                ) : (
                    <>
                        <VideoContainer Data={RaVideo} />
                        
                        <div className="see-more-container" style={{ display: 'flex', justifyContent: 'center', padding: '40px 0' }}>
                            <button 
                                className="custom-btn" 
                                onClick={handleSeeMore}
                                disabled={isLoading}
                                style={{ minWidth: '160px' }}
                            >
                                {isLoading ? "Searching..." : "See More"}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default Home