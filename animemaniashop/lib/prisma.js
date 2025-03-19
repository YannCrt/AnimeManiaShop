// /lib/prisma.js
import { PrismaClient } from "@prisma/client";

// Empêcher la création de multiples instances de Prisma en développement
const globalForPrisma = global;

const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
