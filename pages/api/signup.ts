import { NextApiRequest, NextApiResponse } from "next";
import UserModel from "../../models/user"; // Assurez-vous que le chemin est correct
import connectToDatabase from "@/config/database"; // Une fonction pour se connecter à la base de données

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      await connectToDatabase();

      const { username, email, password } = req.body;

      // Vérifiez si l'utilisateur existe déjà
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email déjà utilisé" });
      }

      // Créer un nouvel utilisateur
      const newUser = new UserModel({ username, email, password });
      await newUser.save();

      res.status(201).json({ message: "Compte créé avec succès" });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
