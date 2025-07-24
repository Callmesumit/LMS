import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLecture } from "@/redux/lectureSlice";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Progress } from "../ui/progress";
import axios from "axios";

function LectureTab() {
  const params = useParams();
  const { courseId, lectureId } = params;
  const { lecture } = useSelector((store) => store.lecture);
  const selectedLecture = lecture.find((lecture) => lecture._id === lectureId);
  const [lectureTitle, setLectureTitle] = useState(
    selectedLecture.lectureTitle
  );
  const [uploadVideoInfo, setUploadVideoInfo] = useState(null);
  const [isFree, setIsFree] = useState(selectedLecture.isPreviewFree);
  const [mediaProgress, setMediaProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [removeLoading, setRemoveLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fileChangeHandler = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      setMediaProgress(true);
      try {
        const res = await axios.post(
          `http://localhost:8000/api/v1/media/upload-video`,
          formData,
          {
            onUploadProgress: ({ loaded, total }) => {
              setUploadProgress(Math.round((loaded * 100) / total));
            },
          }
        );
        if (res.data.success) {
          setUploadVideoInfo({
            videoUrl: res.data.data.url,
            publicId: res.data.data.public_id,
          });
          toast.success(res.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("Video Upload Failed");
      } finally {
        setMediaProgress(false);
      }
    }
  };

 const editLectureHandler = async (e) => {
  e.preventDefault();

  const data = {
    lectureTitle,
    videoInfo: uploadVideoInfo,
    isPreviewFree: isFree,
  };

  try {
    setLoading(true);
console.log('Sending data:', data);
    const res = await axios.post(
  `http://localhost:8000/api/v1/course/${courseId}/lecture/${lectureId}`,
  data,
  {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  }
);


    if (res.data.success) {
      // Optionally update local state or Redux
      dispatch(setLecture(
        [...lecture.filter(l => l._id !== res.data.lecture._id), res.data.lecture]
      ));
      toast.success(res.data.message);
    }
  } catch (error) {
    console.log(error);
    toast.error("Failed to Edit Lecture");
  } finally {
    setLoading(false);
  }
};


  const removeLectureHandler = async (e) => {
    e.preventDefault();
    try {
      setRemoveLoading(true);
      const res = await axios.delete(
        `http://localhost:8000/api/v1/course/lecture/${lectureId}`,
        { withCredential: true }
      );
      if (res.data.success) {
        navigate(`/admin/course/${courseId}/lecture`);
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to Delete Lecture");
    } finally {
      setRemoveLoading(false);
    }
  };
  return (
    <Card>
      <CardHeader className="flex justify-between">
        <div>
          <CardTitle>Edit Lecture</CardTitle>
          <CardDescription>
            Make Changes and click save when done.
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button
            disabled={removeLoading}
            variant="destructive"
            onClick={removeLectureHandler}
          >
            {removeLoading ? (
              <>
                <Loader2 className="mr-1 w-4 h-4 animate-spin" />
                Please Wait
              </>
            ) : (
              "Remove Lecture"
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div>
          <Label>Title</Label>
          <Input
            type="text"
            placeholder="Ex Introduction to JavaScript"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
          />
        </div>
        <div className="my-5">
          <Label>
            Video <span className="text-red-500">*</span>
          </Label>
          <Input
            type="file"
            accept="video/*"
            className="w-fit"
            onChange={fileChangeHandler}
          />
        </div>
        <div className="flex items-center space-x-2 my-5">
          <Switch
            checked={isFree}
            onCheckedChange={(checked) => setIsFree(checked)}
            className="bg-gray-800"
          />
          <Label>This Video is Free</Label>
        </div>

        {mediaProgress && (
          <div className="my-4">
            <Progress value={uploadProgress} />
            <p>{uploadProgress}% uploaded</p>
          </div>
        )}
        <div className="mt-4">
          <Button
            disabled={loading}
            onClick={editLectureHandler}
            className="bg-gray-800 hover:bg-gray-800"
          >
            {loading ? (
              <>
                <Loader2 className="mr-1 w-4 h-4 animate-spin" />
                Please Wait
              </>
            ) : (
              "Update Lecture"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default LectureTab;
