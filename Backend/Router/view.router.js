import { Router } from "express";
import { ValidateView } from "../middleware/view.middleware.js";
import { ViewSchemas } from "../Schemas/view.schemas.js";
import {
  postView,
  getView,
  getByView,
  removeView,
} from "../controller/view.controller.js";
const viewRouter = Router();

viewRouter.post("/", ValidateView(ViewSchemas), postView);
viewRouter.get("/likes/:videoid", getView);
viewRouter.get("/user/like/:userid", getByView);
viewRouter.delete("/remove/:videoid/like/:userid", removeView);

export default viewRouter;
