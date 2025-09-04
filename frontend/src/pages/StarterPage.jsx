import React from "react";
import { useNavigate } from "react-router-dom";
const StarterPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center bg-white">
      <div className="w-full max-w-[400px] flex flex-col justify-end h-[650px] md:h-[700px] bg-[#F7F8F9] m-6">
        {/* Text Section */}
        <div className="mb-6 px-6">
          <h1 className="text-[23px] font-semibold text-[#1D2226] mb-2">
            Welcome to PopX
          </h1>
          <p className="text-[18px] font-medium text-[#2d3338] opacity-0.6">
            Lorem ipsum dolor sit amet,
            <br /> consectetur adipiscing elit,
          </p>
        </div>

        {/* Buttons */}
        <div className="space-y-3 px-6">
          <button
            onClick={() => navigate("/register")}
            className="w-full bg-[#6C25FF] text-white text-sm font-medium py-3 rounded-md cursor-pointer"
          >
            Create Account
          </button>
          <button
            onClick={() => navigate("/login")}
            className="w-full bg-[#6C25FF4B] text-[#1D2226] text-sm font-semibold py-3 rounded-md cursor-pointer"
          >
            Already Registered? Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default StarterPage;
