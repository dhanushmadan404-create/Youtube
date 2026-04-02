import {
  UserAll,
  PostUser,
  GetByUser,
  GetById,
  UserUpdate,
  Login,
  GetMe
} from "../controller/user.js";
import { Router } from "express";
import {
  ValidateUser,
  ValidateLogin,
  ValidateUpdate,
} from "../middleware/User.middleware.js";
import {
  UserSchemas,
  UserLoginSchemas,
  UpdateSchemas,
} from "../Schemas/User.schemas.js";
const router = Router();

router.get("/", UserAll);
router.post("/", ValidateUser(UserSchemas), PostUser);
router.get("/:email", GetByUser);
router.get("/id/:id", GetById);
router.post("/login", ValidateLogin(UserLoginSchemas), Login);
router.put("/update/:userid", ValidateUpdate(UpdateSchemas), UserUpdate);
router.get("/me", GetMe);
// router.get("/me")
export default router;
