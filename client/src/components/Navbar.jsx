import React, { useState } from "react";
import { GraduationCap, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const [menuOpen, setMenuOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/user/logout", {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
    { label: "Services", path: "/services" },
    { label: "Courses", path: "/courses" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-5 py-4">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 hover:opacity-90 transition"
        >
          <GraduationCap className="text-blue-400 w-8 h-8" />
          <span className="text-white text-xl md:text-2xl font-bold tracking-tight">
            Bright<span className="text-blue-400">Cademy</span>
          </span>
        </Link>

        {/* Hamburger Button - mobile only */}
        <button onClick={toggleMenu} className="md:hidden text-white">
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-white font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              className="hover:text-blue-400 transition duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop User Section */}
        <div className="hidden md:flex items-center gap-4">
          {!user ? (
            <>
              <Link to="/login">
                <Button className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 text-sm">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-gray-700 hover:bg-gray-800 text-white px-5 py-2 text-sm">
                  Sign Up
                </Button>
              </Link>
            </>
          ) : (
            <>
              {user.role === "instructor" && (
                <Link to="/admin/dashboard">
                  <span className="text-lg font-bold text-white hover:text-blue-500">
                    Admin
                  </span>
                </Link>
              )}
              <Link to="/profile">
                <Avatar>
                  <AvatarImage src={user.photoUrl} alt={user.name} />
                  <AvatarFallback>
                    {user.name?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              </Link>
              <Button
                onClick={logoutHandler}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 text-sm"
              >
                Log Out
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-800 px-6 py-4 space-y-4 text-white">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              onClick={toggleMenu}
              className="block hover:text-blue-400"
            >
              {link.label}
            </Link>
          ))}

          {!user ? (
            <div className="flex flex-col gap-2 pt-4">
              <Link to="/login">
                <Button className="w-full bg-blue-500 hover:bg-blue-600">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="w-full bg-gray-700 hover:bg-gray-800">
                  Sign Up
                </Button>
              </Link>
            </div>
          ) : (
            <div className="pt-4 flex flex-col gap-2">
              {user.role === "instructor" && (
                <Link to="/admin/dashboard">
                  <span
                    onClick={toggleMenu}
                    className="text-blue-400 font-semibold hover:text-blue-500"
                  >
                    Admin Panel
                  </span>
                </Link>
              )}
              <Link to="/profile" onClick={toggleMenu}>
                <span className="hover:text-blue-400">Profile</span>
              </Link>
              <Button
                onClick={() => {
                  logoutHandler();
                  toggleMenu();
                }}
                className="w-full bg-red-500 hover:bg-red-600"
              >
                Log Out
              </Button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

export default Navbar;
