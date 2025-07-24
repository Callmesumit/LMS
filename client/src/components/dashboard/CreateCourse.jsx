import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const CreateCourse = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [courseTitle, setCourseTitle] = useState("");
  const [category, setCategory] = useState("");

  const getSelectedCategory = (value) => {
    setCategory(value);
  };

  const createCourseHandler = async () => {
    if (!courseTitle || !category) {
      toast.warning("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:8000/api/v1/course/",
        { courseTitle, category },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/course");
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full px-4 py-8 md:px-10 lg:px-20 bg-gray-50">
      <div className="max-w-2xl mx-auto bg-white shadow-sm rounded-lg p-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          Create a <span className="text-blue-600">New Course</span>
        </h1>
        <p className="text-gray-500 text-sm mb-6">
          Provide the course details below to publish your learning material.
        </p>

        <div className="space-y-5">
          <div>
            <Label className="mb-1 block">Course Title</Label>
            <Input
              type="text"
              value={courseTitle}
              onChange={(e) => setCourseTitle(e.target.value)}
              placeholder="e.g., Mastering React"
              className="bg-white"
            />
          </div>

          <div>
            <Label className="mb-1 block">Category</Label>
            <Select onValueChange={getSelectedCategory}>
              <SelectTrigger className="w-full bg-white">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Next">Next JS</SelectItem>
                <SelectItem value="Java">Java</SelectItem>
                <SelectItem value="Python">Python</SelectItem>
                <SelectItem value="Mongo">MongoDB</SelectItem>
                <SelectItem value="JavaScript">JavaScript</SelectItem>
                <SelectItem value="Docker">Docker</SelectItem>
                <SelectItem value="Node">Node JS</SelectItem>
                <SelectItem value="Data">Data Science</SelectItem>
                <SelectItem value="Frontend">Frontend Development</SelectItem>
                <SelectItem value="Backend">Backend Development</SelectItem>
                <SelectItem value="Mern">MERN Stack</SelectItem>
                <SelectItem value="Javadev">Java Full Stack</SelectItem>
                <SelectItem value="Pythondev">Python Full Stack</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-end pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/admin/course")}
            >
              Cancel
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white"
              disabled={loading}
              onClick={createCourseHandler}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-4 w-4" />
                  Creating...
                </>
              ) : (
                "Create Course"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;
