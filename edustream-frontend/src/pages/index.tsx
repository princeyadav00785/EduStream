"use client";
import { FloatingNav } from "@/components/ui/floating-navbar";
import * as React from "react";
import {NavItems} from "../constants/navItems";
import { Hero1 } from "@/components/homepage/hero1";
import { Hero2 } from "@/components/homepage/hero2";
import { Hero5 } from "@/components/homepage/hero5";
import { Hero3 } from "@/components/homepage/hero3";
import { Hero4 } from "@/components/homepage/hero4";
import Footer from "@/components/footer/footer";

export default function Homepage(){
    return (
        <div className=" ">
         <FloatingNav navItems={NavItems}/>   
          <Hero1/>
          <Hero2/>
          <Hero3/>
          <Hero5/>
          <Hero4/>
          <Footer/>
        </div>
    )
}
