"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; 
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { toast } from "react-toastify";
import usePost from "@/hooks/usePost"; 
import { useDispatch } from "react-redux";
import { login } from "@/redux/store";

interface LoginResponse {
  token: string;
  userdata: {
    username: string;
    id: string;
    role: string;
  };
}

export default function LoginFormDemo() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  
  // Use the custom usePost hook
  const { data, isLoading, isSuccess, error, postData } = usePost<LoginResponse>(
    `${process.env.NEXT_PUBLIC_AUTH_API_URL}/login`
  );
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      toast.error("Username and password are required");
      return;
    }
  
    await postData({ username, password });
  };
  
  // Handle success state
  useEffect(() => {
    if (isSuccess && data?.token) {
      localStorage.setItem("authToken", data.token);
      document.cookie = `token=${data.token}; path=/`;  
      toast.success("Login successful! Redirecting...");

      // Save user data in Redux
      const userData = {
        name: data?.userdata.username,
        id: data?.userdata.id,
        role: data?.userdata.role,
      };
      dispatch(login({ userInfo: userData, token: data.token }));

      router.push("/");
    }
  }, [isSuccess, data, router, dispatch]);

  // Handle error state
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
<div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-black to-gray-900 px-4 relative">

  <h1 className="absolute top-10 text-center text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-lg">
  <Link href="/">
   Edustream
  </Link>
  </h1>

  <div className="w-full max-w-4xl flex flex-col md:flex-row bg-gray-900 shadow-2xl rounded-xl overflow-hidden border border-gray-700">

    <div className="hidden md:flex w-1/2 items-center justify-center bg-gradient-to-br from-gray-700 to-gray-950 relative">
      <img
        src="/i1.jpg"
        alt="Login Illustration"
        className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-300"
      />
    </div>

    <div className="w-full md:w-1/2 p-8 text-white flex flex-col justify-center">
      <h2 className="text-center text-4xl font-extrabold text-gray-200 mb-6">Sign In</h2>

      <form onSubmit={handleSubmit} className="space-y-5">

        <div>
          <label htmlFor="username" className="block text-gray-400 font-semibold mb-2">
            Username
          </label>
          <input
            id="username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-gray-700 focus:border-cyan-400 bg-gray-800 text-white p-3 rounded-lg w-full transition-all duration-300 focus:ring-2 focus:ring-cyan-500 outline-none"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-gray-400 font-semibold mb-2">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-700 focus:border-cyan-400 bg-gray-800 text-white p-3 rounded-lg w-full transition-all duration-300 focus:ring-2 focus:ring-cyan-500 outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </button>
      </form>

      {/* Signup Link */}
      <div className="mt-6 text-center text-gray-400">
        New to EduStream?  
        <a href="/auth/register" className="text-cyan-400 hover:underline ml-1 transition-all duration-300">Sign up here</a>
      </div>
    </div>
  </div>
</div>

  
  );
}
