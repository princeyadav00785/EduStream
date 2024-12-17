"use client";
import * as React from "react";
import { AnimatedTestimonials } from "../ui/animated-testimonials";
import { Meteors } from "../ui/meteors";

export function Hero3(){
    const testimonials = [
        {
          quote:
            "Edustream transformed the way I teach. The real-time interaction keeps my students engaged like never before!",
          name: "Sarah L.",
          designation: "Educator",
          src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
          quote:
            "As a student, I feel more connected with my peers and instructors, even in a virtual setup. Edustream is a game-changer!",
          name: "James K.",
          designation: "Student",
          src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
          quote:
            "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
          name: "James Kim",
          designation: "Engineering Lead at DataPro",
          src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
          quote:
            "The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.",
          name: "Lisa Thompson",
          designation: "VP of Technology at FutureNet",
          src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
          quote:
            "Edustream made virtual learning as effective as an in-person classroom. My grades improved significantly!",
          name: "Emily Watson",
          designation: "Student",
          src: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=2588&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
          quote:
            "Our institution adopted Edustream, and it has revolutionized our approach to blended learning. Faculty and students love it.",
          name: "Sophia Nguyen",
          designation: "Dean at Urban College",
          src: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?q=80&w=3440&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
      ];
      
 return (
    <div className="bg-black">
         <div className="p-10 font-serif font-extrabold text-5xl text-white flex justify-center items-center"> Testimonials</div>
        <AnimatedTestimonials testimonials={testimonials} />
    </div>
 )
}