import React, { useState } from "react";
import * as YUP from "yup";
import { useFormik } from "formik";
import "../styles/Upload.css";
import imageFrame from '../assets/ImageFrame.png'
import VideoFrame from "../assets/VideoFrame.png"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CreateVideo } from "../Redux/Slice/VIdeoSlice";
import { Cloud } from "../api/AssetsUpload";

function Upload() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [videoPreview, setVideoPreview] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const UploadSchemas = YUP.object({
    videoFile: YUP.mixed().required("Video is required"),
    Title: YUP.string().required("Title is required").min(6).max(100),
    Description: YUP.string().required("Description is required").min(5).max(1000),
    Thumbnail: YUP.mixed().required("Thumbnail is required"),
    Category: YUP.string().required("Category is required"),
    Restriction: YUP.string().required("Age restriction is required")
  });

  const showStatus = (msg) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(""), 5000);
  };

  const UploadForm = useFormik({
    initialValues: {
      videoFile: "",
      Title: "",
      Description: "",
      Thumbnail: "",
      Category: "",
      Restriction: "all"
    },
    validationSchema: UploadSchemas,
    onSubmit: async (values, { resetForm }) => {
      setIsUploading(true);
      try {
        const User_id = localStorage.getItem("userid")
        let video = await Cloud(values.videoFile)
        let thumb = await Cloud(values.Thumbnail)
        const body = {
          user_id: User_id,
          video_url: video,
          title: values.Title,
          thumbnail: thumb,
          description: values.Description,
          category: values.Category,
          restriction: values.Restriction,
        }
        
        await dispatch(CreateVideo({ body: body })).unwrap();
        showStatus("Video uploaded successfully!");
        resetForm();
        setVideoPreview(null);
        setImagePreview(null);
        setTimeout(() => navigate("/dashboard"), 2000);
      } catch (err) {
        console.error(err);
        showStatus(err.message || "Failed to upload video");
      } finally {
        setIsUploading(false);
      }
    }
  });

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    UploadForm.setFieldValue("videoFile", file);
    if (file) {
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    UploadForm.setFieldValue("Thumbnail", file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="UploadContainer">
      {statusMessage && (
        <div className="status-toast" style={{
          position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)',
          background: statusMessage.includes('success') ? '#4caf50' : '#ff4444',
          color: 'white', padding: '10px 20px', borderRadius: '5px', zIndex: 1000
        }}>
          {statusMessage}
        </div>
      )}

      <div className="UploadLeft">
        <div className="Header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h1 className="typography-h4">Upload Video</h1>
          <button className="custom-btn" onClick={() => navigate(-1)}>Close</button>
        </div>

        <form className="UploadForm" onSubmit={UploadForm.handleSubmit}>
          <div className="input-group">
            <label className="typography-body1">Select Video</label><br/>
            <input
              type="file"
              name="videoFile"
              accept="video/*"
              onChange={handleVideoChange}
              className={`custom-input ${UploadForm.touched.videoFile && UploadForm.errors.videoFile ? 'error' : ''}`}
            />
            {UploadForm.touched.videoFile && UploadForm.errors.videoFile && (
              <span className="error-text" style={{color:"red"}}>{UploadForm.errors.videoFile}</span>
            )}
          </div>

          <div className="input-group">
            <label className="typography-body1">Title</label><br/>
            <input
              type="text"
              name="Title"
              placeholder="Give your video a title"
              className={`custom-input ${UploadForm.touched.Title && UploadForm.errors.Title ? 'error' : ''}`}
              value={UploadForm.values.Title}
              onChange={UploadForm.handleChange}
              onBlur={UploadForm.handleBlur}
            />
            {UploadForm.touched.Title && UploadForm.errors.Title && (
              <span className="error-text" style={{color:"red"}}>{UploadForm.errors.Title}</span>
            )}
          </div>

          <div className="input-group">
            <label className="typography-body1">Description</label><br/>
            <textarea
              name="Description"
              placeholder="Tell viewers about your video"
              rows={4}
              className={`custom-input ${UploadForm.touched.Description && UploadForm.errors.Description ? 'error' : ''}`}
              value={UploadForm.values.Description}
              onChange={UploadForm.handleChange}
              onBlur={UploadForm.handleBlur}
              style={{ resize: 'vertical' }}
            />
            {UploadForm.touched.Description && UploadForm.errors.Description && (
              <span className="error-text" style={{color:"red"}}>{UploadForm.errors.Description}</span>
            )}
          </div>

          <div className="input-group">
            <label className="typography-body1">Thumbnail</label><br/>
            <input
              type="file"
              name="Thumbnail"
              accept="image/*"
              onChange={handleImageChange}
              className={`custom-input ${UploadForm.touched.Thumbnail && UploadForm.errors.Thumbnail ? 'error' : ''}`}
            />
            {UploadForm.touched.Thumbnail && UploadForm.errors.Thumbnail && (
              <span className="error-text" style={{color:"red"}}>{UploadForm.errors.Thumbnail}</span>
            )}
          </div>

          <div className="input-group">
            <label className="typography-body1">Category</label><br/>
            <select
              name="Category"
              className={`custom-input ${UploadForm.touched.Category && UploadForm.errors.Category ? 'error' : ''}`}
              value={UploadForm.values.Category}
              onChange={UploadForm.handleChange}
              onBlur={UploadForm.handleBlur}
              style={{color:"black"}}
            >
              <option value="">Select a category</option>
              <option value="Education">Education</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Technology">Technology</option>
              <option value="Gaming">Gaming</option>
            </select>
            {UploadForm.touched.Category && UploadForm.errors.Category && (
              <span className="error-text" style={{color:"red"}}>{UploadForm.errors.Category}</span>
            )}
          </div>

          <div className="input-group">
            <label className="typography-body1">Age Restriction</label><br/>
            <div style={{ display: 'flex', gap: '20px', marginTop: '10px' }}>
              <label style={{ color: 'white', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="Restriction"
                  value="all"
                  checked={UploadForm.values.Restriction === "all"}
                  onChange={UploadForm.handleChange}
                /> All Ages
              </label>
              <label style={{ color: 'white', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="Restriction"
                  value="18+"
                  checked={UploadForm.values.Restriction === "18+"}
                  onChange={UploadForm.handleChange}
                /> 18+ Only
              </label>
            </div>
          </div>

          <button 
            type="submit" 
            className="custom-btn LaunchBtn" 
            disabled={isUploading}
            style={{ marginTop: '30px', width: '100%', opacity: isUploading ? 0.6 : 1 }}
          >
            {isUploading ? "Uploading..." : "Launch Video"}
          </button>
        </form>
      </div>

      <aside className="UploadRight">
        <div style={{ padding: '0 20px' }}>
          <h3 className="typography-body1" style={{ color: 'var(--brand-color)', marginBottom: '10px' }}>Video Preview</h3>
          {videoPreview ? (
            <video src={videoPreview} controls className="VideoPreview" />
          ) : (
            <img src={VideoFrame} alt="Placeholder" className="VideoPreview" />
          )}
          
          <div className="Thumbnail" style={{ marginTop: '20px' }}>
            <h3 className="typography-body1" style={{ color: 'var(--brand-color)', marginBottom: '10px' }}>Thumbnail Preview</h3>
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="ImagePreview" />
            ) : (
              <img src={imageFrame} alt="Placeholder" className="ImagePreview" />
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}

export default Upload;
