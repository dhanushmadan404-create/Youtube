import React from 'react'
import '../styles/CommentCard.css'
import profile from '../assets/react.svg'
function CommentCard() {
  return (
    <div className='CommentCard'>
        <div ><img src={profile} alt="Profile" /> <b>Email</b></div>
        <div><p>Comment text goes here</p></div>
    </div>
  )
}

export default CommentCard