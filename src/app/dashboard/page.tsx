import Link from "next/link"
import { FileText, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { ScrollArea } from "@/components/ui/scroll-area"
export default function DashboardPage() {
  return (
    <div className="flex flex-col h-full w-full">
      <DashboardHeader />

      <ScrollArea className="min-h-screen rounded-none w-full">
        <main className="flex-1 container py-6 md:py-10">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold tracking-tight">Welcome to NoteGenius</h1>
              <p className="text-muted-foreground">
                Take smarter notes with AI assistance. Create, edit, and organize your notes with ease.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Create a new note</CardTitle>
                  <CardDescription>Start writing a new note with AI assistance</CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="flex items-center justify-center h-24 bg-muted/50 rounded-md">
                    <Plus className="h-10 w-10 text-muted-foreground" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href="/notes/new">
                      <Plus className="mr-2 h-4 w-4" />
                      Create Note
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Recent Notes</CardTitle>
                  <CardDescription>Access your recently created notes</CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="flex items-center justify-center h-24 bg-muted/50 rounded-md">
                    <FileText className="h-10 w-10 text-muted-foreground" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/notes">View All Notes</Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>AI Tools</CardTitle>
                  <CardDescription>Enhance your notes with AI-powered tools</CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="flex items-center justify-center h-24 bg-muted/50 rounded-md">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-10 w-10 text-muted-foreground"
                    >
                      <path d="M12 2a8 8 0 0 0-8 8c0 1.5.5 2.5 1.5 3.5L12 20l6.5-6.5c1-1 1.5-2 1.5-3.5a8 8 0 0 0-8-8z" />
                      <circle cx="12" cy="10" r="1" />
                    </svg>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/settings">Configure AI</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </main>
      </ScrollArea>
    </div>
  )
}

