import express, { Router } from "express";
import { rateLimit } from "express-rate-limit";
import {
  getCompanies,
  getCompanyById,
  getCompanyJobListing,
  getCompanyProfile,
  register,
  signIn,
  updateCompanyProfile,
} from "../controllers/companiesController.js";
import userAuth from "../middlewares/authMiddleware.js";

const router = express.Router();

//ip rate limit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// REGISTER
router.post("/register", limiter, register);

// LOGIN
router.post("/login", limiter, signIn);

// GET DATA
router.post("/profile", userAuth, getCompanyProfile);
router.post("/jobs", userAuth, getCompanyJobListing);
router.get("/all", getCompanies);
router.get("/:id", getCompanyById);

// UPDATE DATA
router.put("/update", userAuth, updateCompanyProfile);

export default router;
