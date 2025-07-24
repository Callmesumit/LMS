import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [email, setEmail] = useState(""); // added email field
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      setMessage("");
     
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/v1/user/resetPassword', {
        email,
        newPassword: password,
      });
     
      setMessage(response.data.message);
      setError("");
      setPassword("");
      setConfirmPassword("");
      setEmail("");
     navigate('/login');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong.");
      setMessage("");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-18 mb-15 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="New Password"
          className="border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          className="border p-2 rounded"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition">
          Reset Password
        </button>
      </form>
      {message && <p className="mt-4 text-green-500">{message}</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
}
