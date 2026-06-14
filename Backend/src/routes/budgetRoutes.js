import express from "express";

import authMiddleware from "../middlewares/authMiddleware.js";

import {
  createBudget,
  getBudgets,
  updateBudget,
  deleteBudget,
} from "../controllers/budgetController.js";

const router = express.Router();

// Create Budget
router.post(
  "/",
  authMiddleware,
  createBudget
);

// Get All Budgets
router.get(
  "/",
  authMiddleware,
  getBudgets
);

// Update Budget
router.put(
  "/:id",
  authMiddleware,
  updateBudget
);

// Delete Budget
router.delete(
  "/:id",
  authMiddleware,
  deleteBudget
);

export default router;