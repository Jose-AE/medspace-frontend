"use client";

import type React from "react";
import { useState, useRef } from "react";
import { Camera, Check, X, ChevronDown, Plus } from "lucide-react";
import Avatar from "@/components/Avatar/Avatar";

export default function EditProfile() {
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    about:
      "Hi, I'm John! I love traveling and meeting new people. I work as a software engineer and enjoy hiking in my free time.",
    location: "San Francisco, California",
    languages: ["English", "Spanish"],
    emergencyContact: {
      name: "Jane Doe",
      relationship: "Sister",
      phone: "+1 (555) 987-6543"
    },
    profilePicture: "/placeholder-user.jpg"
  });

  const [previewImage, setPreviewImage] = useState(profile.profilePicture);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const addLanguage = () => {
    const newLanguage = prompt("Add a language");
    if (newLanguage && !profile.languages.includes(newLanguage)) {
      setProfile({
        ...profile,
        languages: [...profile.languages, newLanguage]
      });
    }
  };

  const removeLanguage = (language: string) => {
    setProfile({
      ...profile,
      languages: profile.languages.filter((lang) => lang !== language)
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 bg-white">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Edit Profile</h1>
        <p className="text-gray-600">
          Update your personal information and how others see you on Airbnb
        </p>
      </div>

      <div className="border border-gray-200 rounded-xl overflow-hidden mb-8">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Profile Photo
          </h2>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-full overflow-hidden border border-gray-200">
                <Avatar
                  imageUrl={previewImage || "/placeholder.svg"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                onClick={triggerFileInput}
                className="absolute bottom-0 right-0 bg-white p-2 rounded-full border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <Camera size={18} className="text-gray-700" />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
            </div>
            <div className="text-center md:text-left">
              <p className="text-gray-900 font-medium mb-1">
                Clear, recent photo of just you
              </p>
              <p className="text-gray-600 text-sm mb-3">
                This helps hosts recognize you when you meet. Please don't use
                photos with sunglasses or other items that hide your face.
              </p>
              <button
                className="text-rose-600 font-medium text-sm hover:underline"
                onClick={triggerFileInput}
              >
                Update photo
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Personal Info
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                First name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={profile.firstName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition"
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Last name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={profile.lastName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition"
              />
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={profile.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition"
            />
            <p className="mt-1 text-sm text-gray-500">
              This is private and won't be shared with other users
            </p>
          </div>

          <div className="mb-6">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={profile.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition"
            />
            <p className="mt-1 text-sm text-gray-500">
              For notifications and guest communication
            </p>
          </div>
        </div>

        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            About You
          </h2>

          <div className="mb-6">
            <label
              htmlFor="about"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              About
            </label>
            <textarea
              id="about"
              name="about"
              value={profile.about}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition"
              maxLength={500}
            />
            <p className="mt-1 text-sm text-gray-500">
              {profile.about.length}/500 characters
            </p>
          </div>

          <div className="mb-6">
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={profile.location}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Languages
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {profile.languages.map((language) => (
                <div
                  key={language}
                  className="flex items-center bg-gray-100 rounded-full px-3 py-1"
                >
                  <span className="text-gray-800 mr-1">{language}</span>
                  <button
                    onClick={() => removeLanguage(language)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
              <button
                onClick={addLanguage}
                className="flex items-center text-rose-600 hover:text-rose-700 px-3 py-1"
              >
                <Plus size={16} className="mr-1" />
                Add
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Emergency Contact
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label
                htmlFor="emergencyName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="emergencyName"
                name="emergencyContact.name"
                value={profile.emergencyContact.name}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    emergencyContact: {
                      ...profile.emergencyContact,
                      name: e.target.value
                    }
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition"
              />
            </div>
            <div>
              <label
                htmlFor="emergencyRelationship"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Relationship
              </label>
              <div className="relative">
                <select
                  id="emergencyRelationship"
                  value={profile.emergencyContact.relationship}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      emergencyContact: {
                        ...profile.emergencyContact,
                        relationship: e.target.value
                      }
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition appearance-none"
                >
                  <option value="Partner">Partner</option>
                  <option value="Spouse">Spouse</option>
                  <option value="Parent">Parent</option>
                  <option value="Sibling">Sibling</option>
                  <option value="Friend">Friend</option>
                  <option value="Other">Other</option>
                </select>
                <ChevronDown
                  size={16}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
                />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="emergencyPhone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone number
            </label>
            <input
              type="tel"
              id="emergencyPhone"
              value={profile.emergencyContact.phone}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  emergencyContact: {
                    ...profile.emergencyContact,
                    phone: e.target.value
                  }
                })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition"
            />
            <p className="mt-1 text-sm text-gray-500">
              Only shared in case of emergency
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition">
          Cancel
        </button>
        <button className="px-6 py-2 bg-rose-600 text-white rounded-lg font-medium hover:bg-rose-700 transition flex items-center">
          <Check size={18} className="mr-2" />
          Save changes
        </button>
      </div>
    </div>
  );
}
