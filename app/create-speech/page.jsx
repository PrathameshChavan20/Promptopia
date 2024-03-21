"use client";

import { toast } from "react-hot-toast";
import { useState } from "react";
import GenerationPromptForm from "@/components/GenerationPromptForm";

const CreateSpeech = () => {
  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "" });
  const [audioURL, setaudioURL] = useState("");
  const [audioSkeleton, setaudioSkeleton] = useState(false);

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
        setaudioSkeleton(false)
        return;
      }
      const buffer = await response.arrayBuffer();
      const blob = new Blob([buffer], { type: "audio/mpeg" });
      const audioURL = URL.createObjectURL(blob);
      setaudioURL(audioURL);
      setaudioSkeleton(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
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
    />
  );
};

export default CreateSpeech;
