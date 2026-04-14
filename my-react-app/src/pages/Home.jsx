import React, { useState, useEffect } from 'react';
import '../styles/Home.css';
import Scrolling from '../Components/Scrolling';
import VideoContainer from '../Components/VideoContainer';
import CategoryBlock from '../Components/CategoryBlock';
import Channel from '../Components/Channel'; // IMPORT CHANNEL DIRECTLY
import { useSelector, useDispatch } from 'react-redux';
import { getPaginatedVideos,getTopFive } from '../Redux/Slice/VIdeoSlice';
import { getTopChannelsThunk } from '../Redux/Slice/FollowerSlice';

function Home() {
  const dispatch = useDispatch();
  const RaVideo = useSelector((state) => state.video.raVideo);
  const isLoading = useSelector((state) => state.video.isLoading);
  const topChannels = useSelector((state) => state.followers?.topChannels) || []; // GET TOP CHANNELS
  const topFive=useSelector((state)=>state.video.TopFive)
  
  

  useEffect(() => {
    dispatch(getTopFive())
    dispatch(getPaginatedVideos());
    dispatch(getTopChannelsThunk()); // FETCH TOP CHANNELS
  
  }, [dispatch]);

  const handleSeeMore = () => {
    dispatch(getPaginatedVideos());
  };
      console.log(topFive)

  return (
    <div className='Home'>
      <div className='Scrolling'>
        {topFive.length > 0 && (
          <div style={{ padding: '10px' }}>
            <h1 className="typography-h4" style={{ color: 'white', marginBottom: '15px' }}>
              Trending Videos
            </h1>
            <Scrolling videos={topFive} />
          </div>
        )}
      </div>
            
      <div className='VideoContainer'>
        <CategoryBlock />
        
        {/* TOP CHANNELS SECTION */}
        {topChannels.length > 0 && (
          <div style={{ margin: '20px 0' }}>
            <h3 className="typography-h5" style={{ color: 'white', marginBottom: '15px' }}>
              Top Channels
            </h3>
            <div className='CategoryBlock'>
              {topChannels.map((channel, index) => (
                <Channel key={channel._id || index} channel={channel} />
              ))}
            </div>
          </div>
        )}
        
        <h3 className="typography-h5" style={{ color: 'white', margin: '20px 0' }}>
          Recommended Videos
        </h3>
                
        {RaVideo.length === 0 && !isLoading ? (
          <div className="no-videos">
            <p>No videos found. Check back later!</p>
          </div>
        ) : (
          <>
            <VideoContainer Data={RaVideo} />
         
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
