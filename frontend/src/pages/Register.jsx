import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const { login } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    password: "",
    agency: "no",
  });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://popx-assignment-sz6n.onrender.com/register",
        form
      );
      login(res.data.token);
      navigate("/me");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Register failed!");
    }
  };

  return (
    <div className="flex justify-center items-center bg-white px-4">
      <div className=" bg-[#F7F8F9] p-6 rounded-md shadow-sm flex flex-col mt-7 w-full max-w-[400px] h-[650px] md:h-[700px]">
        <h1 className="text-2xl sm:text-[28px] font-bold text-[#1D2226] mb-9">
          Create your <br /> PopX account
        </h1>

        <form className="flex-1 space-y-8" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="relative w-full">
            <label className="absolute top-0 left-2 -translate-y-3/5 bg-[#F7F8F9] px-1 text-sm font-medium text-[#6C25FF]">
              Full Name<span className="text-red-500">*</span>
            </label>
            <input
              required
              onChange={handleChange}
              value={form.name}
              name="name"
              type="text"
              placeholder="Marry Doe"
              className="w-full border-2 border-[#CBCBCB] rounded-md px-3 py-2 text-sm outline-none"
            />
          </div>

          {/* Phone */}
          <div className="relative w-full">
            <label className="absolute top-0 left-2 -translate-y-3/5 bg-[#F7F8F9] px-1 text-sm font-medium text-[#6C25FF]">
              Phone number<span className="text-red-500">*</span>
            </label>
            <input
              required
              onChange={handleChange}
              value={form.phone}
              name="phone"
              type="text"
              placeholder="1234567890"
              className="w-full border-2 border-[#CBCBCB] rounded-md px-3 py-2 text-sm outline-none"
            />
          </div>

          {/* Email */}
          <div className="relative w-full">
            <label className="absolute top-0 left-2 -translate-y-3/5 bg-[#F7F8F9] px-1 text-sm font-medium text-[#6C25FF]">
              Email address<span className="text-red-500">*</span>
            </label>
            <input
              required
              onChange={handleChange}
              value={form.email}
              name="email"
              type="email"
              placeholder="marry@example.com"
              className="w-full border-2 border-[#CBCBCB] rounded-md px-3 py-2 text-sm outline-none"
            />
          </div>

          {/* Password */}
          <div className="relative w-full">
            <label className="absolute top-0 left-2 -translate-y-3/5 bg-[#F7F8F9] px-1 text-sm font-medium text-[#6C25FF]">
              Password<span className="text-red-500">*</span>
            </label>
            <input
              required
              onChange={handleChange}
              value={form.password}
              name="password"
              type="password"
              placeholder="••••••••"
              className="w-full border-2 border-[#CBCBCB] rounded-md px-3 py-2 text-sm outline-none"
            />
          </div>

          {/* Company */}
          <div className="relative w-full">
            <label className="absolute top-0 left-2 -translate-y-3/5 bg-[#F7F8F9] px-1 text-sm font-medium text-[#6C25FF]">
              Company name
            </label>
            <input
              required
              onChange={handleChange}
              value={form.company}
              name="company"
              type="text"
              placeholder="My Company"
              className="w-full border-2 border-[#CBCBCB] rounded-md px-3 py-2 text-sm outline-none"
            />
          </div>

          {/* Radio */}
          <div className="-mt-4">
            <p className="text-sm font-medium text-[#1D2226] mb-2">
              Are you an Agency?<span className="text-red-500">*</span>
            </p>
            <div className="flex space-x-6">
              <label className="flex items-center space-x-2 text-sm text-gray-700">
                <input
                  type="radio"
                  name="agency"
                  value="yes"
                  className="accent-[#6C25FF]"
                  checked={form.agency === "yes"}
                  onChange={handleChange}
                />
                <span>Yes</span>
              </label>
              <label className="flex items-center space-x-2 text-sm text-gray-700">
                <input
                  type="radio"
                  name="agency"
                  value="no"
                  className="accent-[#6C25FF]"
                  checked={form.agency === "no"}
                  onChange={handleChange}
                />
                <span>No</span>
              </label>
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-[#6C25FF] text-white text-sm font-medium py-3 rounded-md mt-10 md:mt-20"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
