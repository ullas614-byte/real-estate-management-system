import React, { useState } from "react";
import { FaFacebookF, FaGoogle, FaInstagram } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong");
        setLoading(false);
        return;
      } else {
        setLoading(false);
        navigate("/sign-in");
      }
    } catch (error) {
      setError("Server not reachable.Try later", error);
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-sky-50 overflow-hidden">
      <div className="w-full max-w-5xl h-[90vh] bg-transparent flex rounded-3xl overflow-hidden shadow-xl">
        {/* Left Image Section */}
        <div className="hidden md:flex w-1/2 relative">
          <img
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80"
            alt="House"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20"></div>

          <div className="absolute bottom-8 left-8 text-white">
            <h2 className="text-3xl font-bold leading-tight">
              Find a place <br /> you’ll love
            </h2>
          </div>
        </div>

        {/* Right Form Section */}
        <div className="w-full md:w-1/2 bg-sky-50 flex items-center justify-center px-8">
          <div className="w-full max-w-sm">
            <h1 className="text-2xl font-semibold text-slate-800 mb-6 text-center">
              Get Started
            </h1>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                id="username"
                placeholder="Username"
                className="w-full px-4 py-3 rounded-md border border-slate-300 focus:outline-none focus:ring-1 focus:ring-green-400"
                onChange={handleChange}
              />

              <input
                type="email"
                id="email"
                placeholder="Email"
                className="w-full px-4 py-3 rounded-md border border-slate-300 focus:outline-none focus:ring-1 focus:ring-green-400"
                onChange={handleChange}
              />

              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-md border border-slate-300 focus:outline-none focus:ring-1 focus:ring-green-400"
                onChange={handleChange}
              />
              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-md font-semibold transition"
              >
                {loading ? "Creating account..." : "Join Now"}
              </button>
            </form>

            <p className="text-center text-sm text-slate-500 mt-4">
              Already got an account?{" "}
              <span
                onClick={() => navigate("/sign-in")}
                className="text-green-500 font-medium cursor-pointer"
              >
                Sign in
              </span>
            </p>

            <div className="mt-6 text-center text-sm text-slate-400">
              Or sign in with
            </div>

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
