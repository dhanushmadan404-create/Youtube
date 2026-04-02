import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_API;

class Likes {
  constructor() {
    this.api = API_URL;

    this.headers = {
      "Content-Type": "application/json",
    };
  }

  // create like
  createLikes = async (body) => {
    try {
      const response = await axios.post(
        `${this.api}/likes/`,
        body,
        { headers: this.headers }
      );
      return response;
    } catch (error) {
      throw error;
    }
  };

  // get likes by video
  getByVideo = async (videoId) => {
    try {
      const response = await axios.get(
        `${this.api}/likes/like/${videoId}`,
        { headers: this.headers }
      );
      return response;
    } catch (error) {
      throw error;
    }
  };

  // get likes by user
  getByUser = async (userId) => {
    try {
      const response = await axios.get(
        `${this.api}/likes/user/like/${userId}`,
        { headers: this.headers }
      );
      return response;
    } catch (error) {
      throw error;
    }
  };

  // remove like
  removeLikes = async (userId, videoId) => {
    try {
      const response = await axios.delete(
        `${this.api}/likes/remove/${videoId}/like/${userId}`,
        { headers: this.headers }
      );
      return response;
    } catch (error) {
      throw error;
    }
  };
}

const likesApi = new Likes();
export default likesApi;