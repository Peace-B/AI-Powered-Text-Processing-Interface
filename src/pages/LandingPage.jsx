import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="bg-[#13272a] text-white min-h-screen flex flex-col items-center justify-center px-6 md:px-12">
      {/* Hero Section */}
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-bold text-[#93e6f3] animate-fade-in">
          Welcome to ConciseVerbify
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mt-4 animate-fade-in delay-200">
          Experience AI-powered text language detection summarization & translation effortlessly.
        </p>
       <Link to="/home">
        <button className="mt-6 px-6 py-3 bg-[#1c393e] rounded-full text-lg font-semibold shadow-lg hover:bg-[#34676f] transition duration-300 animate-fade-in delay-300">
          Get Started
        </button>
         </Link>
      </div>
    </div>
  );
};

export default LandingPage;
