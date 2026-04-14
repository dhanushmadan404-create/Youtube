import { useState, useEffect, useRef } from 'react';
import React from 'react';
import logo from '../assets/layoutpro.jpg';
import "../styles/nav.css";
import Btn from './Btn';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faBars } from "@fortawesome/free-solid-svg-icons";

function Nav({ onMenuClick }) {
  const [On, Seton] = useState(false);
  const [UserId, SetUserId] = useState();

  const searchRef = useRef();
  const navigate = useNavigate();

  function logOut() {
    localStorage.clear();
    navigate("/");
  }


  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchRef.current.value;

    if (query.trim()) {
      navigate(`/search?q=${query}`); //  navigate instead of dispatch
    }
  };

  useEffect(() => {
    SetUserId(localStorage.getItem("userid"));
  }, []);

  return (
    <nav className='nav'>
      <div className='NavContainer'>

        <div className='Start'>
          <button className="menu-btn" onClick={onMenuClick}>
           <FontAwesomeIcon icon={faBars} size='2x' />
          </button>

          <Link to={"/dashboard"}>
            <img src={logo} alt="Logo" />
          </Link>

          <Link to={"/dashboard"}><Btn Content={"HOME"} /></Link>
          {/* <Link to={"/following"}><Btn Content={"FOLLOWING"} /></Link>=> it's under development */}
        </div>

        <div className='SearchHeader'>
          <form onSubmit={handleSearch}>
            <input
              ref={searchRef}
              type="text"
              placeholder='Search videos...'
              className="custom-input"
            />
            <button type="submit" className="custom-btn"><FontAwesomeIcon icon={faMagnifyingGlass} size='1x' /></button>
          </form>
        </div>

        <div className='End'>
          <Link to={"/upload"}>
            <Btn Content={"CREATE"} />
          </Link>

          <button onClick={() => Seton(!On)}><FontAwesomeIcon icon={faUser} size='2x'/></button>

          {On && (
            <div className='SubMenu'>
              <Btn Content={"Profile"} fuc={() => navigate("/profile", { state: { User_id: UserId } })} />
              <Btn Content={"Log Out"} fuc={logOut} />
            </div>
          )}
        </div>

      </div>
    </nav>
  );
}

export default Nav;