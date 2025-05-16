import type React from "react"
import { useState, useEffect, useRef, useMemo } from "react"
import { Trash2, Copy, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"


interface ContentCardProps {
  id: string
  title: string
  link: string
  type?: string
  description: string
  onDelete: (id: string) => void
}

const ContentCard: React.FC<ContentCardProps> = ({ id, title, link, type, description, onDelete }) => {
  const [copied, setCopied] = useState(false)
  const twitterRef = useRef<HTMLDivElement | null>(null)
   const [isLoading, setIsLoading] = useState(true); // State to track loading

  const handleCopyLink = () => {
    navigator.clipboard.writeText(link)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDelete = () => {
    onDelete(id)
  }

  // Run Twitter embed script when type is twitter
  useEffect(() => {
    if (type === "twitter" && (window as any).twttr?.widgets && twitterRef.current) {
      setIsLoading(true); // Start loading before embedding
      (window as any).twttr.widgets.load(twitterRef.current).then(() => {
        setIsLoading(false); // Stop loading once the embed has loaded
      }).catch(() => {
        setIsLoading(false); // Stop loading if there is an error
      });
    }
  }, [type, link]);


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
                className="w-full h-72 rounded-xl"
              ></iframe>
            </div>
          )
        }
      } catch (error) {
        console.error("Invalid YouTube URL", error)
      }
    } else if (type === "twitter") {
      return (
        <div ref={twitterRef} className="mb-4 p-x-1 rounded-xl overflow-auto scrollbar-hidden max-h-72">
          {isLoading && <div className="flex justify-center items-center">Loading...</div>} {/* Show loading */}
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
            className="text-[#3b73ed] hover:underline font-inter break-all text-sm"
          >
            {link}
          </a>
        </div>
              {/* Conditionally render description if it exists */}
  {description && (
    <div className="mt-4 p-4 bg-white border border-gray-200 rounded-lg shadow-sm text-sm text-gray-700"> <h1 className=" text-black font-semibold">Description</h1> <br /> 
      {description}
    </div>
  )}
      </div>
    )
  }, [type, link , isLoading])

  return (
    <Card className="h-[470px] shadow-sm shadow-black/20 hover:shadow-lg hover:shadow-black/70 transition-all bg-[#f0f0f0] border-2 border-black rounded-2xl flex flex-col justify-between">
      <CardHeader className="pb-2">
        <CardTitle className="font-satoshi text-black text-lg">{title}</CardTitle>
        
      </CardHeader>

       <CardContent className="flex-1 max-h-96">
        {embed}

        {/* Enhanced description box */}
       
       
      </CardContent>
      <CardFooter className="flex justify gap-4 items-center pt-0">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopyLink}
          className="text-black/80 bg-blue-200 hover:text-[#3b73ed] hover:bg-blue-100 flex items-center gap-1"
        >
          <Copy className="w-4 h-4" />
          {copied ? "Copied!" : "Copy Link"}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDelete}
          className="text-red-500 bg-red-100 hover:text-red-700 hover:bg-red-200"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}

export default ContentCard
