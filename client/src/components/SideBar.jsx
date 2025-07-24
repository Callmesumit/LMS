import { ChartColumnBig, FolderPlus } from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";

function SideBar() {
  const navItems = [
    {
      label: "Dashboard",
      icon: <ChartColumnBig size={20} />,
      path: "/admin/dashboard",
    },
    {
      label: "Courses",
      icon: <FolderPlus size={20} />,
      path: "/admin/course",
    },
  ];

  return (
    <aside className="bg-gray-800 w-64 h-screen hidden md:flex flex-col sticky top-0 shadow-md">
      <div className="py-8 px-6">
        <h2 className="text-white text-2xl font-semibold tracking-wide mb-10">
          Admin Panel
        </h2>

        <nav className="flex flex-col space-y-4" role="navigation" aria-label="Sidebar Navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-lg font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white shadow"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`
              }
              it 
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
}

export default SideBar;
