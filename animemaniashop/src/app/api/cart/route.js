import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import prisma from "../../../../lib/prisma";

async function getOrCreateCartId() {
  const cookieStore = cookies();
  let cartId = await cookieStore.get("cartId")?.value;

  // Si le panier n'existe pas dans les cookies
  if (!cartId) {
    // Créons un panier temporaire dans la base de données
    // Nous n'avons plus besoin de spécifier date_creation car createdAt est automatique
    const tempCart = await prisma.cart.create({
      data: {}, // Aucun champ à spécifier car createdAt et updatedAt sont automatiques
    });

    // Log pour vérifier si le panier est bien créé
    console.log("Panier créé avec succès :", tempCart);

    cartId = tempCart.id.toString();

    // Nous allons retourner le nouveau cartId et l'indiquer pour définir le cookie dans la réponse
    return { cartId: parseInt(cartId), isNew: true };
  }

  // Vérification si le panier existe bien dans la base de données
  const existingCart = await prisma.cart.findUnique({
    where: { id: parseInt(cartId) },
  });

  // Log pour voir si le panier existe bien dans la base
  console.log("Vérification du panier dans la base de données :", existingCart);

  if (!existingCart) {
    // Si le panier n'existe pas dans la BD mais existe dans le cookie,
    // créons un nouveau panier
    const newCart = await prisma.cart.create({
      data: {}, // Aucun champ à spécifier car createdAt et updatedAt sont automatiques
    });

    console.log("Nouveau panier créé pour remplacer celui manquant :", newCart);
    return { cartId: newCart.id, isNew: true };
  }

  // Retourner l'ID du panier existant
  return { cartId: parseInt(cartId), isNew: false };
}

// GET /api/cart - Récupère le contenu du panier
export async function GET() {
  try {
    const { cartId, isNew } = await getOrCreateCartId();

    // Récupérons les articles du panier avec les informations de produit
    const cartItems = await prisma.cart_Item.findMany({
      where: {
        cartId,
      },
      include: {
        product: true,
      },
    });

    const response = NextResponse.json({ cartItems });

    // Si c'est un nouveau panier, définissons le cookie
    if (isNew) {
      response.cookies.set("cartId", cartId.toString(), {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
    }

    return response;
  } catch (error) {
    console.error("Erreur lors de la récupération du panier:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// POST /api/cart - Ajoute un produit au panier
// POST /api/cart - Ajoute un produit au panier
export async function POST(request) {
  try {
    const { productId, quantity } = await request.json();
    const { cartId, isNew } = await getOrCreateCartId();

    // Vérifier si le produit existe
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Produit non trouvé" },
        { status: 404 }
      );
    }

    // Vérifier combien d'exemplaires sont déjà dans le panier
    const existingCartItem = await prisma.cart_Item.findFirst({
      where: { productId, cartId },
    });

    const totalQuantityInCart = existingCartItem
      ? existingCartItem.quantitee
      : 0;
    const newTotalQuantity = totalQuantityInCart + quantity;

    if (newTotalQuantity > product.stock) {
      return NextResponse.json({ error: "Stock insuffisant" }, { status: 400 });
    }

    let cartItem;
    if (existingCartItem) {
      cartItem = await prisma.cart_Item.update({
        where: { id: existingCartItem.id },
        data: { quantitee: newTotalQuantity },
      });
    } else {
      cartItem = await prisma.cart_Item.create({
        data: {
          cartId,
          productId,
          quantitee: quantity,
        },
      });
    }

    const response = NextResponse.json({ success: true, cartItem });

    if (isNew) {
      response.cookies.set("cartId", cartId.toString(), {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
    }

    return response;
  } catch (error) {
    console.error("Erreur lors de l'ajout au panier:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// PUT /api/cart - Met à jour la quantité d'un article dans le panier
export async function PUT(request) {
  try {
    const { cartItemId, quantity } = await request.json();
    const { cartId } = await getOrCreateCartId();

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

    // Vérifier si l'article existe
    const cartItem = await prisma.cart_Item.findUnique({
      where: { id: cartItemId },
    });

    if (!cartItem) {
      return NextResponse.json(
        { error: "Article non trouvé" },
        { status: 404 }
      );
    }

    // Supprimer l'article du panier sans modifier le stock du produit
    await prisma.cart_Item.delete({
      where: { id: cartItemId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur lors de la suppression du panier:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
