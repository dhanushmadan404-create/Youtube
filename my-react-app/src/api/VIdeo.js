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
    const response = await axios.post(`${this.api}/video`, body, {
      headers: this.headers,
    });
    return response;
  };

  videoPaginated = async () => {
    const response = await axios.get(`${this.api}/video/all`, {
      headers: this.headers,
    });
    return response;
  };

  // search videos
  searchVideos = async (query) => {
    const response = await axios.get(`${this.api}/video/search`, {
      params: { q: query },
      headers: this.headers,
    });
    return response;
  };

  getFive = async () => {
    const response = await axios.get(
      `${this.api}/video/five`,
      {
        headers: this.headers,
      },
    );
    return response;
  };

  // get following feed videos
  getFollowingFeed = async (userId) => {
    const response = await axios.get(
      `${this.api}/video/following/${userId}`,
      { headers: this.headers }
    );
    return response;
  };

  // get recommended videos
  recommendedVideos = async (videoId, category, title) => {
    const response = await axios.get(
      `${this.api}/video/recommended/${videoId}`,
      {
        params: { category, title },
        headers: this.headers,
      },
    );
    return response;
  };

  // increment view count
  incrementView = async (videoId) => {
    const response = await axios.patch(
      `${this.api}/video/view/${videoId}`,
      {},
      {
        headers: this.headers,
      },
    );
    return response;
  };

  // get all videos (original random call, keeping for compatibility if used elsewhere)
  videoRandom = async () => {
    const response = await axios.get(`${this.api}/video/`, {
      headers: this.headers,
    });
    return response;
  };

  // get videos by category
  videoByCategory = async (category) => {
    const response = await axios.get(`${this.api}/video/cat/${category}`, {
      headers: this.headers,
    });
    return response;
  };  

  // get videos by user
  videoByUser = async (userId) => {
    const response = await axios.get(`${this.api}/video/user/${userId}`, {
      headers: this.headers,
    });
    return response;
  };

  // remove video
  removeVideo = async (videoId) => {
    const response = await axios.delete(`${this.api}/video/remove/${videoId}`, {
      headers: this.headers,
    });
    return response;
  };

  // update video
  updateVideo = async (videoId, body) => {
    const response = await axios.put(
      `${this.api}/video/updateVideo/${videoId}`,
      body,
      { headers: this.headers },
    );
    return response;
  };
}

const videoApi = new Video();
export default videoApi;
