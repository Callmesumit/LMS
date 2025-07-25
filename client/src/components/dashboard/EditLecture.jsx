import React from 'react'
import { Button } from '../ui/button'
import { ArrowLeft } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import LectureTab from './LectureTab'

function EditLecture() {
    const params = useParams()
    const courseId = params.courseId
  return (
    <div className='p-4 md:p-10 h-screen'>
      <div className='flex items-center justify-between mb-5'>
        <div className='flex items-center gap-2'>
            <Link  to={`/admin/course/${courseId}/lecture`}>
            <Button size="icon" variant="outline" className='rounded-full'><ArrowLeft size={16}/></Button>
            </Link>
            <h1 className='font-bold text-xl'>Update Your Lectures</h1>
        </div> 
      </div>
      <LectureTab/>
    </div>
  )
}

export default EditLecture
