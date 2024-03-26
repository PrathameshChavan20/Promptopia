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
  const [responseText, setResponseText] = useState(null);

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
        setRecordedData(blob);
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
        toast.error(data.message, {
          duration: 3000,
        });
        return;
      }
      setResponseText(data.text);
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
            <form className="max-w-sm mx-auto">
              <label for="underline_select" className="sr-only">
                Underline select
              </label>
              {/* <select
                id="underline_select"
                className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
              >
                <option selected>Choose a LLM Model</option>
                <option value="US">
                  <span className="ml-1 flex-center font-satoshi font-semibold ">
                    wav2vec2-large-960h-lv60-self by META
                    <Image
                      width="20"
                      height="20"
                      src="https://img.icons8.com/fluency/48/meta.png"
                      alt="meta"
                      className="ml-2"
                    />
                  </span>
                </option>
              </select> */}
            </form>

            <p className="font-inter font-semibold flex-center mt-2 mb-8  text-gray-700">
              default LLM :
              <span className="ml-1 flex-center">
                wav2vec2-large-960h-lv60-self by META
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
              </div>
            </label>
            <div className="flex justify-center mt-5 mb-5">
              {recoredData ? (
                <audio
                  controls
                  src={URL.createObjectURL(recoredData)}
                  type="audio/flac"
                />
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
            <div>
              {responseText ? (
                <div className="font-sans flex-center justify-center align-center text-pink-700 p-5 font-semibold">
                  Text : {responseText}
                </div>
              ) : null}
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
