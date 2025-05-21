

"use client"

import { useState ,useEffect  } from "react"
import { useNavigate } from "react-router-dom"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { Plus, Share, Loader2, Search } from "lucide-react"
import Sidebar from "./Sidebar"
import ContentCard from "./ContentCard"
import AddContentModal from "./AddContentModal"
import ShareBrainModal from "./ShareBrainModal"
import { Button } from "@/components/ui/button"
import axios from "axios"
import { motion  } from "framer-motion"
import toast from "react-hot-toast"


interface Content {
  _id: string
  title: string
  link: string
  type: string
  description: string
  userId: string
  tags: string[]
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}


const fetchContents = async (activeTab: string, searchQuery: string): Promise<Content[]> => {
  const params: Record<string, string> = {}
  const token = localStorage.getItem("token")
  if (!token) throw new Error("No auth token found")

  if (activeTab !== "all" && activeTab !== "search") {
    params.type = activeTab
  }

  if (activeTab === "search" && searchQuery) {
    params.search = searchQuery
  }

  try {
    const response = await axios.get("https://shared-brain-alpha.vercel.app/api/v1/content", {
      params,
      headers: {
        'Authorization': token,
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
      },
    })
    return response.data.content
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch content")
  }
}

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("all")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const navigate=useNavigate();
  useEffect(() => {
  const handleStorage = () => {
    if (!localStorage.getItem("token")) {
      navigate("/");
       toast.success("Logged out successfully")
    }
  };
  window.addEventListener("storage", handleStorage);
  return () => window.removeEventListener("storage", handleStorage);
}, [navigate]);

  const queryClient = useQueryClient()

  const { data: contents, isLoading, error } = useQuery({
    queryKey: ['contents', activeTab, searchQuery],
    queryFn: () => fetchContents(activeTab, searchQuery),
  })

  const deleteContent = async (id: string): Promise<void> => {
    const token = localStorage.getItem("token")
    if (!token) throw new Error("No auth token found")

    await axios.delete("https://shared-brain-alpha.vercel.app/api/v1/content", {
      headers: {
        'Authorization': token,
      },
      data: { Id: id },
    }),
    toast.success("Content deleted Successfully")

    queryClient.invalidateQueries({ queryKey: ['contents'] })
  }

  const getFilteredContents = () => {
    if (activeTab === "search") {
      return contents?.filter((content) =>
        content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        content.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        )
      ) || []
    } else if (activeTab === "all") {
      return contents || []
    } else {
      return contents?.filter((content) => content.type === activeTab) || []
    }
  }

  const filteredContents = getFilteredContents()

  return (
    <div className="min-h-screen bg-[#F6F7EE] font-inter">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="lg:pl-64">
        <div className="  sm:mx-2 sm:my-1 rounded-lg sm:rounded-3xl border-2 border-black px-6 sm:px-6 py-14 sm:py-6 bg-[#F6F7EE] min-h-screen">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <h1 className="text-2xl font-bold font-satoshi text-black capitalize">
              {activeTab === "search"
                ? "Search Content"
                : activeTab === "all"
                ? "All Content"
                : activeTab === "youtube"
                ? "YouTube Videos"
                : activeTab === "twitter"
                ? "Twitter Posts"
                : "URLs"}
            </h1>

            <div className="flex flex-row sm:flex-row gap-4 px-1 sm:gap-4 w-full sm:w-auto">
              <Button
                variant="outline"
                onClick={() => setIsShareModalOpen(true)}
                className="flex items-center justify-center gap-2 border-black hover:bg-black hover:text-white duration-300"
              >
                <Share className="h-4 w-4" />
                Share Brain
              </Button>
              <Button
                onClick={() => setIsAddModalOpen(true)}
                className="bg-[#3b73ed] hover:bg-[#2a5cc9] flex items-center justify-center gap-2 text-white"
              >
                <Plus className="h-4 w-4" />
                Add Content
              </Button>
            </div>
          </div>

          {/* Search Bar */}
          {activeTab === "search" && (
            <div className="mb-6 w-full relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black/60 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by title or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-black rounded-lg text-black bg-white placeholder:text-black/60 focus:outline-none focus:ring-2 focus:ring-[#3b73ed]"
              />
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-100 border-l-4 border-red-500 p-4 text-red-700 rounded-md">
              <p>{(error as Error).message}</p>
            </div>
          )}

          {/* Loading or Content */}
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-16 w-16 animate-spin text-[#3b73ed]" />
            </div>
          ) : filteredContents.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-md p-6 text-center">
              <h3 className="text-lg font-medium font-satoshi text-black mb-2">
                {activeTab === "search" ? "No matching results found" : "No content found"}
              </h3>
              <p className="text-black/80 mb-4">
                {activeTab === "search"
                  ? "Try searching with different keywords or tags."
                  : activeTab === "all"
                  ? "You haven't added any content yet."
                  : `You haven't added any ${activeTab} content yet.`}
              </p>
              {activeTab !== "search" && (
                <Button
                  onClick={() => setIsAddModalOpen(true)}
                  className="bg-[#3b73ed] hover:bg-[#2a5cc9] flex items-center gap-2 text-white"
                >
                  <Plus className="h-4 w-4" />
                  Add Your First Content
                </Button>
              )}
            </div>
          ) : (
           <motion.div
  key={activeTab} // 👈 ensures animation triggers on tab change
  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
  variants={containerVariants}
  initial="hidden"
  animate="visible"
>
  {filteredContents.map((content) => (
    <motion.div key={content._id} variants={cardVariants}>
      <ContentCard
        id={content._id}
        title={content.title}
        link={content.link}
        type={content.type}
        description={content.description}
        onDelete={deleteContent}
      />
    </motion.div>
  ))}
</motion.div>

          )}
        </div>
      </div>

      {/* Modals */}
      <AddContentModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
      <ShareBrainModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} />
    </div>
  )
}

export default Dashboard
