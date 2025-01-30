import React from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { RootState } from "@/Redux/store";
import { useSelector } from "react-redux";
import { FaCircleUser } from "react-icons/fa6";

const Header: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <header className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg sticky top-0 z-50 lg:pl-20">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Blog Title */}
        <Link to={"/"}>
          <h1 className="text-3xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500 hover:from-yellow-500 hover:to-yellow-300 transition-all duration-300">
            Crypto<span className="text-white">Insights</span>
          </h1>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-8">
          <Link
            to="/"
            className="text-white font-medium hover:text-yellow-300 transition-colors"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-white font-medium hover:text-yellow-300 transition-colors"
          >
            About
          </Link>
          <Link
            to="/blogs"
            className="text-white font-medium hover:text-yellow-300 transition-colors"
          >
            Blogs
          </Link>
          <Link
            to="/contact"
            className="text-white font-medium hover:text-yellow-300 transition-colors"
          >
            Contact
          </Link>
        </nav>

        {/* User Actions */}
        <div className="flex items-center space-x-4">
          <Link to={user ? "/user/create-blog" : "/auth/signin"}>
            <Button variant="secondary" className="bg-yellow-400 text-black hover:bg-yellow-500 transition-all">
              + Create Post
            </Button>
          </Link>

          {user && (
            <Link to={"/user/dashboard/blogs"}>
              <FaCircleUser className="h-8 w-8 text-white hover:text-yellow-300 transition-all" />
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            className="text-white focus:outline-none focus:ring focus:ring-yellow-300 p-2 rounded-md hover:bg-white/10"
            aria-label="Open Menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
