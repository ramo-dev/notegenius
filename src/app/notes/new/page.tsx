"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DashboardHeader } from "@/components/dashboard-header"
import { NoteEditor } from "@/components/note-editor"
import { useNoteStore } from "@/lib/store"

export default function NewNotePage() {
  const router = useRouter()
  const { addNote } = useNoteStore()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [images, setImages] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSaveNote = () => {
    if (!title) {
      toast.error("Please enter a title for your note")
      return
    }

    setIsLoading(true)

    try {
      const noteId = addNote({
        title,
        content,
        images,
      })

      toast.success("Note created successfully")
      router.push(`/notes/${noteId}`)
    } catch (error) {
      toast.error("Failed to create note")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddImage = (url: string) => {
    setImages((prev) => [...prev, url])
  }

  return (
    <div className="flex flex-col h-full w-full">
      <DashboardHeader />
      <main className="flex-1 container py-6 md:py-10">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Create New Note</h1>
            <p className="text-muted-foreground">Create a new note with text, images, and AI assistance</p>
          </div>

          <Card className="p-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Enter note title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <NoteEditor content={content} onChange={setContent} onAddImage={handleAddImage} />
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => router.back()}>
                  Cancel
                </Button>
                <Button onClick={handleSaveNote} disabled={isLoading}>
                  {isLoading ? "Creating..." : "Create Note"}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}

