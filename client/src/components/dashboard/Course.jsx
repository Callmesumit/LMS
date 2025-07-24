import React, { useEffect } from "react";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCourse } from "@/redux/courseSlice";
import { Badge } from "../ui/badge";
import { Edit } from "lucide-react";

function Course() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { course } = useSelector((store) => store.course);

  useEffect(() => {
    const getCreatorCourse = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/v1/course/", {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setCourse(res.data.courses));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCreatorCourse();
  }, [dispatch]);

  return (
    <div className="p-4 md:p-8 lg:p-10 w-full min-h-screen bg-gray-50">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl font-semibold text-gray-800">My Courses</h1>
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => navigate("create")}>
          + Create New Course
        </Button>
      </div>

      <div className="overflow-x-auto mt-6 rounded-lg shadow-sm bg-white">
        <Table>
          <TableCaption>Your most recent courses are listed below.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[200px]">Course Details</TableHead>
              <TableHead className="text-center min-w-[100px]">Price</TableHead>
              <TableHead className="text-center min-w-[120px]">Status</TableHead>
              <TableHead className="text-right min-w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {course?.map((course) => (
              <TableRow key={course._id}>
                <TableCell>
                  <div className="flex items-center gap-4">
                    <img
                      src={course?.courseThumbnail}
                      alt="Thumbnail"
                      className="w-14 h-14 rounded object-cover border"
                    />
                    <span className="font-medium text-gray-800">{course.courseTitle}</span>
                  </div>
                </TableCell>

                <TableCell className="text-center text-gray-700 font-medium">
                  ₹{course.coursePrice || "NA"}
                </TableCell>

                <TableCell className="text-center">
                  <Badge className={course.isPublished ? "bg-green-500" : "bg-yellow-500"}>
                    {course.isPublished ? "Published" : "Draft"}
                  </Badge>
                </TableCell>

                <TableCell className="text-right">
                  <Button variant="ghost" onClick={() => navigate(`/admin/course/${course._id}`)}>
                    <Edit />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {course?.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                  No courses available. Start by creating a new one!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default Course;
