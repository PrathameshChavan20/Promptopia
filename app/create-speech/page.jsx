"use client";

import { toast } from "react-hot-toast";
import { useState } from "react";
import GenerationPromptForm from "@/components/GenerationPromptForm";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { spinn } from "@/components/SpinnerButton";
const CreateSpeech = () => {
  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "" });
  const [audioURL, setaudioURL] = useState("");
  const [audioSkeleton, setaudioSkeleton] = useState(false);
  const [blobData, setBlobData] = useState(null);
  const [sharing, setSharing] = useState(false);

  const { data: session } = useSession();
  const router = useRouter();

  const createSpeechFromPrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/create-speech", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: post.prompt,
          modelURL:
            "https://api-inference.huggingface.co/models/facebook/mms-tts-eng",
        }),
      });
      if (response.status != 200) {
        const data = await response.json();
        toast.error(data.message, {
          duration: 5000,
        });
        setPost({ prompt: "" });
        setaudioURL("");
        setaudioSkeleton(false);
        return;
      }
      const buffer = await response.arrayBuffer();
      const blob = new Blob([buffer], { type: "audio/mpeg" });
      setBlobData(blob);
      const audioURL = URL.createObjectURL(blob);
      setaudioURL(audioURL);
      setaudioSkeleton(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSharePost = async () => {
    try {
      let data = null;
      setSharing(true);
      if (audioURL) {
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
          tag: "text2speech",
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
      creationType="Speech"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createSpeechFromPrompt}
      audioURL={audioURL}
      audioSkeleton={audioSkeleton}
      handleSharePost={handleSharePost}
      sharing={sharing}
    />
  );
};

export default CreateSpeech;
