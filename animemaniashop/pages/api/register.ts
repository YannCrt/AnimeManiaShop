import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Méthode non autorisée" });
  }

  const { firstname, lastname, email, password, adress } = req.body;

  if (!firstname || !lastname || !email || !password || !adress) {
    return res.status(400).json({ message: "Tous les champs sont requis" });
  }

  // Hash du mot de passe
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        firstname,
        lastname,
        email,
        password: hashedPassword,
        role: "user", // Par défaut, on met un rôle "user"
        adress,
      },
    });

    res.status(201).json({ message: "Utilisateur créé avec succès", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
}
