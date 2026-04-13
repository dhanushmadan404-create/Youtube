import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_API;

class Followers {
  constructor() {
    this.api = API_URL;

    this.headers = {
      "Content-Type": "application/json",
    };
  }

  // createFollower api call
  createFollower = async (body) => {
    try {
      const response = await axios.post(
        `${this.api}/followers/`,
        body,
        { headers: this.headers }
      );
      return response;
    } catch (error) {
      throw error;
    }
  };

  // get followers list
  getByFollowers = async (userId) => {
    try {
      const response = await axios.get(
        `${this.api}/followers/fans/${userId}`,
        { headers: this.headers }
      );
      return response;
    } catch (error) {
      throw error;
    }
  };

  // get following list
  getByFollowing = async (userId) => {
    try {
      const response = await axios.get(
        `${this.api}/followers/following/${userId}`,
        { headers: this.headers }
      );
      return response;
    } catch (error) {
      throw error;
    }
  };

  // remove following user
  removeFollow = async (userId, fanId) => {
    try {
      const response = await axios.delete(
        `${this.api}/followers/removefollowing/${userId}/${fanId}`,
        { headers: this.headers }
      );
      return response;
    } catch (error) {
      throw error;
    }
  };

  // get top channels by follower count
  getTopChannels = async () => {
    try {
      const response = await axios.get(
        `${this.api}/followers/top-channels`,
        { headers: this.headers }
      );
      return response;
    } catch (error) {
      throw error;
    }
  };
}

const followersApi = new Followers();
export default followersApi;