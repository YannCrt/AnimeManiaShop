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
      review: true,
      favoris: true,
      cartItem: true,
    },
  });
}

export async function getAvisbyProductID(productId) {
  return await prisma.review.findMany({
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

    return await prisma.review.create({
      data: {
        note: note,
        date_review: new Date(),
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

// Ajoute cette fonction à la fin de ton fichier product.action.js

export async function deleteAvis(avisId) {
  try {
    // Vérifier si l'avis existe avant de tenter de le supprimer
    const avis = await prisma.review.findUnique({
      where: { id: parseInt(avisId) },
    });

    if (!avis) {
      throw new Error("L'avis n'existe pas.");
    }

    // Si l'avis existe, on procède à la suppression
    await prisma.review.delete({
      where: { id: parseInt(avisId) },
    });

    console.log("Avis supprimé avec succès");
  } catch (error) {
    console.error("Erreur lors de la suppression de l'avis:", error.message);
    throw error; // Relance l'erreur ou retourne un message d'erreur selon le cas
  }
}
export async function updateAvis(avisId, note, content) {
  try {
    // Parse avisId to integer
    const parsedAvisId = parseInt(avisId);

    if (isNaN(parsedAvisId)) {
      throw new Error("ID de l'avis invalide.");
    }

    const updatedAvis = await prisma.review.update({
      where: {
        id: parsedAvisId, // Use the parsed integer ID
      },
      data: {
        note,
        content,
        date_review: new Date(), // Optionnel : pour mettre à jour la date
      },
    });

    return updatedAvis;
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'avis :", error);
    throw new Error(
      "Erreur lors de la mise à jour de l'avis : " + error.message
    );
  }
}

export async function getAvisbyId(avisId) {
  try {
    // Convert avisId to an integer
    const parsedAvisId = parseInt(avisId);

    if (isNaN(parsedAvisId)) {
      throw new Error("ID de l'avis invalide.");
    }

    const avis = await prisma.review.findUnique({
      where: {
        id: parsedAvisId, // Use the parsed integer ID
      },
      include: {
        user: true, // Si tu veux inclure les informations de l'utilisateur
      },
    });

    if (!avis) {
      throw new Error("Avis non trouvé.");
    }

    return avis;
  } catch (error) {
    console.error("Erreur lors de la récupération de l'avis :", error);
    throw new Error(
      "Erreur lors de la récupération de l'avis : " + error.message
    );
  }
}
