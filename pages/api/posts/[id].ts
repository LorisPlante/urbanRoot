// pages/api/posts/[id].ts
import type { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "@/config/database";
import Post from "@/models/posts";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (req.method === "GET") {
    await connectToDatabase();
    const post = await Post.findById(id).populate("author", "username").lean();
    res.status(200).json(post);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
