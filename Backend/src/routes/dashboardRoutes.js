import express from "express";

import authMiddleware from "../middlewares/authMiddleware.js";

import {
  getDashboardSummary,
  getAnalytics,
} from "../controllers/dashboardController.js";

const router = express.Router();

router.get(
  "/summary",
  authMiddleware,
  getDashboardSummary
);

router.get(
  "/analytics",
  authMiddleware,
  getAnalytics
);

export default router;