"use client";

import { toast } from "react-hot-toast";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Unauthorised from "@/components/Unauthorised";
import SpinnerButton from "@/components/SpinnerButton";
import Link from "next/link";
import Image from "next/image";

const CreateText = () => {
  const [submitting, setIsSubmitting] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recoredData, setRecordedData] = useState(null);

  const { data: session } = useSession();

  useEffect(() => {
    // Clean up the media recorder when the component unmounts
    return () => {
      if (mediaRecorder && mediaRecorder.state !== "inactive") {
        mediaRecorder.stop();
      }
    };
  }, [mediaRecorder]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const newMediaRecorder = new MediaRecorder(stream);
      const chunks = [];

      newMediaRecorder.addEventListener("dataavailable", (event) => {
        chunks.push(event.data);
      });

      newMediaRecorder.addEventListener("stop", () => {
        const blob = new Blob(chunks, { type: "audio/flac" });
        setRecordedData(URL.createObjectURL(blob));
        toast.success("Your voice is captured.", {
          duration: 3000,
        });
      });

      newMediaRecorder.start();
      setMediaRecorder(newMediaRecorder);
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      toast.error("Error accessing microphone.", {
        duration: 5000,
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      mediaRecorder.stop();
      mediaRecorder.e;
      setIsRecording(false);
    }
  };

  const createTextFromSpeech = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (!recoredData) {
      toast.error("Please record your voice first.", {
        duration: 3000,
      });
      setIsSubmitting(false);
      return;
    }
    const formData = new FormData();
    formData.append("audio", recoredData);

    try {
      const response = await fetch("/api/speech-to-text", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (response.status != 200) {
        console.log(data);
        toast.error(data.message, {
          duration: 3000,
        });
        return;
      }
      console.log(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return session?.user ? (
    <div>
      <section className="max-w-2xl mb-24">
        <h1 className="head_text text-left yellow_gradient">
          Generate real-time speech to text
        </h1>

        <div className="w-full">
          <form className="mt-10 w-full max-w2xl flex-col gap-7 glassmorphism">
            <p className="font-inter font-semibold flex-center mt-2 mb-8  text-gray-700">
              default LLM :
              <span className="ml-1 flex-center">
                Wav2Vec2-Base-960h by META
                <Image
                  width="20"
                  height="20"
                  src="https://img.icons8.com/fluency/48/meta.png"
                  alt="meta"
                  className="ml-2"
                />
              </span>
            </p>
            <label>
              <span className="font-satoshi font-semibold text-base text-blue-500 mb-4 flex">
                Go on for the speech to text.
              </span>
              <hr />
              <div className="justify-center">
                <div>
                  <button
                    type="button"
                    className="text-white flex-center w-full bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-5 mb-5"
                    onClick={isRecording ? stopRecording : startRecording}
                  >
                    {isRecording
                      ? "Stop recording..."
                      : "Start recording directly from browser."}
                  </button>
                </div>

                <span className="flex justify-center font-satoshi font-semibold text-amber-500 mb-5">
                  OR
                </span>
                <label
                  htmlFor="dropzone-file"
                  className="flex items-center justify-center w-full h-2/3 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      MP3, FLAC (MAX. 10MB)
                    </p>
                  </div>
                  <input
                    id="dropzone-file"
                    name="file"
                    type="file"
                    className="hidden"
                    onChange={(e) => handleFileChange(e.target.files[0])}
                  />
                </label>
              </div>
            </label>
            <div className="flex justify-center mt-5 mb-5">
              {recoredData ? (
                <audio controls src={recoredData} type="audio/flac" />
              ) : null}
            </div>
            <div className="flex-center mx-5 mb-5 gap-4">
              <button
                type="submit"
                disabled={submitting}
                className="px-5 py-1.5 text-sm bg-purple-700 rounded-full mt-5 text-white"
                onClick={createTextFromSpeech}
              >
                {submitting ? <SpinnerButton title="Generating" /> : "Generate"}
              </button>
              <Link href="/" className="text-grey-500 text-sm mt-5">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </section>
    </div>
  ) : (
    <Unauthorised />
  );
};

export default CreateText;
