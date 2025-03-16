"use client";
import * as React from "react";
import FeaturesSectionDemo from "../features-section-demo-2";
import { TracingBeam } from "../ui/tracing-beam";


export function Hero5(){
    return (
        <div className=" bg-black ">
        <TracingBeam className="max-w-7xl pl-8 sm:pl-14 md:pl-0 lg:pl-0">
        <FeaturesSectionDemo />
        </TracingBeam>
        </div>
    )
}