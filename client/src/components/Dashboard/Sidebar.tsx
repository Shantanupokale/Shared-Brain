"use client"

import { useState } from "react"
import { Home, Youtube, Twitter, Search , LinkIcon, LogOut, Menu, X, Github, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { motion } from "framer-motion"


interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const tabs = [
    { id: "all", name: "All Content", icon: <Home className="w-5 h-5" /> },
    { id: "search", name: "Search", icon: <Search className="w-5 h-5" /> }, // ✅ New item
    { id: "youtube", name: "YouTube", icon: <Youtube className="w-5 h-5" /> },
    { id: "twitter", name: "Twitter", icon: <Twitter className="w-5 h-5" /> },
    { id: "url", name: "URLs", icon: <LinkIcon className="w-5 h-5" /> },
  ]

  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("token")
    toast.success("Logged out successfully")
    navigate("/")
  }
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev)
  }

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-40">
        <Button
          onClick={toggleMobileMenu}
          variant="default"
          size="icon"
          className="bg-[#3b73ed] hover:bg-[#2a5cc9]"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:bg-[#3B73ED] lg:pt-6 lg:shadow-lg lg:shadow-black/20  rounded-r-xl border-r-4  border-black">
        <div className="flex items-center justify-center px-6">
          <div className="bg-[#fafcff] p-2 rounded-full" />
          <h1 className="ml-2 text-xl font-bold font-grotesk text-white">SecondBrain</h1>
        </div>

        <nav className="mt-8 flex-1 flex flex-col overflow-y-auto px-4 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                activeTab === tab.id
                  ? "bg-white text-black"
                  : "text-white/80 hover:bg-blue-400 hover:text-white"
              }`}
            >
              {tab.icon}
              <span className="ml-3 font-inter">{tab.name}</span>
            </button>
          ))}
        </nav>

        <div className="px-4 mt-6 mb-6">
          <button
  onClick={() => window.open('https://github.com/Shantanupokale/Shared-Brain', '_blank')}
  className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium rounded-xl text-white hover:bg-green-500 transition-colors mb-2"
>
  <div className="flex items-center">
    <Github className="w-5 h-5" />
    <span className="ml-3 font-inter">Star on GitHub</span>
  </div>
  <ArrowUpRight className="w-4 h-4 opacity-70" />
</button>
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 text-sm font-medium rounded-xl text-white hover:bg-red-500 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="ml-3 font-inter">Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {isMobileMenuOpen && (
  <div className="fixed inset-0 z-50 bg-black/50">
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed inset-y-0 left-0 w-64 bg-white p-6"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold font-grotesk text-[#3b73ed]">SecondBrain</h1>
        <Button
          onClick={toggleMobileMenu}
          variant="ghost"
          size="icon"
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </Button>
      </div>

      <nav className="mt-8 space-y-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id)
              setIsMobileMenuOpen(false)
            }}
            className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-md transition-colors ${
              activeTab === tab.id
                ? "bg-blue-100 text-[#3b73ed]"
                : "text-black/80 hover:bg-blue-50"
            }`}
          >
            {tab.icon}
            <span className="ml-3 font-inter">{tab.name}</span>
          </button>
        ))}

        <button
  onClick={() => {
    window.open('https://github.com/Shantanupokale/Shared-Brain', '_blank')
    setIsMobileMenuOpen(false)
  }}
  className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium rounded-md text-gray-800 hover:bg-green-100 transition-colors"
>
  <div className="flex items-center">
    <Github className="w-5 h-5" />
    <span className="ml-3 font-inter">Star on GitHub</span>
  </div>
  <ArrowUpRight className="w-4 h-4 opacity-70" />
</button>

        <button
          onClick={handleLogout}
          className="flex items-center w-full mt-6 px-4 py-3 text-sm font-medium rounded-md text-red-500 hover:bg-red-100 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="ml-3 font-inter">Logout</span>
        </button>
      </nav>
    </motion.div>
  </div>
)}

    </>
  )
}

export default Sidebar
