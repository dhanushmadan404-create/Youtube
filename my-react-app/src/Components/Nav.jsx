import { useEffect, useState } from 'react';
import logo from '../assets/react.svg';
import "../styles/nav.css";
import Btn from './Btn';
function Nav() {
  const[On,Seton]=useState(true)
 

  return (
    <nav>
       <div>

        <ul>
            <li><img src={logo} alt="Logo" /></li>
            <li><Btn Content="Home"/></li>
            <li><Btn Content="Following"/></li>
            <li><button onClick={()=>{Seton(On==true?false:true)}}>⋮</button></li>
            
        {On && (
          <li>
            <ul id="pop">
              <li>About</li>
              <li>Create video</li>
              <li>Privacy Center</li>
              <li>Report</li>
              <li>Setting</li>
              <li>Log Out</li>
            </ul>
          </li>
        )}
        </ul>
       </div>
     <div>

            <input type="text" placeholder="Search" />
     </div>
   <div>
            <Btn Content="Login"/>
   </div>
      
    </nav>
  );
}
export default Nav;