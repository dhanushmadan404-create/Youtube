import { Router } from "express";
import { ReviewPost ,ReviewGetVid,ReviewGetRating,ReviewGetUser} from "../controller/review.controller";
import { ValidateReview } from "../middleware/Review.middleware";
import { ReviewSchemas } from "../Schemas/Review.schemas";
export const ReviewRouter=Router()
ReviewRouter.post("/",ValidateReview(ReviewSchemas),ReviewPost)

ReviewRouter.get("/video/:id",ReviewGetVid)

ReviewRouter.get("/user/:id",ReviewGetUser)

ReviewRouter.get("/review/:num",ReviewGetRating)


