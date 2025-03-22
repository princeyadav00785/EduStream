"use client";
import * as React from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "../ui/animated-modal";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  IconBook,
  IconVideo,
  IconCertificate,
  IconUsers,
  IconLifebuoy,
  IconChartBar,
} from "@tabler/icons-react";

export function Hero4() {
  const images = [
    // "/i1.jpg",
    // "/i2.jpg",
    "/i3.jpg",
    "/i4.jpg",
    "/i5.jpg",
    "/i6.jpg",
    "/i7.jpg",
    "/i8.jpg",
  ];
  return (
    <div className="py-40  flex flex-col items-center justify-center bg-black">
      <Modal>
        <div className="font-extrabold text-2xl md:text-4xl lg:text-5xl text-white mb-8 "> Sounds Intersting ?</div>
        <ModalTrigger className="bg-white dark:bg-white dark:text-black text-black flex justify-center group/modal-btn font-extrabold ">
          <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
          {"    "} Join Class today 
          </span>
          <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-black z-20">
           Click here{"  "} <IconVideo/>
          </div>
        </ModalTrigger>
        <ModalBody>
          <ModalContent>
            <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8 ">
              Book your first{" "}
              <span className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200">
                Class
              </span>{" "}
              now!
            </h4>
            <div className="flex justify-center items-center">
              {images.map((image, idx) => (
                <motion.div
                  key={"images" + idx}
                  style={{
                    rotate: Math.random() * 20 - 10,
                  }}
                  whileHover={{
                    scale: 1.1,
                    rotate: 0,
                    zIndex: 100,
                  }}
                  whileTap={{
                    scale: 1.1,
                    rotate: 0,
                    zIndex: 100,
                  }}
                  className="rounded-xl -mr-4 mt-4 p-1 bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-100 flex-shrink-0 overflow-hidden"
                >
                  <Image
                    src={image}
                    alt="Classes images"
                    width="500"
                    height="500"
                    className="rounded-lg h-20 w-20 md:h-40 md:w-40 object-cover flex-shrink-0"
                  />
                </motion.div>
              ))}
            </div>
            <div className="py-6 flex flex-wrap gap-x-4 gap-y-4 items-start justify-start max-w-sm mx-auto">
              <div className="flex items-center justify-center">
                <IconBook className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
                <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                  Access to 500+ courses
                </span>
              </div>
              <div className="flex items-center justify-center">
                <IconVideo className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
                <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                  Interactive live classes
                </span>
              </div>
              <div className="flex items-center justify-center">
                <IconCertificate className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
                <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                  Industry-recognized certifications
                </span>
              </div>
              <div className="flex items-center justify-center">
                <IconUsers className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
                <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                  Vibrant learning community
                </span>
              </div>
              <div className="flex items-center justify-center">
                <IconLifebuoy className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
                <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                  24/7 student support
                </span>
              </div>
              <div className="flex items-center justify-center">
                <IconChartBar className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
                <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                  Personalized progress tracking
                </span>
              </div>
            </div>
          </ModalContent>
          <ModalFooter />
        </ModalBody>
      </Modal>
    </div>
  );
}
