import React from 'react'
import Typography from '@mui/material/Typography'
import CateImage from '../assets/Image/annesana.png'
import '../styles/Category.css'
function Category() {
  return (
    <div className='CategoryCart'>
        <img src={CateImage} alt="Error..." />
        <Typography variant='h5' component='h1' sx={{color:"white"}}>
            CategoryNam
        </Typography>

    </div>
  )
}

export default Category