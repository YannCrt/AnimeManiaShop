import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function DELETE() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token)
      return Response.json({ message: "Non autorisé" }, { status: 401 });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    await prisma.user.delete({ where: { id: decoded.id } });

    cookieStore.set("token", "", { expires: new Date(0) }); // Supprime le cookie
    return Response.json({ message: "Compte supprimé" });
  } catch (error) {
    return Response.json({ message: "Erreur serveur" }, { status: 500 });
  }
}
