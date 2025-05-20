

"use client";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { motion, AnimatePresence } from "framer-motion";

interface SignupModalProps {
  onClose: () => void;
  onSwitchToSignin: () => void;
}

export default function SignupModal({ onClose, onSwitchToSignin }: SignupModalProps) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const signupMutation = useMutation({
    mutationFn: async () => {
      const res = await axiosInstance.post("/user/signup", { username, password });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Account created successfully!");
      setTimeout(() => {
        navigate("/");
        onClose();
      }, 500);
    },
    onError: () => {
      toast.error("Username already exists!");
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    signupMutation.mutate();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4"
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-white p-6 rounded-xl w-full max-w-md relative mx-4"
          style={{
            maxHeight: "90vh",
            overflowY: "auto",
          }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-2xl text-gray-600 hover:text-black transition"
            aria-label="Close modal"
          >
            ×
          </button>

          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-black mb-1 font-satoshi">
              Join Second Brain
            </h2>
            <p className="text-black/70 text-sm font-inter">
              Save tweets, organize links, and declutter your mind.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="username" className="text-sm text-black font-inter">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Username"
                className="bg-gray-50 mt-1 text-black font-inter border border-gray-200 focus:border-black"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="password" className="text-sm text-black font-inter">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="bg-gray-50 mt-1 text-black font-inter border border-gray-200 focus:border-black"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
            </div>

            <Button
              type="submit"
              className="w-full bg-black text-white hover:bg-gray-900 transition mt-2 font-satoshi py-3"
              disabled={signupMutation.isPending}
            >
              {signupMutation.isPending ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-sm text-center text-black/70 font-inter">
            Already have an account?{" "}
            <button
              onClick={() => { onSwitchToSignin(); onClose(); }}
              className="text-black underline hover:text-black/80 font-medium"
            >
              Sign In
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}