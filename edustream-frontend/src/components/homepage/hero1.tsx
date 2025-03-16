"use client";

import { motion } from "motion/react";
import React from "react";
import { AuroraBackground } from "../ui/aurora-background";
import Link from "next/link";
import { TypewriterEffectSmooth } from "../ui/typewriter-effect";

export  function Hero1() {
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
    <AuroraBackground
     className="text-white bg-black"
    >
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        <div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
        Revolutionize Learning with Edustream
        </div>
        <p className="text-neutral-300 dark:text-neutral-200 text-xl sm:text-2xl  max-w-4xl mx-10">
        "Where Live Streaming Meets Real-Time Interaction!"
        </p>
        <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">
        <TypewriterEffectSmooth words={words} />
        </div>
        <div className=" z-[5] flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
        <Link href="/auth/login">
        <button className="w-40 h-10 rounded-xl bg-blue-700 border dark:border-white border-transparent text-white text-sm">
           Join now
         </button>
        </Link>
         <Link href="/auth/register"><button className="w-40 h-10 rounded-xl bg-white text-black border border-black  text-sm">
           Signup
         </button>
         </Link>
       </div>

      </motion.div>
    </AuroraBackground>
  );
}
