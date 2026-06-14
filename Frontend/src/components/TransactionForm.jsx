import {
  useState,
  useEffect,
} from "react";

import {
  addTransaction,
  updateTransaction,
} from "../services/transactionService";

const TransactionForm = ({
  refresh,
  editData,
  clearEdit,
}) => {
  const [formData, setFormData] =
    useState({
      type: "expense",
      amount: "",
      category: "",
      description: "",
    });

  useEffect(() => {
    if (editData) {
      setFormData({
        type: editData.type,
        amount: editData.amount,
        category: editData.category,
        description:
          editData.description || "",
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
      type: "expense",
      amount: "",
      category: "",
      description: "",
    });
  };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {

        if (editData) {

          await updateTransaction(
            editData._id,
            formData
          );

          clearEdit();

        } else {

          await addTransaction(
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
    <section className="bg-[#111315] rounded-[32px] p-10 border border-[#23262B] shadow-xl max-w-2xl mx-auto text-center">

      <div className="mb-10 space-y-3">

        <p className="text-slate-500 uppercase tracking-[0.35em] text-xs">
          {editData ? "Edit Transaction" : "New Transaction"}
        </p>

        <h2 className="text-3xl font-semibold text-white">
          {editData ? "Update Entry" : "Add Entry"}
        </h2>

      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        <div className="grid md:grid-cols-2 gap-6">

          <div className="space-y-3 text-center">
            <label className="block text-sm text-slate-400">Amount</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="5000"
              className="w-full bg-[#111315] border border-[#23262B] rounded-2xl px-5 py-4 outline-none focus:border-[#3B82F6]"
              required
            />
          </div>

          <div className="space-y-3 text-center">
            <label className="block text-sm text-slate-400">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full bg-[#111315] border border-[#23262B] rounded-2xl px-5 py-4 outline-none focus:border-[#3B82F6]"
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

        </div>

        <div className="space-y-3 text-center">
          <label className="block text-sm text-slate-400">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Food, Salary, Shopping..."
            className="w-full bg-[#111315] border border-[#23262B] rounded-2xl px-5 py-4 outline-none focus:border-[#3B82F6]"
            required
          />
        </div>

        <div className="space-y-3 text-center">
          <label className="block text-sm text-slate-400">Description</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="What was this transaction for?"
            className="w-full bg-[#111315] border border-[#23262B] rounded-2xl px-5 py-4 outline-none focus:border-[#3B82F6]"
          />
        </div>

        <div className="flex flex-col items-center gap-4">
          <button
            type="submit"
            className="bg-[#3B82F6] text-white px-8 py-4 rounded-2xl font-medium transition hover:bg-[#60A5FA]"
          >
            {editData ? "Save Changes" : "Add Transaction"}
          </button>

          {editData && (
            <button
              type="button"
              onClick={() => {
                clearEdit();
                resetForm();
              }}
              className="px-8 py-4 rounded-2xl border border-[#23262B] text-slate-300 transition hover:bg-white/5"
            >
              Cancel
            </button>
          )}
        </div>

      </form>

    </section>
  );
};

export default TransactionForm;