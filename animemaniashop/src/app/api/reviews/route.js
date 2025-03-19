import { prisma } from "../../../lib/prisma";

export async function GET(req, { params }) {
  const { productId } = params;

  try {
    const reviews = await prisma.review.findMany({
      where: { productId: parseInt(productId) },
      orderBy: { createdAt: "desc" },
    });
    return new Response(JSON.stringify(reviews), { status: 200 });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Erreur lors de la récupération des avis" }),
      { status: 500 }
    );
  }
}

export async function POST(req, { params }) {
  const { productId } = params;
  const { rating, comment } = await req.json();

  try {
    const review = await prisma.review.create({
      data: {
        rating,
        comment,
        productId: parseInt(productId),
      },
    });
    return new Response(JSON.stringify(review), { status: 201 });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Erreur lors de l'ajout de l'avis" }),
      { status: 500 }
    );
  }
}
