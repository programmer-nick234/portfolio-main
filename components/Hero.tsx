import React, { useState, useEffect } from "react";
import { FaDownload, FaArrowDown } from "react-icons/fa";
import { Spotlight } from "./ui/Spotlight";
import { TextGenerateEffect } from "./ui/TextGenerateEffect";

const Hero = () => {
  const name = "Nikhil Bajantri";
  const [displayedName, setDisplayedName] = useState("");
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  useEffect(() => {
    let current = 0;
    let hacked = false;
    let frameId: number | undefined;
    const animationStartTime = performance.now();
    const totalDuration = 800; // Slightly faster animation
    const charDuration = totalDuration / name.length;

    function hackStep(timestamp: number) {
      const elapsed = timestamp - animationStartTime;
      current = Math.min(name.length, Math.floor(elapsed / charDuration));

      if (current < name.length) {
        let partial = name.slice(0, current + 1);
        let randomTail = "";
        for (let i = 0; i < name.length - current - 1; i++) {
          randomTail += chars[Math.floor(Math.random() * chars.length)];
        }
        setDisplayedName(partial + randomTail);
        frameId = window.requestAnimationFrame(hackStep);
      } else if (!hacked) {
        setDisplayedName(name);
        hacked = true;
        if (frameId) window.cancelAnimationFrame(frameId);
      }
    }

    frameId = window.requestAnimationFrame(hackStep);
    return () => {
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, [name, chars]);

  // Modern Button Components
  const DownloadButton = () => (
    <a
      href="https://drive.google.com/file/d/1XNlo5DwfWAwVwkUrieNA-5rO-fgNCNas/view?usp=drive_link"
      target="_blank"
      rel="noopener noreferrer"
      className="relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-medium text-white transition duration-300 ease-out rounded-full shadow-lg group"
    >
      <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-600 to-sky-400"></span>
      <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-sky-500 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
      <span className="relative flex items-center gap-2">
        <FaDownload className="text-sm" />
        Download CV
      </span>
    </a>
  );

  const ScrollButton = () => (
    <a
      href="#about"
      className="relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-medium transition duration-300 ease-out border-2 border-sky-500 rounded-full group"
    >
      <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-sky-500 group-hover:translate-x-0 ease">
        <FaArrowDown className="text-sm" />
      </span>
      <span className="absolute flex items-center justify-center w-full h-full text-sky-500 transition-all duration-300 transform group-hover:translate-x-full ease">
        Scroll Down
      </span>
      <span className="relative invisible">Scroll Down</span>
    </a>
  );

  return (
    <section id="home" className="pt-28 lg:pt-20">
      <div className="container items-center lg:grid lg:grid-cols-2 lg:gap-10">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-zinc-400 text-sm tracking-wide">
              <span className="relative w-2 h-2 rounded-full bg-emerald-400">
                <span className="absolute inset-0 w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              </span>
              Available for work
            </div>
          </div>

          <h2 className="headline-1 text-lg sm:text-xl lg:text-2xl font-medium mt-10 mb-2">
            Hi, I'm
          </h2>

          <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold text-sky-500 mb-3 leading-tight font-mono tracking-wider">
            <span>{displayedName}</span>
            {displayedName.length < name.length && (
              <span className="animate-pulse">|</span>
            )}
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-zinc-700 dark:text-zinc-200 mb-8 lg:mb-10 max-w-[32ch]">
            A passionate Full Stack Developer crafting modern, impactful web
            experiences.
          </p>

          <div className="flex items-center gap-4">
            <DownloadButton />
            <ScrollButton />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
