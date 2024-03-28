"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import PromptsCard from "@/components/PromptsCard";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  const { data: session } = useSession();
  return session?.user ? (
    <div>
      <section>
        <h2 className="head_text text-left">
          <span className="purple_gradient">Hello, {name}</span>
        </h2>
        <p className="desc text-left">{desc}</p>
        <div className="mt-10 prompt_layout">
          {data?.map((post) => (
            <PromptsCard
              post={post}
              key={post._id}
              handleEdit={() => {
                handleEdit && handleEdit(post);
              }}
              handleDelete={() => {
                handleDelete && handleDelete(post);
              }}
            />
          ))}
        </div>
      </section>
    </div>
  ) : (
    <div className="mt-15 text-center">
      <Image
        src="/assets/images/unauthorised.png"
        height={300}
        width={300}
        alt="Please Sign In"
        className="scroll-mt-10 align-baseline"
      />
      <h2 className="desc text-center">Oops... You need to sign in to app </h2>
    </div>
  );
};

export default Profile;
