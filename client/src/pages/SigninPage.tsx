import { useNavigate } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { FormEvent } from "react"

export default function SigninPage() {
  const navigate = useNavigate()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    // Simulate successful login
    setTimeout(() => {
      navigate("/dashboard")
    }, 500)
  }

  const goToSignup = () => {
    navigate("/signup")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#3B73ED] font-sans relative px-4">
      {/* 🔙 Back Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-4 right-4 text-white font-medium text-sm hover:underline"
      >
        ← Back to Home
      </button>

      {/* Centered Signin Form */}
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg px-10 py-12">
        <h2 className="text-3xl font-bold text-black mb-2 font-satoshi">Welcome Back</h2>
        <p className="text-black/70 text-sm mb-8 font-inter">
          Log in to access your Second Brain.
        </p>

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

          <Button
            type="submit"
            className="w-full bg-black text-white hover:bg-gray-900 transition mt-4 font-satoshi"
          >
            Sign In
          </Button>
        </form>

        <p className="mt-8 text-sm text-center text-black/70 font-inter">
          New here?{" "}
          <button
            onClick={goToSignup}
            className="text-black underline hover:text-black/80"
          >
            Create an Account
          </button>
        </p>
      </div>
    </div>
  )
}
