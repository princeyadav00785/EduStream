import ContactUs from "@/components/contact/contact";
import Footer from "@/components/footer/footer";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { NavItems } from "@/constants/navItems";
import React from "react";

export default function ContactPage(){
return (
  <div className="">
    <FloatingNav navItems={NavItems}/>
    <ContactUs/>
    <Footer/>
  </div>
)
}