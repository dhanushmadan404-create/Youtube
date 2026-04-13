import React from 'react';
import '../styles/CommentCard.css';
import profile from '../assets/react.svg';

function CommentCard({ data, onDelete, isOwner }) {
  if (!data) return null;

  return (
    <div className='CommentCard' style={{ display: 'flex', flexDirection: 'column', gap: '5px', padding: '10px', borderBottom: '1px solid #333' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img 
            src={profile} 
            alt="Profile" 
            style={{ width: '32px', height: '32px', borderRadius: '50%' }} 
          /> 
          <b className="typography-body1" style={{ fontSize: '0.9rem' }}>{data.userInfo?.[0]?.name || "Anonymous"}</b>
        </div>
        {isOwner && (
          <button 
            onClick={onDelete} 
            style={{ background: 'none', border: 'none', color: '#ff4444', cursor: 'pointer', fontSize: '0.8rem' }}
          >
            Delete
          </button>
        )}
      </div>
      <div style={{ paddingLeft: '42px' }}>
        <p className="typography-body1">{data.comment}</p>
      </div>
    </div>
  );
}

export default CommentCard;