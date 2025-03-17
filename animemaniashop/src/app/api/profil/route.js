import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const token = cookies().get("token")?.value;
    if (!token)
      return Response.json({ message: "Non autorisé" }, { status: 401 });

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

    if (!user)
      return Response.json(
        { message: "Utilisateur non trouvé" },
        { status: 404 }
      );

    return Response.json({ user });
  } catch (error) {
    return Response.json({ message: "Erreur serveur" }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const token = cookies().get("token")?.value;
    if (!token)
      return Response.json({ message: "Non autorisé" }, { status: 401 });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { firstname, lastname, email, adress } = await req.json();

    // Mettre à jour l'utilisateur
    const updatedUser = await prisma.user.update({
      where: { id: decoded.id },
      data: {
        firstname,
        lastname,
        email,
        adress,
      },
    });

    return Response.json({ user: updatedUser });
  } catch (error) {
    return Response.json({ message: "Erreur serveur" }, { status: 500 });
  }
}
