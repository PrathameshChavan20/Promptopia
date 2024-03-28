"use client";
import { toast } from "react-hot-toast";
import { useState } from "react";
import GenerationPromptForm from "@/components/GenerationPromptForm";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const CreateImage = () => {
  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "" });
  const [imgRes, setImgRes] = useState(null);
  const [imageSkeleton, setImageSkeleton] = useState(false);
  const [blobData, setBlobData] = useState(null);
  const [sharing, setSharing] = useState(false);

  const { data: session } = useSession();
  const router = useRouter();
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
      setBlobData(blob);
      const imageURL = URL.createObjectURL(blob);
      setImgRes(imageURL);
      setImageSkeleton(true);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleSharePost = async () => {
    try {
      let data = null;
      setSharing(true);
      if (imgRes) {
        const formData = new FormData();
        formData.append("file", blobData);
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
          tag: "text2image",
          contentURL: data ? data.url : null,
          contentType: contentType,
          locationPath: data.locationPath,
        }),
      });

      toast.success("Post created succesfully.", { duration: 5000 });
      router.push("/");
    } catch (error) {
      console.log(error);
      toast.error("Error during making the post", { duration: 5000 });
    } finally {
      setSharing(false);
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
      handleSharePost={handleSharePost}
      sharing={sharing}
    />
  );
};

export default CreateImage;
