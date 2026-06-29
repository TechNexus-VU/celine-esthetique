const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");

const { generateAndSaveBlog } = require("./services/blogGenerator");

// Firebase Admin SDK initialize karo - isse Firestore access milta hai
admin.initializeApp();

const app = express();
app.use(cors()); // taake frontend (alag domain se) request bhej sake
app.use(express.json()); // taake request body JSON samjhi jaye

/**
 * POST /api/ai/generate-blog
 * Request body: { "topic": "summer nail trends 2026" }
 */
app.post("/generate-blog", async (req, res) => {
  try {
    const { topic } = req.body;

    // Basic validation - topic zaroori hai
    if (!topic || typeof topic !== "string" || topic.trim() === "") {
      return res
        .status(400)
        .json({ error: "Topic zaroori hai aur woh text hona chahiye." });
    }

    const savedBlog = await generateAndSaveBlog(topic);

    return res.status(201).json(savedBlog);
  } catch (err) {
    console.error("generate-blog mein error:", err);
    return res
      .status(500)
      .json({ error: "Blog generate karne mein masla hua." });
  }
});

// Express app ko Cloud Function ke roop mein export karo
// URL banega: https://<region>-<project-id>.cloudfunctions.net/api/generate-blog
exports.api = functions.https.onRequest(app);
