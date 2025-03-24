import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const {
      firstName,
      lastName,
      email,
      address,
      city,
      postalCode,
      phoneNumber,
      items,
      total,
    } = await request.json();

    // Optional: You might want to create an Order model in Prisma if needed
    // For now, we'll just clear the cart

    // Find the current cart
    const cart = await prisma.cart.findFirst();

    if (!cart) {
      return NextResponse.json({ error: "Panier non trouvé" }, { status: 404 });
    }

    // Delete all cart items associated with this cart
    await prisma.cart_Item.deleteMany({
      where: {
        cartId: cart.id,
      },
    });

    return NextResponse.json(
      {
        message: "Commande validée et panier vidé",
        orderId: null, // You could generate an order ID if you create an Order model
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la validation de la commande:", error);
    return NextResponse.json(
      {
        error: "Erreur lors de la validation de la commande",
      },
      { status: 500 }
    );
  }
}
