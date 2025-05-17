"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

// Animation Variants
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

const cardItem = {
  hidden: { 
    opacity: 0, 
    y: 40,
    scale: 0.95
  },
  show: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 100,
      duration: 0.7
    }
  },
  hover: {
    y: -5,
    scale: 1.02,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 10
    }
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

const FeaturesSection: React.FC = () => {
  return (
    <section className="py-16 px-4 bg-[#3b73ed] text-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={titleVariant}
            className="text-4xl md:text-5xl pt-6 font-medium leading-snug font-satoshi text-white"
          >
            Unlock the Power of Your Knowledge
            <br />
            <motion.span 
              className="text-blue-200 inline-block"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Organize. Store. Access.
            </motion.span>
          </motion.h2>
          <motion.p 
            variants={subtitleVariant}
            className="text-black/80 font-medium mt-4 font-inter max-w-xl mx-auto py-6"
          >
            A second brain for your links, ideas, and inspiration — designed to help students and indie devs stay organized and focused.
          </motion.p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid md:grid-cols-4 gap-6 py-6"
        >
          {/** Feature Cards */}
          {[
            {
              title: "Start Organizing Your Links Today",
              desc: "Get started with your second brain — organize, store, and access all your important resources in one place.",
            },
            {
              title: "Keep Your Links and Ideas Organized",
              desc: "Easily categorize and store your links, ideas, and notes. Retrieve them instantly whenever you need them.",
            },
            {
              title: "Add Links, Notes, and Media for Quick Access",
              desc: "Embed links, YouTube videos, articles, or code snippets to each resource for easy reference at any time.",
            },
            {
              title: "Collaborate with Peers and Teammates",
              desc: "Share your knowledge and work together with classmates, fellow developers, or teammates effortlessly.",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              variants={cardItem}
              whileHover="hover"
              className="h-full"
            >
              <Card className="bg-white text-black p-6 rounded-3xl shadow-xl border border-black h-full transition-all">
                <CardContent className="p-0 flex flex-col justify-between h-full">
                  <div>
                    <h3 className="text-lg font-bold mb-3 font-satoshi text-black">
                      {feature.title}
                    </h3>
                    <p className="text-gray-700 text-sm font-inter">
                      {feature.desc}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;