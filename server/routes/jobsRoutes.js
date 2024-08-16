import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import {
  createJob,
  deleteJobPost,
  getJobById,
  getJobPosts,
  updateJob,
} from "../controllers/jobController.js";

const router = express.Router();

// POST JOB
router.post("/upload", userAuth, createJob);

// IPDATE JOB
router.put("/update/:id", userAuth, updateJob);

// GET JOB POST
router.get("/all", getJobPosts);
router.get("/find/:id", getJobById);

// DELETE JOB POST
router.delete("/delete/:id", userAuth, deleteJobPost);

export default router;
