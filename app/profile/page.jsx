"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@/components/Profile";

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const handleEdit = (post) => {
    router.push("/update-prompt?id=" + post._id);
  };
  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );
    if (hasConfirmed) {
      try {
        const response = await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });
        const Myposts = posts.filter((p) => {
          p.id !== post._id;
        });
        setPosts(Myposts);
        if (response.ok) {
          router.push("/");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  const fetchPosts = async () => {
    const response = await fetch(`/api/users/${session?.user.id}/posts`);
    const data = await response.json();
    setPosts(data); // Expecting this to be an array
  };

  useEffect(() => {
    if (session?.user.id) fetchPosts();
  }, []);
  return (
    <div>
      <Profile
        name={session?.user?.name}
        desc="Welcome to your personlized profile page."
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
};
export default MyProfile;
