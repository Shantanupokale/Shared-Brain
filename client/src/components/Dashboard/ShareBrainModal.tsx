


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
  DialogFooter,
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

const API_BASE_URL = "http://localhost:3000/api/v1"

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
      // Revert the switch if the operation failed
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
      <DialogContent className="sm:max-w-[425px] font-inter">
        <DialogHeader>
          <DialogTitle className="font-satoshi text-xl">Share Your Brain</DialogTitle>
          <DialogDescription>
            Share your brain with others. They'll be able to see all your saved content but won't be able to modify it.
          </DialogDescription>
        </DialogHeader>

        {error && (
          <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4 text-red-700">
            <p>{error}</p>
          </div>
        )}

        <div className="flex items-center justify-between py-4">
          <Label htmlFor="sharing-toggle" className="font-medium">
            {isSharing ? "Your brain is currently shared" : "Your brain is not shared"}
          </Label>
          <Switch 
            id="sharing-toggle" 
            checked={isSharing} 
            onCheckedChange={toggleSharing} 
            disabled={isLoading} 
          />
        </div>

        {isSharing && shareHash && (
          <div className="space-y-2">
            <Label htmlFor="share-link">Share Link</Label>
            <div className="flex">
              <Input
                id="share-link"
                value={`${window.location.origin}/brain/${shareHash}`}
                readOnly
                className="rounded-r-none"
              />
              <Button 
                type="button" 
                onClick={handleCopyLink} 
                className="rounded-l-none bg-[#3b73ed] hover:bg-[#2a5cc9]"
                disabled={isLoading}
              >
                {copied ? "Copied!" : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        )}

        <DialogFooter className="mt-6">
          <Button onClick={onClose} variant="outline" disabled={isLoading}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ShareBrainModal