import mongoose from "mongoose";

const goalSchema =
  new mongoose.Schema(
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },

      goalName: {
        type: String,
        required: true,
      },

      targetAmount: {
        type: Number,
        required: true,
      },

      savedAmount: {
        type: Number,
        default: 0,
      },

      deadline: {
        type: Date,
      },
    },
    {
      timestamps: true,
    }
  );

const Goal = mongoose.model(
  "Goal",
  goalSchema
);

export default Goal;