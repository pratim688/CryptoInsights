
const BlogSmallCardSkeleton = () => {
  return (
    <div className="flex flex-col items-start gap-2 animate-pulse">
      {/* Skeleton for Image */}
      <div className="w-full h-48 bg-gray-300 rounded-md"></div>
      
      {/* Skeleton for Title */}
      <div className="w-3/4 h-6 bg-gray-300 rounded-md mt-2"></div>
      
      {/* Skeleton for Description */}
      <div className="w-full h-4 bg-gray-300 rounded-md mt-2"></div>
      <div className="w-5/6 h-4 bg-gray-300 rounded-md mt-1"></div>

      {/* Skeleton for Author and Date */}
      <div className="flex items-center justify-between gap-3 mt-2">
        <div className="w-1/4 h-4 bg-gray-300 rounded-md"></div>
        <div className="w-1/4 h-4 bg-gray-300 rounded-md"></div>
        <div className="w-1/4 h-4 bg-gray-300 rounded-md"></div>
      </div>

      {/* Skeleton for Like Count */}
      <div className="w-1/4 h-4 bg-gray-300 rounded-md mt-2"></div>
    </div>
  );
};

export default BlogSmallCardSkeleton;
