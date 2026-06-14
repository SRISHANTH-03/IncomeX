import {
  useState,
  useEffect,
} from "react";

import {
  createGoal,
  updateGoal,
} from "../services/goalService";

const GoalForm = ({
  refresh,
  editData,
  clearEdit,
}) => {
  const [formData, setFormData] =
    useState({
      goalName: "",
      targetAmount: "",
      savedAmount: "",
      deadline: "",
    });

  useEffect(() => {
    if (editData) {
      setFormData({
        goalName:
          editData.goalName,
        targetAmount:
          editData.targetAmount,
        savedAmount:
          editData.savedAmount,
        deadline:
          editData.deadline
            ?.split("T")[0] ||
          "",
      });
    }
  }, [editData]);

  const handleChange = (
    e
  ) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      goalName: "",
      targetAmount: "",
      savedAmount: "",
      deadline: "",
    });
  };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {

        if (editData) {

          await updateGoal(
            editData._id,
            formData
          );

          clearEdit();

        } else {

          await createGoal(
            formData
          );

        }

        resetForm();

        refresh();

      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div className="bg-[#111315] border border-[#23262B] rounded-[32px] p-8 shadow-sm max-w-2xl mx-auto text-center">

      <h2 className="text-2xl font-semibold mb-6 text-white">
        {editData ? "Edit Goal" : "Create Goal"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">

        <div className="space-y-3 text-center">
          <label className="block text-sm text-slate-400">Goal Name</label>
          <input
            type="text"
            name="goalName"
            placeholder="MacBook Fund"
            value={formData.goalName}
            onChange={handleChange}
            className="w-full bg-[#111315] border border-[#23262B] rounded-2xl px-4 py-4 text-white placeholder:text-slate-500 outline-none focus:border-[#3B82F6]"
            required
          />
        </div>

        <div className="space-y-3 text-center">
          <label className="block text-sm text-slate-400">Target Amount</label>
          <input
            type="number"
            name="targetAmount"
            placeholder="Target Amount"
            value={formData.targetAmount}
            onChange={handleChange}
            className="w-full bg-[#111315] border border-[#23262B] rounded-2xl px-4 py-4 text-white placeholder:text-slate-500 outline-none focus:border-[#3B82F6]"
            required
          />
        </div>

        <div className="space-y-3 text-center">
          <label className="block text-sm text-slate-400">Saved Amount</label>
          <input
            type="number"
            name="savedAmount"
            placeholder="Saved Amount"
            value={formData.savedAmount}
            onChange={handleChange}
            className="w-full bg-[#111315] border border-[#23262B] rounded-2xl px-4 py-4 text-white placeholder:text-slate-500 outline-none focus:border-[#3B82F6]"
          />
        </div>

        <div className="space-y-3 text-center">
          <label className="block text-sm text-slate-400">Deadline</label>
          <input
            type="date"
            value={formData.deadline}
            onChange={handleChange}
            className="w-full bg-[#111315] border border-[#23262B] rounded-2xl px-4 py-4 text-white placeholder:text-slate-500 outline-none focus:border-[#3B82F6]"
          />
        </div>

        <div className="flex flex-col items-center gap-4">
          <button type="submit" className="bg-[#3B82F6] text-white px-6 py-3 rounded-2xl font-medium transition hover:bg-[#60A5FA] w-full sm:w-auto">
            {editData ? "Save Changes" : "Create Goal"}
          </button>

          {editData && (
            <button
              type="button"
              onClick={() => {
                clearEdit();
                resetForm();
              }}
              className="px-6 py-3 rounded-2xl border border-[#23262B] text-slate-300 transition hover:bg-white/5"
            >
              Cancel
            </button>
          )}
        </div>

      </form>

    </div>
  );
};

export default GoalForm;