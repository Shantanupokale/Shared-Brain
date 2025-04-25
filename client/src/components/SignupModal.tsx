import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FormEvent } from "react";
import toast from "react-hot-toast"; // Import toast

interface SignupModalProps {
  onClose: () => void;  // Prop to close the modal
  onSwitchToSignin: () => void;  // Prop to switch to the signin modal
}

export default function SignupModal({ onClose, onSwitchToSignin }: SignupModalProps) {
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Simulate successful signup
    toast.success("Account created successfully!");
    setTimeout(() => {
      navigate("/");
      onClose(); // Close modal after submitting
    }, 500);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-xl w-full max-w-md relative">
        <h2 className="text-3xl font-bold text-black mb-2 font-satoshi">Join Second Brain</h2>
        <p className="text-black/70 text-sm mb-8 font-inter">Save tweets, organize links, and declutter your mind.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="username" className="text-sm text-black font-inter">
              Username
            </Label>
            <Input
              id="username"
              type="text"
              placeholder="johndoe"
              className="bg-gray-100 mt-1 text-black font-inter"
              required
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
              className="bg-gray-100 mt-1 text-black font-inter"
              required
            />
          </div>
          <Button type="submit" className="w-full bg-black text-white hover:bg-gray-900 transition mt-4 font-satoshi">
            Create Account
          </Button>
        </form>

        <p className="mt-8 text-sm text-center text-black/70 font-inter">
          Already have an account?{" "}
          <button
            onClick={() => { onSwitchToSignin(); onClose(); }} // Switch to signin and close current modal
            className="text-black underline hover:text-black/80"
          >
            Sign In
          </button>
        </p>

        {/* Close Button (×) */}
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
