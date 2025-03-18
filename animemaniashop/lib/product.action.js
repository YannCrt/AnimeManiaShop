"use server";

import { prisma } from "./prisma";

export async function getAllProducts() {
  return await prisma.product.findMany();
}

export const getProductById = async (id) => {
  const product = await prisma.product.findUnique({
    where: { id: Number(id) }, // L'ID doit être un nombre
  });

  return product;
};
