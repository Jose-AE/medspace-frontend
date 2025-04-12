"use client";

import Image from "next/image";
import SearchBar from "@/components/SearchBar";

export default function Home() {
  return (
    <div className="mt-20">
      <SearchBar onSearch={() => {}} />
    </div>
  );
}
