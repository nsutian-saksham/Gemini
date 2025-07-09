// config/gemini.js

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: "AIzaSyDIe4-vMtiXhHFYIfFgMu7qksDwD6u6t60",
});

async function main(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ],
  });

  const result =
    response?.candidates?.[0]?.content?.parts?.[0]?.text || "No response.";
  console.log(result);
  return result;
}

export default main;
