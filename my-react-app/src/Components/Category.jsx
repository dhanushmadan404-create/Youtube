import React from 'react';
import '../styles/Category.css';

function Category({ content }) {
  return (
    <div className='CategoryCart' onClick={content.fuc} style={{ cursor: 'pointer' }}>
        <img src={content.img} alt="Category Icon" />
        <h5 className="typography-body1" style={{ color: "white", marginTop: '5px' }}>
            {content.name}
        </h5>
    </div>
  );
}

export default Category;