"use client";

import React, { useState } from 'react';

const specialties = ['Cardiology', 'Dermatology', 'Neurology', 'Pediatrics'];

const DoctorDetailsForm: React.FC = () => {
  const [specialty, setSpecialty] = useState('Cardiology');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [licenseFile, setLicenseFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLicenseFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      specialty,
      licenseNumber,
      licenseFile
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md space-y-6"
    >
      <h2 className="text-2xl font-semibold text-gray-900">Doctor Details</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Specialty</label>
        <select
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2"
        >
          {specialties.map((spec) => (
            <option key={spec} value={spec}>
              {spec}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Professional License Number</label>
        <input
          type="text"
          value={licenseNumber}
          onChange={(e) => setLicenseNumber(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2"
          placeholder="Enter license number"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Upload Professional License</label>
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="w-full text-sm text-gray-600"
        />
        {licenseFile && <p className="mt-1 text-sm text-gray-500">{licenseFile.name}</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
        Create account
      </button>

      <p className="text-center text-sm text-gray-500">
        Already Have An Account?{' '}
        <a href="#" className="text-blue-600 hover:underline">
          Log In
        </a>
      </p>
    </form>
  );
};

export default DoctorDetailsForm;
