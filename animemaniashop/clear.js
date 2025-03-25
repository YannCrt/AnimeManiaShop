const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function clearDatabase() {
  try {
    // Supprimer les données dans l'ordre inverse des dépendances
    await prisma.cart_Item.deleteMany({});
    await prisma.favorite.deleteMany({});
    await prisma.review.deleteMany({});
    await prisma.cart.deleteMany({});
    await prisma.product.deleteMany({});
    await prisma.category.deleteMany({});
    await prisma.anime.deleteMany({});
    await prisma.user.deleteMany({});

    console.log("Base de données nettoyée !");
  } catch (error) {
    console.error("Erreur lors du nettoyage de la base de données : ", error);
  } finally {
    await prisma.$disconnect();
  }
}

clearDatabase();
