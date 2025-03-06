"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DashboardHeader } from "@/components/dashboard-header"
import { NoteEditor } from "@/components/note-editor"
import { useNoteStore } from "@/lib/store"

export default function NotePage() {
  const router = useRouter()
  const params = useParams()
  const { getNote, updateNote, deleteNote } = useNoteStore()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [images, setImages] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (params.id) {
      const note = getNote(params.id as string)
      if (note) {
        setTitle(note.title)
        setContent(note.content)
        setImages(note.images)
      } else {
        toast.error("Note not found")
        router.push("/dashboard")
      }
    }
  }, [params.id, getNote, router])

  const handleSaveNote = () => {
    if (!title) {
      toast.error("Please enter a title for your note")
      return
    }

    setIsLoading(true)

    try {
      updateNote(params.id as string, {
        title,
        content,
        images,
      })

      toast.success("Note updated successfully")
    } catch (error) {
      toast.error("Failed to update note")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteNote = () => {
    if (confirm("Are you sure you want to delete this note?")) {
      setIsDeleting(true)

      try {
        deleteNote(params.id as string)
        toast.success("Note deleted successfully")
        router.push("/dashboard")
      } catch (error) {
        toast.error("Failed to delete note")
        console.error(error)
      } finally {
        setIsDeleting(false)
      }
    }
  }

  const handleAddImage = (url: string) => {
    setImages((prev) => [...prev, url])
  }

  return (
    <div className="flex flex-col h-full">
      <DashboardHeader />
      <main className="flex-1 container py-6 md:py-10">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Edit Note</h1>
            <p className="text-muted-foreground">Edit your note with text, images, and AI assistance</p>
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

              <div className="flex justify-between gap-2">
                <Button variant="destructive" onClick={handleDeleteNote} disabled={isDeleting}>
                  {isDeleting ? "Deleting..." : "Delete Note"}
                </Button>

                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => router.back()}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveNote} disabled={isLoading}>
                    {isLoading ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}

