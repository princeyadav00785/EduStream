"use client";
import React from "react";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Boxes } from "../../components/ui/background-boxes";
import { cn } from "@/lib/utils";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { BackgroundBeamsWithCollision } from "../../components/ui/background-beams-with-collision";
import { GlowingStarsBackgroundCard, GlowingStarsTitle } from "@/components/ui/glowing-stars";

export default function LoginFormDemo() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };
  return (
    <div className="h-[100vh] relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center ">
      <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

      <Boxes />
        <div className="p-10 z-20">
          <div className="flex items-center justify-center font-bold text-5xl md:text-6xl mb-5 text-gray-300">
            EduStream
          </div>
          <BackgroundBeamsWithCollision>
          <GlowingStarsBackgroundCard>
          <div className="max-w-sm md:max-w-md w-full mx-auto rounded-3xl md:rounded-3xl p-4 md:p-10 shadow-input  dark:bg-gray-200 bg-transparent text-xl">
              {/* bg-gradient-to-r from-gray-300 to-slate-800 */}
            <GlowingStarsTitle><div className="text-white text-4xl flex items-center justify-center font-extrabold font-serif ">LOGIN</div></GlowingStarsTitle>
            <form className="my-8" onSubmit={handleSubmit}>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  placeholder="projectmayhem@fc.com"
                  type="email"
                />
              </LabelInputContainer>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="password">Password</Label>
                <Input id="password" placeholder="••••••••" type="password" />
              </LabelInputContainer>

              <button
                className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                type="submit"
              >
                Sign In &rarr;
                <BottomGradient />
              </button>
              <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4 mt-8 px-5">
                <button
                    type="button"
                    className="h-12 text-xs flex items-center justify-center w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition transform hover:scale-105 gap-3 md:gap-0"
                >
                   <div className="md:w-12"> <FaFacebook  /> </div>
                    Login with Facebook
                </button>
                <button
                    type="button"
                    className="h-12 text-xs flex items-center justify-center w-full md:w-auto bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition transform hover:scale-105 gap-3 md:gap-0"
                >
                    <div className="md:w-12"> <FaGoogle /> </div> Login with Google
                </button>
                </div>
            </form>
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


