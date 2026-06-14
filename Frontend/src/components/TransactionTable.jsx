import formatDate from "../utils/formatDate";

const TransactionTable = ({
  transactions,
  onDelete,
  onEdit,
}) => {
  if (transactions.length === 0) {
    return (
      <div className="bg-[#111315] border border-[#23262B] rounded-[32px] p-8 shadow-sm">

        <h3 className="text-xl font-semibold text-white">
          Recent Transactions
        </h3>

        <p className="text-slate-500 mt-4">
          No transactions yet.
        </p>

      </div>
    );
  }

  return (
    <section className="bg-[#111315] border border-[#23262B] rounded-[32px] p-8 shadow-xl text-center">

      <div className="mb-8 space-y-2">

        <p className="text-slate-500 uppercase tracking-widest text-xs">
          Activity
        </p>

        <h3 className="text-2xl font-semibold mt-2">
          Recent Transactions
        </h3>

      </div>

      <div className="space-y-4">

        {transactions.map((transaction) => (
          <div
            key={transaction._id}
            className="flex flex-col items-center text-center gap-4 rounded-[28px] border border-[#23262B] bg-[#0F1216] p-6 shadow-sm transition hover:border-[#3B82F6]"
          >

            <div>
              <h4 className="font-semibold text-white">
                {transaction.category}
              </h4>

              <p className="text-sm text-slate-500 mt-1">
                {transaction.description || "No description"}
              </p>

              <p className="text-xs text-slate-500 mt-2">
                {formatDate(transaction.date)}
              </p>
            </div>

            <div>
              <p
                className={`text-lg font-semibold ${
                  transaction.type === "income"
                    ? "text-[#10B981]"
                    : "text-[#EF4444]"
                }`}
              >
                {transaction.type === "income" ? "+" : "-"}₹{transaction.amount}
              </p>

              <div className="flex gap-4 justify-center mt-3">

                  <button
                    onClick={() => onEdit(transaction)}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => {
                      const confirmed = window.confirm("Delete this transaction?");
                      if (!confirmed) return;
                      onDelete(transaction._id);
                    }}
                    className="text-sm text-slate-500 hover:text-[#EF4444] transition-colors"
                  >
                    Delete
                  </button>

                </div>

              </div>

            </div>
          ))}

      </div>

    </section>
  );
};

export default TransactionTable;