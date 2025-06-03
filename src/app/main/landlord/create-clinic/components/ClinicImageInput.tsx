"use client";
import { cn } from "@/lib/utils";
import { useRef } from "react";
import { FaImage } from "react-icons/fa";
import Image from "@/components/Image";

type ClinicImageInputProps = {
  /** Image in base 64 (to be passed as state from parent component) */
  image: File | null;
  /** Callback to set image in parent component */
  onChange: (image: File | null) => void;
  /** Optional label for the input */
  label?: string | null;
  /** Optional flag to indicate if the input is invalid */
  isInvalid?: boolean;
};

const ClinicImageInput = ({
  image,
  onChange,
  isInvalid = false,
  label = null
}: ClinicImageInputProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onChange(file);
    }
  };

  const triggerFileSelect = () => {
    if (image) {
      onChange(null);
      inputRef.current!.value = "";
    } else {
      inputRef.current?.click();
    }
  };

  return (
    <div className="flex flex-col">
      {label && (
        <label
          className={cn(
            "block text-sm font-medium text-gray-800 mb-4",
            isInvalid && "text-red-500"
          )}
        >
          {label}
        </label>
      )}
      <div
        className="relative border-4 border-dashed border-gray-400 p-4 cursor-pointer flex flex-col items-center justify-center rounded-lg hover:bg-gray-100 transition-all duration-200 w-64 h-64"
        onClick={triggerFileSelect}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="absolute mb-4 opacity-0 cursor-pointer pointer-events-none"
          ref={inputRef}
        />
        {image ? (
          <Image
            width={1000}
            height={1000}
            src={image ? URL.createObjectURL(image) : undefined}
            alt="Clinic"
            className="w-48 h-48 object-cover"
          />
        ) : (
          <FaImage size={32} className="fill-gray-400" />
        )}
      </div>
    </div>
  );
};

export default ClinicImageInput;
