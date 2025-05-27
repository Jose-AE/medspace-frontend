"use client";

import React, { useState } from "react";


const RegisterCard = () => {
  const [userType, setUserType] = useState("Landlord");


  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Create an account</h2>


      <form className="space-y-5">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            placeholder="Your name"
            className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>


        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            placeholder="your.email@example.com"
            className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>


        <div>
          <label className="block text-sm font-medium">Password</label>
          <div className="relative">
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <span className="absolute right-3 top-3 cursor-pointer">
              👁️
            </span>
          </div>
        </div>


        <div>
          <label className="block text-sm font-medium">Phone Number</label>
          <input
            type="tel"
            placeholder="Phone number"
            className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>


        <div>
          <label className="block text-sm font-medium">User Type</label>
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <option value="Landlord">Landlord</option>
            <option value="Tenant">Tenant</option>
            <option value="Analyst">Analyst</option>
          </select>
        </div>


        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Create account
        </button>
      </form>


      <p className="mt-4 text-center text-sm text-gray-600">
        Already Have An Account?{" "}
        <a href="#" className="text-blue-600 font-medium hover:underline">
          Log In
        </a>
      </p>
    </div>
  );
};


export default RegisterCard;
