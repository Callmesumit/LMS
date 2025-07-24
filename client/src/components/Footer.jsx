import React from "react";
import { Button } from "./ui/button";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Contact Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-b border-gray-700">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <h2 className="text-3xl font-bold mb-6 md:mb-0">
            <span className="text-teal-400">Feel Free</span> To Contact Us
          </h2>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <input
              type="text"
              placeholder="Enter Your Phone Number"
              className="px-4 py-2 w-full sm:w-72 rounded-md border-none text-gray-900"
            />
          <Button  className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-md transition duration-300 w-full sm:w-auto">
              Request Send
            </Button> 
          </div>
        </div>
      </div>

      {/* Links Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* About */}
        <div>
          <h3 className="text-xl font-semibold mb-4">About</h3>
          <ul className="space-y-2 text-gray-300">
            <li>About Us</li>
            <li>Careers</li>
            <li>Contact Us</li>
            <li>Blog</li>
            <li>Investors</li>
          </ul>
        </div>

        {/* Discover */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Discover Learning</h3>
          <ul className="space-y-2 text-gray-300">
            <li>Get the App</li>
            <li>Teach on Platform</li>
            <li>Plans and Pricing</li>
            <li>Affiliate</li>
            <li>Help and Support</li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Legal & Accessibility</h3>
          <ul className="space-y-2 text-gray-300">
            <li>Accessibility Statement</li>
            <li>Privacy Policy</li>
            <li>Sitemap</li>
            <li>Terms</li>
          </ul>
        </div>
      </div>

      {/* Socials */}
      <div className="bg-gray-800 py-6">
        <div className="flex justify-center space-x-6">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="w-6 h-6 hover:text-blue-500 transition" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="w-6 h-6 hover:text-blue-400 transition" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="w-6 h-6 hover:text-blue-600 transition" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="w-6 h-6 hover:text-pink-500 transition" />
          </a>
        </div>
        <p className="mt-4 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} YourPlatformName. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
