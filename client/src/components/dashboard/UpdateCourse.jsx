import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import CourseTab from "./CourseTab";


function UpdateCourse() {
  return (
    <div className="md:p-10 p-4">
      <div className="flex items-center justify-between mb-5">
        <h1 className="font-bold text--xl">
          Add detail information regarding course
        </h1>
        <Link to="lecture">
          <Button className="hover:text-blue-600 hover:cursor-pointer">Go to lecture Page</Button>
        </Link>
      </div>
      <CourseTab />
    </div>
  );
}

export default UpdateCourse;
