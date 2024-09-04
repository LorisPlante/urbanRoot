import { NextApiRequest, NextApiResponse } from "next";
import UserModel from "../../models/user"; // Assurez-vous que le chemin est correct
import connectToDatabase from "@/config/database"; // Assurez-vous que ce chemin est correct
import bcrypt from "bcrypt"; // Assurez-vous que vous avez installé bcryptjs

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      await connectToDatabase();

      const { email, password } = req.body;

      // Vérifier si l'utilisateur existe
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Email ou mot de passe incorrect" });
      }

      // Comparer les mots de passe
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Email ou mot de passe incorrect" });
      }

      // Authentification réussie
      res.status(200).json({
        message: "Connexion réussie",
        userId: user._id, // Ajoutez l'identifiant de l'utilisateur
        username: user.username,
        email: user.email,
      });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
