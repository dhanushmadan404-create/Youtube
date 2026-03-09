import React from 'react'
import '../styles/Comments.css'
import Typography from '@mui/material/Typography'
import CommentCard from './CommentCard.jsx'
function Comments() {
  return (
    <div className='CommentContainer'>
        <div className='hero'>
            <Typography sx={{color:"white"}}  variant='h5' color={'purple'} fontWeight={'600'}>Comments</Typography>
        </div>
        <div className='Comments'>
            <CommentCard />
            <CommentCard />
            <CommentCard />
            <CommentCard />
            <CommentCard />

        </div>


    </div>
  )
}

export default Comments