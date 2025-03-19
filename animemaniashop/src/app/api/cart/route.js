// /app/api/cart/route.js
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import prisma from "../../../../lib/prisma";

// Fonction pour obtenir ou créer un ID de panier (stocké dans les cookies pour les utilisateurs non connectés)
async function getOrCreateCartId() {
  const cookieStore = cookies();
  let cartId = cookieStore.get("cartId")?.value;

  if (!cartId) {
    // Créons un panier temporaire
    const tempCart = await prisma.cart.create({
      data: {
        date_creation: new Date(),
      },
    });

    cartId = tempCart.id.toString();
    // Stockons l'ID dans un cookie qui expire après 30 jours
    cookieStore.set("cartId", cartId, { maxAge: 30 * 24 * 60 * 60 });
  }

  return parseInt(cartId);
}

// GET /api/cart - Récupère le contenu du panier
export async function GET() {
  try {
    const cartId = await getOrCreateCartId();

    // Récupérons les articles du panier avec les informations de produit
    const cartItems = await prisma.cart_Item.findMany({
      where: {
        cartId,
      },
      include: {
        product: true,
      },
    });

    return NextResponse.json({ cartItems });
  } catch (error) {
    console.error("Erreur lors de la récupération du panier:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// POST /api/cart - Ajoute un produit au panier
export async function POST(request) {
  try {
    const { productId, quantity } = await request.json();

    const cartId = await getOrCreateCartId();

    // Vérifions d'abord le stock disponible
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Produit non trouvé" },
        { status: 404 }
      );
    }

    if (product.stock < quantity) {
      return NextResponse.json({ error: "Stock insuffisant" }, { status: 400 });
    }

    // Vérifions si le produit est déjà dans le panier
    let cartItem = await prisma.cart_Item.findFirst({
      where: {
        productId,
        cartId,
      },
    });

    if (cartItem) {
      // Si le produit est déjà dans le panier, mettons à jour la quantité
      cartItem = await prisma.cart_Item.update({
        where: { id: cartItem.id },
        data: {
          quantitee: cartItem.quantitee + quantity,
        },
      });
    } else {
      // Sinon, ajoutons un nouvel article au panier
      cartItem = await prisma.cart_Item.create({
        data: {
          cartId,
          productId,
          quantitee: quantity,
        },
      });
    }

    // Mettons à jour le stock du produit
    await prisma.product.update({
      where: { id: productId },
      data: {
        stock: product.stock - quantity,
      },
    });

    return NextResponse.json({ success: true, cartItem });
  } catch (error) {
    console.error("Erreur lors de l'ajout au panier:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// PUT /api/cart - Met à jour la quantité d'un article dans le panier
export async function PUT(request) {
  try {
    const { cartItemId, quantity } = await request.json();

    const cartItem = await prisma.cart_Item.findUnique({
      where: { id: cartItemId },
      include: { product: true },
    });

    if (!cartItem) {
      return NextResponse.json(
        { error: "Article non trouvé" },
        { status: 404 }
      );
    }

    // Calculons la différence entre la nouvelle quantité et l'ancienne
    const quantityDifference = quantity - cartItem.quantitee;

    // Vérifions si nous avons suffisamment de stock
    if (quantityDifference > 0 && cartItem.product.stock < quantityDifference) {
      return NextResponse.json({ error: "Stock insuffisant" }, { status: 400 });
    }

    // Mettons à jour la quantité dans le panier
    const updatedCartItem = await prisma.cart_Item.update({
      where: { id: cartItemId },
      data: {
        quantitee: quantity,
      },
    });

    // Mettons à jour le stock du produit
    await prisma.product.update({
      where: { id: cartItem.productId },
      data: {
        stock: cartItem.product.stock - quantityDifference,
      },
    });

    return NextResponse.json({ success: true, cartItem: updatedCartItem });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du panier:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// DELETE /api/cart - Supprime un article du panier
export async function DELETE(request) {
  try {
    const { cartItemId } = await request.json();

    const cartItem = await prisma.cart_Item.findUnique({
      where: { id: cartItemId },
      include: { product: true },
    });

    if (!cartItem) {
      return NextResponse.json(
        { error: "Article non trouvé" },
        { status: 404 }
      );
    }

    // Restaurons le stock du produit
    await prisma.product.update({
      where: { id: cartItem.productId },
      data: {
        stock: cartItem.product.stock + cartItem.quantitee,
      },
    });

    // Supprimons l'article du panier
    await prisma.cart_Item.delete({
      where: { id: cartItemId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'article:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
