import React, { useEffect, useState } from "react";
import axios from "axios";

const WebinarPage = () => {
  const [webinars, setWebinars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWebinars = async () => {
        try {
          const res = await axios.get("http://localhost:8000/api/v1/");
          setWebinars(res.data || []); // <-- important fix
        } catch (error) {
          console.error("Error fetching webinars:", error);
        } finally {
          setLoading(false);
        }
      };

    fetchWebinars();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 p-8 mt-20">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
        Upcoming Webinars
      </h1>

      {loading ? (
        <div className="text-center text-xl text-gray-600">Loading webinars...</div>
      ) : webinars.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {webinars.map((webinar) => (
            <div
              key={webinar._id}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-2xl font-semibold text-blue-600 mb-2">
                  {webinar.title}
                </h2>
                <p className="text-gray-700 mb-4">{webinar.description}</p>

                <div className="text-gray-600 space-y-1">
                  <p><span className="font-semibold">Teacher:</span> {webinar.teacherName}</p>
                  <p><span className="font-semibold">Date:</span> {new Date(webinar.date).toLocaleDateString()}</p>
                  <p><span className="font-semibold">Time:</span> {webinar.time}</p>
                </div>
              </div>

              <a
                href={webinar.meetingLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Join Webinar
              </a>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-xl text-gray-600">No webinars available currently.</div>
      )}
    </div>
  );
};

export default WebinarPage;
