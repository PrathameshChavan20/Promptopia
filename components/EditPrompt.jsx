"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@/components/Form";
import { toast } from "react-hot-toast";
import { Suspense } from "react";

const EditPrompt = () => {
  const router = useRouter();
  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "" });
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  const [file, setFile] = useState(null);
  const handleFileChange = (file) => {
    setFile(file);
  };

  useEffect(() => {
    const getPromptDetails = async () => {
      const res = await fetch(`/api/prompt/${promptId}`);
      const data = await res.json();
      setPost({
        prompt: data.prompt,
        tag: data.tag,
        contentType: data.contentType,
        contentURL: data.contentURL,
      });
    };
    if (promptId) getPromptDetails();
  }, [promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (!promptId) return toast.error("Prompt id is missing!");
    try {
      const formData = new FormData();
      if (!file) {
        formData.append("prompt", post.prompt);
        formData.append("tag", post.tag);
      } else {
        formData.append("prompt", post.prompt);
        formData.append("tag", post.tag);
        formData.append("file", file);
        formData.append("postContentURL", post.contentURL);
      }

      const response = await fetch("/api/prompt/" + promptId, {
        method: "PATCH",
        body: formData,
      });
      if (response.ok) {
        router.push("/");
        toast.success("Changes made successfully.", {
          duration: 5000,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Suspense>
      <Form
        type="Edit"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleFileChange={handleFileChange}
        handleSubmit={updatePrompt}
      />
    </Suspense>
  );
};

export default EditPrompt;
