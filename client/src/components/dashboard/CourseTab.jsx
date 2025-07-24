import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Label } from "@radix-ui/react-label";
import { setCourse } from "@/redux/courseSlice";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectGroup, SelectLabel } from "@radix-ui/react-select";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import axios from "axios";

function CourseTab() {
  const params = useParams();
  const id = params.courseId;
  console.log("Course ID:", id);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { course } = useSelector((store) => store.course);
  const selectCourse = course.find((course) => course._id === id);

  const [selectedCourse, setSelectedCourse] = useState(selectCourse);
  const [loading, setLoading] = useState(false);
  const [publish, setPublish] = useState(false);

  const getCourseById = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/course/${id}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        setSelectedCourse(res.data.course); // ✅ just set it directly
      }
    } catch (error) {
      console.log("Error fetching course:", error);
    }
  };

  useEffect(() => {
    if (id) {
      getCourseById();
    }
  }, [id]);

  const [input, setInput] = useState({
    courseTitle: selectedCourse?.courseTitle,
    subTitle: selectedCourse?.subTitle,
    description: selectedCourse?.description,
    category: selectedCourse?.category,
    courseLevel: selectedCourse?.courseLevel,
    coursePrice: selectedCourse?.coursePrice,
    file: "",
  });
  const [previewThumbnail, setPreviewThumbnail] = useState(
    selectedCourse?.courseThumbnail
  );

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const selectCategory = (value) => {
    setInput({ ...input, category: value });
  };

  const selectCourseLevel = (value) => {
    setInput({ ...input, courseLevel: value });
  };

  //get file

  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, courseThumbnail: file });
      const fileReader = new FileReader();
      fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  };

  const UpdateCourseHandler = async () => {
    const formData = new FormData();
    formData.append("courseTitle", input.courseTitle);
    formData.append("subTitle", input.subTitle);
    formData.append("description", input.description);
    formData.append("category", input.category);
    formData.append("courseLevel", input.courseLevel);
    formData.append("coursePrice", input.coursePrice);
    formData.append("file", input.courseThumbnail);

    try {
      setLoading(true);
      const res = await axios.put(
        `http://localhost:8000/api/v1/course/${id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data", // if you're sending a file (e.g., thumbnail)
          },
        }
      );
      if (res.data.success) {
        navigate(`lecture`);
        toast.success(res.data.message);
        dispatch([...course.setCourse(res.data.course)]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const togglePublishUnpublish = async (action) => {
    try {
      const res = await axios.patch(
        `http://localhost:8000/api/v1/course/${id}`,
        {},
        {
          params: { action },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setPublish((prev) => !prev);
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update publish status");
    }
  };

  return (
    <Card>
      <CardHeader className="flex md:flex-row justify-between">
        <div>
          <CardTitle>Basic Course Information</CardTitle>
          <CardDescription>
            Make changes to your courses hear. Click save when you're done.
          </CardDescription>
        </div>
        <div className="space-x-2">
         <Link to="/admin/course"> <Button
            onClick={() =>
              togglePublishUnpublish(
                selectedCourse.isPublished ? "unpublish" : "publish"
              )
            }
            className="bg-gray-800"
          >
            {selectedCourse.isPublished ? "Unpublish" : "Publish"}
          </Button>
            </Link>
          <Button variant="destructive">Remove Course</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mt-5">
          <div>
            <Label>Title</Label>
            <Input
              value={input.courseTitle}
              onChange={changeEventHandler}
              type="text"
              name="courseTitle"
              placeholder="Ex. Fullstack Developer"
            />
          </div>
          <div>
            <Label>SubTitle</Label>
            <Input
              value={input.subTitle}
              onChange={changeEventHandler}
              type="text"
              name="subTitle"
              placeholder="Ex. bacome a Fullstack Developer from Zero to Hero in 2 Month"
            />
          </div>
          <div>
            <Label>Description</Label>
            <Input
              value={input.description}
              onChange={changeEventHandler}
              type="text"
              name="description"
              placeholder="Ex. Give a description to your course"
            />
          </div>
          <div className="flex md:flex-row flex-wrap gap-1 items-center md:gap-5">
            <div>
              <Label>Category</Label>
              <Select
                defaultValue={input.category}
                onValueChange={selectCategory}
              >
                <SelectTrigger className="w-[180px]">
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
            <div>
              <Label>Course Level</Label>
              <Select
                defaultValue={input.courseLevel}
                onValueChange={selectCourseLevel}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a Course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Course Level</SelectLabel>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Advance">Advance</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Price in (INR)</Label>
              <Input
                value={input.coursePrice}
                onChange={changeEventHandler}
                type="number"
                name="coursePrice"
                placeholder="199"
                className="w-fit"
              />
            </div>
          </div>
          <div>
            <Label>Course Thumbnail</Label>
            <Input
              type="file"
              id="file"
              onChange={selectThumbnail}
              placeholder="199"
              accept="image/*"
              className="w-fit"
            />
            {previewThumbnail && (
              <img
                src={previewThumbnail}
                alt="Thumbnail"
                className="w-64 my-2"
              />
            )}
          </div>
          <div className="flex gap-2">
            <Button onClick={() => navigate("/admin/course")} variant="outline">
              Cancel
            </Button>
            <Button
              className="bg-gray-800 hover:bg-gray-600"
              disabled={loading}
              onClick={UpdateCourseHandler}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                  Please Wait..
                </>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default CourseTab;
