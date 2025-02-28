import { useState } from "react";
import axios from "axios";
import { IoHeart } from "react-icons/io5";

const LikeButton = ({ blogId, initialLiked = false, initialLikeCount = 0 }:any) => {
  const [liked, setLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [showAlreadyLiked, setShowAlreadyLiked] = useState(false);

  const toggleLike = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/v1/blog/${blogId}/toggle-like`
      );

      if (response.status === 200 && response.data) {
        const { message, totalLikes, hasLiked } = response.data;

        if (hasLiked) {
          console.log(message); 
          setLiked(true); 
          setLikeCount(totalLikes); 

          // show the already liked message 
          setShowAlreadyLiked(true);
          setTimeout(() => {
            setShowAlreadyLiked(false);
          }, 4000); // 4 seconds
        }
      }
    } catch (err) {
      console.error("Failed to toggle like:", err);
    }
  };

  return (
    <div
      className="px-2 py-1 rounded-md flex items-center gap-1 cursor-pointer relative"
      onClick={toggleLike}
    >
      <span className={`text-xl ${liked ? "text-primaryCyan" : "text-gray-500"}`}>
        <IoHeart />
      </span>
      <span>{likeCount || 0}</span>
      <div
        className="absolute top-0 left-full flex items-center text-cyan-500 text-sm ml-1 mt-1.5 transition-opacity duration-200"
        style={{ minWidth: "100px", opacity: showAlreadyLiked ? 1 : 0 }}
      >
       
      </div>
    </div>
  );
};

export default LikeButton;