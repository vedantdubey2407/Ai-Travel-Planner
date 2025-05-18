import { GoogleGenerativeAI } from '@google/generative-ai';
import { toast } from 'sonner';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_GEMINI_API_KEY);

export const main = async (FINAL_PROMPT, locationName) => {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

  // Strong prompt to enforce structured JSON response only
  const enhancedPrompt = `
${FINAL_PROMPT}
Respond ONLY with a valid JSON object.
Do not include any greetings, explanations, or introductions.
The response should start immediately with: { "travelPlan": { ... } }
Ensure that the "location" field in the response is exactly "${locationName}".
`;

  try {
    const result = await model.generateContent(enhancedPrompt);
    const response = await result.response;
    const text = await response.text();

    console.log("Raw Response Text:", text);

    let cleanedText = text.trim();

    // Clean known markdown/formatting wrappers
    if (cleanedText.startsWith("```json")) {
      cleanedText = cleanedText.substring(7);
    }
    if (cleanedText.endsWith("```")) {
      cleanedText = cleanedText.slice(0, -3);
    }
    if (cleanedText.startsWith("`") && cleanedText.endsWith("`")) {
      cleanedText = cleanedText.slice(1, -1);
    }

    // Pre-check: Ensure the text starts with a JSON object
    if (!cleanedText.trim().startsWith("{")) {
      console.error("Model response is not JSON:", cleanedText);
      throw new Error("Model did not return JSON. Please try again.");
    }

    try {
      const jsonResponse = JSON.parse(cleanedText);

      // Check if the response location matches the requested one
      if (
        jsonResponse.travelPlan?.location?.toLowerCase() !== locationName.toLowerCase()
      ) {
        console.error(`Mismatch: Expected "${locationName}", but got "${jsonResponse.travelPlan?.location}"`);
        throw new Error(`The response does not match the requested location: ${locationName}.`);
      }

      return jsonResponse;
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError.message);
      return {
        error: "Error parsing response from model.",
        rawResponse: text
      };
    }
  } catch (error) {
    console.error("Error generating travel plan:", error.message);
    toast.error("Failed to generate travel plan. Please try again.");
    throw new Error("Error generating travel plan");
  }
};
