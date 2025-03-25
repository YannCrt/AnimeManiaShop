import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return Response.json({ message: "Non autorisé" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
        adress: true,
      },
    });

    if (!user) {
      return Response.json(
        { message: "Utilisateur non trouvé" },
        { status: 404 }
      );
    }

    return Response.json({ user });
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Erreur serveur" }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return Response.json({ message: "Non autorisé" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Débogage - Vérifier les données reçues
    const body = await req.json();
    console.log("Données reçues pour la mise à jour:", body); // Débogage

    const { firstname, lastname, email, adress } = body;

    // Validation des données
    if (!firstname || !lastname || !email || !adress) {
      return Response.json(
        { message: "Tous les champs sont obligatoires" },
        { status: 400 }
      );
    }

    // Mise à jour de l'utilisateur
    const updatedUser = await prisma.user.update({
      where: { id: decoded.id },
      data: {
        firstname,
        lastname,
        email,
        adress,
      },
    });

    console.log("Utilisateur mis à jour:", updatedUser); // Débogage

    return Response.json({ user: updatedUser });
  } catch (error) {
    console.error("Erreur dans la mise à jour :", error);
    return Response.json({ message: "Erreur serveur" }, { status: 500 });
  }
}
