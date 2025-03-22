"use client";
import React, { useState, useEffect } from "react";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import usePost from "../../hooks/usePost";

export default function SignupFormDemo() {
  const router = useRouter();

  const { data, isLoading, isSuccess, error, postData } = usePost<{
    message: string;
  }>(`${process.env.NEXT_PUBLIC_AUTH_API_URL}/register`);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.username.trim() ||
      !formData.email.trim() ||
      !formData.password.trim()
    ) {
      toast.error("All fields are required");
      return;
    }
    await postData(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Signup successful! Redirecting to login...");
      router.push("/auth/login");
    }
    if (error) {
      toast.error(error || "Signup failed. Please try again.");
    }
  }, [isSuccess, error, router]);

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gradient-to-br from-black to-gray-900 px-4 relative">
      <Link href="/">
        <h1 className="cursor-pointer text-center text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-lg mt-4 md:mt-8 lg:mt-12 hover:scale-105 transition-transform duration-300">
          EduStream
        </h1>
      </Link>

      <div className="w-full max-w-4xl flex flex-col md:flex-row bg-gray-900 shadow-2xl rounded-xl overflow-hidden border border-gray-800 min-h-[600px] mt-4 md:mt-8 lg:mt-12 mb-20">
        <div className="hidden md:flex w-1/2 items-center justify-center bg-gradient-to-br from-gray-700 to-gray-950">
          <img
            src="/i7.jpg"
            alt="Sign-Up Illustration"
            className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-300"
          />
        </div>

        <div className="w-full md:w-1/2 p-8 md:py-16 text-white flex flex-col justify-center overflow-auto">
          <h2 className="text-center text-4xl font-extrabold text-gray-200 mb-6">
            Sign Up
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-gray-400 font-semibold mb-2"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="border border-gray-700 focus:border-cyan-400 bg-gray-800 text-white p-3 rounded-lg w-full transition-all duration-300 focus:ring-2 focus:ring-cyan-500 outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block text-gray-400 font-semibold mb-2"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="border border-gray-700 focus:border-cyan-400 bg-gray-800 text-white p-3 rounded-lg w-full transition-all duration-300 focus:ring-2 focus:ring-cyan-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="username"
                className="block text-gray-400 font-semibold mb-2"
              >
                Username
              </label>
              <input
                id="username"
                placeholder="your_username"
                value={formData.username}
                onChange={handleChange}
                className="border border-gray-700 focus:border-cyan-400 bg-gray-800 text-white p-3 rounded-lg w-full transition-all duration-300 focus:ring-2 focus:ring-cyan-500 outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-gray-400 font-semibold mb-2"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                className="border border-gray-700 focus:border-cyan-400 bg-gray-800 text-white p-3 rounded-lg w-full transition-all duration-300 focus:ring-2 focus:ring-cyan-500 outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-gray-400 font-semibold mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="border border-gray-700 focus:border-cyan-400 bg-gray-800 text-white p-3 rounded-lg w-full transition-all duration-300 focus:ring-2 focus:ring-cyan-500 outline-none"
              />
            </div>

            <button
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
              type="submit"
            >
              {isLoading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>

          <div className="mt-6 text-center text-gray-400">
            Already have an account?
            <a
              href="/auth/login"
              className="text-cyan-400 hover:underline ml-1 transition-all duration-300"
            >
              Log in here
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
