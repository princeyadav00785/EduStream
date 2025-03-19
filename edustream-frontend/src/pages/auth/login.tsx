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
      document.cookie = `token=${data.token}; path=/`;  // ✅ Correct token assignment
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
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-black to-black px-4">
      <div className="absolute top-10 text-center text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
        EduStream
      </div>

      <div className="w-full max-w-md bg-gradient-to-br from-gray-500 to-gray-950 shadow-lg rounded-xl p-6 text-white">
        <h2 className="text-center text-4xl font-extrabold text-gray-200 mb-6">Login</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              placeholder="Enter your username"
              value={username}  // ✅ Controlled input
              onChange={(e) => setUsername(e.target.value)} // ✅ Updates state
              className="border border-gray-600 focus:border-cyan-400 bg-gray-900 text-white p-3 rounded-md w-full"
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}  
              onChange={(e) => setPassword(e.target.value)} 
              className="border border-gray-600 focus:border-cyan-400 bg-gray-900 text-white p-3 rounded-md w-full"
            />
          </div>

          <button
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-2 rounded-lg transition-all duration-300 font-semibold"
            type="submit"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="mt-6 text-center text-gray-400">
          New to EduStream?  
          <Link href="/auth/register" className="text-cyan-400 hover:underline"> Signup here</Link>
        </div>
      </div>
    </div>
  );
}
