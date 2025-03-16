
"use client";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import HomepageView from "@/components/homepage/homepage";
import  MainScreen  from "@/components/mainScreen/mainScreen";

export default function Homepage() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  return (
    <div className=" ">
      {isAuthenticated ? <MainScreen /> : <HomepageView />}
    </div>
  );
}

