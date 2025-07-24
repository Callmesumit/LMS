import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup } from "@/components/ui/radio-group";
import { Label } from "@radix-ui/react-label";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

function Signup() {

  const navigate = useNavigate()

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });
  const handleChange = (e)=> {
    const { name, value } = e.target;
    setUser((prev)=>({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault(), 
    console.log(user)
    try {
      const responce = await axios.post(
        "http://localhost:8000/api/v1/user/register",
        user,
        {
          header: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (responce.data.success) {
        navigate('/login')
        toast.success(responce.data.message);
      } else {
        toast.error("Something Went Wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 mt-14 px-4">
      <div className="bg-white shadow-xl rounded-xl p-10 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-3">
          Create Your Account
        </h1>
        <p className="text-center text-gray-600 mb-8 text-lg">
          Join Us Today! It's Quick & Easy
        </p>

        {/* Full Name Input */}
        <div className="mb-5">
          <Label className="block text-gray-700 font-medium mb-1">
            Full Name
          </Label>
          <Input
            placeholder="Enter Your Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="name"
            value={user.name}
            onChange={handleChange}
            type="text"
            id="name"
          />
        </div>

        {/* Email Input */}
        <div className="mb-5">
          <Label className="block text-gray-700 font-medium mb-1">
            Email Address
          </Label>
          <Input
            placeholder="Enter Your Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
        </div>

        {/* Password Input */}
          <form className="w-full max-w-sm mx-auto mt-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <Input
              type="password"
              name="password"
              id="password"
              value={user.password}
            onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </form>

        {/* Role Selection */}
        <div className="mb-6">
          <Label className="block text-gray-700 font-medium mb-2">Role</Label>
          <RadioGroup
            defaultValue={user.role}
            onChange={handleChange}
            className="flex gap-6"
          >
            <div className="flex items-center space-x-2">
              <Input
                type="radio"
                id="role1"
                name="role"
                value="student"
                checked={user.role === "student"}
                onChange={handleChange}
              />
              <Label htmlFor="role1" className="text-gray-700">
                Student
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Input
                type="radio"
                id="role2"
                name="role"
                value="instructor"
                checked={user.role === "instructor"}
                onChange={handleChange}
              />
              <Label htmlFor="role2" className="text-gray-700">
                Instructor
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Sign Up Button */}
        <Button
          onClick={handleSubmit}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md text-lg transition duration-300"
        >
          Sign Up
        </Button>

        {/* Link to Login */}
        <p className="mt-6 text-center text-gray-700 text-md">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:underline font-semibold"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
