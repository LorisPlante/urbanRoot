//pages/api/guides.ts
import type { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "@/config/database";
import Guide from "@/models/Guide";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectToDatabase();
    const guides = await Guide.find();
    res.status(200).json(guides);
  } catch (error) {
    console.error("Error fetching guides:", error);
    res.status(500).json({ error: "Failed to load guides" });
  }
}
