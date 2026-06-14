const BudgetCard = ({
  budget,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="bg-[#111315] border border-[#23262B] rounded-[32px] p-6 min-h-[15rem] shadow-sm text-center flex flex-col items-center justify-between">

      <div className="space-y-4 w-full">
        <p className="text-sm text-slate-400">
          {budget.month}
        </p>

        <h3 className="text-2xl font-semibold mt-2">
          {budget.category}
        </h3>

        <div className="mt-6">

          <p className="text-slate-400 text-sm">
            Budget Limit
          </p>

          <h2 className="text-4xl font-semibold mt-2">
            ₹{budget.limitAmount}
          </h2>

        </div>
      </div>

      <div className="flex flex-col items-center gap-4 mt-8 w-full">

        <button
          onClick={() => onEdit(budget)}
          className="text-sm text-slate-300 hover:text-white transition-colors"
        >
          Edit
        </button>

        <button
          onClick={() => {
            const confirmed = window.confirm(
              "Delete this budget?"
            );

            if (!confirmed) return;

            onDelete(budget._id);
          }}
          className="text-sm text-slate-500 hover:text-red-400 transition-colors"
        >
          Delete
        </button>

      </div>

    </div>
  );
};

export default BudgetCard;