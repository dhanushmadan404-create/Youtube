import React from 'react'
import image from '../assets/profile.png'
import '../styles/CateCart.css'
function CateCart() {
  return (
    <div className='Cate'>
        <img src={image} alt="This is image" />
        <h1>CategoryName</h1>
    </div>
  )
}

export default CateCart