import React from 'react'
import Nav from '../Components/Nav'
import Outlet from "react"
import SideBar from '../Components/SideBar'
import Home from '../pages/Home'
// import Auth from '../pages/Auth'
import EditProfile from '../pages/EditProfile'
import Profile from '../Components/Profile'
import "../styles/Layout.css"
import ProfileInfo from '../pages/ProfileInfo'
import Following from '../pages/Following'
import Category from '../Components/Category'
import CategoryBlock from '../Components/CategoryBlock'
import Channel from "../Components/Channel"
function Layout() {
  return (
    <div>
      
        <Nav />

     
        <SideBar />
   =

      <div className="MainContent">
        <Home/>
      </div>
      

    </div>
  )
}

export default Layout