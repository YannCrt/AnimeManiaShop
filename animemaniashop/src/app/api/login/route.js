import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // Vérifier si l'utilisateur existe
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return new Response(
        JSON.stringify({ message: "Email ou mot de passe incorrect." }),
        { status: 401 }
      );
    }

    // Vérifier le mot de passe
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return new Response(
        JSON.stringify({ message: "Email ou mot de passe incorrect." }),
        { status: 401 }
      );
    }

    // Générer un token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Attendre cookies() avant d'utiliser set()
    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60, // 7 jours
      path: "/",
    });

    return new Response(JSON.stringify({ message: "Connexion réussie !" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Erreur lors de la connexion:", error);
    return new Response(JSON.stringify({ message: "Erreur serveur." }), {
      status: 500,
    });
  }
}
