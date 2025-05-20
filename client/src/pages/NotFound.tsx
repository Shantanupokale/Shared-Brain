import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

// Reuse animation variants from Hero section
const fadeInUp = {
  hidden: { opacity: 0, y: 40, scale: 0.98 },
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

const NotFound: React.FC = () => {
  return (
    <section className="bg-[#3b73ed] h-[100vh] flex items-center justify-center px-4 text-center">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.2,
              delayChildren: 0.3
            }
          }
        }}
        className="max-w-xl mx-auto"
      >
        <motion.h1
          variants={fadeInUp}
          className="text-white text-6xl sm:text-7xl lg:text-8xl font-extrabold mb-6 leading-tight tracking-tight font-satoshi"
        >
          404
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          className="text-black text-base sm:text-lg md:text-xl font-inter mb-10"
        >
          Oops! The page you're looking for doesn't exist or has been moved.
        </motion.p>

        <motion.div variants={fadeInUp}>
          <Link
            to="/"
            className="inline-flex items-center px-6 py-4 bg-black text-white rounded-full text-sm sm:text-base font-medium shadow-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:bg-gradient-to-r hover:from-black hover:to-gray-800"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go back to Home
          </Link>
        </motion.div>

        {/* Optional: tags for continuity */}
        <motion.div
          className="mt-12 flex justify-center flex-wrap gap-4 text-white text-sm sm:text-base"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.6
              }
            }
          }}
        >
          {["Capture Instantly", "Organize Smartly", "Recall Effortlessly"].map((tag, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-2 font-grotesk"
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120 } }
              }}
            >
              <div className="w-4 h-4 bg-gray-200 rounded-full flex items-center justify-center shadow-sm">
                <span className="text-black text-xs">●</span>
              </div>
              <span>{tag}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default NotFound;
