import Transaction from "../models/Transaction.js";

// Add Transaction
export const addTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.create({
      ...req.body,
      userId: req.user.id,
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Transactions
export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      userId: req.user.id,
    }).sort({ date: -1 });

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Single Transaction
export const getTransactionById = async (
  req,
  res
) => {
  try {
    const transaction =
      await Transaction.findById(
        req.params.id
      );

    if (!transaction) {
      return res.status(404).json({
        message:
          "Transaction not found",
      });
    }

    res.json(transaction);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Transaction
export const updateTransaction =
  async (req, res) => {
    try {
      const transaction =
        await Transaction.findOneAndUpdate(
          {
            _id: req.params.id,
            userId: req.user.id,
          },
          req.body,
          {
            new: true,
          }
        );

      if (!transaction) {
        return res.status(404).json({
          message:
            "Transaction not found",
        });
      }

      res.status(200).json(
        transaction
      );

    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

export const deleteTransaction =
  async (req, res) => {
    try {
      const transaction =
        await Transaction.findOne({
          _id: req.params.id,
          userId: req.user.id,
        });

      if (!transaction) {
        return res.status(404).json({
          message:
            "Transaction not found",
        });
      }

      await transaction.deleteOne();

      res.json({
        message:
          "Transaction Deleted",
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };