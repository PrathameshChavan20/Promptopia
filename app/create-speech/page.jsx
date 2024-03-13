"use client";

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
      const buffer = await response.arrayBuffer();
      const blob = new Blob([buffer], { type: "audio/mpeg" });
      const audioURL = URL.createObjectURL(blob);
      setaudioURL(audioURL);
      setaudioSkeleton(true)
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
