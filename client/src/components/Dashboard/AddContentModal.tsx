// // "use client"

// // import type React from "react"
// // import { useState } from "react"
// // import { Button } from "@/components/ui/button"
// // import {
// //   Dialog,
// //   DialogContent,
// //   DialogDescription,
// //   DialogFooter,
// //   DialogHeader,
// //   DialogTitle,
// // } from "@/components/ui/dialog"
// // import { Input } from "@/components/ui/input"
// // import { Label } from "@/components/ui/label"
// // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// // interface AddContentModalProps {
// //   isOpen: boolean
// //   onClose: () => void
// //   onContentAdded: () => void
// // }

// // const AddContentModal: React.FC<AddContentModalProps> = ({ isOpen, onClose, onContentAdded }) => {
// //   const [title, setTitle] = useState("")
// //   const [link, setLink] = useState("")
// //   const [type, setType] = useState("url")
// //   const [isLoading, setIsLoading] = useState(false)
// //   const [error, setError] = useState("")

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault()
// //     setIsLoading(true)
// //     setError("")

// //     try {
// //       // Simulate API call
// //       setTimeout(() => {
// //         // Success
// //         setTitle("")
// //         setLink("")
// //         setType("url")
// //         onContentAdded()
// //         onClose()
// //         setIsLoading(false)
// //       }, 800)
// //     } catch (err: any) {
// //       setError("Failed to add content")
// //       setIsLoading(false)
// //     }
// //   }

// //   // Auto-detect content type based on URL
// //   const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const url = e.target.value
// //     setLink(url)

// //     if (url.includes("youtube.com") || url.includes("youtu.be")) {
// //       setType("youtube")
// //     } else if (url.includes("twitter.com") || url.includes("x.com")) {
// //       setType("twitter")
// //     } else {
// //       setType("url")
// //     }
// //   }

// //   return (
// //     <Dialog open={isOpen} onOpenChange={onClose}>
// //       <DialogContent className="sm:max-w-[425px] font-inter">
// //         <DialogHeader>
// //           <DialogTitle className="font-satoshi text-xl">Add New Content</DialogTitle>
// //           <DialogDescription>
// //             Add a link to your second brain. We'll automatically detect the content type.
// //           </DialogDescription>
// //         </DialogHeader>

// //         {error && (
// //           <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4 text-red-700">
// //             <p>{error}</p>
// //           </div>
// //         )}

// //         <form onSubmit={handleSubmit} className="space-y-4">
// //           <div className="space-y-2">
// //             <Label htmlFor="title">Title</Label>
// //             <Input
// //               id="title"
// //               value={title}
// //               onChange={(e) => setTitle(e.target.value)}
// //               placeholder="Enter a title for this content"
// //               required
// //             />
// //           </div>

// //           <div className="space-y-2">
// //             <Label htmlFor="link">Link</Label>
// //             <Input
// //               id="link"
// //               type="url"
// //               value={link}
// //               onChange={handleLinkChange}
// //               placeholder="https://example.com"
// //               required
// //             />
// //           </div>

// //           <div className="space-y-2">
// //             <Label htmlFor="type">Content Type</Label>
// //             <Select value={type} onValueChange={setType}>
// //               <SelectTrigger>
// //                 <SelectValue placeholder="Select content type" />
// //               </SelectTrigger>
// //               <SelectContent>
// //                 <SelectItem value="url">URL</SelectItem>
// //                 <SelectItem value="youtube">YouTube</SelectItem>
// //                 <SelectItem value="twitter">Twitter</SelectItem>
// //               </SelectContent>
// //             </Select>
// //           </div>

// //           <DialogFooter className="mt-6">
// //             <Button type="button" variant="outline" onClick={onClose} className="mr-2">
// //               Cancel
// //             </Button>
// //             <Button type="submit" disabled={isLoading} className="bg-[#3b73ed] hover:bg-[#2a5cc9]">
// //               {isLoading ? "Adding..." : "Add Content"}
// //             </Button>
// //           </DialogFooter>
// //         </form>
// //       </DialogContent>
// //     </Dialog>
// //   )
// // }

// // export default AddContentModal
// "use client"

// import type React from "react"
// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { addContent } from "@/api/ContentApi" // Import the API call for adding content

// interface AddContentModalProps {
//   isOpen: boolean
//   onClose: () => void
//   onContentAdded: () => void // This function will trigger a refetch
// }

// const AddContentModal: React.FC<AddContentModalProps> = ({ isOpen, onClose, onContentAdded }) => {
//   const [title, setTitle] = useState("")
//   const [link, setLink] = useState("")
//   const [type, setType] = useState("url")
//   const [description, setDescription] = useState("") // New state for description
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState("")

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setIsLoading(true)
//     setError("") // Reset the error on each new submission

//     try {
//       // Call the addContent API here, including the description if URL
//       await addContent({ title, link, type, description })
      
