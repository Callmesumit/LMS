import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function VerifyOtp() {
  const [form, setForm] = useState({
    email: '',
    otp: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/api/otp/verify", form);
      if (res.data.success) {
        toast.success("OTP verified successfully");
        navigate("/reset"); // route for reset password page
      } else {
        toast.error("Invalid or expired OTP");
      }
    } catch (error) {
      toast.error("Verification failed");
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-blue-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Verify OTP</h2>
        <form onSubmit={handleVerify}>
          {/* Email Input */}
          <div className="mb-4">
            <Label className="text-gray-700">Email</Label>
            <Input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="mt-2"
            />
          </div>

          {/* OTP Input */}
          <div className="mb-4">
            <Label className="text-gray-700">OTP</Label>
            <Input
              type="text"
              name="otp"
              value={form.otp}
              onChange={handleChange}
              placeholder="Enter the OTP"
              className="mt-2"
            />
          </div>

          <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700">
            Verify OTP
          </Button>
        </form>
      </div>
    </div>
  );
}

export default VerifyOtp;



