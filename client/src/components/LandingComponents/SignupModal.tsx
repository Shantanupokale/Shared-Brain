import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

interface SignupModalProps {
  onClose: () => void; // Prop to close the modal
  onSwitchToSignin: () => void; // Prop to switch to the signin modal
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
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-xl w-full max-w-md relative">
        <h2 className="text-3xl font-bold text-black mb-2 font-satoshi">Join Second Brain</h2>
        <p className="text-black/70 text-sm mb-8 font-inter">Save tweets, organize links, and declutter your mind.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="username" className="text-sm text-black font-inter">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="johndoe"
              className="bg-gray-100 mt-1 text-black font-inter"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="password" className="text-sm text-black font-inter">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              className="bg-gray-100 mt-1 text-black font-inter"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-black text-white hover:bg-gray-900 transition mt-4 font-satoshi"
          >
            Create Account
          </Button>
        </form>

        <p className="mt-8 text-sm text-center text-black/70 font-inter">
          Already have an account?{" "}
          <button
            onClick={() => { onSwitchToSignin(); onClose(); }}
            className="text-black underline hover:text-black/80"
          >
            Sign In
          </button>
        </p>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl text-gray-600 hover:text-black transition"
        >
          ×
        </button>
      </div>
    </div>
  );
}
