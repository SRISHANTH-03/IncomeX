import express from "express";

import authMiddleware from "../middlewares/authMiddleware.js";

import {
  addTransaction,
  getTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
} from "../controllers/transactionController.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  addTransaction
);

router.get(
  "/",
  authMiddleware,
  getTransactions
);

router.get(
  "/:id",
  authMiddleware,
  getTransactionById
);

router.put(
  "/:id",
  authMiddleware,
  updateTransaction
);

router.delete(
  "/:id",
  authMiddleware,
  deleteTransaction
);

export default router;