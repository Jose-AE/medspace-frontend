"use client";
import { useRef } from "react";
import { FaImage } from "react-icons/fa";

type ClinicImageInputProps = {
  /** Image in base 64 (to be passed as state from parent component) */
  image: string | null;
  /** Callback to set image in parent component */
  setImage: (image: string | null) => void;
  /** Optional label for the input */
  label?: string | null;
};

const ClinicImageInput = ({
  image,
  setImage,
  label = null,
}: ClinicImageInputProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileSelect = () => {
    if (image) {
      setImage(null);
    } else {
      inputRef.current?.click();
    }
  };

  return (
    <div className="flex flex-col">
      {label && (
        <label className="block text-sm font-medium text-gray-800 mb-4">
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
          className="absolute mb-4 opacity-0 cursor-pointer"
          ref={inputRef}
        />
        {image ? (
          <img src={image} alt="Clinic" className="w-48 h-48 object-cover" />
        ) : (
          <FaImage size={32} className="fill-gray-400" />
        )}
      </div>
    </div>
  );
};

export default ClinicImageInput;
