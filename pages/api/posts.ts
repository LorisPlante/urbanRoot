import type { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "@/config/database";
import Post from "@/models/posts";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();

  if (req.method === "GET") {
    // Récupérer tous les posts triés par date de création
    const posts = await Post.find().sort({ createdAt: -1 }).populate("author", "username");
    res.status(200).json(posts);
  } else if (req.method === "POST") {
    const { title, content, author } = req.body;

    try {
      const newPost = await Post.create({ title, content, author });
      res.status(201).json(newPost);
    } catch (error) {
      res.status(500).json({ error: "Failed to create post" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
