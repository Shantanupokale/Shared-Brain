////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// this is for frme rmoion

import type React from "react";
import { motion } from "framer-motion";
import SignupModal from "./SignupModal";
import SigninModal from "./SigninModal";
import { useState } from "react";
import { Linkedin ,Twitter,Github } from "lucide-react";

// Animation Variants
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const fadeInUp = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 100,
      duration: 0.7,
    },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const Footer: React.FC = () => {
  const [signupOpen, setSignupOpen] = useState(false);
  const [signinOpen, setSigninOpen] = useState(false);
  return (
    <footer className="bg-[#3b73ed] pt-16 pb-8 px-4 font-inter text-black overflow-hidden">
      <div className="max-w-6xl mx-auto border-t border-white/20 pt-20 mt-20">
        {/* Hero CTA Section */}
        <motion.div
          className="mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={container}
        >
          {signupOpen && (
            <SignupModal
              onClose={() => setSignupOpen(false)}
              onSwitchToSignin={() => {
                // Handle switching logic here if needed
                setSignupOpen(false);
                setSigninOpen(true);
              }}
            />
          )}

          {signinOpen && (
            <SigninModal
              onClose={() => setSigninOpen(false)}
              onSwitchToSignup={() => {
                // Handle switching logic here if needed
                setSignupOpen(true);
                setSigninOpen(false);
              }}
            />
          )}
          <div className="text-center">
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-5xl font-medium mb-4 font-satoshi text-white"
            >
              Store All Your Knowledge, <br />
              <motion.span
                className="inline-block"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                In One Place
              </motion.span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-black/80 max-w-2xl mx-auto mb-8 font-inter font-medium"
            >
              Organize your thoughts, links, and resources with a second brain
              that helps you stay productive.
            </motion.p>
            <motion.button
              variants={fadeInUp}
              className="bg-black text-white px-6 py-3 rounded-md hover:bg-white hover:text-black transition-colors w-full md:w-auto font-satoshi font-semibold"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setSignupOpen(true);
              }}
            >
              Get Started Free
            </motion.button>
          </div>
        </motion.div>

        {/* Footer Navigation */}
        <motion.div
          className="grid md:grid-cols-5 gap-8 py-8 border-t border-white/20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={container}
        >
          <motion.div className="md:col-span-2" variants={fadeInUp}>
            <div className="flex items-center text-white font-bold text-xl mb-4 font-grotesk">
              <motion.span
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200 }}
                aria-label="Second Brain logo"
                className="text-white mr-1"
              >
                ●
              </motion.span>
              Second Brain
            </div>
            <p className="text-black/80 mb-4 font-inter font-medium">
              Keep all your links, notes, and resources connected in one space
              to boost your productivity.
            </p>
          </motion.div>

          <motion.nav aria-label="Product Navigation" variants={fadeIn}>
            <h4 className="font-semibold mb-4 font-satoshi text-white">
              Product
            </h4>
            <ul className="space-y-2 text-black font-inter font-medium">
              {["Features", "Integrations", "Pricing"].map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i }}
                >
                  <a href="#" className="hover:text-white block">
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.nav>

          <motion.nav aria-label="Company Navigation" variants={fadeIn}>
            <h4 className="font-semibold mb-4 font-satoshi text-white">
              Company
            </h4>
            <ul className="space-y-2 text-black font-inter font-medium">
              {["About Us", "Careers"].map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i }}
                >
                  <a href="#" className="hover:text-white block">
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.nav>

          <motion.nav aria-label="Resources Navigation" variants={fadeIn}>
            <h4 className="font-semibold mb-4 font-satoshi text-white">
              Resources
            </h4>
            <ul className="space-y-2 text-black font-inter font-medium">
              {["Documentation", "Help Center"].map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i }}
                >
                  <a href="#" className="hover:text-white block">
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        </motion.div>

        {/* Bottom Legal Section */}
        {/* Bottom Legal Section */}
<motion.div
  className="border-t border-white/20 pt-8 mt-8 text-sm text-black flex flex-col md:flex-row justify-between font-inter font-medium"
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6, delay: 0.3 }}
>
  <div>
    © {new Date().getFullYear()} Second Brain. All rights reserved.
  </div>

  {/* Social + Credits */}
  <div className="flex flex-col md:flex-row items-start md:items-center mt-4 md:mt-0 space-y-2 md:space-y-0 md:space-x-6">
    <div className="flex space-x-4">
      <a
        href="https://github.com/Shantanupokale"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
        className="hover:text-white"
      >
        <Github className="w-5 h-5" />
      </a>
      <a
        href="https://www.linkedin.com/in/shantanu-pokale"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        className="hover:text-white"
      >
        <Linkedin className="w-5 h-5" />
      </a>
      <a
        href="https://x.com/ShantanuPokale"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Twitter"
        className="hover:text-white"
      >
        <Twitter className="w-5 h-5" />
      </a>
    </div>

    <div className="md:ml-6">
      Made with
      <span className="mx-1 text-red-500">❤️</span>
      by Shantanu
    </div>
  </div>
</motion.div>

      </div>
    </footer>
  );
};

export default Footer;
