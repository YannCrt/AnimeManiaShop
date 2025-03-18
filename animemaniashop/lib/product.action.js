"use server";

import { prisma } from "./prisma";

export async function getAllProducts() {
  return await prisma.product.findMany();
}

// Ajouter au fichier existant lib/product.action.js

export async function getProductById(id) {
  return await prisma.product.findUnique({
    where: { id: parseInt(id) },
    include: {
      anime: true,
      categories: {
        include: {
          category: true,
        },
      },
    },
  });
}

// Cette fonction sera implémentée plus tard pour gérer l'ajout au panier
export async function addToCart(userId, productId, quantity) {
  // Implémentation à venir quand vous serez prêt à gérer le panier
}
