import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import prisma from "../../../../lib/prisma";

async function getOrCreateCartId() {
  const cookieStore = cookies();
  let cartId = await cookieStore.get("cartId")?.value;

  if (!cartId) {
    const tempCart = await prisma.cart.create({
      data: {},
    });

    console.log("Panier créé avec succès :", tempCart);

    cartId = tempCart.id.toString();

    return { cartId: parseInt(cartId), isNew: true };
  }

  const existingCart = await prisma.cart.findUnique({
    where: { id: parseInt(cartId) },
  });

  console.log("Vérification du panier dans la base de données :", existingCart);

  if (!existingCart) {
    const newCart = await prisma.cart.create({
      data: {},
    });

    console.log("Nouveau panier créé pour remplacer celui manquant :", newCart);
    return { cartId: newCart.id, isNew: true };
  }

  return { cartId: parseInt(cartId), isNew: false };
}

export async function GET() {
  try {
    const { cartId, isNew } = await getOrCreateCartId();

    const cartItems = await prisma.cart_Item.findMany({
      where: {
        cartId,
      },
      include: {
        product: true,
      },
    });

    const response = NextResponse.json({ cartItems });

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

export async function POST(request) {
  try {
    const { productId, quantity } = await request.json();
    const { cartId, isNew } = await getOrCreateCartId();

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Produit non trouvé" },
        { status: 404 }
      );
    }

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

    const quantityDifference = quantity - cartItem.quantitee;

    if (quantityDifference > 0 && cartItem.product.stock < quantityDifference) {
      return NextResponse.json({ error: "Stock insuffisant" }, { status: 400 });
    }

    const updatedCartItem = await prisma.cart_Item.update({
      where: { id: cartItemId },
      data: {
        quantitee: quantity,
      },
    });

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

export async function DELETE(request) {
  try {
    const { cartItemId } = await request.json();

    const cartItem = await prisma.cart_Item.findUnique({
      where: { id: cartItemId },
    });

    if (!cartItem) {
      return NextResponse.json(
        { error: "Article non trouvé" },
        { status: 404 }
      );
    }

    await prisma.cart_Item.delete({
      where: { id: cartItemId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur lors de la suppression du panier:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
