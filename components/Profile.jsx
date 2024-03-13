"use client";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import PromptsCard from "@/components/PromptsCard";
const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  const { data: session } = useSession();
  const router = useRouter();
  return session?.user ? (
    <div>
      <section className="w-full">
        <h2 className="head_text text-left">
          <span className="blue_gradient">{name} Profile </span>
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
        <section>
          <button
            type="button"
            className="bg-red-500 text-white w-full font-inter rounded-lg p-1"
            onClick={() => {
              signOut({redirect:false});
              router.push("/");
            }}
          >
            Sign Out
          </button>
        </section>
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
