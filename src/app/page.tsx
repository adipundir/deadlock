"use client";
import React, { useEffect, useState } from "react";
import { Vortex } from "@/components/ui/vortex";
import { FlipWords } from "@/components/ui/flip-words";
import { Header } from "@/components/ui/hero-parallax";
import { GlobeDemo } from "@/components/Globe/Globe";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { motion } from "framer-motion";
import Link from "next/link";

const words = ["Passwords", "Seed Phrase", "Secrets", "Photos", "Anything"];

export default function Home() {
  // const [isClient, setIsClient] = useState(false);

  // useEffect(() => {
  //   setIsClient(true);
  // }, []);

  return (
    <div className="w-full overflow-hidden">
      <div className="bg-black h-screen">
        <Vortex
          backgroundColor="black"
          rangeY={300}
          particleCount={600}
          baseSpeed={-0.2}
          rangeRadius={3}
          className="flex items-center justify-center px-2 md:px-10 py-4 w-full h-full"
        >
          <div className="md:p-8 p-2 rounded-3xl">
            <h2 className="text-white text-5xl md:text-7xl font-bold text-center outline-8 drop-shadow-md">
              Store <FlipWords words={words} duration={2000} className="text-white font-thin" />
            </h2>
            <p className="text-white text-md md:text-2xl max-w-xl mt-6 font-thin text-center outline-8 drop-shadow-md">
              and get it delivered to your loved ones after you.
            </p>
            <div className="flex flex-col justify-center sm:flex-row items-center gap-4 mt-6">
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition duration-200 rounded-lg text-white shadow-[0px_2px_0px_0px_#FFFFFF40_inset]">
                Try DeadLock
              </button>
              <button className="px-4 py-2 text-white">Watch Demo</button>
            </div>
          </div>
        </Vortex>
      </div>
      <div className="md:grid w-full grid-rows-1 md:grid-cols-2 md:px-10 justify-center items-center">
        <Header
          text="No trust factor"
          subtext="Period."
          description="All your data is permanently and securely stored on the blockchain, making it tamper-proof and preserved forever with end-to-end encryption."
        />
        {/* {isClient && window.innerWidth > 768 && <GlobeDemo />} */}
        <GlobeDemo />
      </div>
      <div className="bg-black">
        <AuroraBackground className="bg-black">
          <motion.div
            initial={{ opacity: 0.0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut"
            }}
            className="relative flex flex-col gap-4 items-center justify-center px-4"
          >
            <div className="text-3xl md:text-7xl font-bold text-white text-center">
              Meet the Devs.
            </div>
            <div className="font-extralight text-base md:text-4xl text-neutral-200 py-4">
              Maybe buy them a Coffee? 🤔
            </div>
            <button className="bg-black backdrop-blur-sm dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2">
              <Link href={"https://x.com/0xDeadxLock"}>DeadLock - twitter</Link>
            </button>
          </motion.div>
        </AuroraBackground>
      </div>
    </div>
  );
}
