const { getFirestore } = require("firebase-admin/firestore");
const { callOpenAIJSON } = require("./openaiClient");

function makeSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // special characters hata do
    .trim()
    .replace(/\s+/g, "-"); // spaces ko "-" se badal do
}

/**
 * @param {string} topic - jese "summer nail trends 2026"
 * @returns {object} { title, content, excerpt, tags, featuredImage }
 */
async function generateBlogContent(topic) {
  const systemPrompt = `Tum Celine Esthétique (ek luxurious beauty salon) ke liye 
SEO-friendly blog content likhne wale ek professional copywriter ho.

Tumhe SIRF JSON format mein jawab dena hai, is exact shape mein:
{
  "title": "SEO-friendly, catchy title",
  "content": "Kam az kam 500 alfaaz ka pura blog article. HTML paragraphs use karo (<p> tags) achi formatting ke liye.",
  "excerpt": "1-2 lines ka short summary (meta description ke liye, 160 characters tak)",
  "tags": ["tag1", "tag2", "tag3"],
  "featuredImage": "Ek short description ke jaisa suggestion ke is article ke liye konsi image use ho, jese 'close-up-summer-nail-art.jpg'"
}

Tone hamesha warm, luxurious, aur professional ho - Celine Esthétique ke brand 
voice ke mutabiq. Content informative ho aur beauty/skincare/nails se related 
practical tips de.`;

  const userPrompt = `Is topic pe blog likho: "${topic}"`;

  const result = await callOpenAIJSON(systemPrompt, userPrompt, 2500);
  return result;
}

/**
 * Content ke alfaaz (words) ginta hai.
 */
function countWords(text) {
  // HTML tags hata kar sirf plain text ke words ginte hain
  const plainText = text.replace(/<[^>]*>/g, " ");
  return plainText.trim().split(/\s+/).filter(Boolean).length;
}

/**
 * Pura blog generate karta hai, check karta hai word count theek hai,
 * aur Firestore "blog" collection mein save karta hai.
 *
 * @param {string} topic - jese "summer nail trends 2026"
 * @returns {object} jo Firestore mein save hua, wahi wapas return hota hai
 */
async function generateAndSaveBlog(topic) {
  // Step 1: AI se content generate karwao
  let blogData = await generateBlogContent(topic);

  // Step 2: Word count check karo (>= 500 words zaroori hai)
  let wordCount = countWords(blogData.content);

  // Agar AI ne kam words diye, ek dafa dobara koshish karte hain
  // (zyada coshishein nahi karenge, taake user zyada wait na kare)
  if (wordCount < 500) {
    console.warn(`Pehli koshish mein sirf ${wordCount} words mile, dobara try kar rahe hain...`);
    blogData = await generateBlogContent(
      topic + " (kam az kam 500 words ka detailed article likho, pehle se zyada lamba)"
    );
    wordCount = countWords(blogData.content);
  }

  // Agar abhi bhi kam hai, hum aage badh jate hain lekin warning dete hain
  // (admin review karega isay publish karne se pehle, to yeh blocking issue nahi)
  if (wordCount < 500) {
    console.warn(`Dobara koshish ke baad bhi sirf ${wordCount} words - admin ko review mein dikhega`);
  }

  // Step 3: Firestore "blog" collection ke EXACT schema ke mutabiq document banao
  const db = getFirestore();
  const docRef = db.collection("blog").doc(); // naya auto-generated ID

  const blogDocument = {
    postId: docRef.id,
    title: blogData.title,
    slug: makeSlug(blogData.title),
    content: blogData.content,
    excerpt: blogData.excerpt,
    imageURL: blogData.featuredImage,   // AI ka "featuredImage" -> Firestore ka "imageURL"
    author: "AI Generated",             // admin chahe to baad mein badal sakta hai
    tags: blogData.tags,
    views: 0,
    isPublished: false,                 // admin review karega pehle
    createdAt: new Date(),              // Firestore timestamp
  };

  await docRef.set(blogDocument);

  return blogDocument;
}

module.exports = { generateBlogContent, generateAndSaveBlog, makeSlug, countWords };
