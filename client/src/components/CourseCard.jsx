import React from 'react'
import { Card } from './ui/card'
import { Button } from './ui/button'
import courses from '@/pages/Courses'
import { Link } from 'react-router-dom'

function CourseCard({course}) {
  return (
    <Card className="bg-white shadow-lg shadow-gray-800 ">
        <img src={course.image} alt='' className='w-full h-55 object-cover'/>
        <div className='p-6 '>
            <h2 className='text-xl font-semibold text-gray-800 mb-3'>{course.title}</h2>
            <p className='text-gray-600 mb-4'>{course.description}</p>
            <Link to="/signup"><Button>Learn More</Button></Link> 
        </div>
    </Card>
  )
}

export default CourseCard
