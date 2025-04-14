"use client";


import React, { useState } from "react";


const UploadPhoto = () => {
  const [fileName, setFileName] = useState("No file chosen");


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFileName(file.name);
  };


  return (
    <div className="max-w-sm mx-auto bg-white p-8 rounded-2xl shadow-md">
      <h2 className="text-xl font-bold mb-6">Upload photo</h2>


      <label className="block w-full border rounded-md px-4 py-3 mb-6 text-gray-600 cursor-pointer hover:border-blue-400 transition">
        <input
          type="file"
          accept="image/*,.pdf"
          onChange={handleFileChange}
          className="hidden"
        />
        {fileName}
        <span className="float-right">⬆️</span>
      </label>


      <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
        Create account
      </button>


      <p className="mt-4 text-center text-sm text-gray-600">
        Already Have An Account?{" "}
        <a href="#" className="text-blue-600 font-medium hover:underline">
          Log In
        </a>
      </p>
    </div>
  );
};


export default UploadPhoto;




