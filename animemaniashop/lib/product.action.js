"use server";

import { prisma } from "./prisma";

export async function getAllProducts() {
  return await prisma.product.findMany();
}
