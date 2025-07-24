import React, { useState } from "react";

const students = [
  { id: 1, name: "John Doe", progress: "80%" },
  { id: 2, name: "Jane Smith", progress: "50%" },
  { id: 3, name: "Michael Brown", progress: "90%" },
];

const tabs = [
  { key: "courses", label: "Add New Course" },
  { key: "upload", label: "Upload Materials" },
  { key: "quizzes", label: "Create Quizzes" },
  { key: "students", label: "View Enrolled Students" },
  { key: "progress", label: "Track Student Progress" },
  { key: "comments", label: "Moderate Comments" },
];

const InstructorPanel = () => {
  const [activeTab, setActiveTab] = useState("courses");

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white">
        <div className="p-6 text-2xl font-extrabold border-b border-gray-700">
          Instructor Panel
        </div>
        <ul className="p-4 space-y-2">
          {tabs.map((tab) => (
            <li
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`p-3 rounded-lg cursor-pointer transition duration-200 ${
                activeTab === tab.key
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-700"
              }`}
            >
              {tab.label}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-8 overflow-y-auto">
        {activeTab === "courses" && <AddCourse />}
        {activeTab === "upload" && <UploadMaterials />}
        {activeTab === "quizzes" && <CreateQuizzes />}
        {activeTab === "students" && <ViewStudents />}
        {activeTab === "progress" && <TrackProgress />}
        {activeTab === "comments" && <ModerateComments />}
      </main>
    </div>
  );
};

// Individual Tab Components
const AddCourse = () => (
  <section className="space-y-6 max-w-3xl">
    <h2 className="text-3xl font-bold text-gray-800">Add New Course</h2>
    <form className="space-y-5 bg-white p-6 rounded-lg shadow">
      <InputField label="Course Title" placeholder="Enter course title" />
      <TextArea label="Description" placeholder="Enter course description" />
      <SelectField
        label="Category"
        options={["Web Development", "Data Science", "Machine Learning", "Design"]}
      />
      <SubmitButton text="Add Course" />
    </form>
  </section>
);

const UploadMaterials = () => (
  <section className="space-y-6 max-w-3xl">
    <h2 className="text-3xl font-bold text-gray-800">Upload Materials</h2>
    <form className="space-y-5 bg-white p-6 rounded-lg shadow">
      <FileUpload label="Upload Video" />
      <FileUpload label="Upload Documents" />
      <SubmitButton text="Upload" />
    </form>
  </section>
);

const CreateQuizzes = () => (
  <section className="space-y-6 max-w-3xl">
    <h2 className="text-3xl font-bold text-gray-800">Create Quizzes</h2>
    <form className="space-y-5 bg-white p-6 rounded-lg shadow">
      <InputField label="Quiz Title" placeholder="Enter quiz title" />
      <TextArea label="Question 1" placeholder="Enter question" rows="2" />
      <InputField
        label="Answer Choices"
        placeholder="Enter choices (comma separated)"
      />
      <SubmitButton text="Create Quiz" />
    </form>
  </section>
);

const ViewStudents = () => (
  <section>
    <h2 className="text-3xl font-bold text-gray-800 mb-6">
      Enrolled Students
    </h2>
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-200 text-left">
          <tr>
            <th className="px-6 py-3 text-sm font-semibold">Name</th>
            <th className="px-6 py-3 text-sm font-semibold">Progress</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id} className="border-t">
              <td className="px-6 py-4">{student.name}</td>
              <td className="px-6 py-4">{student.progress}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>
);

const TrackProgress = () => (
  <section>
    <h2 className="text-3xl font-bold text-gray-800">Track Student Progress</h2>
    <p className="mt-10 text-gray-600 italic">Progress data coming soon...</p>
  </section>
);

const ModerateComments = () => (
  <section>
    <h2 className="text-3xl font-bold text-gray-800">Moderate Comments</h2>
    <p className="mt-10 text-gray-600 italic">Comment moderation panel coming soon...</p>
  </section>
);

// Reusable Components
const InputField = ({ label, placeholder }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type="text"
      placeholder={placeholder}
      className="mt-2 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

const TextArea = ({ label, placeholder, rows = 4 }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <textarea
      placeholder={placeholder}
      rows={rows}
      className="mt-2 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

const SelectField = ({ label, options }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <select className="mt-2 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
      {options.map((opt) => (
        <option key={opt}>{opt}</option>
      ))}
    </select>
  </div>
);

const FileUpload = ({ label }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type="file"
      className="mt-2 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

const SubmitButton = ({ text }) => (
  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition">
    {text}
  </button>
);

export default InstructorPanel;
