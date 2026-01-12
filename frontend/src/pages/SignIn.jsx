import React, { useState } from "react";
import { FaFacebookF, FaGoogle, FaInstagram } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInSuccess, signInFailure } from "../Redux/User/userSlice";

export const Signin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { loading, error } = useSelector((state)=>state.user);
  

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart())
    
    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data.user))
      navigate("/profile");
    } catch (error) {
      dispatch(signInFailure(error.message))
     
    }
  };
  return (
    <div className="h-screen w-full flex items-center justify-center bg-sky-50 overflow-hidden">
      <div className="w-full max-w-5xl h-[90vh] bg-transparent flex rounded-3xl overflow-hidden shadow-xl">
        {/* Left Image Section */}
        <div className="hidden md:flex w-1/2 relative">
          <img
            src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?q=80&w=1073&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Real Estate"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-8 left-8 text-white">
            <h2 className="text-3xl font-bold leading-tight">
              Manage your properties
              <br />
              with confidence
            </h2>
          </div>
        </div>

        {/* Right Form Section */}
        <div className="p-10">
          <h2 className="text-3xl font-bold ">Welcome Back</h2>
          <p className="text-gray-500 mb-6">
            Sign in to continue to easyEstate
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="email"
              id="email"
              onChange={handleChange}
              placeholder="Email"
              className="w-full px-4 py-3 rounded-md border border-slate-300 focus:outline-none focus:ring-1 focus:ring-green-400"
            />

            <input
              type="password"
              id="password"
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-4 py-3 rounded-md border border-slate-300 focus:outline-none focus:ring-1 focus:ring-green-400"
            />

            <div className="flex justify-between text-sm">
              <label className="flex items-center gap-2 text-sm text-slate-500">
                <input type="checkbox" />
                Remember me
              </label>
              <a className="text-green-600 cursor-pointer">Forgot password?</a>
            </div>

            <button
              disabled={loading}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-md font-semibold transition"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
            {error && <p className="text-center text-red-500 text-sm">{error}</p>}

          </form>

          <p className="text-center text-sm mt-4 text-slate-500">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/sign-up")}
              className="text-green-600 cursor-pointer"
            >
              Sign up
            </span>
          </p>

          <div className="mt-6 text-center">
            <p className="text-sm mb-3 text-slate-500">Or sign in with</p>
            <div className="flex justify-center gap-4 mt-3">
              <button
                className="
          w-9 h-9 rounded-full border border-slate-300
          flex items-center justify-center
          transition-all duration-300 ease-out
          hover:-translate-y-1
          hover:shadow-lg hover:shadow-green-400/40
          hover:bg-green-50
        "
              >
                <FaGoogle className="text-slate-700 hover:text-green-500 transition-colors duration-300" />
              </button>

              <button
                className="
          w-9 h-9 rounded-full border border-slate-300
          flex items-center justify-center
          transition-all duration-300 ease-out
          hover:-translate-y-1
          hover:shadow-lg hover:shadow-green-400/40
          hover:bg-green-50
        "
              >
                <FaFacebookF className="text-slate-700 hover:text-green-500 transition-colors duration-300" />
              </button>
              <button
                className="
          w-9 h-9 rounded-full border border-slate-300
          flex items-center justify-center
          transition-all duration-300 ease-out
          hover:-translate-y-1
          hover:shadow-lg hover:shadow-green-400/40
          hover:bg-green-50
        "
              >
                <FaInstagram className="text-slate-700 hover:text-green-500 transition-colors duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
