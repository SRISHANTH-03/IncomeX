import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";
import SummaryCards from "../components/SummaryCards";

import {
  getSummary,
  getAnalytics,
} from "../services/dashboardService";

const Dashboard = () => {
  const [summary, setSummary] =
    useState({
      totalIncome: 0,
      totalExpense: 0,
      balance: 0,
    });

  const [analytics, setAnalytics] =
    useState({
      topCategories: [],
      recentTransactions: [],
    });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard =
    async () => {
      try {
        const summaryData =
          await getSummary();

        const analyticsData =
          await getAnalytics();

        setSummary(
          summaryData
        );

        setAnalytics(
          analyticsData
        );

      } catch (error) {
        console.log(error);
      }
    };

  return (
    <MainLayout>

      <section className="mb-12 max-w-6xl mx-auto text-center space-y-4">

        <p className="text-slate-500 uppercase tracking-[0.35em] text-xs">
          Financial Overview
        </p>

        <div className="space-y-3">
          <h1 className="text-4xl font-semibold tracking-tight text-white">
            Your money, organized.
          </h1>
          <p className="text-slate-400 text-base mx-auto max-w-2xl leading-7">
            See income, spending, and savings in a calm, polished finance workspace.
          </p>
        </div>

      </section>

      <section className="mb-12 max-w-6xl mx-auto">
        <SummaryCards summary={summary} />
      </section>

      <section className="grid xl:grid-cols-[1.15fr_0.85fr] gap-6 mb-12 max-w-6xl mx-auto">

        {/* Recent Transactions */}

        <div className="bg-[#111315] border border-[#23262B] rounded-2xl p-6 shadow-sm text-center">

          <div className="flex flex-col items-center justify-center gap-4 mb-6 text-center">
            <div>
              <p className="text-slate-500 uppercase tracking-[0.35em] text-xs">
                Recent Activity
              </p>
              <h3 className="text-2xl font-semibold text-white mt-3">
                Recent Transactions
              </h3>
            </div>
            <p className="text-sm text-slate-400">
              Latest entries from your account.
            </p>
          </div>

          {analytics.recentTransactions.length === 0 ? (
            <div className="rounded-2xl border border-[#23262B] bg-[#0F1216] p-6 text-slate-500">
              No transactions yet.
            </div>
          ) : (
            <div className="space-y-4">
              {analytics.recentTransactions.map((transaction) => (
                <div
                  key={transaction._id}
                  className="flex flex-col items-center text-center gap-3 rounded-2xl border border-[#23262B] bg-[#0F1216] p-6"
                >
                          <div className="space-y-1">
                    <p className="font-semibold text-white">{transaction.category}</p>
                    <p className="text-sm text-slate-500 capitalize">{transaction.type}</p>
                    <p className="text-xs text-slate-500">
                      {new Date(transaction.date).toLocaleDateString()}
                    </p>
                  </div>
                  <p className={`text-lg font-semibold ${transaction.type === "income" ? "text-[#10B981]" : "text-[#EF4444]"}`}>
                    {transaction.type === "income" ? "+" : "-"}₹{transaction.amount}
                  </p>
                </div>
              ))}
            </div>
          )}

        </div>

        <div className="bg-[#111315] border border-[#23262B] rounded-2xl p-6 shadow-sm text-center">

          <div className="flex flex-col items-center justify-center gap-4 mb-6 text-center">
            <div>
              <p className="text-slate-500 uppercase tracking-[0.35em] text-xs">
                Spending
              </p>
              <h3 className="text-2xl font-semibold text-white mt-3">
                Top Spending Categories
              </h3>
            </div>
            <span className="rounded-full border border-[#23262B] bg-[#0F1216] px-3 py-1 text-sm text-slate-400">
              {analytics.topCategories.length} categories
            </span>
          </div>

          {analytics.topCategories.length === 0 ? (
            <div className="rounded-2xl border border-[#23262B] bg-[#0F1216] p-6 text-slate-500">
              No expenses yet.
            </div>
          ) : (
            <div className="space-y-5">
              {analytics.topCategories.map((category) => (
                <div key={category._id} className="space-y-3 text-center">
                  <div className="text-sm text-slate-300">
                    <p>{category._id}</p>
                    <p className="font-semibold text-white">₹{category.total}</p>
                  </div>
                  <div className="h-2 rounded-full bg-[#0F1216] overflow-hidden">
                    <div
                      className="h-full bg-[#3B82F6] rounded-full"
                      style={{ width: "70%" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

      </section>

    </MainLayout>
  );
};

export default Dashboard;