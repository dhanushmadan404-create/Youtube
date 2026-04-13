import React, { useEffect } from 'react';
import VideoContainer from '../Components/VideoContainer';
import "../styles/Following.css";
import { useDispatch, useSelector } from 'react-redux';
import { getFollowingFeed } from '../Redux/Slice/VIdeoSlice';

function Following() {
    const dispatch = useDispatch();
    const followingVideos = useSelector((state) => state.video.followingVideos);
    const isLoading = useSelector((state) => state.video.isLoading);
    const currentUserId = localStorage.getItem("userid");

    useEffect(() => {
        if (currentUserId) {
            dispatch(getFollowingFeed(currentUserId));
        }
    }, [dispatch, currentUserId]);

    return (
        <div className='FollowingContainer'>
            <div className='TopFollow' style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '20px', 
                padding: '20px',
                borderBottom: '1px solid #333'
            }}>
                <h1 className="typography-h5" style={{ fontSize: '2rem', margin: '0' }}>
                    Following
                </h1>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button 
                        className="custom-btn" 
                        style={{ background: 'var(--brand-color)', color: 'white' }}
                    >
                        Videos
                    </button>
                    {/* Category filter removed as per requirements */}
                </div>
            </div>
            
            <div className="FollowingVideos" style={{ padding: '20px' }}>
                {followingVideos.length === 0 && !isLoading ? (
                    <div className="no-videos" style={{ color: 'white', textAlign: 'center', padding: '50px' }}>
                        No videos from followed users yet. Start following creators!
                    </div>
                ) : (
                    <VideoContainer Data={followingVideos} />
                )}
            </div>
        </div>
    );
}

export default Following;