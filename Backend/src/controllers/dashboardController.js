import Transaction from "../models/Transaction.js";

import {
  calculateSummary,
} from "../utils/calculations.js";

// Dashboard Summary

export const getDashboardSummary =
  async (req, res) => {
    try {
      const transactions =
        await Transaction.find({
          userId: req.user.id,
        });

      const summary =
        calculateSummary(
          transactions
        );

      res.json(summary);

    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

// Dashboard Analytics

export const getAnalytics =
  async (req, res) => {
    try {

      const topCategories =
        await Transaction.aggregate([
          {
            $match: {
              userId:
                req.user.id,
              type:
                "expense",
            },
          },
          {
            $group: {
              _id: "$category",
              total: {
                $sum:
                  "$amount",
              },
            },
          },
          {
            $sort: {
              total: -1,
            },
          },
          {
            $limit: 5,
          },
        ]);

      const recentTransactions =
        await Transaction.find({
          userId: req.user.id,
        })
          .sort({
            createdAt: -1,
          })
          .limit(5);

      res.json({
        topCategories,
        recentTransactions,
      });

    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };