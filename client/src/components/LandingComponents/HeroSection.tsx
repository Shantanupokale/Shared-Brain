"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// Motion Variants
const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-[#3b73ed]   h-[100vh] px-4 flex flex-col justify-center">
      {/* Heading, Description, Buttons */}
      <motion.div
        className="max-w-6xl mx-auto text-center px-4 sm:px-6 lg:px-8"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        {/* Heading */}
        <motion.h1
          variants={fadeInUp}
          className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 mt-16 leading-tight tracking-tight font-satoshi"
        >
          Capture Ideas Instantly,
          <br className="hidden sm:block" />
          Access Knowledge Seamlessly
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={fadeInUp}
          className="text-black  max-w-2xl mx-auto mt-10 pt-6 mb-16 text-sm sm:text-base md:text-lg font-inter"
        >
          Build your digital second brain to manage notes, bookmarks, tasks,
          and ideas — all in one place. Stay organized, focused, and in flow.
        </motion.p>

        {/* Buttons */}
        <motion.div
          variants={fadeInUp}
          className="flex justify-center gap-4 sm:gap-6 flex-wrap mb-16"
        >
          <Button
            size="lg"
            className="bg-black text-white rounded-full px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:bg-gradient-to-r hover:from-black hover:to-gray-800"
            onClick={() => navigate("/signup")}
          >
            Start Building Your Brain 🧠
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-black text-black rounded-full px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100"
            onClick={() => navigate("/demo")}
          >
            Explore a Live Demo
          </Button>
        </motion.div>
      </motion.div>

      {/* Feature Tags - moved outside the above container */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        className="max-w-6xl mx-auto  flex justify-center gap-x-8 gap-y-4 flex-wrap text-white text-sm sm:text-base text-center px-4"
      >
        {[
          "Capture Instantly",
          "Organize Smartly",
          "Recall Effortlessly",
          "Sync Everything",
          "Tag & Link Ideas",
        ].map((label, i) => (
          <div
            key={i}
            className="flex items-center gap-2 sm:gap-3"
          >
            <div className="w-5 h-5  sm:w-6 sm:h-6 bg-gray-200 rounded-full flex items-center justify-center shadow-sm">
              <span className="text-black text-xs">●</span>
            </div>
            <span className="font-grotesk">{label}</span>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default HeroSection;
