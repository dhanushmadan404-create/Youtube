import React, { useRef } from 'react';
import "../styles/Profile.css";
import profile from "../assets/react.svg";
import Banner from "../assets/profile.png";
import { createFollowers } from '../Redux/Slice/FollowerSlice';
import Btn from './Btn';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function Profile({ data, fuc }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchRef = useRef();

  async function addSub() {
    try {
      const action = await dispatch(createFollowers({ user_id: localStorage.getItem("userid"), fan_id: data._id }));
      if (createFollowers.fulfilled.match(action)) {
        console.log(action.payload);
      } else {
        console.log('error', action.error);
      }
    } catch (error) {
      console.log('error', error);
    }
  }

  if (!data) {
    return <h1 className="loading-text">Loading...</h1>;
  }

  return (
    <div className="profile">
      {/* Top Section */}
      <div className="profile-header">
        {/* Left Side - Channel Info */}
        <div className="channel-info-container">
          <div className="channel-info">
            <div className="avatar">
              <img src={data.profileImage ? data.profileImage : profile} alt={data.name} />
            </div>

            <div className="channel-details">
              <h1>{data.name}</h1>
              <p className="email-text">{data.email}</p>
              
              <div className="channel-actions">
                {fuc ? (
                  <button className="subscribe-btn disabled">Subscriber Count</button>
                ) : (
                  <button className="subscribe-btn" onClick={() => addSub()}>
                    Subscribe
                  </button>
                )}
                {fuc && (
                  <button
                    className="customize-btn"
                    onClick={() => navigate("/editProfile", { state: data })}
                  >
                    Customize Channel
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="description-container">
            <p className="channel-description">
              {data.description || "Welcome to my channel! Subscribe for more content."}
            </p>
          </div>
        </div>

        {/* Right Side - Banner */}
        <div className="banner">
          <img src={data.bannerImage ? data.bannerImage : Banner} alt="banner" />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="profile-actions">
        <Btn Content={"Videos"} />

        <div className="search-box">
          <div className="search-wrapper">
            <input
              ref={searchRef}
              type="text"
              placeholder="Search channel"
              className="custom-input"
            />
            <span className="search-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;