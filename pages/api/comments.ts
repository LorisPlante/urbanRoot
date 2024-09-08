// pages/api/comments.ts
import type { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "@/config/database";
import Comment from "@/models/comment";
import mongoose from "mongoose";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    await connectToDatabase();
    const { post } = req.query;
    const comments = await Comment.find({ post }).populate("author", "username").lean();
    res.status(200).json(comments);
  } else if (req.method === "POST") {
    await connectToDatabase();
    const { content, post, author } = req.body;

    if (!mongoose.Types.ObjectId.isValid(author)) {
      return res.status(400).json({ error: "Invalid author ID" });
    }

    try {
      const newComment = await Comment.create({ content, post, author });
      res.status(201).json(newComment);
    } catch (error) {
      console.error("Error creating comment:", error);
      res.status(500).json({ error: "Failed to create comment" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
