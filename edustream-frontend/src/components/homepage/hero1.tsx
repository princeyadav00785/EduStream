"use client";
import * as React from "react";
import { TypewriterEffectSmooth } from "../ui/typewriter-effect";
import { BackgroundBeams } from "../ui/background-beams";

export function Hero1() {
  const words = [
    {
      text: '" Learn.',
    },
    {
      text: "Engage.",
    },
    {
      text: "Streamline",
    },
    {
      text: "Education",
    },
    {
      text: "in",
    },
    {
      text: 'Real time. " ',
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center ">
        <BackgroundBeams/>
      <p className="text-neutral-600 dark:text-neutral-200 text-base sm:text-lg  max-w-4xl mx-10">
      "Revolutionize Learning with Edustream – Where Live Streaming Meets Real-Time Interaction!"
      </p>
      <TypewriterEffectSmooth words={words} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
        <button className="w-40 h-10 rounded-xl bg-blue-700 border dark:border-white border-transparent text-white text-sm">
          Join now
        </button>
        <button className="w-40 h-10 rounded-xl bg-white text-black border border-black  text-sm">
          Signup
        </button>
      </div>
      <div className="mt-28 w-3/5 h-1/5">
        <img className="rounded-3xl shadow-2xl shadow-white drop-shadow-xl" src="i6.jpg" />
      </div>
    </div>
  );
}
