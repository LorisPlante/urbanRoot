import { NextApiRequest, NextApiResponse } from "next";
import UserModel from "../../models/user";
import connectToDatabase from "@/config/database";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      await connectToDatabase();

      const { id } = req.query;

      if (!id || typeof id !== "string") {
        return res.status(400).json({ message: "User ID invalide" });
      }

      const user = await UserModel.findById(id).select("-password");

      if (!user) {
        return res.status(404).json({ message: "Utilisateur introuvable" });
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Erreur du serveur" });
    }
  } else {
    res.status(405).json({ message: "Méthode non autorisée" });
  }
}
