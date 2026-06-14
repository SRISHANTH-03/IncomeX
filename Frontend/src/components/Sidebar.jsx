import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const links = [
    ["Dashboard", "/dashboard"],
    ["Transactions", "/transactions"],
    ["Budgets", "/budgets"],
    ["Goals", "/goals"],
    ["Profile", "/profile"],
  ];

  return (
    <aside className="min-h-screen w-64 flex-none bg-[#111315] border-r border-[#23262B] flex flex-col">

      <div className="px-6 pt-8 pb-8 mb-6">
        <div className="h-14 w-14 rounded-3xl bg-[#1F2429] text-[#3B82F6] flex items-center justify-center text-xl font-semibold shadow-sm">
          IX
        </div>

        <h1 className="mt-5 text-2xl font-semibold tracking-tight text-white">
          IncomeX
        </h1>

        <p className="text-sm text-slate-500 mt-2 leading-relaxed">
          Clear finance dashboards, fast.
        </p>

      </div>

      <nav className="px-4 flex flex-col space-y-2">
        {links.map(([name, path]) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `text-sm font-medium transition duration-200 ${
                isActive
                  ? "bg-white/10 rounded-xl px-4 py-3 text-white"
                  : "px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5"
              }`
            }
          >
            {name}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}

      <div className="mt-auto p-6">
        <div className="bg-[#0F1216] border border-[#23262B] rounded-3xl p-5">
          <p className="text-[11px] uppercase tracking-[0.4em] text-slate-500">
            IncomeX
          </p>

          <p className="text-sm text-slate-400 mt-4 leading-relaxed">
            Finance made clear, calm, and confident.
          </p>
        </div>
      </div>

    </aside>
  );
};

export default Sidebar;