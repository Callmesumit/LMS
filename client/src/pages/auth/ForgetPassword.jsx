import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function ForgotPassword() {
    const navigate = useNavigate()
  const [email, setEmail] = useState("");

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/api/otp/send", { email });
      if (res.data.success) {
        navigate('/verify')
        toast.success("OTP sent to your email");
        
        // optionally redirect to /verify-otp
      } else {
        toast.error("Failed to send OTP");
      }
    } catch (error) {
      toast.error("Error sending OTP");
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-blue-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Forgot Password</h2>
        <form onSubmit={handleSendOtp}>
          <div className="mb-4">
            <Label className="text-gray-700">Email Address</Label>
            <Input
              type="email"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2"
            />
          </div>
          <Button   type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700">
            Send OTP
          </Button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
