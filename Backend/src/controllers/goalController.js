import Goal from "../models/Goal.js";

// Create Goal
export const createGoal = async (
  req,
  res
) => {
  try {
    const goal = await Goal.create({
      ...req.body,
      userId: req.user.id,
    });

    res.status(201).json(goal);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Goals
export const getGoals = async (
  req,
  res
) => {
  try {
    const goals = await Goal.find({
      userId: req.user.id,
    });

    res.status(200).json(goals);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Goal
export const updateGoal = async (
  req,
  res
) => {
  try {
    const goal =
      await Goal.findOneAndUpdate(
        {
          _id: req.params.id,
          userId: req.user.id,
        },
        req.body,
        {
          new: true,
        }
      );

    if (!goal) {
      return res.status(404).json({
        message: "Goal not found",
      });
    }

    res.status(200).json(goal);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Goal
export const deleteGoal = async (
  req,
  res
) => {
  try {
    const goal =
      await Goal.findOneAndDelete({
        _id: req.params.id,
        userId: req.user.id,
      });

    if (!goal) {
      return res.status(404).json({
        message: "Goal not found",
      });
    }

    res.status(200).json({
      message: "Goal Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};