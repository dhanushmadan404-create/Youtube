import React from 'react'
import "../styles/Scrolling.css"
function Scrolling() {
      const images = [
    "https://picsum.photos/id/1018/400/250",
    "https://picsum.photos/id/1015/400/250",
    "https://picsum.photos/id/1019/400/250",
    "https://picsum.photos/id/1020/400/250",
  ];
  return (
      <div className="scroll-wrapper">
      <div className="scroll-content">
        {[...images,...images].map((img, index) => (
          <img key={index} src={img} alt="banner" />
        ))}
      </div>
    </div>
  )
}

export default Scrolling