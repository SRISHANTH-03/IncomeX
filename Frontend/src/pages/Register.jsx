import { useState } from "react";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import {
  registerUser,
} from "../services/authService";

import useAuth from "../hooks/useAuth";

const Register = () => {
  const navigate =
    useNavigate();

  const { login } =
    useAuth();

  const [formData,
    setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
    });

  const handleChange = (
    e
  ) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        const data =
          await registerUser(
            formData
          );

        login(
          data.user,
          data.token
        );

        navigate(
          "/dashboard"
        );

      } catch (
        error
      ) {
        alert(
          error.response?.data
            ?.message ||
            "Registration Failed"
        );
      }
    };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white flex">

      <div className="hidden lg:flex flex-1 items-center justify-center px-24 py-16">
        <div className="max-w-xl space-y-8">
          <div className="h-16 w-16 rounded-3xl bg-[#111315] text-[#3B82F6] flex items-center justify-center text-2xl font-semibold shadow-sm">
            IX
          </div>
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">
              IncomeX
            </p>
            <h1 className="text-5xl font-semibold tracking-tight text-white">
              Finance that feels polished.
            </h1>
            <p className="text-slate-400 text-lg leading-8">
              Build better financial habits, manage spending smarter, and keep your goals in view.
            </p>
          </div>
          <div className="space-y-3 text-slate-500">
            <p>• Track every transaction</p>
            <p>• Set better spending limits</p>
            <p>• Visualize your progress</p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-8 py-10">
        <div className="w-full max-w-md bg-[#111315] border border-[#23262B] rounded-[32px] p-10 shadow-sm">
          <div className="space-y-3">
            <p className="text-slate-500 text-sm uppercase tracking-[0.35em]">
              Create Account
            </p>
            <h2 className="text-3xl font-semibold text-white">
              Join IncomeX
            </h2>
            <p className="text-slate-400 text-sm leading-6">
              Start managing your finances with a confident, modern dashboard.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-10 space-y-5">
            <div>
              <label className="text-sm text-slate-400 mb-2 block">Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-[#111315] border border-[#23262B] rounded-2xl px-4 py-4 outline-none focus:border-[#3B82F6]"
                required
              />
            </div>

            <div>
              <label className="text-sm text-slate-400 mb-2 block">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-[#111315] border border-[#23262B] rounded-2xl px-4 py-4 outline-none focus:border-[#3B82F6]"
                required
              />
            </div>

            <div>
              <label className="text-sm text-slate-400 mb-2 block">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Create a strong password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-[#111315] border border-[#23262B] rounded-2xl px-4 py-4 outline-none focus:border-[#3B82F6]"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-2xl bg-[#3B82F6] px-5 py-4 text-sm font-semibold text-white transition hover:bg-[#60A5FA]"
            >
              Create Account
            </button>
          </form>

          <p className="text-slate-400 text-sm mt-8 text-center">
            Already have an account?
            <Link to="/login" className="font-semibold text-white ml-1 hover:text-[#3B82F6]">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;