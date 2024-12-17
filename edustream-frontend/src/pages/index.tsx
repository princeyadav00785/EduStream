"use client";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { FloatingNav } from "@/components/ui/floating-navbar";
import * as React from "react";
import {NavItems} from "../constants/navItems";
import { Hero1 } from "@/components/homepage/hero1";
import { Hero2 } from "@/components/homepage/hero2";
import { Hero5 } from "@/components/homepage/hero5";
import { Hero3 } from "@/components/homepage/hero3";
import { Hero4 } from "@/components/homepage/hero4";

export default function Homepage(){
    return (
        <div>
         <FloatingNav navItems={NavItems}/>   
          <div className="flex justify-center items-center bg-black h-[100vh] lg:h-[125vh]">
          <Hero1/>
          </div>
          <Hero2/>
          <Hero3/>
          <Hero5/>
          <Hero4/>
        </div>
    )
}