import { useNavigate } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import useAuth from "../hooks/useAuth";

const Profile = () => {
  const { user, logout } =
    useAuth();

  const navigate =
    useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <MainLayout>

      <section className="mb-12 max-w-6xl mx-auto text-center space-y-6">

        <p className="text-xs uppercase tracking-widest text-slate-500">
          Profile
        </p>

        <h1 className="text-4xl font-semibold">
          Account
        </h1>

        <p className="text-lg text-slate-400 mx-auto max-w-2xl">
          Manage your account details.
        </p>

      </section>

      <div className="max-w-2xl mx-auto">

        <div className="bg-[#111315] border border-[#23262B] rounded-[32px] p-10 shadow-sm text-center">

          <div className="flex flex-col items-center gap-6">
            <div className="h-20 w-20 rounded-full bg-[#1F2429] text-[#3B82F6] flex items-center justify-center text-3xl font-semibold">
              {user?.name?.[0]}
            </div>
            <div>
              <p className="text-slate-500 text-sm uppercase tracking-[0.35em]">
                Personal Account
              </p>
              <h2 className="text-3xl font-semibold text-white mt-3">
                {user?.name}
              </h2>
              <p className="text-slate-400 mt-2">
                {user?.email}
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 text-center">
            <div className="rounded-3xl border border-[#23262B] bg-[#0F1216] p-6 flex flex-col items-center justify-center gap-3">
              <p className="text-slate-500 text-sm">
                Full Name
              </p>
              <p className="text-lg text-white">
                {user?.name}
              </p>
            </div>
            <div className="rounded-3xl border border-[#23262B] bg-[#0F1216] p-6 flex flex-col items-center justify-center gap-3">
              <p className="text-slate-500 text-sm">
                Email Address
              </p>
              <p className="text-lg text-white">
                {user?.email}
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="mt-10 w-full rounded-2xl bg-[#3B82F6] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#60A5FA]"
          >
            Logout
          </button>

        </div>

      </div>

    </MainLayout>
  );
};

export default Profile;