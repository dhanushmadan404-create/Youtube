import { Router } from "express";
import { ReviewPost ,ReviewGetVid,ReviewGetRating,ReviewGetUser} from "../controller/review.controller.js";
import { ValidateReview } from "../middleware/Review.middleware.js";
import { ReviewSchemas } from "../Schemas/Review.schemas.js";
export const ReviewRouter=Router()
ReviewRouter.post("/",ValidateReview(ReviewSchemas),ReviewPost)

ReviewRouter.get("/video/:id",ReviewGetVid)

ReviewRouter.get("/user/:id",ReviewGetUser)

ReviewRouter.get("/rating/:num",ReviewGetRating)


