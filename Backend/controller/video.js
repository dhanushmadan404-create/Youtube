import { ObjectId } from "mongodb";
import { 
  CreateVideo, 
  GetAllVideo, 
  Category, 
  videoByUser, 
  videoRemove, 
  videoUpdate,
  IncrementView,
  SearchVideos,
  GetRecommended,
  getFive,
  getFollowingFeed
} from "../service/video.js";


export const videoCreate = async (req, res) => {
  const {
    user_id,
    video_url,
    title,
    thumbnail,
    description,
    category,
    restriction,
  } = req.body;
  const Body = {
    user_id: new ObjectId(user_id),
    video_url: video_url,
    title: title,
    thumbnail: thumbnail,
    description: description,
    category: category,
    restriction: restriction,
    views: 0 // Initialize views
  };
  const Result = await CreateVideo(Body);
  await res.json(Result);
};

export const GetAll = async (req, res) => {
  const Result = await GetAllVideo( );
  res.json(Result);
};

export const Search = async (req, res) => {
  const { q } = req.query;
  const Result = await SearchVideos(q);
  res.json(Result);
};

export const getTopFive = async (req, res) => {
  const Result = await getFive();
  res.json(Result);
};

export const GetFollowingFeed = async (req, res) => {
  const { user_id } = req.params;
  const userId = new ObjectId(user_id);
  const Result = await getFollowingFeed(userId);
  res.json(Result);
};

export const GetRecommendedVideos = async (req, res) => {
  const { video_id } = req.params;
  const { category, title } = req.query;
  const Result = await GetRecommended(video_id, category, title);
  res.json(Result);
};

export const IncrementViews = async (req, res) => {
  const { video_id } = req.params;
  const Result = await IncrementView(video_id);
  res.json(Result);
};

export const CategoryGet = async (req, res) => {
  const { category } = req.params;
  const Result = await Category(category);
  res.json(Result);
};

export const getByUser = async (req, res) => {
  const user_id = req.params.user_id;
  const userid = new ObjectId(user_id);
  const Result = await videoByUser(userid);
  res.json(Result);
};

export const removeVideo = async (req, res) => {
  const video_id = req.params.video_id;
  const Video_id = new ObjectId(video_id);

  const Result = await videoRemove(Video_id);
  res.json(Result);
};

export const updateVideo = async (req, res) => {
  const video_id = req.params.video_id;
  const videoId = new ObjectId(video_id);

  const {
    video_url,
    title,
    thumbnail,
    description,
    category,
    restriction,
  } = req.body;
  const Body = {
    video_url: video_url,
    title: title,
    thumbnail: thumbnail,
    description: description,
    category: category,
    restriction: restriction,
  };
  const result = await videoUpdate(videoId, Body);
  res.json(result);
};
