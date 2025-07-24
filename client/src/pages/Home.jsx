

import React from "react";
import Hero from "@/components/Hero";
import CourseCard from "@/components/CourseCard";
import courses from "@/data/courses"; // ✅ import course data

function Home() {
  return (
    <div>
      <Hero />
      <div className="py-10 bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
          Our Courses
        </h1>
        <p className="text-center text-gray-600 mb-12">
          Explore our curated courses to boost your skills and career. Whether
          you're a beginner or an expert, we have something for everyone.
        </p>
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.slice(0, 12).map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
