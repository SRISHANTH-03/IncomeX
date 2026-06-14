import { useState } from "react";
import {
  useNavigate,
  Link,
} from "react-router-dom";

import { loginUser } from "../services/authService";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const navigate =
    useNavigate();

  const { login } =
    useAuth();

  const [formData, setFormData] =
    useState({
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
          await loginUser(
            formData
          );

        login(
          data.user,
          data.token
        );

        navigate(
          "/dashboard"
        );
      } catch (error) {
        alert(
          error.response?.data
            ?.message ||
            "Login Failed"
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
              Track income, control spending, and reach your savings goals with clarity.
            </p>
          </div>
          <div className="space-y-3 text-slate-500">
            <p>• Track every transaction</p>
            <p>• Manage monthly budgets</p>
            <p>• Stay focused on your goals</p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-8 py-10">
        <div className="w-full max-w-md bg-[#111315] border border-[#23262B] rounded-[32px] p-10 shadow-sm">
          <div className="space-y-3">
            <p className="text-slate-500 text-sm uppercase tracking-[0.35em]">
              Welcome Back
            </p>
            <h2 className="text-3xl font-semibold text-white">
              Sign in to your account
            </h2>
            <p className="text-slate-400 text-sm leading-6">
              Access your financial dashboard and stay on top of your money.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-10 space-y-5">
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
                placeholder="Enter your password"
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
              Sign In
            </button>
          </form>

          <p className="text-slate-400 text-sm mt-8 text-center">
            Don’t have an account?
            <Link to="/register" className="font-semibold text-white ml-1 hover:text-[#3B82F6]">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;