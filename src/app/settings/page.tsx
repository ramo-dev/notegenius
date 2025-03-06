"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { useApiKeyStore } from "@/lib/store"

export default function SettingsPage() {
  const { googleApiKey, setGoogleApiKey } = useApiKeyStore()
  const [apiKey, setApiKey] = useState(googleApiKey || "")
  const [isLoading, setIsLoading] = useState(false)

  const handleSaveApiKey = () => {
    setIsLoading(true)

    try {
      setGoogleApiKey(apiKey)
      toast.success("API key saved successfully")
    } catch (error) {
      toast.error("Failed to save API key")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full">
      <DashboardHeader />
      <main className="flex-1 container py-6 md:py-10">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
            <p className="text-muted-foreground">Manage your account settings and preferences</p>
          </div>

          <Tabs defaultValue="general" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="api">API Keys</TabsTrigger>
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
            </TabsList>

            <TabsContent value="general">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your account profile information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="John Doe" defaultValue="Demo User" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="m@example.com" defaultValue="demo@example.com" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="api">
              <Card>
                <CardHeader>
                  <CardTitle>API Keys</CardTitle>
                  <CardDescription>Add your API keys to enable AI features</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="google-api-key">Google API Key</Label>
                    <Input
                      id="google-api-key"
                      placeholder="Enter your Google API key"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                    />
                    <p className="text-sm text-muted-foreground">
                      This key is used for AI-powered features like summarization and image recognition
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSaveApiKey} disabled={isLoading}>
                    {isLoading ? "Saving..." : "Save API Key"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="appearance">
              <Card>
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                  <CardDescription>Customize the appearance of the application</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Theme</Label>
                    <div className="flex flex-wrap gap-4">
                      <Button variant="outline" className="flex flex-col items-center gap-2 h-auto p-4">
                        <div className="h-16 w-16 rounded-md bg-background border"></div>
                        <span>Light</span>
                      </Button>
                      <Button variant="outline" className="flex flex-col items-center gap-2 h-auto p-4">
                        <div className="h-16 w-16 rounded-md bg-black border border-gray-800"></div>
                        <span>Dark</span>
                      </Button>
                      <Button variant="outline" className="flex flex-col items-center gap-2 h-auto p-4">
                        <div className="h-16 w-16 rounded-md bg-gradient-to-b from-background to-black border"></div>
                        <span>System</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Preferences</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

