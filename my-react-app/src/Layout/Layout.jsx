import React, { useState } from 'react'
import Nav from '../Components/Nav'
import SideBar from '../Components/SideBar'
import "../styles/Layout.css"
import { Outlet } from 'react-router-dom'

function Layout() {
  const [isSideBarActive, setIsSideBarActive] = useState(false);

  const toggleSideBar = () => {
    setIsSideBarActive(!isSideBarActive);
  };

  return (
    <div className="layout-wrapper">
      <Nav onMenuClick={toggleSideBar} />
      
      <SideBar isActive={isSideBarActive} />

      <div className={`MainContent ${isSideBarActive ? 'active' : ''}`}>
        <Outlet />
      </div>
    </div>
  )
}

export default Layout