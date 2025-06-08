"use client";
import Button from "@/components/Button";
import Link from "next/link";
import React from "react";

export default function Error() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center p-6">
      <h1 className="text-2xl font-semibold mt-4 text-gray-800">
        Sorry! an error occurred :(
      </h1>
      <p className="text-gray-500 mt-2">
        The page failed to load due to an unexpected error. Please try again
        later.
      </p>
      <Link href="/">
        <Button className="mt-6">Return to home</Button>
      </Link>
    </div>
  );
}
