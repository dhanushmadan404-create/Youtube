import React, { useState } from 'react';
import '../styles/Vcn.css';
import { useNavigate } from 'react-router-dom';
import Btn from './Btn';
import { useDispatch } from 'react-redux';
import { removeVideo as removeVideoThunk } from '../Redux/Slice/VIdeoSlice';

function ProfileVideoContainer({ Data }) {
  const [openMenuId, setOpenMenuId] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDelete = async (videoId) => {
    if (window.confirm("Are you sure you want to delete this video?")) {
      try {
        await dispatch(removeVideoThunk(videoId)).unwrap();
      } catch (err) {
        console.error("Delete error:", err);
      }
    }
  };

  const handleUpdate = (item) => {
    navigate("/updateVideo", { state: item });
  };

  if (!Data || !Data.video || !Array.isArray(Data.video) || Data.video.length === 0) {
    return <div style={{ color: "white", textAlign: 'center', padding: '20px' }}>No videos found.</div>;
  }

  return (
    <div className='Container'>
      {Data.video.map((item) => {
        const isOpen = openMenuId === item._id;
        return (
          <div key={item._id} className="Content">
            <div className="thumbnail-container" onClick={() => navigate("/vdoplayer", { state: { item: item, personal: Data.personal } })} style={{ cursor: 'pointer' }}>
              <img className="thumbnail" src={item.thumbnail} alt={item.title} />
              
              {Data.status && (
                <button 
                  className='menuButton' 
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenMenuId(isOpen ? null : item._id);
                  }}
                  style={{ opacity: 1 }} // Keep it visible on profile for owner
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                  </svg>
                </button>
              )}
            </div>

            {Data.status && isOpen && (
              <div className='option'>
                <button 
                  className="custom-btn" 
                  style={{ width: '100%', marginBottom: '5px', padding: '8px', fontSize: '12px', background: '#ff4444' }} 
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </button>
                <button 
                  className="custom-btn" 
                  style={{ width: '100%', padding: '8px', fontSize: '12px' }} 
                  onClick={() => handleUpdate(item)}
                >
                  Update
                </button>
              </div>
            )}

            <div className="card-info">
              <img 
                className="channel-avatar" 
                src={Data.personal.profile} 
                alt="Profile" 
              />
              <div className="details">
                <h3 className="Title" onClick={() => navigate("/vdoplayer", { state: { item: item, personal: Data.personal } })} style={{ cursor: 'pointer' }}>
                  {item.title}
                </h3>
                <div className="meta">
                  <span>{Data.personal.name}</span>
                  <span>{item.views || 0} views • {item.category}</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ProfileVideoContainer;