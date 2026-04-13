import React from 'react';

function Btn({ Content, fuc, style }) {
  return (
    <button 
      className="custom-nav-btn" 
      style={{
        backgroundColor: 'black',
        color: 'white',
        border: '2px solid purple',
        padding: '6px 16px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: '500',
        transition: '0.3s',
        ...style
      }} 
      onClick={fuc}
      onMouseEnter={(e) => {
        e.target.style.boxShadow = '0 0 15px rgba(106,13,173,1)';
      }}
      onMouseLeave={(e) => {
        e.target.style.boxShadow = 'none';
      }}
    >
      {Content}
    </button>
  );
}

export default Btn;