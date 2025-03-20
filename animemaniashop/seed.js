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
      adress: "123 rue de Paris",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      firstname: "Alice",
      lastname: "Martin",
      email: "alice.martin2@mail.com",
      password: "hashedpassword2",
      role: "user",
      adress: "456 avenue de Lyon",
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
    data: {
      Anime_name: "One Piece",
      categories: { connect: { id: category1.id } },
    },
  });

  const anime2 = await prisma.anime.create({
    data: {
      Anime_name: "Bleach",
      categories: { connect: { id: category2.id } },
    },
  });

  const anime3 = await prisma.anime.create({
    data: {
      Anime_name: "Naruto",
      categories: { connect: { id: category2.id } },
    },
  });

  const anime4 = await prisma.anime.create({
    data: {
      Anime_name: "Dragon Ball",
      categories: { connect: { id: category3.id } },
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
      userId: user1.id,
    },
  });

  // Seed Reviews (Avis)
  await prisma.avis.create({
    data: {
      note: "5",
      date_avis: new Date(),
      content: "Superbe figurine, excellente qualité!",
      productId: product1.id,
      userId: user1.id,
    },
  });

  await prisma.avis.create({
    data: {
      note: "4",
      date_avis: new Date(),
      content: "Belle figurine, mais un peu petite.",
      productId: product2.id,
      userId: user2.id,
    },
  });

  // Seed Favorites (Favoris)
  await prisma.favoris.create({
    data: {
      date_ajout: new Date(),
      userId: user1.id,
      productId: product1.id,
    },
  });
  await prisma.favoris.create({
    data: {
      date_ajout: new Date(),
      userId: user2.id,
      productId: product2.id,
    },
  });

  // Seed Cart Items
  await prisma.cart_Item.create({
    data: {
      quantitee: 2,
      productId: product1.id,
      cartId: cart1.id,
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
