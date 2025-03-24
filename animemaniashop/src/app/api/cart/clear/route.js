import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import prisma from "../../../../../lib/prisma"; // Assure-toi que ce chemin est correct
export async function DELETE() {
  try {
    const cookieStore = await cookies(); // Ajoute `await`
    const cartId = cookieStore.get("cartId")?.value;

    if (!cartId) {
      return NextResponse.json(
        { error: "Aucun panier trouvé" },
        { status: 404 }
      );
    }

    const parsedCartId = parseInt(cartId);

    // Supprimer tous les articles du panier
    await prisma.cart_Item.deleteMany({
      where: { cartId: parsedCartId },
    });

    // Supprimer le panier
    await prisma.cart.delete({
      where: { id: parsedCartId },
    });

    // Supprimer le cookie cartId
    const response = NextResponse.json({
      success: true,
      message: "Panier supprimé",
    });
    response.cookies.set("cartId", "", { maxAge: 0, path: "/" });

    return response;
  } catch (error) {
    console.error("Erreur lors de la suppression du panier:", error);

    // ✅ Retourner une erreur plus détaillée
    return NextResponse.json(
      { error: error.message || "Erreur serveur" },
      { status: 500 }
    );
  }
}
