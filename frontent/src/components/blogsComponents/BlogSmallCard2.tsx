
import PropTypes from 'prop-types';
import { IoHeart } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { FaArrowRightLong } from "react-icons/fa6";



// Helper function to format date as "Month Date, Year"
const formatDate = (dateString: Date) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long", // "short" | "numeric" also valid
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
};

const BlogSmallCard2 = ({ blog }:any) => {
  return (
    <div className="flex flex-col items-start gap-2">
      {/* Image with fixed height, maintaining aspect ratio */}
      <img 
        className="w-full h-48 object-cover rounded-md" 
        src={blog?.banner} 
        alt={blog?.title} 
      />
      <Link to={`/blog/${blog?.blog_id}`} className="text-xl font-semibold line-clamp-1">{blog?.title}</Link>
      <p className='text-sm line-clamp-3'>{blog?.des}</p>

      <div className='flex items-center justify-between gap-3'>
        <h1 className='text-sm'>{blog?.author?.name}</h1>
        <h1 className='text-gray-300'>|</h1>
        <h1 className='text-sm'>{formatDate(blog?.updatedAt)}</h1> 
        <h1 className='text-gray-300'>|</h1>
        <h1 className='text-sm flex items-center gap-1'><span className='text-primaryCyan'>< IoHeart /></span>{blog?.activity?.total_likes}</h1>
      </div>

      <Link to={`/blog/${blog?.blog_id}`} className='flex items-center gap-2'>
      Learn More 
      <span className='transition-transform transform hover:translate-x-2 duration-300'>
        <FaArrowRightLong />
      </span>
    </Link>
    </div>
  )
}

BlogSmallCard2.propTypes = {
  blog: PropTypes.shape({
    banner: PropTypes.string,
    title: PropTypes.string,
    des: PropTypes.string,
    author: PropTypes.shape({
      name: PropTypes.string,
    }),
    updatedAt: PropTypes.string,
  }).isRequired,
}

export default BlogSmallCard2