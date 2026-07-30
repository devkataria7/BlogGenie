import AppError from "../../utils/AppError.js";
import main from "../../configs/gemini.js";

export const generateContent = async ({ prompt }) => {
  try {
    if (!prompt) {
      throw new AppError("Prompt is required.", 400);
    }

    const newPrompt = `
      You are an expert content writer. Generate a blog post for the following topic:

      Title: ${prompt}

      Requirements:
      1. Write in clear, simple, and professional language.
      2. The blog should be **long and informative**, around 500-700 words or more.
      3. Include a catchy subtitle.
      4. Structure the blog as follows:
        - A brief, engaging introduction (2-3 paragraphs)
        - Main body with multiple sections, mixing paragraphs and bullet points for key tips, insights, or examples
        - A concise conclusion (1-2 paragraphs)
      5. Use headings or subheadings for each section if necessary.
      6. Keep it unique, reader-friendly, and scannable.
      7. Output only the blog content as plain text — do not include extra commentary or meta-text.
    `;

    return await main(newPrompt);
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError(
      "Unable to generate blog content at the moment.",
      503,
      error,
    );
  }
};
