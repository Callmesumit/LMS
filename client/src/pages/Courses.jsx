import CourseCard from '@/components/CourseCard';
import courses from '@/data/courses';
import { setCourse } from '@/redux/courseSlice';
import store from '@/redux/store';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Courses = () => {
  const dispatch = useDispatch()
  const {course} = useSelector(store => store.course)
  useEffect(()=> {
    const getAllPublishedCourse = async ()=> {
      try {
        const res = await axios.get(`http://localhost:8000/api/v1/course/published-courses` , {withCredentials:true})
        if (res.data.success) {
          dispatch(setCourse(res.data.courses))
        }
      } catch (error) {
        console.log(error);
        
      }
    }
    getAllPublishedCourse()
  })
  return (
    <>
      <div className="bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 pt-20 min-h-screen py-10">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-extrabold text-gray-800 mb-4 animate-fade-in-down">
              Discover Our Courses
            </h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto animate-fade-in-up">
              Explore our curated selection of courses to boost your skills and
              career. Whether you're a beginner or an expert, we have something just
              for you.
            </p>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
            {course?.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Courses;
