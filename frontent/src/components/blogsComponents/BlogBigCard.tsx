import PropTypes from "prop-types";
import { IoHeart } from "react-icons/io5";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";

// Helper function to format date as "Month Date, Year"
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
};

const BlogBigCard = ({ blog, index }) => {
  const category = blog.tags[0];
  const isEven = index % 2 !== 0;

  return (
    <div className="relative flex flex-col md:flex-row items-start  md:items-start justify-between mb-8 py-10 ">
      {/* Mobile View: Small Card Layout */}
      <div className="block lg:hidden w-full mr-4">
        <img
          src={blog.banner}
          alt={blog.title}
          className="w-full h-64 md:h-96 object-cover rounded-md mb-2 "
        />
        <div
          className={`flex flex-wrap gap-2 mb-2 md:mt-4 lg:${
            isEven ? "justify-start" : "justify-end"
          }`}
        >
          {blog.tags?.map((tag) => (
            <span key={tag} className="flex  text-gray-600 bg-gray-200 px-2 rounded-md text-sm">
              {tag.charAt(0).toUpperCase() + tag.slice(1)}
            </span>
          ))}
        </div>
        <Link
          to={`/blog/${blog.blog_id}`}
          className="text-2xl font-semibold line-clamp-1 my-2 curso"
        >
          {blog.title}
        </Link>
        <p className="text-sm line-clamp-2 text-gray-500">{blog.des}</p>
        <div className="flex items-center md:gap-5 text-sm mt-2">
          <span>{blog.author.name}</span>
          <span className="text-gray-300">|</span>
          <span>{formatDate(blog.updatedAt)}</span>
          <span className="text-gray-300">|</span>
          <span className="flex items-center gap-1">
            <IoHeart className="text-primaryCyan" />
            {blog?.activity?.total_likes}
          </span>
        </div>
        <Link
          to={`/blog/${blog.blog_id}`}
          className="flex items-center gap-2 mt-4"
        >
          Learn More
          <FaArrowRightLong className="transition-transform transform hover:translate-x-2 duration-300" />
        </Link>
      </div>

      {/* Desktop View: Big Card Layout */}
      <div
        className={`hidden lg:flex md:w-1/2 ${
          isEven ? "order-first" : "order-last"
        }`}
      >
        <img
          src={blog.banner}
          alt={blog.title}
          className="w-full mb-4 md:mb-0 object-cover rounded-md"
        />
      </div>
      <div
        className={`hidden lg:block md:w-1/2 md:pl-8 pr-5 ${
          !isEven ? "text-right" : ""
        }`}
        style={{ marginTop: "-40px" }}
      >
        <div
          className={`flex flex-wrap gap-2 mb-2 md:mt-4 ${
            isEven ? "justify-start" : "lg:justify-end"
          }`}
        >
          {blog.tags?.map((tag) => (
            <span key={tag} className="text-gray-600 text-md md:mt-7">
              {tag.charAt(0).toUpperCase() + tag.slice(1)}
            </span>
          ))}
        </div>
        <h2 className="text-3xl font-bold mb-2 truncate text-slate-800">
          {blog.title}
        </h2>
        <p className="text-gray-600 mb-4 line-clamp-2">{blog.des}</p>
        <div
          className={`flex items-center gap-2 mb-4 ${
            isEven ? "justify-start" : "justify-end"
          }`}
        >
          <span className="text-primaryCyan bg-cyan-50 text-sm px-2 rounded-md">
            {blog.author.name}
          </span>
          <span className="text-gray-400 mx-2 md:mx-0">|</span>
          <span className="text-sm">{formatDate(blog.updatedAt)}</span>
          <span className="text-gray-400 mx-2 md:mx-0">|</span>
          <h1 className="text-sm flex items-center gap-1">
            <IoHeart className="text-primaryCyan" />
            {blog?.activity?.total_likes}
          </h1>
        </div>
        <div className={`flex ${isEven ? "justify-start" : "justify-end"}`}>
          <Link
            to={`/blog/${blog.blog_id}`}
            className="flex items-center gap-2 md:mb-2"
          >
            Learn More
            <FaArrowRightLong className="transition-transform transform hover:translate-x-2 duration-300" />
          </Link>
        </div>
        {/* View All Link */}
        <Link
          to={`/blogs/category/${category.toLowerCase()}`}
          className={`absolute bottom-0 p-4 md:p-1 text-slate-700 ${
            isEven ? "right-0" : "left-0"
          }`}
        >
          View All
        </Link>
      </div>
    </div>
  );
};

BlogBigCard.propTypes = {
  blog: PropTypes.shape({
    banner: PropTypes.string,
    title: PropTypes.string,
    des: PropTypes.string,
    author: PropTypes.shape({
      name: PropTypes.string,
    }),
    updatedAt: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    activity: PropTypes.shape({
      total_likes: PropTypes.number,
    }),
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default BlogBigCard;
