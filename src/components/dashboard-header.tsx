"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ModeToggle } from "@/components/mode-toggle"

export function DashboardHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 py-1 z-30 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex md:hidden">
          <SidebarTrigger />
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <nav className="flex items-center">
              <Link
                href="/dashboard"
                className={`text-sm font-medium transition-colors hover:text-primary ${pathname === "/dashboard" ? "text-foreground" : "text-muted-foreground"
                  }`}
              >
                Dashboard
              </Link>
              <span className="mx-2 text-muted-foreground">/</span>
              <Link
                href="/notes"
                className={`text-sm font-medium transition-colors hover:text-primary ${pathname === "/notes" ? "text-foreground" : "text-muted-foreground"
                  }`}
              >
                Notes
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="outline" size="sm">
              <Link href="/notes/new">
                <Plus className="mr-2 h-4 w-4" />
                New Note
              </Link>
            </Button>
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}

