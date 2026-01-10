import { inngest } from "./client"
import { generateText } from "ai";
import { google } from "@ai-sdk/google"
import { anthropic } from '@ai-sdk/anthropic';

export const demoGenerate = inngest.createFunction(
    { id: "demo-generate" },
    { event: "demo/generate" },
    async ({ event, step }) => {
        await step.run("generate-text", async () => {
            return await generateText({
                model: anthropic('claude-3-haiku-20240307'),
                prompt: 'Write a vegetarian lasagna recipe for 2 people.',
            })
        })
    }
)