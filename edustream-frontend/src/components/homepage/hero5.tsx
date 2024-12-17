"use client";
import * as React from "react";
import FeaturesSectionDemo from "../features-section-demo-2";
import { Meteors } from "../ui/meteors";

export function Hero5(){
    return (
        <div className="h-[180vh] md:h-[80vh] lg:h-[45vh] w-full bg-black ">
           <FeaturesSectionDemo />
           <Meteors number={50} />
        </div>
    )
}