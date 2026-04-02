import React, { useState } from "react";
import * as YUP from "yup";
import { useFormik } from "formik";
import "../styles/Upload.css";
// Image
import imageFrame from '../assets/ImageFrame.png'
import VideoFrame from "../assets/VideoFrame.png"

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { MenuItem, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CreateVideo } from "../Redux/Slice/VIdeoSlice";

import Cloud from "../api/AssetsUpload";
function Upload() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [videoPreview, setVideoPreview] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const UploadSchemas = YUP.object({
    videoFile: YUP.mixed().required("Video is required"),
    Title: YUP.string().required().min(6).max(20),
    Description: YUP.string().required().min(5).max(200),
    Thumbnail: YUP.mixed().required("Image is required"),
    Category: YUP.string().required(),
    Restriction: YUP.string().required()
  });

  const UploadForm = useFormik({
    initialValues: {
      videoFile: "",
      Title: "",
      Description: "",
      Thumbnail: "",
      Category: "",
      Restriction: ""
    },

    validationSchema: UploadSchemas,

    onSubmit: async (values, { resetForm }) => {
      try{

        const User_id = localStorage.getItem("userid")
        console.log(values.videoFile)
        let video=await Cloud(values.videoFile)
        let thumb=await Cloud(values.Thumbnail)
      const body = {
        user_id: User_id,
        video_url: video,
        title: values.Title,
        thumbnail:  thumb,
        description: values.Description,
        category: values.Category,
        restriction: values.Restriction,
      }
      console.log(body)
      try {
        const Response = await dispatch(CreateVideo({ body: body })).unwrap()
        console.log(Response)
      } catch (err) {
        console.log(err)
      }
    }catch(err){
      console.log(err)
    }

      resetForm()
    }
  });

  // VIDEO CHANGE
  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    UploadForm.setFieldValue("videoFile", file);

    if (file) {
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  // IMAGE CHANGE
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    UploadForm.setFieldValue("Thumbnail", file);

    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="UploadContainer">

      {/* LEFT SIDE FORM */}

      <div className="UploadLeft">

        <div className="Header">
          <Typography variant="h4">Upload Video</Typography>


          <Button onClick={() => {
            navigate(-1)
          }} variant="contained">
            Close
          </Button>

        </div>

        <Box
          component="form"
          className="UploadForm"
          onSubmit={UploadForm.handleSubmit}
        >

          {/* VIDEO */}
          <TextField
            type="file"
            name="videoFile"

            inputProps={{ accept: "video/*" }}
            onChange={handleVideoChange}
            className="Input"
          />

          {/* TITLE */}

          <TextField
            label="Title"
            name="Title"
            className="Input"
            value={UploadForm.values.Title}
            onChange={UploadForm.handleChange}
          />

          {/* DESCRIPTION */}

          <TextField
            label="Description"
            name="Description"
            multiline
            rows={4}
            className="Input"
            value={UploadForm.values.Description}
            onChange={UploadForm.handleChange}
          />

          {/* THUMBNAIL */}

          <TextField
            type="file"
            name="Thumbnail"
            inputProps={{ accept: "image/*" }}
            onChange={handleImageChange}
            className="Input"
          />

          {/* CATEGORY */}

          <TextField
            label="Category"
            name="Category"
            select
            className="Input"
            value={UploadForm.values.Category}
            onChange={UploadForm.handleChange}
          >
            <MenuItem value="education">Education</MenuItem>
            <MenuItem value="entertainment">Entertainment</MenuItem>
            <MenuItem value="technology">Technology</MenuItem>
            <MenuItem value="gaming">Gaming</MenuItem>
          </TextField>

          {/* AGE RESTRICTION */}

          <FormLabel sx={{ color: "white" }} className="RadioLabel">Age Restriction</FormLabel>

          <RadioGroup
            name="Restriction"
            value={UploadForm.values.Restriction}
            onChange={UploadForm.handleChange}
          >
            <FormControlLabel value="all" control={<Radio />} label="All Ages" />
            <FormControlLabel value="18+" control={<Radio />} label="18+ Only" />
          </RadioGroup>

          <Button type="submit" variant="contained" className="LaunchBtn">
            Launch
          </Button>

        </Box>
      </div>


      {/* RIGHT SIDE PREVIEW */}

      <aside className="UploadRight">

        {videoPreview ? (
          <video
            src={videoPreview}
            controls
            className="VideoPreview"

          />
        ) : <img
          src={VideoFrame}
          alt="Thumbnail Preview"
          className="VideoPreview"
        />}
        <div className="Thumbnail">

          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Thumbnail Preview"
              className="ImagePreview"
            />
          ) : <img
            src={imageFrame}
            alt="Thumbnail Preview"
            className="ImagePreview"
          />}
          <Typography sx={{ fontFamily: "Poppins", }} className="ThumbnailText" variant="h1">Thumbnail</Typography>

        </div>

      </aside>

    </div>
  );
}

export default Upload;