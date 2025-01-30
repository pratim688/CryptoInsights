import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
//import EditorJsHtml from "editorjs-html";
// import { IoHeart } from "react-icons/io5";
// import { IoCheckmarkCircle } from "react-icons/io5"; // Import the tick mark icon
import LikeButton from "./LikeButton";

const SingleBlog = () => {
  const { blog_id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //const editorJsHtml = EditorJsHtml(); // Initialize the parser

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${blog?.title} - Checkout our latest Blogs`;
  }, []);

  useEffect(() => {
    fetchBlog();
  }, [blog_id]);

  const fetchBlog = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/v1/blog/getblogs/${blog_id}`
      );
      if (response.status === 200) {
        const { likedOrNot, activity, ...blogData } = response.data;
        setBlog({
          ...blogData,
          likedOrNot,
          totalLikes: activity?.total_likes || 0,
        });
      }
      console.log(blog)
    } catch (err) {
      setError("Failed to fetch blog data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading blog...</p>;
  if (error) return <p>{error}</p>;

  // Convert Editor.js content to HTML
  // const contentHtml = blog?.content.map((block) =>
  //   editorJsHtml.parse(block).join("")
  // );

  //date formatter
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options); // You can change 'en-US' to other locales if needed
  };

  return (
    <div className="container mx-auto p-4 lg:px-40">
      <div className="flex justify-center gap-2 flex-wrap">
        {blog?.tags?.map((tag, index) => (
          <span key={index} className="px-3 py-1 text-xl capitalize">
            {tag}
          </span>
        ))}
      </div>
      <h1 className="lg:text-5xl text-3xl text-center mt-4 my-5">
        {blog?.title}
      </h1>

      <div className="flex flex-col md:flex-row items-center justify-center gap-5 my-5">
        <h1 className="text-primaryCyan bg-cyan-50 px-2 py-1 rounded-md">
          {blog?.author?.name}
        </h1>
        <div className="block md:hidden bg-gray-400 w-full h-[1px]"></div>
        <div className="hidden md:block">|</div>
        <h1 className="px-2 py-1 rounded-md">{formatDate(blog?.updatedAt)}</h1>
        <div className="hidden md:block">|</div>
        <div className="block md:hidden bg-gray-400 w-full h-[1px]"></div>
      

        {/* dynamic liking  */}
        <LikeButton
          blogId={blog?.blog_id}
          initialLiked={blog?.likedOrNot}
          initialLikeCount={blog?.totalLikes}
        />
      </div>

      <div className="flex justify-center my-5">
        <img src={blog?.banner} className="rounded-lg w-full" alt="" />
      </div>

      <h1 className="text-center">{blog?.des}</h1>

      <div className="bg-gray-400 w-full h-[1px] my-5"></div>

    
      <div className="mt-8 prose prose-sm sm:prose-lg max-w-none px-4 md:px-4 lg:px-6">
       {blog.content?.[0]?.blocks.map((item, index) => {
  switch (item.type) {
    case "paragraph":
      return (
        <p
          key={index}
          className="mb-6 leading-relaxed text-gray-700 text-lg [&>a]:text-cyan-600 [&>a]:no-underline [&>a]:border-b [&>a]:border-cyan-500 [&>a]:hover:text-cyan-700 [&>a]:transition-colors"
          dangerouslySetInnerHTML={{
            __html: item.data?.text || "",
          }}
        />
      );

    case "header":
      return (
        <h2
          key={index}
          className="text-2xl font-bold mb-4 mt-8 text-gray-900 [&>a]:text-cyan-600 [&>a]:no-underline [&>a]:hover:text-cyan-700"
          dangerouslySetInnerHTML={{
            __html: item.data?.text || "",
          }}
        />
      );

    case "image":
      return (
        <figure key={index} className="my-12">
          <div className="overflow-hidden rounded-lg shadow-lg bg-gray-50">
            <img
              src={item.data?.file?.url || ""}
              alt={item.data?.file?.caption || ""}
              className="w-full h-full object-cover"
            />
          </div>
          {item.data?.file?.caption && (
            <figcaption className="mt-3 text-gray-500 text-center text-lg">
              {item.data.file.caption}
            </figcaption>
          )}
        </figure>
      );

    case "list":
      return (
        <ul key={index} className="mb-6">
          {item.data?.items?.map((listItem, listIndex) => (
            <li
              key={listIndex}
              className="text-gray-700 text-lg list-disc mb-4 ml-5"
              dangerouslySetInnerHTML={{
                __html: listItem.content || "",
              }}
            />
          ))}
        </ul>
      );

    default:
      // Handle unexpected or unsupported block types
      return (
        <div key={index} className="mb-6 text-gray-700">
          <strong>Unsupported block type:</strong> {item.type}
        </div>
      );
  }
})}
      </div>

      <div></div>
    </div>
  );
};

export default SingleBlog;