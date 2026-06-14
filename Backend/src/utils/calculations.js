export const calculateSummary = (
  transactions
) => {
  let income = 0;
  let expense = 0;

  transactions.forEach((item) => {
    if (item.type === "income") {
      income += item.amount;
    } else {
      expense += item.amount;
    }
  });

  return {
    totalIncome: income,
    totalExpense: expense,
    balance: income - expense,
  };
};