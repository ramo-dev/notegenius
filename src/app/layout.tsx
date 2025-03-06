import type React from "react"
import { Inter } from "next/font/google"
import { Toaster } from "sonner"
import { ThemeProvider } from "@/components/theme-provider"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { AuthProvider } from "@/components/auth-provider"
import { ScrollArea } from "@/components/ui/scroll-area"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "NoteGenius - AI-Powered Notes",
  description: "Take smarter notes with AI assistance",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} no-scrollbar`}>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SidebarProvider>
              <div className="flex min-h-screen w-full ">
                <AppSidebar />
                <main className="flex-1 w-full">
                  {children}
                </main>

              </div>
              <Toaster position="top-right" />
            </SidebarProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

