import React from 'react'
import category from "../assets/gamingLogo.png"
import { IconButton, Typography } from '@mui/material';
import "../styles/SideBar.css"
function CardLabel({content,fuc,open,img}) {
  return (
     <div className="Align" style={{cursor:"pointer"}} onClick={fuc}><img src={img} alt="This is logo" /> <div>
                    <Typography variant="h5" component="div" sx={{
                        flexGrow: 1, color: "white", transition: "opacity 0.3s ease",
                        whiteSpace: "nowrap",
                        overflow: "hidden",width: open ? "auto" : 0, opacity: open ? 1 : 0, display: { xs: 'none', sm: 'block' }
                    }}>
                        {content}
                    </Typography></div></div>
  )
}

export default CardLabel