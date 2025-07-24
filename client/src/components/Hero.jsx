import React from "react";
import { Button } from "./ui/button";
import { Award, Search, User } from "lucide-react";
import Img2 from "../assets/img2.jpg";
import CountUp from "react-countup";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="bg-gradient-to-r from-slate-800 to-slate-900 pt-20">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between px-4 lg:px-0 py-10 gap-12">
        
        {/* Text Section */}
        <div className="flex-1 space-y-8 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
            Explore Our <span className="text-blue-400">5000+</span> <br />
            Online Courses for Everyone
          </h1>
          <p className="text-gray-300 text-lg max-w-xl mx-auto md:mx-0">
            Join thousands of learners from around the world. Upskill, reskill, and explore your passions with our expertly designed courses.
          </p>

          {/* Search Input */}
          <div className="relative max-w-xl mx-auto md:mx-0">
            <input
              type="text"
              placeholder="Search your course here..."
              className="w-full py-3 px-5 pr-32 rounded-md bg-gray-100 text-gray-800 placeholder:text-gray-500 text-sm shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
         <Link to="/courses"> 
           <Button className="absolute top-1.5 right-1.5 flex gap-2 items-center bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-md text-sm">
              Search <Search className="w-4 h-4" />
            </Button>
            
          </Link>
          </div>
        </div>

        {/* Image Section */}
        <div className="flex-1 relative">
          <img
            src={Img2}
            alt="Hero"
            className="rounded-lg shadow-lg w-full max-w-xl mx-auto"
          />

          {/* Student Count Badge */}
          <div className="absolute top-1/3 left-[-20px] bg-blue-100  items-center gap-3 p-3 rounded-lg shadow-lg hidden md:flex">
            <div className="bg-blue-500 p-2 rounded-full text-white">
              <User size={20} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">
                <CountUp end={4500} duration={2} />+
              </h3>
              <p className="text-gray-600 text-sm">Active Students</p>
            </div>
          </div>

          {/* Certified Badge */}
          <div className="absolute top-[10%] right-[-20px] bg-blue-100 items-center gap-3 p-3 rounded-lg shadow-lg hidden md:flex">
            <div className="bg-blue-500 p-2 rounded-full text-white">
              <Award size={20} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">
                <CountUp end={690} duration={2} />+
              </h3>
              <p className="text-gray-600 text-sm">Certified Learners</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
