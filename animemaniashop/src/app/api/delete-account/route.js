import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE() {
  try {
    const token = cookies().get("token")?.value;
    if (!token)
      return Response.json({ message: "Non autorisé" }, { status: 401 });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    await prisma.user.delete({ where: { id: decoded.id } });

    cookies().set("token", "", { expires: new Date(0) }); // Supprime le cookie

    return Response.json({ message: "Compte supprimé" });
  } catch (error) {
    return Response.json({ message: "Erreur serveur" }, { status: 500 });
  }
}
