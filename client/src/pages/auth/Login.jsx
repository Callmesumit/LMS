import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import ForgotPassword from './ForgetPassword';
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/authSlice';

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [input, setInput] = useState({
    email: "",
    password:""
  })
  const handleChange =(e)=>{

    const {name, value} = e.target
    setInput((prev)=> ({
      ...prev,
      [name]:value,
    }))
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(input);

    try {
      const responce = await axios.post(
        "http://localhost:8000/api/v1/user/login",
        input,
        {
          header: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (responce.data.success) {
        navigate('/')
        dispatch(setUser(responce.data.user))
        toast.success(responce.data.message);
      } else {
        toast.error("Something Went Wrong");
      }
    } catch (error) {
      console.log(error);
    }
    
  }
  return (
    <div className="bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 min-h-screen mt-16 flex justify-center items-center">
      <div className="bg-white shadow-xl rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Welcome Back</h1>
        <p className="text-center text-gray-600 mb-8 text-lg">
          Please log in to your account
        </p>

        {/* Email Input */}
        <div className="mb-6">
          <Label className="font-semibold mb-2 text-gray-700">Email Address</Label>
          <Input 
          type="email"
            placeholder="Enter Your Email" name="email" value={input.email} onChange={handleChange} 
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          />
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <Label className="font-semibold mb-2 text-gray-700">Password</Label>
          <Input 
            type="password"
            placeholder="Enter Your Password" name="password" value={input.password} onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          />
        </div>

        {/* Login Button */}
        <Button onClick={handleSubmit}  className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition duration-300">
          Login
        </Button>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-3 text-gray-500">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Sign Up Link */}
        <p className="text-center text-gray-700 text-lg">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-600 hover:underline font-semibold">
            Sign Up
          </Link>
        </p>
        <div className="flex justify-center text-l mt-2 text-gray-600">
    Forgot your password?{' '}
    <Link to="/forget" className="text-blue-600 font-medium hover:underline hover:text-red-500">
      Click here to reset
    </Link>
  </div>
      </div>
  
      

      
    </div>

  );
}

export default Login;
