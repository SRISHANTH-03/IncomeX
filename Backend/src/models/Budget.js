import mongoose from "mongoose";

const budgetSchema =
  new mongoose.Schema(
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },

      category: {
        type: String,
        required: true,
      },

      limitAmount: {
        type: Number,
        required: true,
      },

      month: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

const Budget = mongoose.model(
  "Budget",
  budgetSchema
);

export default Budget;