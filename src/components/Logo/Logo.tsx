import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";

interface Props {
  className?: ClassValue;
  type?: "Full" | "Icon";
}

export default function Logo({ type = "Full", className }: Props) {
  return (
    <Image
      className={cn("h-10 w-10", className)}
      src={type === "Icon" ? "/logo.svg" : "/logo_full.svg"}
      alt="Next.js logo"
      width={1000}
      height={1000}
      priority
    />
  );
}
