import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_API;

class Video {
  constructor() {
    this.api = API_URL;

    this.headers = {
      "Content-Type": "application/json",
    };
  }
  //createVideo
  // get all videos
  videoCreate = async (body) => {
    try {
      const response = await axios.post(`${this.api}/video`,body, {
        headers: this.headers,
      });
      return response;
    } catch (error) {
      throw error;
    }
  };

  // get all videos
  videoRandom = async () => {
    try {
      const response = await axios.get(`${this.api}/video/`, {
        headers: this.headers,
      });
      return response;
    } catch (error) {
      throw error;
    }
  };

  // get videos by category
  videoByCategory = async (category) => {
    try {
      const response = await axios.get(
        `${this.api}/video/${category}`,
        { headers: this.headers }
      );
      return response;
    } catch (error) {
      throw error;
    }
  };

  // get videos by user
  videoByUser = async (userId) => {
    try {
      const response = await axios.get(
        `${this.api}/video/user/${userId}`,
        { headers: this.headers }
      );
      return response;
    } catch (error) {
      throw error;
    }
  };

  // remove video
  removeVideo = async (videoId) => {
    try {
      const response = await axios.delete(
        `${this.api}/video/remove/${videoId}`,
        { headers: this.headers }
      );
      return response;
    } catch (error) {
      throw error;
    }
  };

  // update video
  updateVideo = async (videoId, body) => {
    try {
      const response = await axios.put(
        `${this.api}/video/updateVideo/${videoId}`,
        body,
        { headers: this.headers }
      );
      return response;
    } catch (error) {
      throw error;
    }
  };
}

const videoApi = new Video();
export default videoApi;