import { useEffect, useState } from 'react';
import logo from '../assets/react.svg';
import "../styles/nav.css";
import Btn from './Btn';
import SearchIcon from "@mui/icons-material/Search";

import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";

function Nav() {
  const[On,Seton]=useState(false)
 

  return (
    <nav className='nav'>
      <div className='NavContainer'>
        <div className='Start'>
          <img src={logo} alt="" />
          <Btn Content={"HOME"}/>
          <Btn Content={"FOLLOWING"}/>
<IconButton onClick={()=>{Seton(!On)}} sx={{color:"white"}}>
  <MoreVertIcon  sx={{color:"white"}}/>
</IconButton>
        </div>
        <div className='SubMenu'>
          {On&&(
            <>
            <Btn Content={"About"}/>
          <Btn Content={"Privacy Center"}/>
          <Btn Content={"Report"}/>
          <Btn Content={"Log Out"}/>
            </>
        )
         }

        </div>
        <div className='Mid'>
          <input type="text" placeholder='Search...' name='Search' style={{borderColor:"white",color:"white",width:"500px",border:"solid 2px",padding:"5px",borderRadius:"20px"}} /><SearchIcon sx={{position:"relative",right:"40px",color:'white'}}/>
        </div>
        <div className='End'>
          <Btn Content={"CREATE VIDEO"}/>
          <Btn Content={"LOGIN"}/>
        </div>
      </div>
      
    </nav>
  );
}
export default Nav;

// <ul id="pop">
//               <li>About</li>
          
//               <li>Privacy Center</li>
//               <li>Report</li>
//               <li>Setting</li>
//               <li>Log Out</li>
//             </ul>