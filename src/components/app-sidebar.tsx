"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { BookText, FileText, Home, LogOut, Moon, Plus, Settings, Sun, User } from "lucide-react"

import { useTheme } from "next-themes"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { useNoteStore } from "@/lib/store"

export function AppSidebar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const { theme, setTheme } = useTheme()
  const { notes } = useNoteStore()

  // Don't render sidebar on auth pages
  if (pathname.startsWith("/auth")) {
    return null
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-2 px-2 py-3">
          <BookText className="h-6 w-6" />
          <span className="font-semibold">NoteGenius</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/dashboard"} tooltip="Dashboard">
                  <Link href="/dashboard">
                    <Home />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/notes/new"} tooltip="New Note">
                  <Link href="/notes/new">
                    <Plus />
                    <span>New Note</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/settings"} tooltip="Settings">
                  <Link href="/settings">
                    <Settings />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Recent Notes</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {notes.length > 0 ? (
                notes.slice(0, 5).map((note) => (
                  <SidebarMenuItem key={note.id}>
                    <SidebarMenuButton asChild isActive={pathname === `/notes/${note.id}`} tooltip={note.title}>
                      <Link href={`/notes/${note.id}`}>
                        <FileText />
                        <span>{note.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))
              ) : (
                <div className="px-2 py-1 text-sm text-muted-foreground">No notes yet</div>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Toggle Theme">
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? <Sun /> : <Moon />}
                <span>Toggle Theme</span>
              </Button>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Profile">
              <Button variant="ghost" className="w-full justify-start">
                <User />
                <span>{user?.name || "Profile"}</span>
              </Button>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Logout">
              <Button variant="ghost" className="w-full justify-start" onClick={logout}>
                <LogOut />
                <span>Logout</span>
              </Button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

