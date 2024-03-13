"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropwdown, setToggleDropwdown] = useState(false);
  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setUpProviders();
  }, []);
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/login" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          width={30}
          height={30}
          alt="Promptopia logo"
          className="object-contain"
        />
        <p className="logo_text">Promptopia</p>
      </Link>
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-1">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <Link
                  href="/create-image"
                  className="black_btn"
                  onClick={() => setToggleDropwdown(false)}
                >
                  Text to Image
                </Link>
                <Link
                  href="/create-speech"
                  className="black_btn"
                  onClick={() => setToggleDropwdown(false)}
                >
                  Text to Speech
                </Link>
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
                  Sign with {provider.name}
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
              onClick={() => setToggleDropwdown((prev) => !prev)} // Corrected the toggle functionality
            />
            {toggleDropwdown && (
              <div className="dropdown">
                {/* Updated Link component usage with href */}
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
                  className="black_btn mt-3 w-full"
                  onClick={() => {
                    setToggleDropwdown(false);
                    signOut();
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
                  Sign In with {provider.name}
                </button>
              ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
