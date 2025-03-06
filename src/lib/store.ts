"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export type Note = {
  id: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
  images: string[]
}

type NoteStore = {
  notes: Note[]
  addNote: (note: Omit<Note, "id" | "createdAt" | "updatedAt">) => void
  updateNote: (id: string, note: Partial<Omit<Note, "id" | "createdAt" | "updatedAt">>) => void
  deleteNote: (id: string) => void
  getNote: (id: string) => Note | undefined
}

export const useNoteStore = create<NoteStore>()(
  persist(
    (set, get) => ({
      notes: [],
      addNote: (note) => {
        const id = crypto.randomUUID()
        const now = new Date().toISOString()
        set((state) => ({
          notes: [
            {
              ...note,
              id,
              createdAt: now,
              updatedAt: now,
            },
            ...state.notes,
          ],
        }))
        return id
      },
      updateNote: (id, note) => {
        set((state) => ({
          notes: state.notes.map((n) => (n.id === id ? { ...n, ...note, updatedAt: new Date().toISOString() } : n)),
        }))
      },
      deleteNote: (id) => {
        set((state) => ({
          notes: state.notes.filter((n) => n.id !== id),
        }))
      },
      getNote: (id) => {
        return get().notes.find((n) => n.id === id)
      },
    }),
    {
      name: "note-store",
    },
  ),
)

type ApiKeyStore = {
  googleApiKey: string | null
  setGoogleApiKey: (key: string) => void
}

export const useApiKeyStore = create<ApiKeyStore>()(
  persist(
    (set) => ({
      googleApiKey: null,
      setGoogleApiKey: (key) => set({ googleApiKey: key }),
    }),
    {
      name: "api-key-store",
    },
  ),
)

