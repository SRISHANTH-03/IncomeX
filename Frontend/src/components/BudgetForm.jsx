import {
  useState,
  useEffect,
} from "react";

import {
  createBudget,
  updateBudget,
} from "../services/budgetService";

const BudgetForm = ({
  refresh,
  editData,
  clearEdit,
}) => {
  const [formData, setFormData] =
    useState({
      category: "",
      limitAmount: "",
      month: "",
    });

  useEffect(() => {
    if (editData) {
      setFormData({
        category:
          editData.category,
        limitAmount:
          editData.limitAmount,
        month:
          editData.month,
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
      category: "",
      limitAmount: "",
      month: "",
    });
  };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {

        if (editData) {

          await updateBudget(
            editData._id,
            formData
          );

          clearEdit();

        } else {

          await createBudget(
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
    <div className="bg-[#111315] rounded-[32px] p-8 border border-[#23262B] shadow-sm max-w-2xl mx-auto text-center">

      <h2 className="text-2xl font-semibold mb-6 text-white">
        {editData ? "Edit Budget" : "Create Budget"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">

        <div className="space-y-3 text-center">
          <label className="block text-sm text-slate-400">Category</label>
          <input
            type="text"
            name="category"
            placeholder="Food"
            value={formData.category}
            onChange={handleChange}
            className="w-full bg-[#111315] border border-[#23262B] rounded-2xl px-4 py-4 text-white placeholder:text-slate-500 outline-none focus:border-[#3B82F6]"
            required
          />
        </div>

        <div className="space-y-3 text-center">
          <label className="block text-sm text-slate-400">Budget Amount</label>
          <input
            type="number"
            name="limitAmount"
            placeholder="10000"
            value={formData.limitAmount}
            onChange={handleChange}
            className="w-full bg-[#111315] border border-[#23262B] rounded-2xl px-4 py-4 text-white placeholder:text-slate-500 outline-none focus:border-[#3B82F6]"
            required
          />
        </div>

        <div className="space-y-3 text-center">
          <label className="block text-sm text-slate-400">Month</label>
          <input
            type="text"
            name="month"
            placeholder="June 2026"
            value={formData.month}
            onChange={handleChange}
            className="w-full bg-[#111315] border border-[#23262B] rounded-2xl px-4 py-4 text-white placeholder:text-slate-500 outline-none focus:border-[#3B82F6]"
            required
          />
        </div>

        <div className="flex flex-col items-center gap-4">
          <button type="submit" className="bg-[#3B82F6] text-white px-6 py-3 rounded-2xl font-medium transition hover:bg-[#60A5FA] w-full sm:w-auto">
            {editData ? "Save Changes" : "Create Budget"}
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

export default BudgetForm;