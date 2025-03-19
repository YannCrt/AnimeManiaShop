// /app/api/debug/route.js
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    // Vérification des connexions à la base de données
    const userCount = await prisma.user.count();
    const productCount = await prisma.product.count();
    const cartCount = await prisma.cart.count();
    const cartItemCount = await prisma.cart_Item.count();

    return NextResponse.json({
      status: "ok",
      dbConnection: "successful",
      counts: {
        users: userCount,
        products: productCount,
        carts: cartCount,
        cartItems: cartItemCount,
      },
    });
  } catch (error) {
    console.error("Erreur de diagnostic:", error);
    return NextResponse.json(
      {
        status: "error",
        message: error.message,
        stack: process.env.NODE_ENV === "development" ? error.stack : null,
      },
      { status: 500 }
    );
  }
}
