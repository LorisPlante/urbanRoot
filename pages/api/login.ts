import { NextApiRequest, NextApiResponse } from "next";
import UserModel from "../../models/user";
import connectToDatabase from "@/config/database";
import bcrypt from "bcrypt";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      await connectToDatabase();

      const { email, password } = req.body;

      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Email ou mot de passe incorrect" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Email ou mot de passe incorrect" });
      }

      res.status(200).json({
        message: "Connexion réussie",
        userId: user._id,
        username: user.username,
        email: user.email,
      });
    } catch (error) {
      res.status(500).json({ message: "Erreur du serveur" });
    }
  } else {
    res.status(405).json({ message: "Méthode non autorisée" });
  }
}
