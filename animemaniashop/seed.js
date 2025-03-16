const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient(); // C'est Prisma qui s'en occupe. Ca permet de créer une connexion à la base de données

async function main() {
  // Seed Users
  const user1 = await prisma.user.create({
    data: {
      firstName: "Jean",
      lastName: "Dupont",
      email: "jean.dupont2@mail.com",
      password: "hashedpassword1",
      role: "user",
      address: "123 rue de Paris",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      firstName: "Alice",
      lastName: "Martin",
      email: "alice.martin2@mail.com",
      password: "hashedpassword2",
      role: "admin",
      address: "456 avenue de Lyon",
    },
  });

  // Seed Categories
  const category1 = await prisma.category.create({
    data: { category_name: "Action" },
  });
  const category2 = await prisma.category.create({
    data: { category_name: "Fantaisie" },
  });
  const category3 = await prisma.category.create({
    data: { category_name: "Grosse merde" },
  });

  // Seed Anime
  const anime1 = await prisma.anime.create({
    data: { Anime_name: "One Piece", manga_category: "Aventure" },
  });
  const anime2 = await prisma.anime.create({
    data: { Anime_name: "Naruto", manga_category: "Action" },
  });
  const anime3 = await prisma.anime.create({
    data: { Anime_name: "", manga_category: "Grosse merde" },
  });

  // Seed Products
  const product1 = await prisma.product.create({
    data: {
      name: "Figurine Luffy",
      description: "Figurine de Monkey D. Luffy",
      price: 25,
      stock: 100,
      image_url: "url_image_luffy",
      Id_Anime: anime1.id,
    },
  });

  const product2 = await prisma.product.create({
    data: {
      name: "Poster Naruto",
      description: "Poster de Naruto Uzumaki",
      price: 15,
      stock: 200,
      image_url: "url_image_naruto",
      Id_Anime: anime2.id,
    },
  });

  // Seed Carts
  const cart1 = await prisma.cart.create({
    data: { date_creation: new Date(), Id_Client: user1.id },
  });
  const cart2 = await prisma.cart.create({
    data: { date_creation: new Date(), Id_Client: user2.id },
  });

  // Seed Reviews (Avis)
  await prisma.avis.create({
    data: {
      note: 5,
      date_avis: new Date(),
      content: "Superbe figurine, excellente qualité!",
      Id_Product: product1.id,
      Id_Client: user1.id,
    },
  });

  await prisma.avis.create({
    data: {
      note: 4,
      date_avis: new Date(),
      content: "Beau poster, mais un peu petit.",
      Id_Product: product2.id,
      Id_Client: user2.id,
    },
  });

  // Seed Favorites (Favoris)
  await prisma.favoris.create({
    data: {
      date_ajout: new Date(),
      Id_Client: user1.id,
      Id_Product: product1.id,
    },
  });
  await prisma.favoris.create({
    data: {
      date_ajout: new Date(),
      Id_Client: user2.id,
      Id_Product: product2.id,
    },
  });

  // Seed Cart Items
  await prisma.cart_Item.create({
    data: { quantitee: 2, Id_Product: product1.id, Id_Cart: cart1.id },
  });
  await prisma.cart_Item.create({
    data: { quantitee: 1, Id_Product: product2.id, Id_Cart: cart2.id },
  });

  // Assign Categories to Products
  await prisma.assigner.create({
    data: { Id_Product: product1.id, Id_Category: category1.id },
  });
  await prisma.assigner.create({
    data: { Id_Product: product2.id, Id_Category: category2.id },
  });
}

main()
  .then(() => console.log("Seeding completed!"))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
