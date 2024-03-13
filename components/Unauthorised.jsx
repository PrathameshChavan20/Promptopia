'use client'
import Image from "next/image";

const Unauthorised = () => {
  return (
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

export default Unauthorised;
