"use client";

import React from "react";
import { motion } from "framer-motion";

// Enhanced animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const cardVariant = {
  hidden: { 
    opacity: 0, 
    y: 40,
    scale: 0.95,
    rotate: -1
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 100,
      duration: 0.7
    },
  },
  hover: {
    y: -8,
    scale: 1.03,
    rotate: 0.5,
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 10,
      duration: 0.3
    }
  },
  tap: {
    scale: 0.98,
    rotate: -0.5
  }
};

const titleVariant = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
      duration: 0.8
    }
  }
};

const subtitleVariant = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2,
      duration: 0.6
    }
  }
};

const iconVariant = {
  hidden: { scale: 0.8, opacity: 0, rotate: -15 },
  show: {
    scale: 1,
    opacity: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 10
    }
  },
  hover: {
    scale: 1.1,
    rotate: [0, 5, -5, 0],
    transition: {
      duration: 0.6
    }
  }
};

const LoveSection: React.FC = () => {
  return (
    <section
      className="py-16 px-4 bg-[#3b73ed] overflow-hidden"
      role="region"
      aria-label="Who this Second Brain is built for"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={container}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={titleVariant}
            className="text-3xl text-black md:text-4xl font-bold mb-4 font-satoshi"
          >
            Built for Every <span className="text-white">Mind</span>
          </motion.h2>
          <motion.p 
            variants={subtitleVariant}
            className="text-gray-800 font-medium max-w-2xl mx-auto font-inter"
          >
            Whether you're capturing inspiration or researching deeply, your second brain keeps everything organized and within reach.
          </motion.p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid md:grid-cols-3 gap-8"
        >
          {/* Content Creators */}
          <motion.article
            variants={cardVariant}
            whileHover="hover"
            whileTap="tap"
            className="bg-white p-6 md:p-8 rounded-2xl shadow-md hover:shadow-lg transition-all border-2 border-black cursor-default"
            aria-label="For Content Creators"
          >
            <motion.div 
              variants={iconVariant}
              whileHover="hover"
              className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4"
            >
              <span className="text-blue-600 text-xl" role="img" aria-label="Camera emoji">
                📸
              </span>
            </motion.div>
            <h3 className="text-xl font-bold mb-2 font-grotesk">Content Creators</h3>
            <p className="text-gray-600 font-inter">
              Save tweets, inspiration, video links & quotes to fuel your next idea.
              Stay creative with your personal knowledge vault.
            </p>
          </motion.article>

          {/* Lifelong Learners */}
          <motion.article
            variants={cardVariant}
            whileHover="hover"
            whileTap="tap"
            className="bg-white p-6 md:p-8 rounded-2xl shadow-md hover:shadow-lg transition-all border-2 border-black cursor-default"
            aria-label="For Lifelong Learners"
          >
            <motion.div 
              variants={iconVariant}
              whileHover="hover"
              className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4"
            >
              <span className="text-blue-600 text-xl" role="img" aria-label="Book emoji">
                📚
              </span>
            </motion.div>
            <h3 className="text-xl font-bold mb-2 font-grotesk">Lifelong Learners</h3>
            <p className="text-gray-600 font-inter">
              Capture URLs, YouTube videos, and article summaries so nothing
              gets lost. Build your second brain as you explore.
            </p>
          </motion.article>

          {/* Knowledge Workers */}
          <motion.article
            variants={cardVariant}
            whileHover="hover"
            whileTap="tap"
            className="bg-white p-6 md:p-8 rounded-2xl shadow-md hover:shadow-lg transition-all border-2 border-black cursor-default"
            aria-label="For Knowledge Workers"
          >
            <motion.div 
              variants={iconVariant}
              whileHover="hover"
              className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4"
            >
              <span className="text-blue-600 text-xl" role="img" aria-label="Laptop emoji">
                💻
              </span>
            </motion.div>
            <h3 className="text-xl font-bold mb-2 font-grotesk">Knowledge Workers</h3>
            <p className="text-gray-600 font-inter">
              Structure your thoughts, save research, and find ideas quickly.
              Boost productivity with a system that thinks with you.
            </p>
          </motion.article>
        </motion.div>
      </div>
    </section>
  );
};

export default LoveSection;