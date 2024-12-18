import About from "@/components/about/about";
import Footer from "@/components/footer/footer";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { NavItems } from "@/constants/navItems";
import React from "react";

const AboutUs = () => {
  return (
    <div>
      <FloatingNav navItems={NavItems}/>
      <About/>
      <Footer/>
    </div>
  );
};

export default AboutUs;
