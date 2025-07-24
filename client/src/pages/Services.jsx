import React from "react";
import { Button } from "@/components/ui/button";
import {
  FaBookOpen,
  FaChalkboardTeacher,
  FaCertificate,
  FaUsers,
} from "react-icons/fa";
import { Link } from "react-router-dom";

// Services List
const services = [
  {
    title: "Online Courses",
    description:
      "Access a wide range of online courses across various subjects at your own pace. Our courses are designed to fit your schedule and learning style.",
    icon: <FaBookOpen className="w-10 h-10 text-indigo-600" />,
  },
  {
    title: "Live Webinars",
    description:
      "Join our live webinars to interact with industry experts and ask questions in real-time. Gain insights and knowledge from the comfort of your home.",
    icon: <FaChalkboardTeacher className="w-10 h-10 text-indigo-600" />,
  },
  {
    title: "Certification Programs",
    description:
      "Earn recognized certifications upon completion of our courses to enhance your resume and career prospects. Stand out in the job market!",
    icon: <FaCertificate className="w-10 h-10 text-indigo-600" />,
  },
  {
    title: "Community Support",
    description:
      "Join our vibrant community forums to connect with fellow learners, share knowledge, and collaborate on projects. Learning is more fun together!",
    icon: <FaUsers className="w-10 h-10 text-indigo-600" />,
  },
];

const testimonials = [
  {
    name: "Jane Smith",
    feedback:
      "The live webinars are incredibly engaging. I love being able to ask questions and interact with the instructors.",
  },
  {
    name: "Alice Johnson",
    feedback:
      "Earning my certification through this platform has opened up new career opportunities for me. Highly recommend!",
  },
  {
    name: "Michael Lee",
    feedback:
      "This platform made it easy to study on my own schedule. The content is high-quality and the instructors are super helpful.",
  },
  {
    name: "Fatima Khan",
    feedback:
      "As a working professional, I appreciated how flexible the courses were. I’ve already recommended it to several colleagues!",
  },
  {
    name: "Carlos Martinez",
    feedback:
      "The community forums really helped me stay motivated. It’s great to learn with others who share similar goals.",
  },
];

const faqs = [
  {
    question: "How do I enroll in a course?",
    answer:
      "You can enroll in a course by visiting our course catalog, selecting a course, and clicking the 'Enroll Now' button.",
  },
  {
    question: "What if I have questions during a course?",
    answer:
      "You can ask questions during live webinars or post them in our community forums for support from instructors and peers.",
  },
  {
    question: "Are the certifications recognized?",
    answer:
      "Yes, our certifications are recognized by industry professionals and can enhance your resume.",
  },
];

const ServicePage = () => {
  return (
    <div className="mt-16 px-6 md:px-12 lg:px-24 py-12 bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300">
      {/* Header */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
          Our Services
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover our range of services designed to empower you on your
          learning journey.
        </p>
      </section>

      {/* Services Grid */}
      <section className="grid gap-8 md:grid-cols-2">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white border rounded-xl p-6 shadow-md hover:shadow-xl transition-transform hover:scale-[1.02]"
          >
            <div className="flex items-center gap-4 mb-4">
              {service.icon}
              <h2 className="text-xl font-semibold text-gray-800">
                {service.title}
              </h2>
            </div>
            <p className="text-gray-600 mb-4">{service.description}</p>
            <Link to="/signup">
              <Button className="w-full bg-blue-600 hover:bg-blue-900 text-white">
                Learn More
              </Button>
            </Link>
          </div>
        ))}
      </section>

      {/* Testimonials */}
      <section className="mt-20">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
          What Our Learners Say
        </h2>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 shadow hover:shadow-lg transition"
            >
              <p className="text-gray-700 italic mb-4">
                “{testimonial.feedback}”
              </p>
              <p className="text-right text-indigo-600 font-semibold">
                – {testimonial.name}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-24 bg-blue-50 rounded-2xl p-10 shadow-md">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b pb-4">
              <h3 className="text-lg font-medium text-gray-800">
                {faq.question}
              </h3>
              <p className="text-gray-600 mt-1">{faq.answer}</p>
            </div>
          ))}
        </div>

      </section>

      {/* CTA */}
      <section className="text-center mt-20">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Ready to Start Learning?
        </h2>
        <p className="text-gray-600 mb-6 max-w-lg mx-auto">
          Join thousands of learners on their journey to personal and
          professional growth.
        </p>
        <Link to="/signup">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg rounded-full">
            Join Us Today
          </Button>
        </Link>
      </section>
    </div>
  );
};

export default ServicePage;
