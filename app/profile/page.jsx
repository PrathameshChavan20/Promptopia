"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@/components/Profile";
import { toast } from "react-hot-toast";
import { storage } from "@/utils/firebaseAdmin";
import { ref, deleteObject } from "firebase/storage";

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        const fileRef = ref(storage, post.locationPath);
        await deleteObject(fileRef);
        const response = await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        if (response.ok) {
          const Myposts = posts.filter((p) => p.id !== post._id);
          setPosts(Myposts);

          router.push("/");
          toast.success("Post deleted successfully.", { duration: 5000 });
        }
      } catch (err) {
        console.log(err);
        toast.error("Error deleting post! Try again later.", {
          duration: 5000,
        });
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
  }, [session?.user.id]);

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
