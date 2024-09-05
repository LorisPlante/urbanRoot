import { NextApiRequest, NextApiResponse } from "next";
import UserModel from "../../models/user";
import connectToDatabase from "@/config/database";
import bcrypt from "bcrypt";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      await connectToDatabase();

      const { userId, currentPassword, newPassword } = req.body;

      // Vérifiez si tous les champs sont présents
      if (!userId || !currentPassword || !newPassword) {
        return res.status(400).json({ message: "Tous les champs sont requis" });
      }

      // Trouver l'utilisateur par ID
      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }

      // Vérifiez si le mot de passe actuel est correct
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Le mot de passe actuel est incorrect" });
      }

      // Hachez le nouveau mot de passe
      try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Mettre à jour le mot de passe de l'utilisateur
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: "Mot de passe changé avec succès" });
      } catch (hashError) {
        console.error("Erreur lors du hachage du nouveau mot de passe:", hashError);
        res.status(500).json({ message: "Erreur lors du hachage du mot de passe" });
      }
    } catch (error) {
      console.error("Erreur lors du changement de mot de passe:", error);
      res.status(500).json({ message: "Erreur du serveur" });
    }
  } else {
    res.status(405).json({ message: "Méthode non autorisée" });
  }
}
