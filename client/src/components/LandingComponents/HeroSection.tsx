
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// //to be used for framer motion 

"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// Animation Variants
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const fadeInUp = {
  hidden: { 
    opacity: 0, 
    y: 40,
    scale: 0.98
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 100,
      duration: 0.8
    }
  }
};

const featureTagVariant = {
  hidden: { 
    opacity: 0,
    y: 20,
    x: -10
  },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 12
    }
  }
};

const dotVariant = {
  hidden: { scale: 0 },
  visible: {
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 10
    }
  }
};

const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-[#3b73ed] h-[100vh] px-4 flex flex-col justify-center overflow-hidden">
      {/* Main Content */}
      <motion.div
        className="max-w-6xl mx-auto text-center px-4 sm:px-6 lg:px-8"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Heading */}
        <motion.h1
          variants={fadeInUp}
          className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 mt-16 leading-tight tracking-tight font-satoshi"
        >
          Capture Ideas Instantly,
          <br className="hidden sm:block" />
          <motion.span 
            className="inline-block"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Access Knowledge Seamlessly
          </motion.span>
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={fadeInUp}
          className="text-black max-w-2xl mx-auto mt-10 pt-6 mb-16 text-sm sm:text-base md:text-lg font-inter"
        >
          Build your digital second brain to manage notes, bookmarks, tasks,
          and ideas — all in one place. Stay organized, focused, and in flow.
        </motion.p>

        {/* Buttons */}
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.6
              }
            }
          }}
          className="flex justify-center gap-4 sm:gap-6 flex-wrap mb-16"
        >
          <motion.div variants={fadeInUp}>
            <Button
              size="lg"
              className="bg-black text-white rounded-full px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:bg-gradient-to-r hover:from-black hover:to-gray-800"
              onClick={() => navigate("/dashboard")}
            
          
            >
              Start Building Your Brain 🧠
            </Button>
          </motion.div>
          <motion.div variants={fadeInUp}>
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
      </motion.div>

      {/* Feature Tags */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-6xl mx-auto flex justify-center gap-x-8 gap-y-4 flex-wrap text-white text-sm sm:text-base text-center px-4"
      >
        {[
          "Capture Instantly",
          "Organize Smartly",
          "Recall Effortlessly",
          "Sync Everything",
          "Tag & Link Ideas",
        ].map((label, i) => (
          <motion.div
            key={i}
            className="flex items-center gap-2 sm:gap-3"
            variants={featureTagVariant}
            custom={i}
          >
            <motion.div 
              variants={dotVariant}
              className="w-5 h-5 sm:w-6 sm:h-6 bg-gray-200 rounded-full flex items-center justify-center shadow-sm"
            >
              <span className="text-black text-xs">●</span>
            </motion.div>
            <span className="font-grotesk">{label}</span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default HeroSection;