import express from "express";
import {
  register,
  login,
  confirm,
  forwardPassword,
  checkToken,
  newPassword,
  profile,
} from "../controllers/userController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

// Register
router.post("/", register);
router.post("/login", login);
router.get("/confirm/:token", confirm);
router.post("/forward-password", forwardPassword);
router.route("/forward-password/:token").get(checkToken).post(newPassword);

router.get("/profile", checkAuth, profile);

export default router;
