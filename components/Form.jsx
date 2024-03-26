"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Unauthorised from "@/components/Unauthorised";
import SpinnerButton from "@/components/SpinnerButton";

const Form = ({
  type,
  post,
  setPost,
  submitting,
  handleSubmit,
  handleFileChange,
}) => {
  const { data: session } = useSession();
  return session?.user ? (
    <div>
      <section className="w-full max-w-full flex-start flex-col mb-10">
        <h1 className="head_text text-left">
          <span className="blue_gradient">{type} a post</span>
        </h1>
        <p className="desc text-left max-w-md">
          {type} and share amazing prompts with the world, and let you
          imagination run wild with any AI powered platform
        </p>
        <form
          onSubmit={handleSubmit}
          className="mt-10 w-full max-w2xl flex-col gap-7 glassmorphism"
          enctype="multipart/form-data"
        >
          <label>
            <span className="font-satoshi font-semibold text-base text-grey-700">
              Your AI Prompt
            </span>
            <textarea
              className="form_textarea"
              value={post.prompt}
              onChange={(e) => setPost({ ...post, prompt: e.target.value })}
              placeholder="Enter your promt here..."
              required={true}
            />
          </label>
          <label>
            <br />
            <span className="font-satoshi font-semibold text-base text-grey-700 mt-5">
              Tag{" "}
              <span className="font-normal font-satoshi m-2">
                (#product,#webdevlopment,#idea)
              </span>
            </span>
            <input
              className="form_input"
              value={post.tag}
              onChange={(e) => setPost({ ...post, tag: e.target.value })}
              placeholder="#tag"
              required={true}
            />
          </label>
          <label>
            <br />
            <span className="font-satoshi font-semibold text-base text-grey-700">
              Upload the AI Generated Content
            </span>
            <span className="font-normal font-satoshi m-2">(Optional)</span>
            <div class="flex items-center justify-center w-full mt-2">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
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
                    SVG, PNG, JPG , GIF or MP3 (MAX. 2MB)
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
          <div className="flex-end mx-5 mb-5 gap-4">
            <Link href="/" className="text-grey-500 text-sm mt-5">
              Cancel
            </Link>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-1.5 text-md bg-primary-orange rounded-full mt-5 text-white"
            >
              {submitting ? <SpinnerButton title="Posting" /> : type}
            </button>
          </div>
        </form>
      </section>
    </div>
  ) : (
    <Unauthorised />
  );
};

export default Form;
