"use client";

import { useSession } from "next-auth/react";
import Unauthorised from "@/components/Unauthorised";
import Link from "next/link";
import Image from "next/image";
import SpinnerButton from "@/components/SpinnerButton";
const createPromptForm = ({
  type,
  creationType,
  post,
  setPost,
  submitting,
  handleSubmit,
  audioURL,
  audioSkeleton,
  imgRes,
  imageSkeleton,
  handleSharePost,
  sharing,
}) => {
  const { data: session } = useSession();
  const downloadAudio = (audioURL) => {
    const link = document.createElement("a");
    link.href = audioURL;
    link.download = "recorded_audio.mp3";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return session?.user ? (
    <div>
      <section className="max-w-2xl mb-24">
        <h1 className="head_text text-left">
          {creationType === "Image" ? (
            <span className="green_gradient">
              {type} an AI Powered {creationType}
            </span>
          ) : creationType === "Speech" ? (
            <span className="grey_gradient">
              {type} an AI Powered {creationType}
            </span>
          ) : null}
        </h1>
        {creationType === "Image" ? (
          <p className="desc text-left max-w-md">
            Revolutionize creativity with our AI imaging platform, blending
            advanced algorithms and your ideas into captivating visuals. Explore
            endless aesthetic possibilities.
          </p>
        ) : null}
        {creationType === "Speech" ? (
          <p className="desc text-left max-w-md">
            Transform your ideas into articulate speech with our AI-powered
            tool. Sophisticated yet user-friendly, it unlocks infinite
            possibilities for vocal expression.
          </p>
        ) : null}

        <div className="w-full">
          <form
            className="mt-10 w-full max-w2xl flex-col gap-7 glassmorphism"
            onSubmit={handleSubmit}
          >
            <p className="font-inter font-semibold flex-center mt-2 mb-8  text-gray-700">
              default LLM :
              {creationType === "Image" ? (
                <span className="ml-1 flex-center">
                  stable-diffusion-v1-5 by RunwayML
                  <Image
                    width="25"
                    height="25"
                    src="https://img.icons8.com/3d-fluency/94/robot-1.png"
                    alt="runwayml logo"
                    className="ml-2"
                  />
                </span>
              ) : creationType === "Speech" ? (
                <span className="ml-1 flex">
                  mms-tts-eng by META
                  <Image
                    width="20"
                    height="20"
                    src="https://img.icons8.com/fluency/48/meta.png"
                    alt="meta"
                    className="ml-2"
                  />
                </span>
              ) : null}
            </p>
            <label>
              <span className="font-satoshi font-semibold text-base text-blue-500 mb-4">
                {creationType === "Image"
                  ? "What do you want to visualize?"
                  : creationType === "Speech"
                  ? "what your ears eagering for?"
                  : null}
              </span>

              <textarea
                className="form_input w-fit"
                placeholder="Enter your prompt here..."
                required={true}
                value={post.prompt}
                onChange={(e) => setPost({ ...post, prompt: e.target.value })}
              />
            </label>
            <div className="flex-center mx-5 mb-5 gap-4">
              <button
                type="submit"
                disabled={submitting}
                className="px-5 py-1.5 text-sm bg-purple-700 rounded-full mt-5 text-white"
              >
                {submitting ? <SpinnerButton title="Generating" /> : type}
              </button>
              <Link href="/" className="text-grey-500 text-sm mt-5">
                Cancel
              </Link>
            </div>
          </form>
          {creationType === "Speech" && audioSkeleton ? (
            <section className="flex justify-center mt-5 mb-5">
              {audioURL ? (
                <div>
                  <audio
                    controls
                    src={audioURL}
                    id="audioURL"
                    type="audio/flac"
                  />
                  <button
                    className="bg-white hover:bg-gray-500 text-gray-600 ml-16 hover:text-white font-inter p-2 flex m-5 text-sm rounded-lg"
                    onClick={() => downloadAudio(audioURL)}
                  >
                    <Image
                      width={20}
                      height={20}
                      src="https://img.icons8.com/sf-black/64/downloading-updates.png"
                      alt="downloading-updates"
                      className="mr-2"
                    />
                    Download audio
                  </button>
                </div>
              ) : null}
            </section>
          ) : null}
          {creationType === "Image" && imageSkeleton ? (
            <section className="flex-center mt-5">
              <Image
                width={300}
                height={300}
                className="object-contain rounded-lg"
                src={imgRes}
                alt="generated_img"
              />
            </section>
          ) : null}
        </div>
        {imageSkeleton || audioSkeleton ? (
          <center>
            <button
              type="button"
              className="flex mt-5 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-4 py-2 text-center me-2 mb-2"
              onClick={handleSharePost}
            >
              {sharing ? (
                <div className="flex">
                  <SpinnerButton title="Posting" />
                </div>
              ) : (
                <div className="flex">
                  <Image
                    width={20}
                    height={20}
                    src="https://img.icons8.com/ios-filled/50/paper-plane.png"
                    alt="downloading-updates"
                    className="mr-2"
                  />
                  Share this to the Post
                </div>
              )}
            </button>
          </center>
        ) : null}
      </section>
    </div>
  ) : (
    <Unauthorised />
  );
};
export default createPromptForm;
