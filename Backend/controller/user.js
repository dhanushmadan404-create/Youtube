import {
  GetUserAll,
  UserPost,
  UpdateUser,
  GetByEmail,
} from "../service/user.js";
import { Hashing, Verify } from "../helper/auth.helper.js";
import { Generate } from "../helper/jwt.helper.js";
import { ObjectId } from "mongodb";
export const UserAll = async (req, res) => {
  const result = await GetUserAll();
  res.json(result);
};
export const PostUser = async (req, res) => {
  const { name, email, password, profile_img, banner_img, description, age } =
    req.body;
  const check = await GetByEmail(email);
  if (check) {
    return { status: false, message: "already registered" };
  } else {
    const HashedPassword = await Hashing(password);

    const Body = {
      name: name,
      email: email,
      password: HashedPassword,
      profileImage: profile_img,
      bannerImage: banner_img,
      description: description,
      age: age,
    };
    const result = await UserPost(Body);
    res.json(result);
  }
};

export const GetByUser = async (req, res) => {
  const { email } = req.params;
  const result = await GetByEmail(email);
  res.json(result);
};
// login
export const Login = async (req, res) => {
  const { email, password } = req.body;
  const result = await GetByEmail(email);
  if (!result) {
    res.json({
      status: false,
      message: "Invalid Email Address",
    });
  } else {
    const verifyPass = Verify(password, result.password);
    if (verifyPass === false) {
      res.json({
        status: false,
        message: "Invalid password",
      });
    } else {
      const payLoad = {
        email: email,
        name: result.name,
        age: result.Age,
      };
      const token = await Generate(payLoad);
      res.json({
        status: true,
        message: {
          token: token,
          result: result._id,
        },
      });
    }
  }
};

export const UserUpdate = async (req, res) => {
  const { userid } = req.params;
  const Userid=new ObjectId(userid)
  const { name, profile_img, banner_img, description, age } = req.body;
  const updateData = {
    name: name,
    profileImage: profile_img,
    bannerImage: banner_img,
    description: description,
    age: age,
  };
  const result = await UpdateUser(Userid, updateData);
  res.json({ content: result, message: "successfully updated" });
};
