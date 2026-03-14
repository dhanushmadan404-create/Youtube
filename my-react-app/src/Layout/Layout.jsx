import React from 'react'
import Nav from '../Components/Nav'

import SideBar from '../Components/SideBar'
import Home from '../pages/Home'
// import Auth from '../pages/Auth'
import EditProfile from '../pages/EditProfile'
import Profile from '../Components/Profile'
import "../styles/Layout.css"
import ProfileInfo from '../pages/ProfileInfo'
import Following from '../pages/Following'
// import Category from '../Components/Category'
import CategoryBlock from '../Components/CategoryBlock'
import Channel from "../Components/Channel"
import CategoryContain from '../pages/CategoryContainer'
import ChannelPage from "../pages/ChannelPage"
import About from '../pages/About'
// outlet

import { Outlet } from 'react-router-dom'
function Layout() {
  return (
    <div>
      
        <Nav />

     
        <SideBar />
   

      <div className="MainContent">
        <About/>
      </div>
      

    </div>
  )
}

export default Layout