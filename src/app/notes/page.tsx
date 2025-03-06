"use client"

import { useState } from "react"
import Link from "next/link"
import { format } from "date-fns"
import { FileText, Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { DashboardHeader } from "@/components/dashboard-header"
import { useNoteStore } from "@/lib/store"
import { ScrollArea } from "@/components/ui/scroll-area"


export default function NotesPage() {
  const { notes } = useNoteStore()
  const [searchQuery, setSearchQuery] = useState("")

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex flex-col h-full w-full">
      <DashboardHeader />

      <ScrollArea className="h-[100dvh] rounded-none w-full">
        <main className="flex-1 container py-6 md:py-10">
          <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Your Notes</h1>
                <p className="text-muted-foreground">Manage and organize all your notes</p>
              </div>
              <Button asChild>
                <Link href="/notes/new">
                  <Plus className="mr-2 h-4 w-4" />
                  New Note
                </Link>
              </Button>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search notes..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {filteredNotes.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredNotes.map((note) => (
                  <Link key={note.id} href={`/notes/${note.id}`}>
                    <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <CardTitle className="truncate">{note.title}</CardTitle>
                        <CardDescription>{format(new Date(note.updatedAt), "MMM d, yyyy")}</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-3">
                        <p className="text-sm text-muted-foreground line-clamp-3">
                          {note.content.replace(/<[^>]*>/g, "")}
                        </p>
                      </CardContent>
                      <CardFooter className="border-t p-3 text-xs text-muted-foreground">
                        Last updated {format(new Date(note.updatedAt), "h:mm a")}
                      </CardFooter>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                <h2 className="text-xl font-semibold">No notes found</h2>
                <p className="text-muted-foreground mb-6">
                  {searchQuery ? "No notes match your search query" : "You haven't created any notes yet"}
                </p>
                <Button asChild>
                  <Link href="/notes/new">
                    <Plus className="mr-2 h-4 w-4" />
                    Create your first note
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </main>
      </ScrollArea>
    </div>
  )
}

