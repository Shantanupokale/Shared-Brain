

"use client"

import { useState, useEffect } from "react"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useParams , useNavigate} from "react-router-dom"
import ContentCard from "../Dashboard/ContentCard" // Import your ContentCard component

interface Content {
  _id: string
  title: string
  link: string
  type: string
  description?: string
  userId: string
  tags: string[]
}

interface SharedBrainData {
  username: string
  content: Content[]
}

const SharedBrain = () => {
  const { shareLink } = useParams()
  const [username, setUsername] = useState("")
  const [contents, setContents] = useState<Content[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSharedContent = async () => {
      try {
        setIsLoading(true)
        setError("")
        
        const response = await fetch(`http://localhost:3000/api/v1/brain/${shareLink}`)
        
        if (!response.ok) {
          throw new Error("Failed to fetch shared content")
        }

        const data: SharedBrainData = await response.json()
        setUsername(data.username)
        setContents(data.content)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch shared content")
      } finally {
        setIsLoading(false)
      }
    }

    if (shareLink) {
      fetchSharedContent()
    }
  }, [shareLink])

  const filteredContents =
    activeTab === "all" ? contents : contents.filter((c) => c.type === activeTab)

  return (
    <div className="min-h-screen bg-[#F6F7EE] py-10 px-4 sm:px-6 lg:px-8 font-inter">
      <div className="max-w-7xl mx-auto">
        <div className="mb-2">
          <Button
            variant="link"
            onClick={() => navigate("/dashboard")}
            className="inline-flex items-center text-[#3b73ed] hover:text-[#2a5cc9] p-0"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Dashboard
          </Button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3b73ed]"></div>
          </div>
        ) : error ? (
          <div className="bg-white rounded-2xl shadow-md p-8 text-center border-2 border-black">
            <h3 className="text-lg font-medium text-red-600 mb-2 font-satoshi">Error</h3>
            <p className="text-black/80">{error}</p>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-xl p-6 mb-6 border border-black">
              <h1 className="text-xl font-bold text-black font-satoshi">{username}'s Brain</h1>
              <p className="text-black/60 text-sm mt-1">
                Viewing {username}'s shared resources
              </p>
            </div>

            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-8">
              <TabsList className="mb-6 px-auto py-6 gap-2 bg-white border-2 border-black">
                {["all", "youtube", "twitter", "url"].map((tab) => (
                  <TabsTrigger
                    key={tab}
                    value={tab}
                    className={`
                      px-4 py-2 font-medium text-sm rounded-lg
                      border-2 border-black
                      transition-colors duration-200
                      data-[state=active]:bg-[#3b73ed] data-[state=active]:text-white
                      data-[state=inactive]:bg-[#a6b4e7] data-[state=inactive]:text-black
                      hover:bg-[#e2e6f4]
                    `}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value={activeTab}>
                {filteredContents.length === 0 ? (
                  <div className="bg-white rounded-2xl shadow-md p-8 text-center border-2 border-black">
                    <h3 className="text-lg font-medium text-black mb-2 font-satoshi">No content found</h3>
                    <p className="text-black/80">
                      {activeTab === "all"
                        ? `${username} hasn't added any content yet.`
                        : `${username} hasn't added any ${activeTab} content yet.`}
                    </p>
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
                        description={content.description || ""}
                        // onDelete={() => {}} // Empty function since this is a shared view
                      />
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </div>
  )
}

export default SharedBrain