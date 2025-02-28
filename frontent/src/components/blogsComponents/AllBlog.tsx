import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import BlogSmallCard from "./BlogSmallCard";
import BlogBigCard from "./BlogBigCard";
import AllBlogSkeletonLoader from "./AllBlogsSkeletonLoader";
import TopSection from "./TopSection";
import Ads from "./Ads";
import { Blog } from "@/utils/types";

type BlogsByCategory = {
  [category: string]: Blog[];
};
const AllBlog = () => {
  const [blogsByCategory, setBlogsByCategory] = useState<BlogsByCategory>({});
  const [loading, setLoading] = useState(true);
  const [limit] = useState(4);
  const [page] = useState(1);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, number>>({});

  const allBlogs = Object.values(blogsByCategory).flat();
  // Define the categories
  const categories = [
    "latest",
    "press-release",
    "coins",
    "wallets",
    "blockchain",
  ];

  useEffect(() => {
    fetchBlogsByCategories();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Blogs - Checkout our latest Blogs";
  }, []);

  const fetchBlogsByCategories = async () => {
    setLoading(true);

    try {
      const blogsData:Record<string, Blog[]> = {};
      // Fetch blogs for each category
      await Promise.all(
        categories.map(async (category) => {
          const response = await axios.get(
            `${
              import.meta.env.VITE_API_URL
            }/v1/blog/user/getblogs?category=${category}&limit=${limit}&page=${page}`
          );
          if (response.status === 200) {
            blogsData[category] = response.data.blogs; // Assuming `blogs` is the key for blogs in the response
          }
        })
      );
      console.log(blogsData);

      setBlogsByCategory(blogsData); // Store blogs by category
    } catch (error) {
      console.error("Error fetching blogs by category:", error);
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
      location.pathname === "/blogs"
        ? "All"
        : pathCategory
        ? pathCategory.charAt(0).toUpperCase() + pathCategory.slice(1)
        : "All";

    return (
      <div className="flex items-center gap-10 max-md:gap-4 dropdown-menu md:px-1 lg:px-28 px-28">
        {categories.map((category) => (
          <Link
            key={category}
            to={
              category === "All"
                ? "/blogs"
                : `/blogs/category/${category.toLowerCase()}`
            }
            className={`text-black px-5 py-2 my-4 rounded-md ${
              activeCategory.toLowerCase() === category.toLowerCase()
                ? "bg-primaryCyan"
                : "bg-white"
            }`}
          >
            {category}
          </Link>
        ))}
      </div>
    );
  };

  
  const handleLoadMore = (category:string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: (prev[category] || 0) + 4,
    }));
  };
  const categoryBackgrounds:Record<string, string>  = {
    bitcoin: "",
    "press-release":
      "linear-gradient(to right, rgba(219, 234, 254, 0.6), rgba(255, 237, 213, 0.6))",
    technology: "",
    wallets:
      "linear-gradient(to right, rgba(255, 237, 213, 0.6), rgba(219, 234, 254, 0.6))",
  };

  return (
    <>
      <section className="font-poppins">
        <div className="">
          <div className="container mx-auto font-alata px-4 sm:px-8">
            <div className="overflow-x-auto whitespace-nowrap py-4 bg-gradient-to-r from-white via-orange-100/60 to-white">
              <BlogsNavigation />
            </div>
          </div>
        </div>
        {loading ? (
          <AllBlogSkeletonLoader />
        ) : (
          <>
            <TopSection blogs={allBlogs} />
            {categories.map((category, index) => (
              <>
                <div
                  key={index}
                  style={{
                    background: categoryBackgrounds[category],
                    // padding: "20px",
                    width: "100vw",
                  }}
                >
                  <div className="mx-auto container lg:px-40 px-4 mb-8 mt-6">
                    <h2 className="text-4xl font-bold text-center mb-8">
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </h2>

                    <div className="items-start md:items-center justify-between">
                      {blogsByCategory[category] &&
                        blogsByCategory[category].length > 0 && (
                          <>
                            <BlogBigCard
                              blog={blogsByCategory[category][0]}
                              index={index}
                            />
                            <div
                              className={`grid gap-16 ${
                                loading
                                  ? "grid-cols-1"
                                  : "grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3"
                              }`}
                            >
                              {blogsByCategory[category]
                                .slice(1, expandedCategories[category] || limit)
                                .map((blog:any) => (
                                  <BlogSmallCard
                                    key={blog.blog_id}
                                    blog={blog}
                                  />
                                ))}
                            </div>
                          </>
                        )}
                    </div>
                    {blogsByCategory[category] &&
                      blogsByCategory[category].length >
                        (expandedCategories[category] || limit) && (
                        <button
                          className="mt-4 px-4 py-2 bg-primaryCyan text-white rounded-md"
                          onClick={() => handleLoadMore(category)}
                        >
                          Load More
                        </button>
                      )}                 
                  </div>
                </div>
                {(index + 1) % 3 === 0 && index !== 0 && (
                  <Ads
                    category={category}
                    layout={index % 2 === 0 ? "left" : "right"}
                    bgColor={
                      index % 2 === 0 ? "bg-cyan-100/50" : "bg-[#FFF6EB]"
                    }
                  />
                )}
              </>
            ))}
          </>
        )}
      </section>
    </>
  );
};

export default AllBlog;
