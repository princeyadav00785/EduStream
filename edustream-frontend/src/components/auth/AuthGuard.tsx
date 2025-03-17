"use client";

import { useRouter } from "next/router";
import { useEffect, useState, ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface Props {
  children: ReactNode;
}

const AuthGuard = ({ children }: Props) => {
  const router = useRouter();
  
  const [isMounted, setIsMounted] = useState(false);

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const protectedRoutes = ["/auth/login", "/auth/register"];

  useEffect(() => {
    setIsMounted(true);

    if (isAuthenticated && protectedRoutes.includes(router.pathname)) {
      router.push("/");
    }
  }, [isAuthenticated, router.pathname]);

  // Prevents Hydration Error
  if (!isMounted) return null;

  return <>{children}</>;
};

export default AuthGuard;
