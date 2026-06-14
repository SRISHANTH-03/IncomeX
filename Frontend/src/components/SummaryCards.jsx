const SummaryCards = ({ summary }) => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">

      <div className="bg-[#111315] border border-[#23262B] rounded-2xl p-6 min-h-[140px] shadow-sm flex flex-col items-center text-center justify-center">
        <p className="text-lg font-medium text-slate-400">
          Balance
        </p>
        <h2 className="text-3xl font-semibold mt-5 text-white">
          ₹{summary.balance}
        </h2>
      </div>

      <div className="bg-[#111315] border border-[#23262B] rounded-2xl p-6 min-h-[140px] shadow-sm flex flex-col items-center text-center justify-center">
        <p className="text-lg font-medium text-slate-400">
          Income
        </p>
        <h2 className="text-3xl font-semibold mt-5 text-[#10B981]">
          ₹{summary.totalIncome}
        </h2>
      </div>

      <div className="bg-[#111315] border border-[#23262B] rounded-2xl p-6 min-h-[140px] shadow-sm flex flex-col items-center text-center justify-center">
        <p className="text-lg font-medium text-slate-400">
          Expenses
        </p>
        <h2 className="text-3xl font-semibold mt-5 text-[#EF4444]">
          ₹{summary.totalExpense}
        </h2>
      </div>

    </section>
  );
};

export default SummaryCards;