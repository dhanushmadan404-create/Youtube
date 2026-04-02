import express from "express";
import { connect } from "./config/db_connect.js";
import router from "./Router/user.js";
import videoRouter from "./Router/video.js";
import likesRouter from "./Router/likes.js";
import viewRouter from "./Router/view.router.js";
import { followRouter } from "./Router/followers.js";
import { ReviewRouter } from "./Router/review.router.js";
import cookieParser from "cookie-parser";
import cors from "cors";

// Store the express power
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
connect();

app.use("/user", router);
app.use("/followers",followRouter)
app.use("/video", videoRouter);
app.use("/likes", likesRouter);
app.use("/review",ReviewRouter)
app.use("/view",viewRouter)
app.listen(process.env.PORT, () => {
  console.log(`Node Express start his game${process.env.PORT}`);
});

app.get("/demo", (req, res) => {
  res.json({
    Message: "Methods Working",
  });
});
