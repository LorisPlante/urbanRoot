import type { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "@/config/database";
import Guide from "@/models/Guide";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (typeof id !== "string") {
    return res.status(400).json({ error: "Invalid ID" });
  }

  try {
    await connectToDatabase();
    const guide = await Guide.findById(id);

    if (!guide) {
      return res.status(404).json({ error: "Guide not found" });
    }

    // Désactive complètement le cache
    res.setHeader("Cache-Control", "no-store");

    res.status(200).json(guide);
  } catch (error) {
    console.error("Error fetching guide:", error);
    res.status(500).json({ error: "Failed to load guide" });
  }
}
