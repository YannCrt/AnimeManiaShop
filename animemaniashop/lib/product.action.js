// /lib/product.action.js
import prisma from "./prisma"; // Assure-toi d'importer ton client Prisma

export async function getProductById(id) {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: parseInt(id), // Convertit l'ID en entier
      },
    });
    return product; // Retourne le produit
  } catch (error) {
    console.error("Erreur lors de la récupération du produit : ", error);
    return null; // Retourne null si une erreur se produit
  }
}

export async function getAllProducts() {
  try {
    const products = await prisma.product.findMany(); // Récupère tous les produits
    return products; // Retourne la liste des produits
  } catch (error) {
    console.error("Erreur lors de la récupération des produits : ", error);
    return []; // Retourne un tableau vide en cas d'erreur
  }
}
