import React from 'react'
import Profile from '../assets/react.svg'
import { Typography } from '@mui/material'
import "../styles/Channel.css"
function Channel() {
  return (
    <div className='ChannelContainer'>
      <img className='ChannelImg' src={Profile} alt="Error" />
      <Typography className='Title' variant='h5' component="h1">Channel name</Typography>
    </div>
  )
}

export default Channel