"use client";
import { useEffect, useState } from "react";
import PromptsCard from "@/components/PromptsCard";

// Corrected component name and removed async
const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data?.map((post) => (
        <PromptsCard
          post={post}
          key={post._id}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  // Initialized with an empty array
  const [allPosts, setAllPosts] = useState([]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();
    setAllPosts(data); // Expecting this to be an array
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search the tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required={true}
          className="search_input peer"
        />
        <button
          type="button"
          className="!absolute right-1 top-1 select-none rounded bg-blue-gray-500 py-2 px-4 text-center align-middle font-inter text-xs font-bold uppercase text-white shadow-md shadow-blue-gray-500/20 transition-all hover:shadow-lg hover:shadow-blue-gray-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none bg-gray-600"
          onClick={() => setSearchText("")}
        >
          Clear
        </button>
        
      </form>
      {/* Corrected component usage */}
      <PromptCardList data={allPosts} />
    </section>
  );
};

export default Feed;
