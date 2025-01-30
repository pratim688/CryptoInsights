import PropTypes from "prop-types";
import { IoHeart } from "react-icons/io5";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";

// Helper function to format date as "Month Date, Year"
const formatDate = (dateString:any) => {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options); // You can change 'en-US' to other locales if needed
};

const BlogSmallCard = ({ blog }:any) => {
  return (
    <div className="flex flex-col lg:flex-col md:flex-row-reverse sm:flex-col items-start gap-5 lg:gap-0 mt-4">
    {/* Image with fixed height, maintaining aspect ratio */}
    <div id="imagediv" className="flex flex-[0.3] lg:mx-0 md:mx-4">
      <img
        className="flex lg:w-96 lg:h-52 w-full md:h-48 md:w-full object-cover rounded-md md:mt-4"
        src={blog?.banner}
        alt={blog?.title}
      />
    </div>
  
    <div
      id="contentdiv"
      className="flex flex-[0.7] flex-col gap-2 my-1 mt-2"
    >
      <div className="flex items-center gap-2">
        {blog.tags?.map((tag:any) => (
          <span
            key={tag}
            className="flex items-center flex-row text-gray-600 bg-gray-200 px-2 rounded-md text-sm"
          >
            {tag.charAt(0).toUpperCase() + tag.slice(1)}
          </span>
        ))}
      </div>
  
      <Link
        to={`/blog/${blog?.blog_id}`}
        className="text-xl font-semibold line-clamp-1"
      >
        {blog?.title}
      </Link>
      <p className="text-sm md:line-clamp-3 line-clamp-2 text-gray-600">
        {blog?.des}
      </p>
  
      <div className="flex items-center lg:flex-row gap-3 md:mx-0">
        <h1 className="text-sm">{blog?.author?.name}</h1>
        <h1 className="text-gray-300">|</h1>
        <h1 className="text-sm">{formatDate(blog?.updatedAt)}</h1>
        <h1 className="text-gray-300">|</h1>
        <h1 className="text-sm flex items-center gap-1">
          <span className="text-primaryCyan">
            <IoHeart />
          </span>
          {blog?.activity?.total_likes}
        </h1>
      </div>
  
      <Link
        to={`/blog/${blog?.blog_id}`}
        className="flex items-center gap-2 mt-3"
      >
        Learn More
        <span className="transition-transform transform hover:translate-x-2 duration-300">
          <FaArrowRightLong />
        </span>
      </Link>
    </div>
  </div>
  
  );
};

BlogSmallCard.propTypes = {
  blog: PropTypes.shape({
    banner: PropTypes.string,
    title: PropTypes.string,
    des: PropTypes.string,
    author: PropTypes.shape({
      name: PropTypes.string,
    }),
    updatedAt: PropTypes.string,
  }).isRequired,
};

export default BlogSmallCard;
