"use client";

import { useRouter, usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useEffect } from "react";

import HomepageView from "@/components/homepage/homepage";
import MainScreen from "@/components/mainScreen/mainScreen";

export default function Homepage() {
  const router = useRouter();
  const pathname = usePathname();

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const isAuthRoute = ["/auth/login", "/auth/register"].includes(pathname);

  useEffect(() => {
    if (isAuthenticated && isAuthRoute) {
      router.push("/");
    }
  }, [isAuthenticated, pathname]);


  if (isAuthenticated && isAuthRoute) {
    return null; 
  }

  return (
    <div>
      {isAuthenticated ? <MainScreen /> : <HomepageView />}
    </div>
  );
}
