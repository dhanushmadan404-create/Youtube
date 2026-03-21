import { UserAll } from "../controller/user.js";
import { Router } from "express";
const router=Router()

router.get("/",UserAll)

export default router