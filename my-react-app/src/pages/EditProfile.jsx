import React from 'react'
import "../styles/EditProfile.css"
import profile from "../assets/react.svg"
import Banner from "../assets/profile.png"
import { useNavigate, useLocation } from 'react-router-dom'
import { useFormik } from 'formik'
import {Cloud} from '../api/AssetsUpload'
import { useDispatch } from 'react-redux'
import { updateUser } from '../Redux/Slice/UserSlice'
import * as YUP from "yup"

function EditProfile() {
  const [profileImg, SetProfileImg] = React.useState()
  const [banner, SetBanner] = React.useState()

  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  const data = location.state

  const UpdateSchemas = YUP.object({
    banner_img: YUP.mixed().required("Banner is required"),
    profile_img: YUP.mixed().required("Profile image is required"),
    name: YUP.string().min(4,"minimum  4 character need").max(20," maximum 20 only").required("Name is required").min(4).max(20),
    description: YUP.string().required("Description is required").min(10).max(200),
    age: YUP.number()
      .required("Age is required")
      .min(10, "Invalid age")
      .max(100, "Too high")
  })

  const formik = useFormik({
    initialValues: {
      banner_img: data?.bannerImage || "",
      profile_img: data?.profileImage || "",
      name: data?.name || "",
      description: data?.description || "",
      age: data?.age || ""
    },
    enableReinitialize: true,
    validationSchema: UpdateSchemas,
    onSubmit: async (values, { resetForm }) => {
      try {
        let bannerUrl = await Cloud(values.banner_img)
        let profileUrl = await Cloud(values.profile_img)

        const body = {
          banner_img: bannerUrl,
          profile_img: profileUrl,
          name: values.name,
          description: values.description,
          age: Number(values.age)
        }

        const userId = localStorage.getItem("userid")
        if (!userId) {
          console.error("Missing user id for update")
          return
        }

        const response = await dispatch(updateUser({ userId:userId, body:body })).unwrap()
        console.log(response)

        resetForm()
        navigate(-1)
      } catch (err) {
        console.log(err)
      }
    }
  })

  if (!data) {
    return <h1>Loading...</h1>
  }

  function handleProfile(e) {
    const file = e.target.files[0]
    formik.setFieldValue("profile_img", file)

    if (file) {
      SetProfileImg(URL.createObjectURL(file))
    }
  }

  function handleBanner(e) {
    const file = e.target.files[0]
    formik.setFieldValue("banner_img", file)

    if (file) {
      SetBanner(URL.createObjectURL(file))
    }
  }

  return (
    <div className="edit-profile">
      <form onSubmit={formik.handleSubmit}>
        <div className="edit-header">
          <div className="header-title">
            <h1>Channel Customization</h1>
          </div>

          <div className="header-actions">
            <h2>Profile</h2>
            <div className="action-buttons">
              <button type="button" className="btn cancel-btn" onClick={() => navigate(-1)}>Cancel</button>
              <button type="submit" className="btn save-btn">Save</button>
            </div>
          </div>
        </div>

        <div className="edit-card">
          <div className="image-section banner-section">
            <img
              className="banner-image"
              src={banner || data.bannerImage || profile}
              alt="Banner"
            />
            <div className="image-info">

              <p>This is your style of codes or your upcoming come back Banner</p>
              <input type="file" accept="image/*" onChange={handleBanner} />
            </div>
          </div>

          <div className="image-section profile-section">
            <img
              className="profile-image"
              src={profileImg || data.profileImage || Banner}
              alt="Profile"
            />
            <div className="image-info">

              <p>This will show who you are</p>
              <input type="file" accept="image/*" onChange={handleProfile} />
            </div>
          </div>

          <div className="form-group">
            <h2>Name</h2>
            <p>Create your unique Name for your fans</p>
            <input
              className="form-input"
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            {formik.touched.name && formik.errors.name && (
              <p className="error">{formik.errors.name}</p>
            )}
          </div>

          <div className="form-group">
            <h2>Description</h2>
            <p>Write Your own story for your fans</p>
            <textarea
              className="form-textarea"
              name="description"
              placeholder="Enter description"
              value={formik.values.description}
              onChange={formik.handleChange}
            />
            {formik.touched.description && formik.errors.description && (
              <p className="error">{formik.errors.description}</p>
            )}
          </div>
          <div className="form-group">
            <h2>Age</h2>
            <p>Tell your age</p>
            <input
              className="form-input"
              type="number"
              name="age"
              placeholder="Enter your age"
              value={formik.values.age}
              onChange={formik.handleChange}
            />
            {formik.touched.age && formik.errors.age && (
              <p className="error">{formik.errors.age}</p>
            )}
          </div>
        </div>
      </form>
    </div>
  )
}

export default EditProfile