import { NextApiRequest, NextApiResponse } from "next";
import UserModel from "../../models/user";
import connectToDatabase from "@/config/database";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      await connectToDatabase();

      const { username, email, password } = req.body;

      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email déjà utilisé" });
      }

      const newUser = new UserModel({ username, email, password });
      await newUser.save();

      res.status(201).json({ message: "Compte créé avec succès" });
    } catch (error) {
      res.status(500).json({ message: "Erreur du serveur" });
    }
  } else {
    res.status(405).json({ message: "Méthode non autorisée" });
  }
}
