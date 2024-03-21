"use client";

import { useSession } from "next-auth/react";
import Unauthorised from "@/components/Unauthorised";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SpinnerButton from "./SpinnerButton";
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
}) => {
  const [skeleton, isSkeletonOn] = useState(false);
  const { data: session } = useSession();

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
               
               <Image width="25" height="25" src="https://img.icons8.com/3d-fluency/94/robot-1.png" alt="runwayml logo" className="ml-2"/>
             </span>
              ) : creationType === "Speech" ? (              
              <span className="ml-1 flex">
                  mms-tts-eng by META
                  
                  <Image width="20" height="20" src="https://img.icons8.com/fluency/48/meta.png" alt="meta" className="ml-2"/>
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
            <section className="flex-center mt-5">
              <audio controls src={audioURL} id="audioURL" type="audio/flac" />
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
        {skeleton ? (
          <div
            role="status"
            class="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center"
          >
            <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700 mt-10">
              <svg
                className="w-10 h-10 text-gray-200 dark:text-gray-600"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 18"
              >
                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
              </svg>
            </div>
          </div>
        ) : null}
      </section>
    </div>
  ) : (
    <Unauthorised />
  );
};
export default createPromptForm;
