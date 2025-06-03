"use client";
import React, { useState } from "react";
import Link from "next/link";
import Button from "@/components/Button";
import TextInput from "@/components/TextInput";
import { AuthService } from "@/services/AuthService";
import { FirebaseError } from "firebase/app";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  // State hooks to manage email and password values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter(); // Initialize router for navigation

  // Handle form submission
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true); // Set loading state to true

    try {
      await AuthService.signInWithEmailAndPassword(email, password);

      //wait 1 seconds to allow the fb to initialize the user profile
      await new Promise((resolve) => setTimeout(resolve, 1000));

      router.push("/main"); // Redirect to the home page after successful login
    } catch (error) {
      if (error instanceof FirebaseError) {
        // Handle specific Firebase error codes here
        switch (error.code) {
          case "auth/invalid-credential":
            toast.error("Invalid credentials. Please try again.");
            break;
          default:
            toast.error(error.message || "Firebase error occurred.");
        }
      } else {
        toast.error("Error logging in. Please try again.");
      }
    } finally {
      setIsLoading(false); // Reset loading state
    }
  }

  return (
    <>
      <main className="h-screen flex justify-center items-center">
        <div className="w-full max-w-sm p-6 m-auto mx-auto bg-white rounded-lg shadow-md ">
          <div className="flex justify-center mx-auto text-2xl font-bold ">
            Login to your account
          </div>

          <form className="mt-6" onSubmit={handleSubmit}>
            <div>
              <TextInput
                label="Email:"
                invalidMessage="Invalid email"
                type="text"
                value={email} // Bind the email state to the input
                onChange={(e) => setEmail(e.target.value)} // Update email state on input change
              />
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between">
                <label className="block font-medium text-sm text-gray-800 ">
                  Password:
                </label>
              </div>

              <TextInput
                type="password"
                value={password} // Bind the password state to the input
                onChange={(e) => setPassword(e.target.value)} // Update password state on input change
              />
            </div>

            <div className="mt-6">
              <Button isLoading={isLoading} className="w-full">
                Login
              </Button>
            </div>
          </form>

          <p className="mt-8 text-xs font-light text-center text-gray-400">
            Don&#39;t have an account?{" "}
            <Link
              href="/auth/register"
              className="font-medium text-gray-700  hover:underline"
            >
              Create one
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}
