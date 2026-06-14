import {
  updateGoal,
} from "../services/goalService";

const GoalCard = ({
  goal,
  refresh,
  onEdit,
  onDelete,
}) => {
  const progress =
    Math.min(
      (
        goal.savedAmount /
        goal.targetAmount
      ) * 100,
      100
    );

  const handleAddSavings =
    async () => {
      const amount =
        Number(
          prompt(
            "Enter amount to add:"
          )
        );

      if (
        !amount ||
        amount <= 0
      )
        return;

      try {

        await updateGoal(
          goal._id,
          {
            savedAmount:
              goal.savedAmount +
              amount,
          }
        );

        refresh();

      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div className="bg-[#111315] border border-[#23262B] rounded-[32px] p-6 min-h-[18rem] shadow-sm transition duration-200 hover:border-[#3B82F6] text-center flex flex-col items-center justify-between">

      <div className="space-y-4 w-full">
        <p className="text-xs uppercase tracking-wide text-slate-500">
          Goal
        </p>

        <h3 className="text-2xl font-semibold">
          {goal.goalName}
        </h3>

        {goal.deadline && (
          <p className="text-sm text-slate-500">
            Target Date: {new Date(goal.deadline).toLocaleDateString()}
          </p>
        )}
      </div>

      <div className="mt-6 space-y-5 w-full">

        <p className="text-slate-400 text-center">
          ₹{goal.savedAmount} / ₹{goal.targetAmount}
        </p>

        <div className="rounded-3xl bg-slate-900/80 p-4">
          <div className="flex flex-col items-center gap-2 text-sm text-slate-400">
            <span>Progress</span>
            <span>{progress.toFixed(0)}%</span>
          </div>

          <div className="mt-3 h-3 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-linear-to-r from-cyan-400 via-indigo-500 to-purple-500 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex flex-col items-center gap-3">

          <button
            onClick={handleAddSavings}
            className="inline-flex items-center justify-center rounded-2xl bg-linear-to-r from-cyan-400 to-purple-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-sm transition hover:opacity-95"
          >
            Add Savings
          </button>

          <button
            onClick={() => onEdit(goal)}
            className="text-sm text-slate-400 transition hover:text-white"
          >
            Edit
          </button>

          <button
            onClick={() => {
              const confirmed = window.confirm("Delete this goal?");
              if (!confirmed) return;
              onDelete(goal._id);
            }}
            className="text-sm text-red-400 transition hover:text-red-300"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
};

export default GoalCard;