import Image from "next/image";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
// Ensure all necessary imports are included

const PromptsCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const [copied, setCopied] = useState(null); // Changed to null for initial state
  const { data: session } = useSession();
  const pathname = usePathname();
  const handleCopy = () => {
    setCopied(post.prompt); // Assuming post is directly the post object
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(null), 3000); // Reset copied state to null
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1 flex justify-start items-center cursor-pointer">
          <Image
            src={post.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
        </div>
        <div className="flex flex-col">
          <h4 className="font-satoshi font-semibold text-gray-900">
            {post.creator.username}
          </h4>
          <p className="font-inter text-sm text-gray-900">
            {post.creator.email}
          </p>
        </div>
        <div
          className="copy_btn"
          onClick={handleCopy} // Corrected function invocation
        >
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt="copy_icon"
            width={12}
            height={12}
          />
        </div>
      </div>
      <div>
        {post?.imageURL ? (
          <img
            src={post?.imageURL}
            className="flex-center justify-center mt-5 mb-5 object-contain max-w-full"
            alt="prompt_image"
          ></img>
        ) : null}
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p
        className="font-inter text-sm text-blue-500 cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        #{post.tag}
      </p>
      {session?.user.id === post.creator._id && pathname === "/profile" && (
        <div className="flex-center gap-5 mt-4 pt-3 border-t border-gray-400">
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptsCard;
