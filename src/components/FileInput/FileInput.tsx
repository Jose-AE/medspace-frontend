"use client";

import { useRef, useState } from "react";
import { MdFileUpload } from "react-icons/md";

type FileInputProps = {
  label: string;
  onChange: (files: FileList | null) => void;
  accept?: string;
  placeholder?: string;
};

const FileInput = ({
  /** Label of the input */
  label,
  /** Callback function when the file is selected */
  onChange,
  /** File type accepted */
  accept = "application/pdf",
  /** Placeholder when file is null */
  placeholder = "Select a file",
}: FileInputProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setFileName(files[0].name);
      onChange(files);
    } else {
      onChange(null);
    }
  };

  const triggerFileSelect = () => {
    inputRef.current?.click();
  };

  return (
    <div className="flex flex-1 flex-col gap-2">
      <label
        htmlFor={`file-input-${label}`}
        className="block text-sm font-medium text-gray-800"
      >
        {label}
      </label>
      <div
        className="flex items-center justify-between w-full border border-gray-300 rounded-md px-4 py-2 cursor-pointer hover:border-gray-400"
        onClick={triggerFileSelect}
      >
        <span className="text-sm text-gray-500 truncate">
          {fileName || placeholder}
        </span>
        <input
          ref={inputRef}
          id={`file-input-${label}`}
          type="file"
          accept={accept}
          onChange={(e) => handleFileChange(e)}
          className="hidden"
        />
        <MdFileUpload className="fill-gray-400" />
      </div>
    </div>
  );
};

export default FileInput;
