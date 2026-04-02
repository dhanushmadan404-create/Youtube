import React from 'react'
import Typography from '@mui/material/Typography'
import CateImage from '../assets/Image/annesana.png'
import '../styles/Category.css'
import { useNavigate } from 'react-router-dom'
function Category() {
    const navigate=useNavigate()
  return (
    <div className='CategoryCart'onClick={()=>{
      navigate("/category")
    }}>
        <img src={CateImage} alt="Error..." />
        <Typography variant='h5' component='h1' sx={{color:"white"}}>
            CategoryNam
        </Typography>

    </div>
  )
}

export default Category