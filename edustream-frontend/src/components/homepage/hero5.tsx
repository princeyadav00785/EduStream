"use client";
import * as React from "react";
import FeaturesSectionDemo from "../features-section-demo-2";
import { Meteors } from "../ui/meteors";

export function Hero5(){
    return (
        <div className="h-[150vh] md:h-[100vh] lg:h-[65vh] w-full bg-black ">
           <FeaturesSectionDemo />
           <Meteors number={50} />
        </div>
    )
}