"use client";
import { toast } from "react-hot-toast";
import { useState } from "react";
import GenerationPromptForm from "@/components/GenerationPromptForm";

const CreateImage = () => {
  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "" });
  const [imgRes, setImgRes] = useState(null);
  const [imageSkeleton, setImageSkeleton] = useState(false);
  const createSpeechFromPrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/create-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: post.prompt,
          modelURL:
            "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
        }),
      });
      if (response.status != 200) {
        const data = await response.json();
        toast.error(data.message, {
          duration: 5000,
        });
        setPost({ prompt: "" });
        setImgRes(null);
        setImageSkeleton(false);
        return;
      }

      const buffer = await response.arrayBuffer();
      const blob = new Blob([buffer], { type: "image/png" });
      const imageURL = URL.createObjectURL(blob);
      setImgRes(imageURL);
      setImageSkeleton(true);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <GenerationPromptForm
      type="Generate"
      creationType="Image"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createSpeechFromPrompt}
      imgRes={imgRes}
      imageSkeleton={imageSkeleton}
    />
  );
};

export default CreateImage;
