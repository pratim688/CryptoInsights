import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-gradient-to-b from-blue-600 to-cyan-500 text-white h-screen p-6 shadow-lg flex flex-col justify-between">
      {/* Navigation Links */}
      <nav className="space-y-4">
        <NavLink
          to="#"
          className="block px-6 py-3 rounded-lg transition-all hover:bg-white/10 hover:pl-8 duration-300"
        >
          Profile
        </NavLink>
        <NavLink
          to="/user/dashboard/blogs"
          className={({ isActive }) =>
            `block px-6 py-3 rounded-lg transition-all duration-300 ${
              isActive ? "bg-white/20 text-yellow-300" : "hover:bg-white/10 hover:pl-8"
            }`
          }
        >
          View Blogs
        </NavLink>
        <NavLink
          to="#"
          className="block px-6 py-3 rounded-lg transition-all hover:bg-white/10 hover:pl-8 duration-300"
        >
          Settings
        </NavLink>
        <NavLink
          to="/auth/signout"
          className="block px-6 py-3 rounded-lg transition-all hover:bg-red-600 hover:pl-8 duration-300"
        >
          Logout
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
