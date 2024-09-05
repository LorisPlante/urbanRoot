// api/logout.js
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    // Juste une confirmation que la demande a été reçue
    res.status(200).json({ message: "Déconnexion réussie" });
  } else {
    res.status(405).json({ message: "Méthode non autorisée" });
  }
}
