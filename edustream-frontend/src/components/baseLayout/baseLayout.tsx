"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
import avatar from '../../../public/avatar.png';
import {
  IconArrowLeft,
  IconBook,
  IconBrandTabler,
  IconDoorExit,
  IconPlayCard,
  IconPlus,
  IconSettings,
  IconUserBolt,
  IconVideo,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "motion/react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { logout, persistor, RootState } from "@/redux/store";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../footer/footer";

export function BaseLayout({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const isTeacherOrAdmin =
    userInfo?.role === "TEACHER" || userInfo?.role === "ADMIN";
  type LinkWithHref = {
    label: string;
    href: string;
    icon: JSX.Element;
  };

  type LinkWithAction = {
    label: string;
    action: () => void;
    icon: JSX.Element;
  };

  type LinkType = LinkWithHref | LinkWithAction;

  const links: LinkType[] = [
    { label: "Dashboard", href: "/", icon: <IconBrandTabler /> },
    {
      label: "All Sessions",
      href: "/sessions/allSessions",
      icon: <IconPlayCard />,
    },
    {
      label: "Join a Session",
      href: "/join-session",
      icon: <IconVideo />,
    },
    { label: "Session Details", href: "/sessions-detail", icon: <IconVideo /> },
    isTeacherOrAdmin && {
      label: "Create New Session",
      href: "/sessions/createSession",
      icon: <IconPlus />,
    },
    { label: "All Courses", href: "/courses/allCourses", icon: <IconBook /> },
    isTeacherOrAdmin && {
      label: "Add New Course",
      href: "/courses/addCourses",
      icon: <IconPlus />,
    },
    { label: "Course Details", href: "/courses-detail", icon: <IconBook /> },
    { label: "Profile", href: "/profile", icon: <IconUserBolt /> },
    { label: "Settings", href: "/settings", icon: <IconSettings /> },
    {
      label: "Logout",
      // href: "/",
      icon: <IconDoorExit />,
      action: async () => {
        dispatch(logout());
        localStorage.removeItem("authToken");
        persistor.pause();
        await persistor.flush();
        persistor.purge();
        document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC";
        window.location.reload();
        router.push("/");
      },
    },
  ].filter(Boolean) as LinkType[];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1  mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-[100vh]"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) =>
                "href" in link ? (
                  <SidebarLink key={idx} link={link} />
                ) : (
                  <div
                    key={idx}
                    onClick={link.action}
                    className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-neutral-700 p-2 rounded-md cursor-pointer"
                  >
                    {link.icon}
                    {link.label}
                  </div>
                )
              )}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Prince Yadav",
                href: "#",
                icon: (
                  <Image
                    src={avatar}
                    className="h-7 w-7 shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <div className="flex flex-col min-h-full  overflow-y-auto "
      style={{
        width: open ? `calc(100vw - 300px)` : `100vw`,
      }}>
        <div className="rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 ">
          {children}
        </div>
        <Footer />
      </div>
    </div>
  );
}
export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        EduStream
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm shrink-0" />
    </Link>
  );
};

// Dummy dashboard component with content
// const Dashboard = () => {
//   return (
//     <div className="flex flex-1">
//       <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
//         <div className="flex gap-2">
//           {[...new Array(4)].map((i) => (
//             <div
//               key={"first-array" + i}
//               className="h-20 w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse"
//             ></div>
//           ))}
//         </div>
//         <div className="flex gap-2 flex-1">
//           {[...new Array(2)].map((i) => (
//             <div
//               key={"second-array" + i}
//               className="h-full w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse"
//             ></div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };
