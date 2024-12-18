"use client";
import React, { useState } from "react";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Boxes } from "../../components/ui/background-boxes";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation"; 
import { toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
import { BackgroundBeamsWithCollision } from "../../components/ui/background-beams-with-collision";
import {
  GlowingStarsBackgroundCard,
  GlowingStarsTitle,
} from "@/components/ui/glowing-stars";

export default function SignupFormDemo() {
  const router = useRouter();

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

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Signup successful! Redirecting to login...");
        router.push("/auth/login");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="h-[100vh] relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center">
      <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      <Boxes />
      <div className="p-10 z-20">
        <div className="flex items-center justify-center font-bold text-5xl md:text-6xl mb-5 text-gray-300">
          EduStream
        </div>
        <BackgroundBeamsWithCollision>
          <GlowingStarsBackgroundCard>
            <div className="max-w-sm md:max-w-md w-full mx-auto rounded-3xl md:rounded-3xl p-4 md:p-10 shadow-input bg-transparent to-slate-800 text-xl">
              <GlowingStarsTitle>
                <div className="text-4xl flex items-center justify-center font-extrabold font-serif">
                  SIGN-UP
                </div>
              </GlowingStarsTitle>
              <form className="my-8" onSubmit={handleSubmit}>
                <div className="flex flex-row space-x-2 mb-4">
                  <LabelInputContainer>
                    <Label htmlFor="firstname">First name</Label>
                    <Input
                      id="firstName"
                      placeholder="Tyler"
                      type="text"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="text-black"
                    />
                  </LabelInputContainer>
                  <LabelInputContainer>
                    <Label htmlFor="lastname">Last name</Label>
                    <Input
                      id="lastName"
                      placeholder="Durden"
                      type="text"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="text-black"
                    />
                  </LabelInputContainer>
                </div>
                <LabelInputContainer className="mb-4">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    placeholder="projectmayhem"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    className="text-black"
                  />
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    placeholder="projectmayhem@fc.com"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="text-black"
                  />
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    placeholder="••••••••"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="text-black"
                  />
                </LabelInputContainer>
                <button
                  className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                  type="submit"
                >
                  Sign up &rarr;
                  <BottomGradient />
                </button>
              </form>
              <div className="flex flex-col items-center justify-center text-white font-semibold">
                Already a Member?
                <Link href="/auth/login">
                  <div className="underline "> Login here</div>
                </Link>
              </div>
            </div>
          </GlowingStarsBackgroundCard>
        </BackgroundBeamsWithCollision>
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
