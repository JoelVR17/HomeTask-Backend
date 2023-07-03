import express from "express";
import {
  newTask,
  getTask,
  editTask,
  deleteTask,
  changeStateTask,
} from "../controllers/taskController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.post("/", checkAuth, newTask);
router
  .route("/:id")
  .get(checkAuth, getTask)
  .put(checkAuth, editTask)
  .delete(checkAuth, deleteTask);

router.post("/state/:id", checkAuth, changeStateTask);

export default router;