//       // After successfully adding the content, reset form fields and trigger onContentAdded
//       setTitle("")
//       setLink("")
//       setType("url")
//       setDescription("") // Reset description as well
//       onContentAdded() // Refetch content
//       onClose() // Close the modal

//       setIsLoading(false)
//     } catch (err: any) {
//       setError("Failed to add content") // Show error if API call fails
//       setIsLoading(false)
//     }
//   }

//   // Auto-detect content type based on URL
//   const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const url = e.target.value
//     setLink(url)

//     if (url.includes("youtube.com") || url.includes("youtu.be")) {
//       setType("youtube")
//     } else if (url.includes("twitter.com") || url.includes("x.com")) {
//       setType("twitter")
//     } else {
//       setType("url")
//     }
//   }

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-[425px] font-inter">
//         <DialogHeader>
//           <DialogTitle className="font-satoshi text-xl">Add New Content</DialogTitle>
//           <DialogDescription>
//             Add a link to your second brain. We'll automatically detect the content type.
//           </DialogDescription>
//         </DialogHeader>

//         {error && (
//           <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4 text-red-700">
//             <p>{error}</p>
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="space-y-2">
//             <Label htmlFor="title">Title</Label>
//             <Input
//               id="title"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               placeholder="Enter a title for this content"
//               required
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="link">Link</Label>
//             <Input
//               id="link"
//               type="url"
//               value={link}
//               onChange={handleLinkChange}
//               placeholder="https://example.com"
//               required
//             />
//           </div>

// {/* Conditionally render description input for URL type */}
//           {type === "url" && (
//             <div className="space-y-2">
//               <Label htmlFor="description">Description</Label>
//               <Input
//                 id="description"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 placeholder="Enter a description for the URL"
//                 required
//               />
//             </div>
//           )}
          
//           <div className="space-y-2">
//             <Label htmlFor="type">Content Type</Label>
//             <Select value={type} onValueChange={setType}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Select content type" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="url">URL</SelectItem>
//                 <SelectItem value="youtube">YouTube</SelectItem>
//                 <SelectItem value="twitter">Twitter</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

          

//           <DialogFooter className="mt-6">
//             <Button type="button" variant="outline" onClick={onClose} className="mr-2">
//               Cancel
//             </Button>
//             <Button type="submit" disabled={isLoading} className="bg-[#3b73ed] hover:bg-[#2a5cc9]">
//               {isLoading ? "Adding..." : "Add Content"}
//             </Button>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   )
// }

// export default AddContentModal

"use client"

import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import axios from "axios"

interface AddContentModalProps {
  isOpen: boolean
  onClose: () => void
}

interface ContentData {
  title: string
  link: string
  type: string
  description?: string
}

const AddContentModal = ({ isOpen, onClose }: AddContentModalProps) => {
  const [title, setTitle] = useState("")
  const [link, setLink] = useState("")
  const [type, setType] = useState("url")
  const [description, setDescription] = useState("")
  const queryClient = useQueryClient()

  // Mutation for adding content
  const { mutate: addContent, isPending, error } = useMutation({
    mutationFn: async (contentData: ContentData) => {
      const token = localStorage.getItem("token")
      if (!token) throw new Error("No auth token found")

      const response = await axios.post(
        "https://shared-brain-alpha.vercel.app/api/v1/content",
        contentData,
        {
          headers: {
            'Authorization': token,
          },
        }
      )
      return response.data
    },
    onSuccess: () => {
      // Invalidate and refetch the contents query
      queryClient.invalidateQueries({ queryKey: ['contents'] })
      // Reset form
      setTitle("")
      setLink("")
      setType("url")
      setDescription("")
      // Close modal
      onClose()
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addContent({ title, link, type, description })
  }

  // Auto-detect content type based on URL
  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value
    setLink(url)

    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      setType("youtube")
    } else if (url.includes("twitter.com") || url.includes("x.com")) {
      setType("twitter")
    } else {
      setType("url")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] font-inter">
        <DialogHeader>
          <DialogTitle className="font-satoshi text-xl">Add New Content</DialogTitle>
          <DialogDescription>
            Add a link to your second brain. We'll automatically detect the content type.
          </DialogDescription>
        </DialogHeader>

        {error && (
          <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4 text-red-700">
            <p>{error.message}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a title for this content"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="link">Link</Label>
            <Input
              id="link"
              type="url"
              value={link}
              onChange={handleLinkChange}
              placeholder="https://example.com"
              required
            />
          </div>

          {type === "url" && (
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter a description for the URL"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="type">Content Type</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger>
                <SelectValue placeholder="Select content type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="url">URL</SelectItem>
                <SelectItem value="youtube">YouTube</SelectItem>
                <SelectItem value="twitter">Twitter</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter className="mt-6">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose} 
              className="mr-2"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isPending} 
              className="bg-[#3b73ed] hover:bg-[#2a5cc9]"
            >
              {isPending ? "Adding..." : "Add Content"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddContentModal