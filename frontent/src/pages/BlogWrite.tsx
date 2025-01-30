import CreateBlog from "@/components/blogsComponents/CreateBlog";



const WriteBlog: React.FC = () => {
  return (
    <div className="container mx-auto px-4">
     

      {/* Header */}
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center md:mt-22 mt-6">
        Create Your Story
        <div className="h-1 w-24 bg-blue-600 mx-auto mt-2"></div>
      </h1>

      {/* CreateBlog Component */}
      <CreateBlog />
    </div>
  );
};

export default WriteBlog;
