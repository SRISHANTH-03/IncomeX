import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <header className="h-20 px-8 flex flex-col items-center justify-center border-b border-[#23262B] bg-[#0A0A0B] shadow-sm text-center">

      <div className="space-y-1">
        <p className="text-slate-500 text-sm tracking-[0.18em] uppercase">
          Dashboard overview
        </p>
        <p className="text-slate-100 text-base font-semibold">
          Keep your finances aligned.
        </p>
      </div>

      <div className="mt-4 flex items-center gap-4">
        <div className="text-center">
          <p className="text-white font-semibold">{user?.name}</p>
          <p className="text-slate-500 text-xs">Personal Account</p>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1C2025] text-lg font-semibold text-[#3B82F6] shadow-sm">
          {user?.name?.[0]}
        </div>
      </div>

    </header>
  );
};

export default Navbar;