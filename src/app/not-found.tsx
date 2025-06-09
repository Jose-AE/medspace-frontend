import Button from "@/components/Button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center p-6">
      <div className="flex items-center justify-center text-6xl font-bold text-gray-800">
        <Image
          src="/404.png"
          width={1000}
          height={1000}
          alt="Doctor illustration"
          className="w-auto h-52 inline-block"
        />
      </div>

      <h1 className="text-2xl font-semibold mt-4 text-gray-800">
        Sorry! no result found :(
      </h1>
      <p className="text-gray-500 mt-2">
        The page you requested could not be found
      </p>
      <Link href="/">
        <Button className="mt-6">Return to home</Button>
      </Link>
    </div>
  );
}

export default NotFoundPage;
