"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Form from "@/components/Form";

const CreatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "" });
  const [file, setFile] = useState(null);

  const handleFileChange = (file) => {
    setFile(file);
  };
  const createPrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let data = null;
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        const response = await fetch("api/upload", {
          method: "POST",
          body: formData,
        });
        if (!response.ok) {
          toast.error("Error in file uploading...");
          setFile(null);
        }
        data = await response.json();
      }

      let contentType = data.type;

      const response2 = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag,
          contentURL: data ? data.url : null,
          contentType: contentType,
        }),
      });

      if (!response2.ok) {
        toast.error("Error in posting...");
        setPost({ prompt: "", tag: "" });
      }
      toast.success("Post created succesfully.", { duration: 5000 });
      router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
      handleFileChange={handleFileChange}
    />
  );
};

export default CreatePrompt;
