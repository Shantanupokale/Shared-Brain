"use client";
import { useState } from "react";
import Navbar from "../components/LandingComponents/Navbar";
import HeroSection from "../components/LandingComponents/HeroSection";
import FeaturesSection from "../components/LandingComponents/FeaturesSection";
import LoveSection from "../components/LandingComponents/LoveSection";
import Footer from "../components/LandingComponents/Footer";
import SigninModal from "../components/LandingComponents/SigninModal";  // Import SigninModal
import SignupModal from "../components/LandingComponents/SignupModal";  // Import SignupModal

export default function LandingPage() {
  const [isSigninModalOpen, setSigninModalOpen] = useState(false);
  const [isSignupModalOpen, setSignupModalOpen] = useState(false);

  // Modal Open/Close handlers
  const openSigninModal = () => setSigninModalOpen(true);
  const closeSigninModal = () => setSigninModalOpen(false);

  const openSignupModal = () => setSignupModalOpen(true);
  const closeSignupModal = () => setSignupModalOpen(false);

  const switchToSignup = () => {
    closeSigninModal();
    openSignupModal();
  };

  const switchToSignin = () => {
    closeSignupModal();
    openSigninModal();
  };

  return (
    <div className="font-sans text-gray-900 scroll-smooth">

      <Navbar openSigninModal={openSigninModal} openSignupModal={openSignupModal} />
      <HeroSection />
      <FeaturesSection />
      <LoveSection />
      <Footer />

      {/* Modals */}
      {isSigninModalOpen && (
        <SigninModal onClose={closeSigninModal} onSwitchToSignup={switchToSignup} />
      )}
      {isSignupModalOpen && (
        <SignupModal onClose={closeSignupModal} onSwitchToSignin={switchToSignin} />
      )}
    </div>
  );
}
