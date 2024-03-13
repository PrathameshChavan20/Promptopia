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
      <section className="w-full max-w-full flex-start flex-col mb-10">
        <h1 className="head_text text-left">
          <span className="orange_gradient">
            {type} an AI Powered {creationType}
          </span>
        </h1>
        <p className="desc text-left max-w-md">
          and share amazing art work with the world, and let you imagination run
          wild with any AI powered platform
        </p>

        <div className="w-full">
          <form
            className="mt-10 w-full max-w2xl flex-col gap-7 glassmorphism"
            onSubmit={handleSubmit}
          >
            <label>
              <span className="font-satoshi font-semibold text-base text-blue-500 mb-4">
                What's in your mind?
              </span>

              <input
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
                alt="image"
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
