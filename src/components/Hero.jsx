import React from "react";
import { PlayCircleIcon } from "lucide-react";

const Hero = () => {
  return (
    <section className="text-center text-white py-16">
      <h1 className="text-4xl font-bold">Discover & Collect Extraordinary NFTs</h1>
      <p className="text-lg mt-3">
        Enter the world of digital art and collectibles. Explore unique NFTs created by artists
        worldwide.
      </p>
      <div className="mt-5 flex justify-center gap-4">
        <button className="bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-3 rounded-lg transition-all duration-300 hover:from-purple-600 hover:to-pink-500">
          🚀 Start Creating
        </button>
        <button className="bg-gray-700 px-6 py-3 rounded-lg">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
            {" "}
            <PlayCircleIcon className="w-4 h-4 cursor-pointer mr-1" stroke="white" /> Watch Demo
          </div>
        </button>
      </div>
    </section>
  );
};

export default Hero;
