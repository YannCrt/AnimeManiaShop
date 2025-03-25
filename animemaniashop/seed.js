const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Seed Users
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
      role: "admin",
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
  const category4 = await prisma.category.create({
    data: { category_name: "Drame" },
  });
  const category5 = await prisma.category.create({
    data: { category_name: "Fantastique" },
  });

  // Seed Anime
  const anime1 = await prisma.anime.create({
    data: {
      Anime_name: "One Piece",
      categories: { connect: [{ id: category1.id }, { id: category5.id }] },
    },
  });
  const anime2 = await prisma.anime.create({
    data: {
      Anime_name: "Bleach",
      categories: { connect: [{ id: category2.id }, { id: category3.id }] },
    },
  });
  const anime3 = await prisma.anime.create({
    data: {
      Anime_name: "Naruto",
      categories: { connect: [{ id: category3.id }, { id: category2.id }] },
    },
  });
  const anime4 = await prisma.anime.create({
    data: {
      Anime_name: "Dragon Ball",
      categories: { connect: [{ id: category1.id }, { id: category2.id }] },
    },
  });
  const anime5 = await prisma.anime.create({
    data: {
      Anime_name: "Attack on Titan",
      categories: { connect: [{ id: category1.id }, { id: category3.id }] },
    },
  });
  const anime6 = await prisma.anime.create({
    data: {
      Anime_name: "My Hero Academia",
      categories: { connect: [{ id: category2.id }, { id: category5.id }] },
    },
  });
  const anime7 = await prisma.anime.create({
    data: {
      Anime_name: "Fullmetal Alchemist",
      categories: { connect: [{ id: category3.id }, { id: category4.id }] },
    },
  });
  const anime8 = await prisma.anime.create({
    data: {
      Anime_name: "Tokyo Ghoul",
      categories: { connect: [{ id: category1.id }, { id: category3.id }] },
    },
  });
  const anime9 = await prisma.anime.create({
    data: {
      Anime_name: "Demon Slayer",
      categories: { connect: [{ id: category2.id }, { id: category3.id }] },
    },
  });
  const anime10 = await prisma.anime.create({
    data: {
      Anime_name: "Berserk",
      categories: { connect: [{ id: category3.id }, { id: category5.id }] },
    },
  });
  const anime11 = await prisma.anime.create({
    data: {
      Anime_name: "One Punch Man",
      categories: { connect: [{ id: category1.id }, { id: category2.id }] },
    },
  });
  const anime12 = await prisma.anime.create({
    data: {
      Anime_name: "Death Note",
      categories: { connect: [{ id: category2.id }, { id: category4.id }] },
    },
  });
  const anime13 = await prisma.anime.create({
    data: {
      Anime_name: "Neon Genesis Evangelion",
      categories: { connect: [{ id: category3.id }, { id: category4.id }] },
    },
  });
  const anime14 = await prisma.anime.create({
    data: {
      Anime_name: "Jujutsu Kaisen",
      categories: { connect: [{ id: category3.id }, { id: category2.id }] },
    },
  });
  const anime15 = await prisma.anime.create({
    data: {
      Anime_name: "Jojo's Bizarre Adventure",
      categories: { connect: [{ id: category3.id }, { id: category5.id }] },
    },
  });

  // Seed Products with modified prices
  const product1 = await prisma.product.create({
    data: {
      name: "Figurine Luffy",
      description: "Figurine de Monkey D. Luffy",
      price: 150, // Prix ajusté
      stock: 100,
      image_url: "/luffy1.jfif",
      animeId: anime1.id,
    },
  });

  const product2 = await prisma.product.create({
    data: {
      name: "Figurine Ichigo",
      description: "Figurine de Ichigo Kurosaki",
      price: 120, // Prix ajusté
      stock: 75,
      image_url: "/ichigo1.jpg",
      animeId: anime2.id,
    },
  });

  const product3 = await prisma.product.create({
    data: {
      name: "Figurine Naruto",
      description: "Figurine de Naruto Uzumaki",
      price: 100, // Prix ajusté
      stock: 200,
      image_url: "/naruto1.jfif",
      animeId: anime3.id,
    },
  });

  const product4 = await prisma.product.create({
    data: {
      name: "Figurine Goku",
      description: "Figurine de Son Goku",
      price: 180, // Prix ajusté
      stock: 200,
      image_url: "/goku1.jpg",
      animeId: anime4.id,
    },
  });

  const product5 = await prisma.product.create({
    data: {
      name: "Figurine Eren Yeager",
      description: "Figurine d'Eren Yeager",
      price: 250, // Prix ajusté
      stock: 150,
      image_url: "/eren.jpg",
      animeId: anime5.id,
    },
  });

  const product6 = await prisma.product.create({
    data: {
      name: "Figurine Deku",
      description: "Figurine de Izuku Midoriya",
      price: 130, // Prix ajusté
      stock: 180,
      image_url: "/deku.jpg",
      animeId: anime6.id,
    },
  });

  const product7 = await prisma.product.create({
    data: {
      name: "Figurine Edward Elric",
      description: "Figurine d'Edward Elric",
      price: 200, // Prix ajusté
      stock: 120,
      image_url: "/edward.jpg",
      animeId: anime7.id,
    },
  });

  const product8 = await prisma.product.create({
    data: {
      name: "Figurine Kaneki Ken",
      description: "Figurine de Kaneki Ken",
      price: 175, // Prix ajusté
      stock: 100,
      image_url: "/kaneki.jpg",
      animeId: anime8.id,
    },
  });

  const product9 = await prisma.product.create({
    data: {
      name: "Figurine Tanjiro Kamado",
      description: "Figurine de Tanjiro Kamado",
      price: 190, // Prix ajusté
      stock: 150,
      image_url: "/tanjiro.jpg",
      animeId: anime9.id,
    },
  });

  const product10 = await prisma.product.create({
    data: {
      name: "Figurine Guts",
      description: "Figurine de Guts",
      price: 160, // Prix ajusté
      stock: 200,
      image_url: "/guts.jpg",
      animeId: anime10.id,
    },
  });

  const product11 = await prisma.product.create({
    data: {
      name: "Figurine Saitama",
      description: "Figurine de Saitama",
      price: 100, // Prix ajusté
      stock: 250,
      image_url: "/saitama.jpg",
      animeId: anime11.id,
    },
  });

  const product12 = await prisma.product.create({
    data: {
      name: "Figurine Light Yagami",
      description: "Figurine de Light Yagami",
      price: 180, // Prix ajusté
      stock: 100,
      image_url: "/light.jpg",
      animeId: anime12.id,
    },
  });

  const product13 = await prisma.product.create({
    data: {
      name: "Figurine Shinji Ikari",
      description: "Figurine de Shinji Ikari",
      price: 220, // Prix ajusté
      stock: 90,
      image_url: "/shinji.jpg",
      animeId: anime13.id,
    },
  });

  const product14 = await prisma.product.create({
    data: {
      name: "Figurine Gojo",
      description: "Figurine de Satoru Gojo",
      price: 1000, // Prix ajusté à 1000€
      stock: 90,
      image_url: "/satoru.jpg",
      animeId: anime14.id,
    },
  });

  const product15 = await prisma.product.create({
    data: {
      name: "Figurine Joseph Joestar",
      description: "Figurine de Joseph Joestar",
      price: 180, // Prix ajusté
      stock: 90,
      image_url: "/joseph.jpg",
      animeId: anime15.id,
    },
  });

  // Seed Carts (sans utilisateur associé, panier anonyme)
  const cart1 = await prisma.cart.create({
    data: {
      createdAt: new Date("2025-03-20T10:21:55.671Z"),
      updatedAt: new Date("2025-03-20T10:21:55.671Z"),
      cartItems: {
        create: [
          {
            quantitee: 2,
            productId: product1.id,
          },
        ],
      },
    },
  });

  // Seed Reviews (Avis)
  await prisma.review.create({
    data: {
      note: 5,
      date_review: new Date(),
      content: "Superbe figurine, excellente qualité!",
      productId: product1.id,
      userId: user1.id,
    },
  });

  await prisma.review.create({
    data: {
      note: 4,
      date_review: new Date(),
      content: "Belle figurine, mais un peu petite.",
      productId: product2.id,
      userId: user2.id,
    },
  });

  // Seed Favorites (Favoris)
  await prisma.favorite.create({
    data: {
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: user1.id,
      productId: product1.id,
    },
  });

  await prisma.favorite.create({
    data: {
      createdAt: new Date(),
      updatedAt: new Date(),
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

  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
