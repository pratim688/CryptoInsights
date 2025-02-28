import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
// import BlogSmallCard from "./BlogSmallCard";
import BlogSmallCardSkeleton from "../blogsComponents/BlogSkeletonLoader";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import BlogSmallCard2 from "./BlogSmallCard2";
import Ads2 from "./Ads2";

const BlogByCategory = () => {
  const { category } = useParams(); // Get the category from the URL parameter
  const [blogs, setBlogs] = useState([]);
  const [limit, _setLimit] = useState(9);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1); // Track total pages

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Blogs - Checkout our latest Blogs category Wise ";
  }, []);

  // Fetch blogs for the specific category
  useEffect(() => {
    fetchBlogsByCategory();
  }, [category, page]); // Run on category change or page change

  const fetchBlogsByCategory = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/v1/blog/user/getblogs?category=${category}&limit=${limit}&page=${page}`
      );
      if (response.status === 200) {
        setBlogs(response.data.blogs);
        setTotalPages(response.data.totalPages); // Update total pages
      }
    } catch (error) {
      console.error("Error fetching blogs for category:", error);
    } finally {
      setLoading(false);
    }
  };

  const BlogsNavigation = () => {
    const location = useLocation();

    // Define categories
    const categories = [
      "All",
      "Latest",
      "Press-release",
      "Coins",
      "Wallets",
      "Blockchain",
    ];

    // Get the active category from the URL
    // If the path is `/blogs`, then "All" should be highlighted.
    const pathCategory = location.pathname.split("/").pop();
    const activeCategory =
    pathCategory === "blogs" || pathCategory === undefined
      ? "All"
      : pathCategory.charAt(0).toUpperCase() + pathCategory.slice(1);
    return (
      <div className="flex items-center gap-10 max-md:gap-4 dropdown-menu ">
        {categories.map((category) => (
          <Link
            key={category}
            to={
              category === "All"
                ? "/blogs"
                : `/blogs/category/${category.toLowerCase()}`
            }
            className={`text-black px-4 py-2 my-4 rounded-md ${
              activeCategory.toLowerCase() === category.toLowerCase()
                ? "bg-cyan-400"
                : "bg-white"
            }`}
          >
            {category}
          </Link>
        ))}
      </div>
    );
  };

  // Handle page change (click on pagination buttons)
  const handlePageChange = (newPage: any) => {
    setPage(newPage);
  };

  return (
    <>
      <div className="mx-auto container px-4 lg:px-40 ">
        <div className="">
          <div className="container mx-auto font-alata px-4 sm:px-8 ">
            <div className="overflow-x-auto whitespace-nowrap py-4">
              <BlogsNavigation />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 font-poppins">
            {/* Show skeleton loaders based on the limit */}
            {[...Array(limit)].map((_, index) => (
              <BlogSmallCardSkeleton key={index} />
            ))}
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-semibold mb-4 mt-10">
              Blogs on {category?.charAt(0).toUpperCase() + category!.slice(1)}
            </h2>

            {/* Grid layout to show 3 items per row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 ">
              {blogs.length > 0 ? (
                blogs.map((blog: any) => (
                  <BlogSmallCard2 key={blog.id} blog={blog} />
                ))
              ) : (
                <p>No blogs available in this category.</p>
              )}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center gap-2 mt-16">
              <button
                className="px-4 py-1 text-primaryCyan rounded-md"
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
              >
                <IoIosArrowDropleftCircle size={32} />
              </button>

              {/* Display page numbers with adjusted padding */}
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  className={`px-3 py-1 ${
                    page === index + 1
                      ? "bg-primaryCyan text-white"
                      : "bg-white text-black"
                  } rounded-md`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              ))}

              <button
                className="px-4 py-1 text-primaryCyan rounded-md"
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
              >
                <IoIosArrowDroprightCircle size={32} />
              </button>
            </div>
          </div>
        )}

        <Ads2 bgColor="bg-[#FFF6EB]" layout="left" />
      </div>
    </>
  );
};

export default BlogByCategory;
