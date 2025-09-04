import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://popx-assignment-sz6n.onrender.com/login",
        {
          email,
          password,
        }
      );
      login(res.data.token);
      //   alert("Success");
      navigate("/me");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Login failed!");
    }
  };

  return (
    <div className="flex justify-center items-center bg-white min-h-screen">
      <div className="w-[375px] h-[720px] bg-[#F7F8F9] p-6 flex flex-col">
        <h1 className="text-[28px] font-bold text-[#1D2226] mb-4">
          Signin to your <br /> PopX account
        </h1>
        <p className="text-[18px] font-medium text-[#2d3338] opacity-0.6 mb-8">
          Lorem ipsum dolor sit amet,
          <br /> consectetur adipiscing elit,
        </p>

        {/* Content Form */}
        <form className="flex-1 space-y-8" onSubmit={handleLogin}>
          <div className="relative w-full">
            <label className="absolute top-0 left-2 -translate-y-3/5 bg-[#F7F8F9] pl-2 pr-2 text-sm font-medium text-[#6C25FF] mb-1">
              Email address<span className="text-red-500">*</span>
            </label>
            <input
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="marry@example.com"
              className="w-full border-[2px] border-[#CBCBCB] rounded-md px-3 py-2 text-sm outline-none"
            />
          </div>

          <div className="relative w-full">
            <label className=" absolute top-0 left-2 -translate-y-3/5 bg-[#F7F8F9] pl-2 pr-2 text-sm font-medium text-[#6C25FF] mb-1">
              Password<span className="text-red-500">*</span>
            </label>
            <input
              required
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              value={password}
              placeholder="••••••••"
              className="w-full border-[2px] border-[#CBCBCB] rounded-md px-3 py-2 text-sm outline-none"
            />
          </div>
          {/* Button at bottom */}
          <button
            type="submit"
            className="w-full bg-[#6C25FF] text-white text-sm font-medium py-3 rounded-md mt-4 cursor-pointer"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
