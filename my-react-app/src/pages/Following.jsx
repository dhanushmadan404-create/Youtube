import React, { useEffect } from 'react';
import VideoContainer from '../Components/VideoContainer';
import "../styles/Following.css";
import { useDispatch, useSelector } from 'react-redux';
import { getFollowingFeed } from '../Redux/Slice/VIdeoSlice';
import { getFollowing } from '../Redux/Slice/FollowerSlice'; 
import { useNavigate } from 'react-router-dom';
function Following() {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const followingVideos = useSelector((state) => state.video.followingVideos);
  const followedChannels = useSelector((state) => state.followers.following) || []; // GET CHANNELS
  const isLoading = useSelector((state) => state.video.isLoading);
  const currentUserId = localStorage.getItem("userid");

  useEffect(() => {
    if (currentUserId) {
      dispatch(getFollowingFeed({userId:currentUserId}));
      const result=dispatch(getFollowing({userId:currentUserId})); // FETCH FOLLOWED CHANNELS
      console.log(result)
    }

  }, [dispatch, currentUserId]);

  return (
    <div className='FollowingContainer'>
      {/* Header with Followed Channels List */}
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
        
        {/* HORIZONTAL CHANNELS LIST */}
        <div style={{ display: 'flex', gap: '20px', overflowX: 'auto', paddingBottom: '10px' }}>
          {followedChannels.length > 0 ? (
            followedChannels.map((channel) => (
              <div 
                key={channel._id || channel.user_id}
                onClick={() => navigate("/profile", { state: { User_id: channel.user_id } })}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  minWidth: '80px',
                  padding: '10px',
                  borderRadius: '12px',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <img 
                  src={channel.profileImage || channel.profile_img} 
                  alt={channel.name}
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '2px solid var(--purple-accent)'
                  }}
                />
                <span style={{ color: 'white', fontSize: '13px', textAlign: 'center' }}>
                  {channel.name}
                </span>
              </div>
            ))
          ) : (
            <p style={{ color: '#aaa' }}>Not following any channels yet</p>
          )}
        </div>
      </div>

      {/* Videos Section */}
      <div className="FollowingVideos" style={{ padding: '20px' }}>
        <h3 style={{ color: 'white', marginBottom: '20px' }}>Latest from Followed Channels</h3>
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
