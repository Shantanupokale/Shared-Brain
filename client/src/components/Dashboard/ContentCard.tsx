
import type React from "react"
import { useState, useEffect, useRef, useMemo } from "react"
import { Trash2, Copy, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import ConfirmDeleteModal from "./ConfirmDeleteModal"

interface ContentCardProps {
  id: string
  title: string
  link: string
  type?: string
  description: string
  onDelete?: (id: string) => void
}

const ContentCard: React.FC<ContentCardProps> = ({ id, title, link, type, description, onDelete }) => {
  const [copied, setCopied] = useState(false)
  const twitterRef = useRef<HTMLDivElement | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showConfirmModal, setShowConfirmModal] = useState(false); // ✅ modal state

  const handleCopyLink = () => {
    navigator.clipboard.writeText(link)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDelete = () => {
    if (onDelete) {
      onDelete(id)
    };
    setShowConfirmModal(false);
  }

  useEffect(() => {
    if (type === "twitter" && (window as any).twttr?.widgets && twitterRef.current) {
      setIsLoading(true);
      (window as any).twttr.widgets.load(twitterRef.current).then(() => {
        setIsLoading(false)
      }).catch(() => {
        setIsLoading(false)
      })
    }
  }, [type, link])

  const embed = useMemo(() => {
    if (type === "youtube") {
      try {
        const url = new URL(link)
        const videoId = url.searchParams.get("v") || url.pathname.split("/").pop()
        if (videoId) {
          return (
            <div className="aspect-w-16 aspect-h-9 mb-2 pt-2">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-52 sm:h-72 rounded-xl"
              ></iframe>
            </div>
          )
        }
      } catch (error) {
        console.error("Invalid YouTube URL", error)
      }
    } else if (type === "twitter") {
      return (
        <div ref={twitterRef} className=" mb-1 sm:mb-4 rounded-xl overflow-x-auto -m-2  scrollbar-hidden max-h-96 ">
          {isLoading && <div className="flex justify-center items-center">Loading...</div>}
          <blockquote className="twitter-tweet">
            <a href={link.replace("x.com", "twitter.com")}></a>
          </blockquote>
        </div>
      )
    }

    return (
      <div className="mb-4">
        <div className="flex items-center p-3 rounded-xl border border-gray-300 bg-gray-50 hover:shadow-sm transition-all">
          <ExternalLink className="w-4 h-4 mr-2 text-[#3b73ed] flex-shrink-0" />
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#3b73ed] hover:underline font-inter break-words text-sm sm:text-base"
          >
            {link}
          </a>
        </div>
        {description && (
          <div className="mt-4 p-3 sm:p-4 bg-white border border-gray-200 rounded-lg shadow-sm text-sm text-gray-700">
            <h1 className="text-black font-semibold">Description</h1>
            <p className="mt-2 break-words">{description}</p>
          </div>
        )}
      </div>
    )
  }, [type, link, isLoading])

  return (
  <>
    <Card className="w-full h-auto sm:h-[470px] shadow-sm shadow-black/20 hover:shadow-lg hover:shadow-black/70 transition-all bg-[#f0f0f0] border-2 border-black rounded-2xl flex flex-col justify-between">
      <CardHeader className="pb-2  pt-4">
        <CardTitle className="font-satoshi text-black text-lg sm:text-lg">{title}</CardTitle>
      </CardHeader>

      <CardContent className="flex-1  overflow-hidden">
        {embed}
      </CardContent>

      <CardFooter className="flex flex-row sm:flex-row justify-between items-center gap-2 sm:gap-0  pb-4 pt-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopyLink}
          className="w-full sm:w-auto text-black/80 bg-blue-200 hover:text-[#3b73ed] hover:bg-blue-100 flex items-center gap-1"
        >
          <Copy className="w-4 h-4" />
          {copied ? "Copied!" : "Copy Link"}
        </Button>

        {onDelete && (
          <Button
            variant="ghost"
            size="sm"
            onClick={()=> setShowConfirmModal(true)}
            className="w-full sm:w-auto text-red-500 bg-red-100 hover:text-red-700 hover:bg-red-200 flex items-center gap-1"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </Button>
        )}
      </CardFooter>
    </Card>
    
      <ConfirmDeleteModal
        open={showConfirmModal}
        onCancel={() => setShowConfirmModal(false)}
        onConfirm={handleDelete}
      />
    </>
  )
}

export default ContentCard
