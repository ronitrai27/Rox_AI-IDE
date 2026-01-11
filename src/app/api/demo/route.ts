import { generateText } from "ai";
import { anthropic } from "@ai-sdk/anthropic";

export async function GET() {
  const result = await generateText({
    model: anthropic("claude-3-haiku-20240307"),
    prompt: "How to make chicken tikka masala?",
    experimental_telemetry: {
      isEnabled: true,
      recordInputs: true,
      recordOutputs: true,
    },
  });
  return new Response(result.text);
}
