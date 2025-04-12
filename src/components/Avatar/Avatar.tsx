import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";

interface Props {
  className?: ClassValue;
  imageUrl: string;
}

export default function Avatar({ className, imageUrl }: Props) {
  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center rounded-full overflow-hidden bg-gray-200 ",
        className
      )}
    >
      <Image
        src={imageUrl || "/pfp_placeholder.png"}
        alt="Avatar"
        fill
        className="object-cover"
        priority
      />
    </div>
  );
}
