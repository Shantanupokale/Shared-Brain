"use client";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  openSigninModal: () => void;
  openSignupModal: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ openSigninModal, openSignupModal }) => {
  const navigate = useNavigate();

  return (
    <nav className="flex items-center justify-between bg-white-600 py-2 mt-6 px-3 md:px-12 border-b backdrop-blur-md bg-white/30 border-white/30 shadow-lg rounded-full fixed top-0 left-1/2 transform -translate-x-1/2 w-[80vw] z-50 font-inter">
      <div className="flex items-center">
        <div
          onClick={() => navigate("/")}
          className="flex items-center text-white font-bold text-xl font-grotesk cursor-pointer hover:text-white  transition-all duration-300 transform"
        >
          <span className="text-white-500 mr-1">●</span> SecondBrain
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {/* Login/Signup Buttons */}
        <button
          onClick={openSigninModal} // Open Signin Modal
          className="text-black font-bold hover:text-black transition-colors duration-300 hover:scale-105 font-satoshi"
        >
          Login
        </button>
        <Button
          onClick={openSignupModal} // Open Signup Modal
          className="bg-blue-600 hover:bg-black text-white px-6 py-3 rounded-full text-base transition-all duration-300 transform  font-satoshi"
        >
          Sign Up
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
