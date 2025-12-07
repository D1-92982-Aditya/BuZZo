// server.js (ESM)
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => res.json({ ok: true }));

// Proxy to external REST API (restchat.onrender.com/ask)
app.post("/api/ask", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Missing message" });
    }

    const externalApiUrl = "https://restchat.onrender.com/ask";
    console.log("Proxying request to:", externalApiUrl);

    // External API expects "prompt" field, not "message"
    const response = await fetch(externalApiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: message }), // Changed from "message" to "prompt"
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("External API error:", data);
      return res.status(response.status).json({ error: data });
    }

    console.log("External API success:", data);
    return res.status(200).json(data);
  } catch (err) {
    console.error("PROXY ERROR:", err);
    return res.status(500).json({ error: err.message });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});