"use server"

import { generateObject, generateText } from "ai"
import { createGoogleGenerativeAI } from "@ai-sdk/google"
import { z } from "zod"

// Define your schema using Zod
const SummarySchema = z.object({
  summary: z.string().describe("A concise summary of the text"),
  keyPoints: z.string(z.string()).describe("Key points extracted from the text"),
})

// Type for the returned object
//type SummaryResult = z.infer<typeof SummarySchema>

export async function summarizeText(text: string, apiKey: string): Promise<string> {
  try {
    // Create a custom Google provider with the user-provided API key
    const googleProvider = createGoogleGenerativeAI({
      apiKey: apiKey,
    })

    // Use the custom provider to create the model
    const model = googleProvider("gemini-1.5-pro-latest")



    const result = await generateText({
      model,
      prompt: `
  Convert the following note into a clear step-by-step guide with numbered steps:
  Be short and concise as possible 
  ${text}
  `,
      system: "You are a helpful assistant that converts notes into detailed, actionable step-by-step guides and returns a clear and understandle guide.",
    })

    //console.log(result)
    return result.text
  } catch (error) {
    console.error("Error summarizing text:", error)
    throw new Error("Failed to summarize text")
  }
}

