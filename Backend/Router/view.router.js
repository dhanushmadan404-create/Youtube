import { Router } from "express";
import { ValidateView } from "../middleware/view.middleware.js";
import { ViewSchemas } from "../Schemas/view.schemas.js";
import {
  postView,
  getView,
  getByView,
} from "../controller/view.controller.js";
const viewRouter = Router();

viewRouter.post("/", ValidateView(ViewSchemas), postView);
viewRouter.get("/:videoid", getView);
viewRouter.get("/user/:userid", getByView);

export default viewRouter;
