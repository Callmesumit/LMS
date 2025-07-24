// src/ContactPage.jsx

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Laptop, MailOpen, MapPin, PhoneCall, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/message",
        formData
      );
      alert(res.data.message);
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error(error);
      alert("Failed to send message");
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 px-6 py-12 mt-14">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
        Contact Us
      </h1>

      {/* Intro Section */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="text-2xl font-semibold text-blue-600 mb-2">
          Let Us Help You
        </h2>
        <p className="text-gray-700">
          Our platform is built on the principles of innovation, quality, and
          inclusivity, aiming to provide a seamless learning experience for
          everyone.
        </p>
      </div>

      {/* Contact Cards */}
      <div className="flex flex-wrap justify-center gap-6 mb-16">
        {/* Location */}
        <div className="border w-80 rounded-lg p-6 bg-white shadow">
          <h3 className="flex items-center justify-center gap-2 font-bold text-lg text-gray-800">
            <MapPin /> Main Office
          </h3>
          <p className="text-center text-gray-600 mt-2">
            2684 Vijay Nagar, Indore, MP, India
          </p>
          <Link to="mailto:https://www.waze.com/en-GB/live-map/directions/in/mp/indore/vijay-nagar-square?to=place.EjFWaWpheSBOYWdhciBTcXVhcmUsIEluZG9yZSwgTWFkaHlhIFByYWRlc2gsIEluZGlhIi4qLAoUChIJXZzVDKoCYzkRK-oTfLZq71cSFAoSCfsGNECvAmM5EauLfxFLg1Bb">
            <Button className="h-9 mt-4 w-full">Get In Touch</Button>
          </Link>
        </div>



        {/* Email */}
        <div className="border w-80 rounded-lg p-6 bg-white shadow">
          <h3 className="flex items-center justify-center gap-2 font-bold text-lg text-gray-800">
            <MailOpen /> Email Address
          </h3>
          <p className="text-center text-gray-600 mt-2">
            sumitdevda6@gmail.com
          </p>
          <Link to="mailto:sumitdevda6@gmail.com">
            <Button className="h-9 mt-4 w-full">Get In Touch</Button>
          </Link>
        </div>

        {/* Phone */}
        <div className="border w-80 rounded-lg p-6 bg-white shadow">
          <h3 className="flex items-center justify-center gap-2 font-bold text-lg text-gray-800">
            <PhoneCall /> Phone Number
          </h3>
          <p className="text-center text-gray-600 mt-2">+91 9516787083</p>
          <Link to="/contact">
            <Button className="h-9 mt-4 w-full">Contact Us Today</Button>
          </Link>
        </div>

        {/* Hours */}
        <div className="border w-80 rounded-lg p-6 bg-white shadow">
          <h3 className="flex items-center justify-center gap-2 font-bold text-lg text-gray-800">
            <Clock /> Working Hours
          </h3>
          <p className="text-center text-gray-600 mt-2">
            Mon - Fri: 9:00 AM - 6:00 PM <br />
            Sat - Sun: Closed
          </p>
        </div>
      </div>

      {/* Main Form + Info */}
      <div className="flex flex-col lg:flex-row justify-between gap-12 max-w-6xl mx-auto items-center">
        {/* Info */}
        <div className="lg:w-1/2 text-gray-700">
          <h3 className="flex items-center gap-2 text-blue-600 font-semibold mb-2">
            <Laptop /> Contact Us
          </h3>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Have Questions? Don’t Hesitate to Reach Out
          </h2>
          <p className="mb-4">
            We're passionate about transforming lives through education. Founded
            with a vision to make learning accessible to all, we believe in the
            power of knowledge to unlock opportunities and shape the future.
          </p>
          {/* Google Maps Embed */}
          <div className="rounded-lg overflow-hidden mt-4 shadow">
            <iframe
              title="Our Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3670.588865179315!2d75.8849041147211!3d22.722859485100007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fdccf93c8d11%3A0x28a2f5e6c7b57f2b!2sVijay%20Nagar%2C%20Indore%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1670000000000"
              width="100%"
              height="250"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="lg:w-1/2 bg-white p-8 rounded-lg shadow"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">
            Send a Message
          </h2>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 mb-4 border rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 mb-4 border rounded"
          />
          <textarea
            name="message"
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full p-3 mb-4 border rounded h-32"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded font-semibold"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
