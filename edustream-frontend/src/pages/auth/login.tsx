"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; 
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
// import { Boxes } from "../../components/ui/background-boxes";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { FaGoogle, FaFacebook } from "react-icons/fa";
// import { BackgroundBeamsWithCollision } from "../../components/ui/background-beams-with-collision";
import {
  // GlowingStarsBackgroundCard,
  GlowingStarsTitle,
} from "@/components/ui/glowing-stars";
import { toast } from "react-toastify";

export default function LoginFormDemo() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter(); 

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );
  
      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.message || "Login failed. Please try again.";
        toast.error(errorMessage);
        return;
      }
  
      const data = await response.json();
  
      if (data.token) {
        localStorage.setItem("authToken", data.token);
        toast.success("Login successful! Redirecting...");
      }
  
      router.push("/");
    } catch (error: any) {
      toast.error("An unexpected error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };
  
  

  return (
    <div className="h-[100vh] relative w-full overflow-hidden bg-slate-0 flex flex-col items-center justify-center">
      <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

      {/* <Boxes /> */}
      <div className="p-10 z-20">
        <div className="flex items-center justify-center font-bold text-5xl md:text-6xl mb-5 text-gray-300">
          EduStream
        </div>
        {/* <BackgroundBeamsWithCollision> */}
          {/* <GlowingStarsBackgroundCard> */}
            <div className=" max-w-sm md:max-w-md w-full mx-auto rounded-3xl md:rounded-3xl p-4 md:p-10 shadow-input dark:bg-gray-200 bg-transparent text-xl">
              <GlowingStarsTitle>
                <div className="text-white text-4xl flex items-center justify-center font-extrabold font-serif">
                  LOGIN
                </div>
              </GlowingStarsTitle>
              <form className="my-8" onSubmit={handleSubmit}>
                <LabelInputContainer className="mb-4">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    placeholder="Enter your username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="text-black"
                  />
                </LabelInputContainer>
                <LabelInputContainer className="mb-4 text-black">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    placeholder="••••••••"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="text-black"
                  />
                </LabelInputContainer>

                {errorMessage && (
                  <div className="text-red-500 text-sm mb-4">{errorMessage}</div>
                )}

                <button
                  className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing In..." : "Sign In →"}
                  <BottomGradient />
                </button>

                <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4 mt-8 px-5">
                  <button
                    type="button"
                    className="h-12 text-xs flex items-center justify-center w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition transform hover:scale-105 gap-3 md:gap-0"
                  >
                    <div className="md:w-12">
                      <FaFacebook />
                    </div>
                    Login with Facebook
                  </button>
                  <button
                    type="button"
                    className="h-12 text-xs flex items-center justify-center w-full md:w-auto bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition transform hover:scale-105 gap-3 md:gap-0"
                  >
                    <div className="md:w-12">
                      <FaGoogle />
                    </div>
                    Login with Google
                  </button>
                </div>
              </form>
              <div className="flex flex-col items-center justify-center text-white font-semibold">
                New Member? Join the family.
                <Link href="/auth/register">
                  <div className="underline">Signup here</div>
                </Link>
              </div>
            </div>
          {/* </GlowingStarsBackgroundCard> */}
        {/* </BackgroundBeamsWithCollision> */}
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
