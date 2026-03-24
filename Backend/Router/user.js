import { UserAll,PostUser } from "../controller/user.js";
import { Router } from "express";
import { ValidateUser } from "../middleware/User.middleware.js";
import { UserSchemas } from "../Schemas/User.schemas.js";
const router=Router()

router.get("/",UserAll)
router.post("/",ValidateUser(UserSchemas),PostUser)
export default router