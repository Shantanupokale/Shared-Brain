
// added framer motion
"use client";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface NavbarProps {
  openSigninModal: () => void;
  openSignupModal: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ openSigninModal, openSignupModal }) => {
  const navigate = useNavigate();

  return (
    <div className="fixed top-6 left-0 right-0 flex justify-center w-full z-50">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between bg-white-600 py-2 px-4 md:px-12 border-b backdrop-blur-md bg-white/30 border-white/30 shadow-lg rounded-full w-[90vw] md:w-[80vw] font-inter"
      >
        {/* Logo with subtle hover animation */}
        <motion.div
          onClick={() => navigate("/")}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center text-white font-bold text-xl font-grotesk cursor-pointer hover:text-white transition-all duration-300"
        >
          <span className="text-white-500 mr-1">●</span> SecondBrain
        </motion.div>

        {/* Right side buttons */}
        <motion.div
          className="flex items-center space-x-4"
          initial={{ x: 10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {/* Login button */}
          <motion.button
            onClick={openSigninModal}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:inline text-black font-bold hover:text-black transition-colors duration-300 hover:scale-105 font-satoshi"
          >
            Login
          </motion.button>

          {/* Register button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={openSignupModal}
              className="bg-blue-600 hover:bg-black text-white px-6 py-2 md:py-3 rounded-full text-sm md:text-base transition-all duration-300 font-satoshi"
            >
              Register
            </Button>
          </motion.div>
        </motion.div>
      </motion.nav>
    </div>
  );
};

export default Navbar;