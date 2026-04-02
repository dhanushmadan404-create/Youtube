import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_API;

class Review {
  constructor() {
    this.api = API_URL;

    this.headers = {
      "Content-Type": "application/json",
    };
  }

  // create review
  createReview = async (body) => {
    try {
      const response = await axios.post(
        `${this.api}/review/`,
        body,
        { headers: this.headers }
      );
      return response;
    } catch (error) {
      throw error;
    }
  };

  // get reviews by video
  getByVideo = async (videoId) => {
    try {
      const response = await axios.get(
        `${this.api}/review/video/${videoId}`,
        { headers: this.headers }
      );
      return response;
    } catch (error) {
      throw error;
    }
  };

  // get reviews by user
  getByUser = async (userId) => {
    try {
      const response = await axios.get(
        `${this.api}/review/user/${userId}`,
        { headers: this.headers }
      );
      return response;
    } catch (error) {
      throw error;
    }
  };

  // get reviews by rating
  getByRating = async (rating) => {
    try {
      const response = await axios.get(
        `${this.api}/review/rating/${rating}`,
        { headers: this.headers }
      );
      return response;
    } catch (error) {
      throw error;
    }
  };

  // remove review
  removeReview = async (reviewId) => {
    try {
      const response = await axios.delete(
        `${this.api}/review/remove/${reviewId}`,
        { headers: this.headers }
      );
      return response;
    } catch (error) {
      throw error;
    }
  };
}

const reviewApi = new Review();
export default reviewApi;