"use client"

import { useState } from "react"
import { useQuery,useQueryClient } from "@tanstack/react-query"
import { Plus, Share, Loader2 , Search } from "lucide-react"
import Sidebar from "./Sidebar"
import ContentCard from "./ContentCard"
import AddContentModal from "./AddContentModal"
import ShareBrainModal from "./ShareBrainModal"
import { Button } from "@/components/ui/button"
import axios from "axios"

interface Content {
  _id: string
  title: string
  link: string
  type: string
  description: string
  userId: string
  tags: string[]
}


const fetchContents = async (activeTab: string, searchQuery: string): Promise<Content[]> => {
  const params: Record<string, string> = {}
  const token = localStorage.getItem("token") // or your preferred method of retrieving it

  if (!token) throw new Error("No auth token found")

  if (activeTab !== "all" && activeTab !== "search") {
    params.type = activeTab
  }

  if (activeTab === "search" && searchQuery) {
    params.search = searchQuery
  }

  try {
    const response = await axios.get("http://localhost:3000/api/v1/content", {
      params,
      headers: {
        'Authorization': token, // ✅ Just the token, no Bearer
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
      },
    })

    console.log("Fetched content:", response.data.content)
    return response.data.content

  } catch (error: any) {
    console.error("Fetch error:", error.response?.data || error.message)
    throw new Error(error.response?.data?.message || "Failed to fetch content")
  }
}

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("all")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const queryClient = useQueryClient()
  // TanStack Query for fetching content
  const { data: contents, isLoading, error } = useQuery({
    queryKey: ['contents', activeTab, searchQuery],
    queryFn: () => fetchContents(activeTab, searchQuery),
    // You can add more options here like:
    // staleTime: 1000 * 60 * 5, // 5 minutes
    // retry: 3,
})

  const deleteContent = async (id: string): Promise<void> => {
     
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No auth token found");

  await axios.delete("http://localhost:3000/api/v1/content", {
    headers: {
      'Authorization': token,
    },
    data: { Id: id }, // axios allows sending body with DELETE via `data`

  });
  queryClient.invalidateQueries({ queryKey: ['contents'] })
};




  const getFilteredContents = () => {
    if (activeTab === "search") {
      return contents?.filter((content) => {
        return (
          content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          content.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )
        )
      }) || []
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
        <div className="max-w-8xl m-2 rounded-3xl border-2 border-black px-4 sm:px-6 lg:px-8 py-10 bg-[#F6F7EE] min-h-screen">
          <div className="flex justify-between items-center mb-8">
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

            <div className="flex space-x-4">
              <Button
                variant="outline"
                onClick={() => setIsShareModalOpen(true)}
                className="flex items-center gap-2 border-black hover:bg-black hover:text-white duration-300"
              >
                <Share className="h-4 w-4" />
                Share Brain
              </Button>
              <Button
                onClick={() => setIsAddModalOpen(true)}
                className="bg-[#3b73ed] hover:bg-[#2a5cc9] flex items-center gap-2 text-white"
              >
                <Plus className="h-4 w-4" />
                Add Content
              </Button>
            </div>
          </div>

          {/* Search Input Only for 'search' tab */}
         {activeTab === "search" && (
  <div className="mb-6 w-full md:w-1/2 relative">
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

          {error && (
            <div className="mb-6 bg-red-100 border-l-4 border-red-500 p-4 text-red-700 rounded-md">
              <p>{(error as Error).message}</p>
            </div>
          )}

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-16 w-16 animate-spin text-[#3b73ed]" />
            </div>
          ) : filteredContents.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-md p-8 text-center">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredContents.map((content) => (
                <ContentCard
                  key={content._id}
                  id={content._id}
                  title={content.title}
                  link={content.link}
                  type={content.type}
                  description={content.description}
                  onDelete={deleteContent}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <AddContentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
       
      />

      <ShareBrainModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />
    </div>
  )
}

export default Dashboard