"use client";
import React, { useState } from "react";
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
  
  const { data, isLoading, isSuccess, error, postData } = usePost<{ message: string }>(
    `${process.env.NEXT_PUBLIC_AUTH_API_URL}/register`
  );

  // State to handle form input
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });

  // Update form state on input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await postData(formData);

    if (isSuccess) {
      toast.success("Signup successful! Redirecting to login...");
      router.push("/auth/login");
    }

    if (error) {
      toast.error(error || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-black to-black px-4">
    <div className=" absolute top-10 text-center text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
      EduStream
    </div>
  
    <div className="mt-10 w-full max-w-md bg-gradient-to-br from-gray-400 to-gray-950 shadow-lg rounded-xl p-6 text-white">
      <h2 className="text-center text-4xl font-extrabold text-gray-200 mb-6">Sign Up</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              placeholder="John"
              className="border border-gray-600 focus:border-cyan-400 bg-gray-900 text-white p-3 rounded-md w-full"
            />
          </div>
  
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              placeholder="Doe"
              className="border border-gray-600 focus:border-cyan-400 bg-gray-900 text-white p-3 rounded-md w-full"
            />
          </div>
        </div>
  
        <div>
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            placeholder="your_username"
            className="border border-gray-600 focus:border-cyan-400 bg-gray-900 text-white p-3 rounded-md w-full"
          />
        </div>
  
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
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
          {isLoading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
  
      <div className="mt-6 text-center text-gray-400">
        Already have an account?  
        <Link href="/auth/login" className="text-cyan-400 hover:underline"> Login here</Link>
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
