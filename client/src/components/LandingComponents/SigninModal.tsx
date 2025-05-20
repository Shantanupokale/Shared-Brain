

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

interface SigninModalProps {
  onClose: () => void;
  onSwitchToSignup: () => void;
}

export default function SigninModal({ onClose, onSwitchToSignup }: SigninModalProps) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const signinMutation = useMutation({
    mutationFn: async () => {
      const res = await axiosInstance.post("/user/signin", { username, password });
      return res.data;
    },
    onSuccess: (data) => {
      toast.success("Logged in successfully!");
      localStorage.setItem("token", data.token);
      setTimeout(() => {
        navigate("/dashboard");
        onClose();
      }, 500);
    },
    onError: () => {
      toast.error("Invalid credentials!");
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    signinMutation.mutate();
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
              Welcome Back
            </h2>
            <p className="text-black/70 text-sm font-inter">
              Log in to access your Second Brain.
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-black text-white hover:bg-gray-900 transition mt-2 font-satoshi py-3"
              disabled={signinMutation.isPending}
            >
              {signinMutation.isPending ? "Signing In..." : "Sign In"}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-sm text-center text-black/70 font-inter">
            New here?{" "}
            <button
              onClick={() => { onSwitchToSignup(); onClose(); }}
              className="text-black underline hover:text-black/80 font-medium"
            >
              Create an Account
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}