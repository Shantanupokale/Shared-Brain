
"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Copy } from "lucide-react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

interface ShareBrainModalProps {
  isOpen: boolean
  onClose: () => void
}

const API_BASE_URL = "https://shared-brain-alpha.vercel.app/api/v1"

const ShareBrainModal: React.FC<ShareBrainModalProps> = ({ isOpen, onClose }) => {
  const [isSharing, setIsSharing] = useState(false)
  const [shareHash, setShareHash] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [initialCheckDone, setInitialCheckDone] = useState(false)

  const getAuthToken = (): string => {
    const token = localStorage.getItem("token")
    if (!token) {
      throw new Error("Please login to share content")
    }
    return token
  }

  useEffect(() => {
    if (isOpen && !initialCheckDone) {
      checkCurrentShareStatus()
      setInitialCheckDone(true)
    }
    return () => {
      if (!isOpen) setInitialCheckDone(false)
    }
  }, [isOpen, initialCheckDone])

  const checkCurrentShareStatus = async () => {
    try {
      setIsLoading(true)
      setError("")
      
      const token = getAuthToken()

      const response = await axios.post(
        `${API_BASE_URL}/brain/share`,
        { share: true },
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json"
          }
        }
      )
      
      if (response.data.hash) {
        setIsSharing(true)
        setShareHash(response.data.hash)
      }
    } catch (err: any) {
      if (err.response?.data?.hash) {
        setIsSharing(true)
        setShareHash(err.response.data.hash)
      } else {
        setIsSharing(false)
        setShareHash(null)
        if (!err.response?.data?.hash) {
          setError(err.message || "Failed to check sharing status")
        }
      }
    } finally {
      setIsLoading(false)
    }
  }

  const toggleSharing = async () => {
    try {
      setIsLoading(true)
      setError("")

      const token = getAuthToken()

      const response = await axios.post(
        `${API_BASE_URL}/brain/share`,
        { share: !isSharing },
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json"
          }
        }
      )

      if (!isSharing) {
        setIsSharing(true)
        setShareHash(response.data.hash)
      } else {
        setIsSharing(false)
        setShareHash(null)
      }
    } catch (err: any) {
      console.error("Failed to toggle sharing", err)
      setError(err.message || "Failed to toggle sharing")
      setIsSharing(prev => !prev)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopyLink = () => {
    if (shareHash) {
      const shareLink = `${window.location.origin}/brain/${shareHash}`
      navigator.clipboard.writeText(shareLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[85vw] max-w-[90vw] sm:max-w-[425px] font-inter p-4 sm:p-6 rounded-xl border border-gray-600">
        <DialogHeader className="text-left">
          <DialogTitle className="font-satoshi text-lg sm:text-xl">
            Share Your Brain
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            Share your brain with others. They'll see your content but won't be able to modify it.
          </DialogDescription>
        </DialogHeader>

        {error && (
          <div className="mb-3 bg-red-50 border-l-4 border-red-500 p-3 text-sm text-red-700">
            <p>{error}</p>
          </div>
        )}

        <div className="flex items-center justify-between py-3 sm:py-4">
          <Label htmlFor="sharing-toggle" className="text-sm sm:text-base font-medium">
            {isSharing ? "Sharing enabled" : "Sharing disabled"}
          </Label>
          <Switch 
            id="sharing-toggle" 
            checked={isSharing} 
            onCheckedChange={toggleSharing} 
            disabled={isLoading} 
            className="scale-90 sm:scale-100"
          />
        </div>

        {isSharing && shareHash && (
          <div className="space-y-2">
            <Label htmlFor="share-link" className="text-sm sm:text-base">Share Link</Label>
            <div className="flex flex-row sm:flex-row gap-2">
              <Input
                id="share-link"
                value={`${window.location.origin}/brain/${shareHash}`}
                readOnly
                className="rounded sm:rounded-r-none sm:rounded-lg text-xs"
              />
              <Button 
                type="button" 
                onClick={handleCopyLink} 
                className="rounded sm:rounded-md bg-[#3b73ed] hover:bg-[#2a5cc9]"
                disabled={isLoading}
              >
                {copied ? "Copied!" : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        )}

        <div className="mt-4 sm:mt-6 flex justify-end">
          <Button 
            onClick={onClose} 
            variant="outline" 
            disabled={isLoading}
            className="w-full sm:w-auto"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ShareBrainModal