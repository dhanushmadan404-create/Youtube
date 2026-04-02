import { useEffect, useState } from 'react';
import logo from '../assets/react.svg';
import "../styles/nav.css";
import Btn from './Btn';
import SearchIcon from "@mui/icons-material/Search";
import { Link } from 'react-router-dom';
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";

function Nav() {
  const[On,Seton]=useState(false)
 

  return (
    <nav className='nav'>
      <div className='NavContainer'>
        <div className='Start'>
          <Link to={"/dashboard"}><img src={logo} alt="Error" /></Link>
          <Link to={"/dashboard"}><Btn Content={"HOME"}/></Link>
          <Link to={"/following"}>
          <Btn Content={"FOLLOWING"}/>
          </Link>

<IconButton onClick={()=>{Seton(!On)}} sx={{color:"white"}}>
  <MoreVertIcon  sx={{color:"white"}}/>
</IconButton>

        </div>
        <div className='SubMenu'>
          {On&&(
            <>
            <Link to={"/about"}>
            <Btn Content={"About"}/>
            </Link>
            <Link to={"/Report"}>
          <Btn Content={"Report"}/>
            </Link>
            <Link to={"/auth"}>
          <Btn Content={"Log Out"}/>
            </Link>
            </>
        )
         }

        </div>
        <div className='Mid'>
          <Link to={"/search"}>
          <input type="text" placeholder='Search...' name='Search' style={{borderColor:"white",color:"white",width:"500px",border:"solid 2px",padding:"5px",borderRadius:"20px"}} /><SearchIcon sx={{position:"relative",right:"40px",color:'white'}}/>
          </Link>
        </div>
        <div className='End'>
          <Link to={"/upload"}>
          <Btn Content={"CREATE VIDEO"}/>
          </Link>
          <Link to={"/profile"}>
          <Btn Content={"PROFILE"}/>
          </Link>
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