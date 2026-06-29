require("dotenv").config();
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

/**
 * Groq (Llama model) ko system + user prompt bhejta hai aur JSON wapas deta hai.
 * response_format: json_object — yeh model ko force karta hai ke
 * sirf valid JSON wapas bheje, extra text nahi.
 *
 * @param {string} systemPrompt - AI ka role, tone, aur output format ke rules
 * @param {string} userPrompt - actual kaam (topic, review text, etc.)
 * @param {number} maxTokens - response kitni lambi ho sakti hai
 */
async function callOpenAIJSON(systemPrompt, userPrompt, maxTokens = 2000) {
  const completion = await openai.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    max_tokens: maxTokens,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
  });

  const rawText = completion.choices[0].message.content;

  try {
    return JSON.parse(rawText);
  } catch (err) {
    console.error("AI response JSON parse nahi hui:", rawText);
    throw new Error("AI_RESPONSE_PARSE_ERROR");
  }
}

module.exports = { callOpenAIJSON };
