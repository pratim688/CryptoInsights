const AllBlogSkeletonLoader = () => {
  return (
    <div className="container mx-auto px-4 sm:px-8 lg:px-40 mt-6">
      {/* First Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <div className="md:w-1/2">
          <div className="w-full bg-gray-200 h-64 mb-4 md:mb-0 animate-pulse"></div>
        </div>
        <div className="md:w-1/2 md:pl-8">
          <div className="h-6 bg-gray-200 w-3/4 mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 w-5/6 mb-4 animate-pulse"></div>
          <div className="flex items-center mb-4">
            <div className="h-4 bg-gray-200 w-20 animate-pulse"></div>
            <div className="h-4 bg-gray-200 w-8 mx-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 w-24 animate-pulse"></div>
            <div className="h-4 bg-gray-200 w-8 mx-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 w-20 animate-pulse"></div>
          </div>
          <div className="h-4 bg-blue-200 w-32 animate-pulse"></div>
        </div>
      </div>

      {/* Top Performers Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="h-6 bg-gray-200 w-2/3 animate-pulse"></div>
        <div className="h-4 bg-blue-200 w-16 animate-pulse"></div>
      </div>

      {/* Grid of Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Array(3)
          .fill(0)
          .map((_, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="w-full bg-gray-200 h-48 animate-pulse"></div>
              <div className="p-4">
                <div className="h-5 bg-gray-200 w-3/4 mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 w-full mb-4 animate-pulse"></div>
                <div className="flex items-center mb-4">
                  <div className="h-4 bg-gray-200 w-16 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 w-6 mx-2 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 w-20 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 w-6 mx-2 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 w-16 animate-pulse"></div>
                </div>
                <div className="h-4 bg-blue-200 w-28 animate-pulse"></div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AllBlogSkeletonLoader;
