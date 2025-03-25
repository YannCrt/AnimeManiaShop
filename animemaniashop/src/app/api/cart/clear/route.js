import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import prisma from "../../../../../lib/prisma";

export async function DELETE() {
  try {
    const cookieStore = await cookies();
    const cartId = cookieStore.get("cartId")?.value;

    if (!cartId) {
      return NextResponse.json(
        { error: "Aucun panier trouvé" },
        { status: 404 }
      );
    }

    const parsedCartId = parseInt(cartId);

    // 🔹 Étape 1: Récupérer les articles du panier
    const cartItems = await prisma.cart_Item.findMany({
      where: { cartId: parsedCartId },
      include: { product: true }, // Pour récupérer les infos des produits
    });

    // 🔹 Étape 2: Mettre à jour le stock des produits
    for (const item of cartItems) {
      await prisma.product.update({
        where: { id: item.productId },
        data: {
          stock: {
            decrement: item.quantitee, // Réduire le stock du nombre commandé
          },
        },
      });
    }

    // 🔹 Étape 3: Supprimer tous les articles du panier
    await prisma.cart_Item.deleteMany({
      where: { cartId: parsedCartId },
    });

    // 🔹 Étape 4: Supprimer le panier
    await prisma.cart.delete({
      where: { id: parsedCartId },
    });

    // 🔹 Étape 5: Supprimer le cookie `cartId`
    const response = NextResponse.json({
      success: true,
      message: "Panier vidé et stock mis à jour",
    });
    response.cookies.set("cartId", "", { maxAge: 0, path: "/" });

    return response;
  } catch (error) {
    console.error("Erreur lors du traitement de la commande:", error);
    return NextResponse.json(
      { error: error.message || "Erreur serveur" },
      { status: 500 }
    );
  }
}
