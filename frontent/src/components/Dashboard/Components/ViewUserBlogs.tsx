import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ViewUserBlogs = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogHistory = async () => {
      setLoading(true);
      try {
        const result = await axios.get(
          `${import.meta.env.VITE_API_URL}/v1/blog/user-blog-history`,
          { withCredentials: true }
        );
        setBlogs(result.data.Blogs);
        setError(null);
      } catch (error) {
        setError("Failed to fetch blogs. Please try again.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogHistory();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        const response = await axios.delete(
          `${import.meta.env.VITE_API_URL}/v1/blog/deleteblog/${id}`
        );
        if (response.status === 200) {
          alert("Blog deleted successfully!");
          setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.blog_id !== id));
        }
      } catch (error) {
        console.error("Failed to delete the blog.");
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        Your Blogs
      </h1>

      {loading && (
        <p className="text-center text-gray-500 animate-pulse">Loading...</p>
      )}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && blogs.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 shadow-md rounded-lg">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left">Title</th>
                <th className="px-6 py-3 text-left">Description</th>
                <th className="px-6 py-3 text-left">Last Updated</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {blogs.map((blog) => (
                <tr key={blog._id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-3">{blog.title}</td>
                  <td className="px-6 py-3">{blog.des}</td>
                  <td className="px-6 py-3">{new Date(blog.updatedAt).toLocaleString()}</td>
                  <td className="px-6 py-3 flex justify-center space-x-3">
                    <Link
                      to={`/user/dashboard/editblog/${blog.blog_id}`}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(blog.blog_id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && !error && blogs.length === 0 && (
        <p className="text-center text-gray-500">No blogs found.</p>
      )}
    </div>
  );
};

export default ViewUserBlogs;
