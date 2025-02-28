import { useState } from "react";
import { Link } from "react-router-dom";
import BlogBigCard from "./BlogBigCard";
import BlogSmallCard from "./BlogSmallCard";
import AdvertisementIcon from "../../assets/AdvertisementIcon.svg";
import { Blog } from "@/utils/types";

type BlogBigCardProps = {
  blog: Blog; // blog is a single object, not an array
};
const TopSection: React.FC<BlogBigCardProps> = ({ blogs }:any) => {
  const [limit, setLimit] = useState(4);

  // Select 4 random blogs
  const randomBlogs = blogs.sort(() => 0.5 - Math.random()).slice(0, limit);

  const handleLoadMore = () => {
    setLimit((prevLimit) => prevLimit + 4); // Load more blogs in increments of 4
  };
  

  return (
    <div className="px-4 lg:px-40">
      <div className="mx-auto container">
        {/* Display the first blog as a big card */}
        <div className="bg-gradient-to-r from-white via-orange-100/60 to-white">
          {randomBlogs.length > 0 && (
            <BlogBigCard blog={randomBlogs[0]} index={1} />
          )}
        </div>
        {/* Display the remaining blogs as small cards */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-3 bg-gradient-to-r from-white via-[#93c8d42c] to-white">
          {randomBlogs.slice(1).map((blog : any, index : number) => (
            <div
              key={index}
              className="items-start md:items-center justify-between mb-8 "
            >
              <BlogSmallCard blog={blog} />
            </div>
          ))}
        </div>
        {/* Load More Button */}
        {randomBlogs.length > limit && ( // Show button if there are more blogs to load
          <button
            className="mt-4 px-4 py-2 bg-primaryCyan text-white rounded-md"
            onClick={handleLoadMore}
          >
            Load More
          </button>
        )}
        {/* View All Button */}
        {/* <Link
          to="/blogs"
          className="block md:hidden lg:hidden mt-4 px-4 py-2 bg-primaryCyan text-white rounded-md hover:bg-cyan-700 transition-colors w-full text-center"
        >
          View All
        </Link> */}

        {/* Advertisement Image */}
       </div>
        <div
          className={`mx-auto container mb-16 mt-16 rounded-md bg-[#FFF6EB]`}
        >
          <div
            className={`flex flex-col lg:flex-row-reverse items-center lg:items-start p-4 gap-6`}
          >
            {/* Image Section */}
            <div className="w-full lg:w-1/3 md:max-w-sm">
              <img
                src={AdvertisementIcon}
                alt="AdvertisementIcon"
                className="object-cover w-full h-auto rounded-md"
              />
            </div>
            {/* Content Section */}
            <div className="w-full lg:w-3/4 text-center lg:text-right mt-8">
              <h1 className="mb-4 font-poppins text-xl md:text-2xl font-medium">
                Buy Cryptocurrency With CoinDcx
              </h1>
              <p className="text-sm md:text-[15px] font-normal font-poppins text-gray-600 leading-relaxed">
                Explore how to buy and sell crypto using Binance Coin. Learn
                about its burn mechanism, and its role in top crypto exchanges
                like Binance. Learn about its burn mechanism benefits, and its
                role in top crypto exchanges.
              </p>
              <div className="mt-6 flex justify-end lg:justify-end max-md:justify-center md:justify-center">
                <Link to="#" className="">
                  <button
                    className="flex items-center space-x-2 px-6 py-1 text-lg font-semibold bg-[#16D5FF] text-white rounded-md
                       border-2 border-transparent hover:bg-white hover:text-[#16D5FF] hover:border-[#16D5FF] transition-all duration-300 ease-in-out transform hover:scale-105 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#16D5FF] focus:ring-offset-2"
                  >
                    Buy Cryptocurrency
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    
  );
};

export default TopSection;
