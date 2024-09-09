import type { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "@/config/database";
import Post from "@/models/posts";
import User from "@/models/user"; // Assurez-vous que le modèle User est bien importé

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();

  if (req.method === "GET") {
    try {
      // Récupérer tous les posts triés par date de création et avec les auteurs
      const posts = await Post.find()
        .sort({ createdAt: -1 })
        .populate({
          path: "author",
          select: "username", // On ne sélectionne que le champ 'username'
          model: "User", // S'assure que le modèle 'User' est utilisé pour la population
          options: { strictPopulate: false }, // Ignore les erreurs si un auteur n'est pas trouvé
        });

      res.status(200).json(posts);
    } catch (error) {
      console.error("Error fetching or populating posts:", error);
      res.status(500).json({ error: "Failed to fetch posts" });
    }
  } else if (req.method === "POST") {
    const { title, content, author } = req.body;

    try {
      // Vérifier que l'utilisateur existe avant de créer le post
      const userExists = await User.findById(author);
      if (!userExists) {
        return res.status(400).json({ error: "User not found" });
      }

      // Créer le nouveau post
      const newPost = await Post.create({ title, content, author });
      res.status(201).json(newPost);
    } catch (error) {
      console.error("Error creating post:", error);
      res.status(500).json({ error: "Failed to create post" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
