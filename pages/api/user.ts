import { NextApiRequest, NextApiResponse } from "next";
import UserModel from "../../models/user"; // Assurez-vous que le chemin est correct
import connectToDatabase from "@/config/database"; // Assurez-vous que ce chemin est correct

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      await connectToDatabase();

      // Extraire l'identifiant de l'utilisateur depuis les paramètres de la requête
      const { id } = req.query;

      // Assurez-vous que l'identifiant est fourni
      if (!id || typeof id !== "string") {
        return res.status(400).json({ message: "Invalid user ID" });
      }

      // Rechercher l'utilisateur par identifiant
      const user = await UserModel.findById(id).select("-password"); // Exclure le mot de passe de la réponse

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
