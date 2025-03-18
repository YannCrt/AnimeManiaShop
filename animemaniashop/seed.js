const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  //Seed Users
  const user1 = await prisma.user.create({
    data: {
      firstname: "Jean",
      lastname: "Dupont",
      email: "jean.dupont2@mail.com",
      password: "hashedpassword1",
      role: "user",
      adress: "123 rue de Paris", // Notez que le champ est "adress" dans votre schéma (avec un seul 'd')
    },
  });

  const user2 = await prisma.user.create({
    data: {
      firstname: "Alice",
      lastname: "Martin",
      email: "alice.martin2@mail.com",
      password: "hashedpassword2",
      role: "admin",
      adress: "456 avenue de Lyon", // Notez que le champ est "adress" dans votre schéma (avec un seul 'd')
    },
  });

  // Seed Categories
  const category1 = await prisma.category.create({
    data: { category_name: "Aventure" },
  });
  const category2 = await prisma.category.create({
    data: { category_name: "Action" },
  });
  const category3 = await prisma.category.create({
    data: { category_name: "Combat" },
  });

  //Seed Anime
  const anime1 = await prisma.anime.create({
    data: { Anime_name: "One Piece", manga_category: category1.category_name },
  });
  const anime2 = await prisma.anime.create({
    data: { Anime_name: "Bleach", manga_category: category2.category_name },
  });
  const anime3 = await prisma.anime.create({
    data: { Anime_name: "Naruto", manga_category: category2.category_name },
  });
  const anime4 = await prisma.anime.create({
    data: {
      Anime_name: "Dragon Ball",
      manga_category: category3.category_name,
    },
  });

  // Seed Products
  const product1 = await prisma.product.create({
    data: {
      name: "Figurine Luffy",
      description: "Figurine de Monkey D. Luffy",
      price: 25,
      stock: 100,
      image_url: "/luffy1.jfif",
      animeId: anime1.id,
    },
  });

  const product2 = await prisma.product.create({
    data: {
      name: "Figurine Ichigo",
      description: "Figurine de Ichigo Kurosaki",
      price: 20,
      stock: 75,
      image_url: "/ichigo1.jpg",
      animeId: anime2.id,
    },
  });

  const product3 = await prisma.product.create({
    data: {
      name: "Figurine Naruto",
      description: "Figurine de Naruto Uzumaki",
      price: 15,
      stock: 200,
      image_url: "/naruto1.jfif",
      animeId: anime3.id,
    },
  });

  const product4 = await prisma.product.create({
    data: {
      name: "Figurine Goku",
      description: "Figurine de Son Goku",
      price: 20,
      stock: 200,
      image_url: "/goku1.jpg",
      animeId: anime4.id,
    },
  });

  // Seed Carts
  const cart1 = await prisma.cart.create({
    data: {
      date_creation: new Date(),
      userId: user1.id, // Correction: userId au lieu de Id_Client
    },
  });

  // Remarque: Le modèle User a une relation unique avec Cart, donc un seul cart par utilisateur
  // Il n'est pas possible de créer deux carts pour deux utilisateurs différents

  // Seed Reviews (Avis)
  await prisma.avis.create({
    data: {
      note: "5", // Remarque: la note est une string dans votre schéma, pas un nombre
      date_avis: new Date(),
      content: "Superbe figurine, excellente qualité!",
      productId: product1.id, // Correction: productId au lieu de Id_Product
      userId: user1.id, // Correction: userId au lieu de Id_Client
    },
  });

  await prisma.avis.create({
    data: {
      note: "4", // Remarque: la note est une string dans votre schéma, pas un nombre
      date_avis: new Date(),
      content: "Belle figurine, mais un peu petite.",
      productId: product2.id, // Correction: productId au lieu de Id_Product
      userId: user2.id, // Correction: userId au lieu de Id_Client
    },
  });

  // Seed Favorites (Favoris)
  await prisma.favoris.create({
    data: {
      date_ajout: new Date(),
      userId: user1.id, // Correction: userId au lieu de Id_Client
      productId: product1.id, // Correction: productId au lieu de Id_Product
    },
  });
  await prisma.favoris.create({
    data: {
      date_ajout: new Date(),
      userId: user2.id, // Correction: userId au lieu de Id_Client
      productId: product2.id, // Correction: productId au lieu de Id_Product
    },
  });

  // Seed Cart Items (avec un problème potentiel: relation unique entre Product et Cart_Item)
  await prisma.cart_Item.create({
    data: {
      quantitee: "2", // Convertie en string pour correspondre au schéma
      productId: product1.id, // Correction: productId au lieu de Id_Product
      cartId: cart1.id, // Correction: cartId au lieu de Id_Cart
    },
  });

  // Assign Categories to Products
  await prisma.assigner.create({
    data: {
      productId: product1.id, // Correction: productId au lieu de Id_Product
      categoryId: category1.id, // Correction: categoryId au lieu de Id_Category
    },
  });
  await prisma.assigner.create({
    data: {
      productId: product2.id, // Correction: productId au lieu de Id_Product
      categoryId: category2.id, // Correction: categoryId au lieu de Id_Category
    },
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
