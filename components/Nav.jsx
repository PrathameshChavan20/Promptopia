"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";

const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropwdown, setToggleDropwdown] = useState(false);
  const router = useRouter();
  const [toggled, setToggled] = useState(false);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setUpProviders();
  }, []);

  return (
    <>
      <nav className="flex-between w-full mb-16 pt-3">
        {session?.user ? (
          <button onClick={() => setToggled((prev) => !prev)}>
            <Image
              width={30}
              height={30}
              src="https://img.icons8.com/3d-fluency/94/menu.png"
              alt="menu"
            />
          </button>
        ) : null}
        <Link href="/" className="flex gap-2 flex-center">
          <Image
            src="/assets/images/logo.svg"
            width={25}
            height={25}
            alt="Promptopia logo"
            className="object-contain"
          />
          <p className="logo_text">Promptopia</p>
        </Link>
        <div className="sm:flex hidden">
          {session?.user ? (
            <div className="flex gap-3 md:gap-1">
              <Link href="/profile">
                <Image
                  src={session?.user?.image}
                  height={38}
                  width={38}
                  className="rounded-full"
                  alt="profile"
                ></Image>
              </Link>
            </div>
          ) : (
            <div>
              {providers &&
                Object.values(providers).map((provider) => (
                  <button
                    type="button"
                    key={provider.name}
                    onClick={() => {
                      signIn(provider.id);
                    }}
                    className="black_btn"
                  >
                    Sign In with{" "}
                    <Image
                      className="ml-2"
                      src={"https://img.icons8.com/color/48/google-logo.png"}
                      height={20}
                      width={20}
                    ></Image>
                  </button>
                ))}
            </div>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="sm:hidden flex relative">
          {session?.user ? (
            <div className="flex">
              <Image
                src={session?.user?.image}
                height={38}
                width={38}
                className="rounded-full"
                alt="profile"
                onClick={() => setToggleDropwdown((prev) => !prev)}
              />
              {toggleDropwdown && (
                <div className="dropdown">
                  <Link
                    href="/profile"
                    className="dropdown_link"
                    onClick={() => setToggleDropwdown(false)}
                  >
                    My Profile
                  </Link>
                  <Link
                    href="/create-prompt"
                    className="dropdown_link"
                    onClick={() => setToggleDropwdown(false)}
                  >
                    Create a Prompt
                  </Link>
                  <Link
                    href="/create-image"
                    className="dropdown_link"
                    onClick={() => setToggleDropwdown(false)}
                  >
                    Text to Image
                  </Link>
                  <Link
                    href="/create-speech"
                    className="dropdown_link"
                    onClick={() => setToggleDropwdown(false)}
                  >
                    Text to Speech
                  </Link>
                  <button
                    type="button"
                    className="font-inter font-semibold bg-red-500 p-1 w-full rounded-lg text-white"
                    onClick={() => {
                      setToggleDropwdown(false);
                      signOut();
                      router.push("/");
                    }}
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div>
              {providers &&
                Object.values(providers).map((provider) => (
                  <button
                    type="button"
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className="black_btn"
                  >
                    Sign In with{" "}
                    <Image
                      className="ml-2"
                      src={"https://img.icons8.com/color/48/google-logo.png"}
                      height={20}
                      width={20}
                    ></Image>
                  </button>
                ))}
            </div>
          )}
        </div>
      </nav>
      {toggled && <Sidebar toggeledValue="true" />}
    </>
  );
};

export default Nav;
