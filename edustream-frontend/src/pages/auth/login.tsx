"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; 
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { GlowingStarsTitle } from "@/components/ui/glowing-stars";
import { toast } from "react-toastify";
import usePost from "@/hooks/usePost";  

export default function LoginFormDemo() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // Use the custom usePost hook
  const { data, isLoading, isSuccess, error, postData } = usePost<{ token: string }>(
    `${process.env.NEXT_PUBLIC_AUTH_API_URL}/login`
  );

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await postData({ username, password });
  };

  // Handle success and error states
  useEffect(() => {
    if (isSuccess && data?.token) {
      localStorage.setItem("authToken", data.token);
      toast.success("Login successful! Redirecting...");
      router.push("/");
    }
  }, [isSuccess, data, router]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
<div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 to-black px-4">
  <div className="absolute top-10 text-center text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
    EduStream
  </div>

  <div className="w-full max-w-md bg-gray-800 shadow-lg rounded-xl p-6 text-white">
    <h2 className="text-center text-4xl font-extrabold text-gray-200 mb-6">Login</h2>
    
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          placeholder="Enter your username"
          className="border border-gray-600 focus:border-cyan-400 bg-gray-900 text-white p-3 rounded-md w-full"
        />
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
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

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
