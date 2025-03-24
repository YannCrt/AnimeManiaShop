import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

async function getCurrentUser() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) return null;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded.id) return null;

    return await prisma.user.findUnique({ where: { id: decoded.id } });
  } catch (error) {
    return null;
  }
}

export async function GET(req) {
  try {
    const reviews = await prisma.review.findMany({
      include: { user: true, product: true },
    });
    return NextResponse.json(reviews);
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const user = await getCurrentUser();
    if (!user)
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

    const body = await req.json();
    const newReview = await prisma.review.create({
      data: {
        note: body.note,
        content: body.content,
        date_review: new Date(),
        productId: body.productId,
        userId: user.id,
      },
    });
    return NextResponse.json(newReview, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
