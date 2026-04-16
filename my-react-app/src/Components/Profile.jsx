import React from 'react'
import "../styles/Profile.css"
import profile from "../assets/layoutpro.jpg"
import Banner from "../assets/layoutbanner.jpg"
import { createFollowers } from '../Redux/Slice/FollowerSlice'
import Btn from './Btn'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

function Profile({ data,subCount, fuc, isSubscribed, setIsSubscribed }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  async function addSub() {
    try {
      const action = await dispatch(createFollowers({
        body: {
          user_id: data._id,
          fan_id: localStorage.getItem("userid")
        }
      })).unwrap()

      if (action.status === "followed") {
        setIsSubscribed(true)
      } else {
        setIsSubscribed(false)
      }

    } catch (error) {
      console.log(error)
    }
  }

  if (!data) {
    return <h1>Loading...</h1>
  }

  return (
    <div className="profile">
      <div className="profile-header">
        <div className="channel-info-container">
          <div className="channel-info">
            <div className="avatar">
              <img src={data.profileImage ? data.profileImage : profile} alt={data.name} />
            </div>

            <div className="channel-details">
              <h1>{data.name}</h1>
              <p className="email-text">{data.email}</p>
              <p className="subscriber-count">{subCount } subscribers</p> {/* ADD THIS */}

              <div className="channel-actions">
                {!fuc && (
                  <button className="subscribe-btn" onClick={addSub}>
                    {isSubscribed ? "Subscribed" : "Subscribe"}
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
          {/* ... rest of code ... */}
        </div>
         <div className="banner">
          <img src={data.bannerImage ? data.bannerImage : Banner} alt="banner" />
        </div>
        {/* ... banner ... */}
      </div>
    </div>
  );
}
export default Profile
       