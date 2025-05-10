"use client";

import React, { ComponentProps, useEffect, useState } from "react";
import NextImage from "next/image";
import { StorageService } from "@/services/StorageService";

interface Props extends Omit<ComponentProps<typeof NextImage>, "src"> {
  placeholderImage?: string;
  src?: string;
}

export default function Image({
  placeholderImage = "/placeholder.png",
  src,
  ...props
}: Props) {
  const [imageSrc, setImageSrc] = useState<string>(placeholderImage);

  console.log("Image src:", src);

  useEffect(() => {
    const isBucketSrc =
      !!src && !(src.startsWith("/") || src.startsWith("https://"));

    if (!src) {
      setImageSrc(placeholderImage);
    } else if (isBucketSrc) {
      StorageService.getFileUrl(src)
        .then((url) => {
          setImageSrc(url || placeholderImage);
        })
        .catch((error) => {
          console.error("Failed to fetch image from storage:", error);
          setImageSrc(placeholderImage);
        });
    } else {
      setImageSrc(src);
    }
  }, [src, placeholderImage]);

  return <NextImage src={imageSrc} {...props} />;
}
