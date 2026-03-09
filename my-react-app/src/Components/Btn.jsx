import React from 'react'
import Button from "@mui/material/Button"
function Btn({Content,fuc}) {
  return (
    <Button variant='constrained' sx={ {backgroundColor:'black',color:'white', border: 'purple',
    borderWidth: '2px',
    borderStyle: 'solid', transition: '0.3s',

    '&:hover': {
      boxShadow: '0 0 35px rgba(106,13,173,1)',
    },}} onClick={fuc}>{Content}</Button>
  )
}

export default Btn