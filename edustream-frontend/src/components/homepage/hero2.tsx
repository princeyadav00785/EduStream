"use client";
import * as React from "react";
import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
import {
  IconBroadcast,
  IconLock,
  IconMessageCircle,
  IconBell,
} from "@tabler/icons-react";
import { Vortex } from "../ui/vortex";
import {  TypewriterEffectSmooth } from "../ui/typewriter-effect";

export function Hero2() {
    const words =[
        {
            text:'"Features ',
            className:"text-4xl  lg:text-7xl"
        },
        {
            text:' Of ',
            className:"text-4xl  lg:text-7xl"
        },
        {
            text:'Edustream."',
            className:"text-4xl  lg:text-7xl"
        }
    ]
  return (
    <div className="bg-black h-[150vh] md:h-[100vh] text-white w-full">
      <Vortex>
        <div className="mb-24 font-serif font-extrabold flex justify-center items-center w-full">
          <TypewriterEffectSmooth  words={words}/>
        </div>
        <BentoGrid className="max-w-4xl lg:mx-auto  md:auto-rows-[20rem] mx-10 ">
          {items.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              header={item.header}
              className={item.className}
              icon={item.icon}
            />
          ))}
        </BentoGrid>
      </Vortex>
    </div>
  );
}

const Skeleton = () => (
  <div className=" flex flex-1 w-full h-full min-h-[6rem] rounded-xl   dark:bg-dot-white/[0.2]  border border-transparent dark:border-white/[0.2] bg-white dark:bg-black"></div>
);
const items = [
  {
    title: "Live Streaming Service",
    description:
      "Experience seamless live streaming with low latency, enabling real-time interaction during educational sessions.",
    header: <Skeleton />,
    className: "md:col-span-2",
    icon: <IconBroadcast className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Authentication Service",
    description:
      "Secure and robust user authentication to protect user data and ensure a personalized experience.",
    header: <Skeleton />,
    className: "md:col-span-1",
    icon: <IconLock className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Chat Service",
    description:
      "Engage in real-time discussions with peers and instructors through our integrated chat service.",
    header: <Skeleton />,
    className: "md:col-span-1",
    icon: <IconMessageCircle className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Notification Service",
    description:
      "Stay updated with real-time notifications for live sessions, messages, and important announcements.",
    header: <Skeleton />,
    className: "md:col-span-2",
    icon: <IconBell className="h-4 w-4 text-neutral-500" />,
  },
];
