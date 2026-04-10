import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();
app.use(cors({
  origin: "*"
}));
app.use(express.json());

const PORT = process.env.PORT || 3000;

/* -----------------------------
   Mongo Connection
----------------------------- */
await mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => {
    console.error("Mongo error:", err);
    process.exit(1);
  });
  console.log("Connected to MongoDB");

/* -----------------------------
   Schema (English ↔ Cebuano)
----------------------------- */
const entrySchema = new mongoose.Schema({
  english: String,
  cebuano: String,
  audioUrl: String,
  videoUrl: String,
}, { timestamps: true });

const Entry = mongoose.model("Entry", entrySchema);

/* -----------------------------
   ROUTES
----------------------------- */

// Get all entries
app.get('/entries', async (req, res) => {
  try {
    const entries = await Entry.find();
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch entries" });
  }
});

// Create entry (ADMIN)
app.post('/entries', async (req, res) => {
  try {
    const { english, cebuano, audioUrl, videoUrl } = req.body;

    if (!english || !cebuano) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const entry = await Entry.create({
      english,
      cebuano,
      audioUrl: audioUrl || "",
      videoUrl: videoUrl || ""
    });

    res.status(201).json(entry);
  } catch (err) {
    res.status(400).json({ error: "Invalid entry" });
  }
});

// Delete entry (optional admin tool later)
app.delete('/entries/:id', async (req, res) => {
  await Entry.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

/* -----------------------------
   HEALTH CHECK ROUTE
----------------------------- */

app.get('/', (req, res) => {
  res.json({ status: "API running" });
});

/* -----------------------------
   START SERVER
----------------------------- */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
