"use server";

import { prisma } from "./prisma";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function getAllProducts() {
  return await prisma.product.findMany();
}

export async function getProductById(id) {
  return await prisma.product.findUnique({
    where: { id: parseInt(id) },
    include: {
      anime: {
        include: {
          categories: true,
        },
      },
      avis: true,
      favoris: true,
      cartItem: true,
    },
  });
}

export async function getAvisbyProductID(productId) {
  return await prisma.avis.findMany({
    where: { productId: productId },
    include: {
      user: true,
    },
  });
}

export async function getCurrentUser() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return null;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || !decoded.id) {
      return null;
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    return user;
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur:", error);
    return null;
  }
}

export async function addAvis(productId, note, content) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      throw new Error("Vous devez être connecté pour ajouter un avis.");
    }

    return await prisma.avis.create({
      data: {
        note: note,
        date_avis: new Date(),
        content: content,
        productId: parseInt(productId),
        userId: user.id,
      },
    });
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'avis:", error);
    throw error;
  }
}

// Cette fonction sera implémentée plus tard pour gérer l'ajout au panier
export async function addToCart(userId, productId, quantity) {
  // Implémentation à venir quand vous serez prêt à gérer le panier
}
