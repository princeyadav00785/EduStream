import { cn } from "@/lib/utils";
import React from "react";
import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
import {
  IconBell,
  IconBroadcast,
  IconChalkboard,
  IconClipboardCopy,
  IconFileBroken,
  IconGraph,
  IconLock,
  IconMessageCircle,
  IconSignature,
  IconTableColumn,
  IconTextCaption,
  IconVideo,
} from "@tabler/icons-react";

export function Hero2() {
  return (
    <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[20rem] bg-black">
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
    header: (
      <img
        src="https://images.unsplash.com/photo-1607968565043-36af90dde238?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dmlkZW8lMjBzdHJlYW1pbmd8ZW58MHx8MHx8fDA%3D"
        alt="Live Streaming"
        className="w-full h-full min-h-[6rem] object-cover rounded-xl"
      />
    ),
    className: "md:col-span-2",
    icon: <IconBroadcast className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Authentication Service",
    description:
      "Secure and robust user authentication to protect user data and ensure a personalized experience.",
    header: (
      <img
        src="https://plus.unsplash.com/premium_photo-1700766408965-f73b16458fee?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXV0aGVudGljYXRpb258ZW58MHx8MHx8fDA%3D"
        alt="Authentication"
        className="w-full h-full min-h-[6rem] object-cover rounded-xl"
      />
    ),
    className: "md:col-span-1",
    icon: <IconLock className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Chat Service",
    description:
      "Engage in real-time discussions with peers and instructors through our integrated chat service.",
    header: (
      <img
        src="https://plus.unsplash.com/premium_photo-1684761949804-fd8eb9a5b6cc?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWVzc2FnaW5nfGVufDB8fDB8fHww"
        alt="Chat Service"
        className="w-full h-full min-h-[6rem] object-cover rounded-xl"
      />
    ),
    className: "md:col-span-1",
    icon: <IconMessageCircle className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Notification Service",
    description:
      "Stay updated with real-time notifications for live sessions, messages, and important announcements.",
    header: (
      <img
        src="https://plus.unsplash.com/premium_photo-1682309526815-efe5d6225117?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bm90aWZpY2F0aW9uc3xlbnwwfHwwfHx8MA%3D%3D"
        alt="Notifications"
        className="w-full h-full min-h-[6rem] object-cover rounded-xl"
      />
    ),
    className: "md:col-span-2",
    icon: <IconBell className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "On-Demand Video Service",
    description:
      "Access recorded sessions anytime, allowing students to revisit lectures and learn at their own pace.",
    header: (
      <img
        src="https://plus.unsplash.com/premium_photo-1721247038464-2402e9ce82b0?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dmlkZW8lMjBwbGF5ZXJ8ZW58MHx8MHx8fDA%3D"
        alt="On-Demand Videos"
        className="w-full h-full min-h-[6rem] object-cover rounded-xl"
      />
    ),
    className: "md:col-span-2",
    icon: <IconVideo className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "AI-Powered Transcriptions",
    description:
      "Get automatic transcriptions for lectures, making content more accessible and searchable.",
    header: (
      <img
        src="https://plus.unsplash.com/premium_photo-1710409625244-e9ed7e98f67b?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dmlkZW8lMjBjY3xlbnwwfHwwfHx8MA%3D%3D"
        alt="AI Transcriptions"
        className="w-full h-full min-h-[6rem] object-cover rounded-xl"
      />
    ),
    className: "md:col-span-1",
    icon: <IconTextCaption className="h-4 w-4 text-neutral-500" />,
  },
  // {
  //   title: "Interactive Whiteboard",
  //   description:
  //     "Collaborate in real-time using a digital whiteboard for enhanced visual learning.",
  //   header: (
  //     <img
  //       src="/images/whiteboard.jpg"
  //       alt="Interactive Whiteboard"
  //       className="w-full h-full min-h-[6rem] object-cover rounded-xl"
  //     />
  //   ),
  //   className: "md:col-span-1",
  //   icon: <IconChalkboard className="h-4 w-4 text-neutral-500" />,
  // },
  // {
  //   title: "Analytics & Insights",
  //   description:
  //     "Track engagement, attendance, and learning progress with detailed analytics for educators.",
  //   header: (
  //     <img
  //       src="/images/analytics.jpg"
  //       alt="Analytics & Insights"
  //       className="w-full h-full min-h-[6rem] object-cover rounded-xl"
  //     />
  //   ),
  //   className: "md:col-span-2",
  //   icon: <IconGraph className="h-4 w-4 text-neutral-500" />,
  // },
];
