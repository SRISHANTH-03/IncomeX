import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";

import BudgetForm from "../components/BudgetForm";
import BudgetCard from "../components/BudgetCard";

import {
  getBudgets,
  deleteBudget,
} from "../services/budgetService";

const Budgets = () => {
  const [budgets, setBudgets] =
    useState([]);

  const [
    editingBudget,
    setEditingBudget,
  ] = useState(null);

  useEffect(() => {
    fetchBudgets();
  }, []);

  const fetchBudgets =
    async () => {
      try {
        const data =
          await getBudgets();

        setBudgets(data);
      } catch (error) {
        console.log(error);
      }
    };

  const handleDelete =
    async (id) => {
      try {

        await deleteBudget(id);

        fetchBudgets();

        if (
          editingBudget?._id ===
          id
        ) {
          setEditingBudget(
            null
          );
        }

      } catch (error) {
        console.log(error);
      }
    };

  return (
    <MainLayout>

      <section className="mb-12 max-w-6xl mx-auto text-center space-y-6">

        <p className="text-xs uppercase tracking-widest text-slate-500">
          Budgets
        </p>

        <h1 className="text-4xl font-semibold">
          Monthly Limits
        </h1>

        <p className="text-lg text-slate-400 mx-auto max-w-2xl">
          Plan your spending before it happens.
        </p>

      </section>

      <div className="max-w-2xl mx-auto">

        <BudgetForm
          refresh={
            fetchBudgets
          }
          editData={
            editingBudget
          }
          clearEdit={() =>
            setEditingBudget(
              null
            )
          }
        />

      </div>

      <section className="mt-12 text-center space-y-6">

        <h2 className="text-2xl font-semibold mb-2">
          Your Budgets
        </h2>

        {budgets.length === 0 ? (

          <div className="bg-[#111315] border border-[#23262B] rounded-[32px] p-8 text-slate-500">
            No budgets created yet.
          </div>

        ) : (

          <div className="grid md:grid-cols-2 gap-6">

            {budgets.map(
              (budget) => (
                <BudgetCard
                  key={budget._id}
                  budget={budget}
                  onEdit={
                    setEditingBudget
                  }
                  onDelete={
                    handleDelete
                  }
                />
              )
            )}

          </div>

        )}

      </section>

    </MainLayout>
  );
};

export default Budgets;