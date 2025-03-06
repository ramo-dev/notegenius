"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { ImagePlus, Loader2, Stars, Wand2 } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { useApiKeyStore } from "@/lib/store"
import { summarizeText } from "@/lib/ai-utils"
import { Markdown } from "@/components/Markdown"

interface NoteEditorProps {
  content: string
  onChange: (content: string) => void
  onAddImage: (url: string) => void
}

export function NoteEditor({ content, onChange, onAddImage }: NoteEditorProps) {
  const { googleApiKey } = useApiKeyStore()
  const [isSummarizing, setIsSummarizing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSummarize = async () => {
    if (!content.trim()) {
      toast.error("Please add some content to summarize")
      return
    }

    if (!googleApiKey) {
      toast.error("Please add your Google API key in settings")
      return
    }

    setIsSummarizing(true)

    try {
      const summary = await summarizeText(content, googleApiKey)
      //onChange(summary.keyPoints.map((t) => `- ${t}`).join("\n"))
      onChange(summary)
      toast.success("Content formated successfully")
    } catch (error) {
      toast.error("Failed to formated content")
      console.error(error)
    } finally {
      setIsSummarizing(false)
    }
  }

  const handleImageUpload = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    addImageToContent(file)
  }


  const addImageToContent = (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    onAddImage(imageUrl);

    const imageMarkdown = `\n\n![Uploaded Image](${imageUrl})\n\n`;
    onChange(content + imageMarkdown);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    toast.success("Image added successfully");
  };

  // Handle paste events to capture pasted images
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      if (!textareaRef.current || !textareaRef.current.contains(document.activeElement)) {
        return
      }

      const items = e.clipboardData?.items
      if (!items) return

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") !== -1) {
          const file = items[i].getAsFile()
          if (file) {
            e.preventDefault()
            addImageToContent(file)
            return
          }
        }
      }
    }

    document.addEventListener("paste", handlePaste)
    return () => {
      document.removeEventListener("paste", handlePaste)
    }
  }, [content, onAddImage])

  return (
    <div className="space-y-4">
      <Tabs defaultValue="write">
        <div className="flex items-center justify-between mb-4">
          <TabsList>
            <TabsTrigger value="write">Write</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2">
            {/*<Button variant="outline" size="sm" onClick={handleImageUpload}>
              <ImagePlus className="h-4 w-4 mr-2" />
              Add Image
            </Button>*/}
            <Button variant="outline" size="sm" onClick={handleSummarize} disabled={isSummarizing || !content.trim()}>

              {isSummarizing ?
                <Stars className="animate-pulse h-4 w-4 " /> :
                <Wand2 className="h-4 w-4" />
              }
            </Button>
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
          </div>
        </div>

        <TabsContent value="write">
          <Textarea
            ref={textareaRef}
            placeholder="Start writing your note here... "
            className="min-h-[300px] font-mono"
            value={content}
            onChange={(e) => onChange(e.target.value)}
          />
        </TabsContent>

        <TabsContent value="preview">
          <Card className="p-4 min-h-[300px] max-w-none overflow-auto">
            {content ? (
              <Markdown className="prose dark:prose-invert max-w-none">{content}</Markdown>
            ) : (
              <p className="text-muted-foreground">Nothing to preview</p>
            )}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

