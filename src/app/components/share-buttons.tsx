"use client"

import { useState } from "react"
import { Button } from "@/app/components/ui/button"
import { Twitter, Facebook, Linkedin, Link2, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface ShareButtonsProps {
  title: string
  slug: string
  variant?: "default" | "compact"
}

export function ShareButtons({ title, slug, variant = "default" }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const url = typeof window !== "undefined" ? `${window.location.origin}/articles/${slug}` : `/articles/${slug}`

  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      "_blank",
    )
  }

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank")
  }

  const shareOnLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, "_blank")
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (variant === "compact") {
    return (
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={shareOnTwitter}
          className="h-9 w-9 text-gray-600 hover:text-blue-500"
        >
          <Twitter className="h-4 w-4" />
          <span className="sr-only">Share on Twitter</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={shareOnFacebook}
          className="h-9 w-9 text-gray-600 hover:text-blue-600"
        >
          <Facebook className="h-4 w-4" />
          <span className="sr-only">Share on Facebook</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={shareOnLinkedIn}
          className="h-9 w-9 text-gray-600 hover:text-blue-700"
        >
          <Linkedin className="h-4 w-4" />
          <span className="sr-only">Share on LinkedIn</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={copyToClipboard}
          className="h-9 w-9 text-gray-600 hover:text-purple-700"
        >
          {copied ? <Check className="h-4 w-4 text-green-600" /> : <Link2 className="h-4 w-4" />}
          <span className="sr-only">Copy link</span>
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      <Button
        variant="outline"
        onClick={shareOnTwitter}
        className="justify-start gap-2 text-gray-700 hover:text-blue-500 hover:border-blue-500"
      >
        <Twitter className="h-4 w-4" />
        <span>Share on Twitter</span>
      </Button>
      <Button
        variant="outline"
        onClick={shareOnFacebook}
        className="justify-start gap-2 text-gray-700 hover:text-blue-600 hover:border-blue-600"
      >
        <Facebook className="h-4 w-4" />
        <span>Share on Facebook</span>
      </Button>
      <Button
        variant="outline"
        onClick={shareOnLinkedIn}
        className="justify-start gap-2 text-gray-700 hover:text-blue-700 hover:border-blue-700"
      >
        <Linkedin className="h-4 w-4" />
        <span>Share on LinkedIn</span>
      </Button>
      <Button
        variant="outline"
        onClick={copyToClipboard}
        className={cn(
          "justify-start gap-2 text-gray-700",
          copied ? "border-green-500 text-green-600" : "hover:text-purple-700 hover:border-purple-700",
        )}
      >
        {copied ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
        <span>{copied ? "Link copied!" : "Copy link"}</span>
      </Button>
    </div>
  )
}
