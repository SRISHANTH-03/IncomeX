import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";

import GoalForm from "../components/GoalForm";
import GoalCard from "../components/GoalCard";

import {
  getGoals,
  deleteGoal,
} from "../services/goalService";

const Goals = () => {
  const [goals, setGoals] =
    useState([]);

  const [
    editingGoal,
    setEditingGoal,
  ] = useState(null);

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals =
    async () => {
      try {
        const data =
          await getGoals();

        setGoals(data);
      } catch (error) {
        console.log(error);
      }
    };

  const handleDelete =
    async (id) => {
      try {

        await deleteGoal(id);

        fetchGoals();

        if (
          editingGoal?._id === id
        ) {
          setEditingGoal(
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
          Goals
        </p>

        <h1 className="text-4xl font-semibold">
          Future Savings
        </h1>

        <p className="text-lg text-slate-400 mx-auto max-w-2xl">
          Build meaningful goals and track your progress.
        </p>

      </section>

      <div className="grid gap-10 lg:grid-cols-[420px_1fr]">

        <GoalForm
          refresh={fetchGoals}
          editData={editingGoal}
          clearEdit={() => setEditingGoal(null)}
        />

        <section className="space-y-6 text-center">

          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-semibold">
                Your Goals
              </h2>
              <p className="text-sm text-slate-500 mt-2">
                Track each savings target with clarity.
              </p>
            </div>
            <span className="inline-flex items-center justify-center rounded-full border border-[#23262B] bg-[#111315] px-4 py-2 text-sm text-slate-400">
              {goals.length} goal{goals.length === 1 ? "" : "s"}
            </span>
          </div>

          {goals.length === 0 ? (

            <div className="bg-[#111315] border border-[#23262B] rounded-[32px] p-8 text-slate-500">
              No goals created yet.
            </div>

          ) : (

            <div className="grid md:grid-cols-2 gap-6">

              {goals.map((goal) => (
                <GoalCard
                  key={goal._id}
                  goal={goal}
                  refresh={fetchGoals}
                  onEdit={setEditingGoal}
                  onDelete={handleDelete}
                />
              ))}

            </div>

          )}

        </section>

      </div>

    </MainLayout>
  );
};

export default Goals;