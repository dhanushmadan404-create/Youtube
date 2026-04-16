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
    const response = await axios.post(`${this.api}/followers/`, body, {
      headers: this.headers,
    });
    return response;
  };
  checkFollower = async (user_id, fan_id) => {
    const response = await axios.get(
      `${this.api}/followers/check?user_id=${user_id}&fan_id=${fan_id}`,
      { headers: this.headers },
    );
    return response;
  };

  // get followers list
  getByFollowers = async (userId) => {
    const response = await axios.get(`${this.api}/followers/fans/${userId}`, {
      headers: this.headers,
    });
    return response;
  };

  // get following list
  getByFollowing = async (userId) => {
    const response = await axios.get(
      `${this.api}/followers/following/${userId}`,
      { headers: this.headers },
    );
    return response;
  };

  // remove following user
  removeFollow = async (userId, fanId) => {
    const response = await axios.delete(
      `${this.api}/followers/removefollowing/${userId}/${fanId}`,
      { headers: this.headers },
    );
    return response;
  };

  // get top channels by follower count
  getTopChannels = async () => {
    const response = await axios.get(`${this.api}/followers/top-channels`, {
      headers: this.headers,
    });
    return response;
  };
}

const followersApi = new Followers();
export default followersApi;
