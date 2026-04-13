import { Router } from "express";
import { ReviewPost ,ReviewGetVid,ReviewGetUser, ReviewRemove} from "../controller/review.controller.js";
import { ValidateReview } from "../middleware/Review.middleware.js";
import { ReviewSchemas } from "../Schemas/Review.schemas.js";
export const ReviewRouter=Router()
ReviewRouter.post("/",ValidateReview(ReviewSchemas),ReviewPost)

ReviewRouter.get("/video/:id",ReviewGetVid)
ReviewRouter.get("/user/:id",ReviewGetUser)
ReviewRouter.delete("/remove/:id", ReviewRemove) // New delete endpoint


