import React from 'react';
import "../styles/SideBar.css";

function CardLabel({ content, fuc, open, img }) {
  return (
    <div className="Align" style={{ cursor: "pointer" }} onClick={fuc}>
      <img src={img} alt="Category Icon" />
      <div style={{ overflow: 'hidden', width: open ? 'auto' : 0 }}>
        <h5 
          className="typography-body1"
          style={{ 
            color: "white", 
            transition: "opacity 0.3s ease",
            whiteSpace: "nowrap",
            opacity: open ? 1 : 0,
            marginLeft: '10px'
          }}
        >
          {content}
        </h5>
      </div>
    </div>
  );
}

export default CardLabel;