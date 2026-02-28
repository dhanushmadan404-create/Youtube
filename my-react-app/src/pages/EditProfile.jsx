import React from 'react'
import "../styles/EditProfile.css"
import profile from "../assets/react.svg"
import Banner from "../assets/profile.png"
function EditProfile() {
  return (
    <div className="edit-profile">

      {/* Header */}
      <div className="edit-header">
        <div className="header-title">
          <h1>Channel Customization</h1>
        </div>

        <div className="header-actions">
          <h2>Profile</h2>
          <div className="action-buttons">
            <button className="btn cancel-btn">Cancel</button>
            <button className="btn save-btn">Save</button>
          </div>
        </div>
      </div>

      {/* Main Card */}
      <div className="edit-card">

        {/* Banner Section */}
        <div className="image-section banner-section">
          <img className="banner-image" src={Banner} alt="Banner" />
          <div className="image-info">
            <p>This is your style of codes or your upcoming come back Banner</p>
            <button className="btn upload-btn">Upload</button>
          </div>
        </div>

        {/* Profile Section */}
        <div className="image-section profile-section">
          <img className="profile-image" src={profile} alt="Profile" />
          <div className="image-info">
            <p>This will show who you are</p>
            <button className="btn upload-btn">Upload</button>
          </div>
        </div>

        {/* Name Section */}
        <div className="form-group">
          <h2>Name</h2>
          <p>Create your unique Name for your fans</p>
          <input
            className="form-input"
            type="text"
            placeholder="Please Enter your Name"
            required
            name="name"
          />
        </div>

        <div className="form-group">
          <h2>Description</h2>
          <p>Write Your own story for your fans</p>
          <textarea
            className="form-textarea"
            name="description"
            placeholder="Description"
          ></textarea>
        </div>

      </div>
    </div>
  )
}

export default EditProfile