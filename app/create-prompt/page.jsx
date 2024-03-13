"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@/components/Form";

const CreatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "", file: null });

  const handleFileChange = (file) => {
    alert(file.name);
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      setPost({ ...post, file: reader.result });
      console.log(reader.result);
    };
    setPost({ ...post, file: file });
  };
  const createPrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // const formData = new FormData();
      // formData.append("file", post.file);
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
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
