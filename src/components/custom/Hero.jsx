import React from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom'; // Import Link for navigation
import '../../index.css';

function Hero() {
  return (
    <div
      className="relative flex flex-col items-center justify-center h-screen bg-cover bg-center text-white"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1530789253388-582c481c54b0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')", // Replace with your background image
      }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-5">
        <h1 className="text-5xl md:text-6xl font-bold leading-tight max-w-4xl">
          <span className="text-[#f56551]">Discover Your Next Adventure</span>
          <br />
          <span>Personalized Itineraries Powered by AI</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mt-5 max-w-2xl">
          Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.
        </p>

        {/* Call-to-Action Buttons */}
        <div className="flex gap-5 mt-8">
          <Link to="/create-trip">
            <Button className="bg-[#f56551] hover:bg-[#e25440] px-6 py-3 text-lg rounded-lg">
              Get Started, It's Free
            </Button>
          </Link>
          <a
            href="#learn-more"
            className="bg-white text-black px-6 py-3 text-lg rounded-lg hover:bg-gray-200"
          >
            Learn More
          </a>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-10 flex gap-5">
        <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
        <div className="w-3 h-3 bg-white rounded-full animate-bounce delay-200"></div>
        <div className="w-3 h-3 bg-white rounded-full animate-bounce delay-400"></div>
      </div>
    </div>
  );
}

export default Hero;