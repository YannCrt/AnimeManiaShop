"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/cart");

      if (!response.ok) {
        throw new Error("Erreur lors du chargement du panier");
      }

      const data = await response.json();
      setCartItems(data.cartItems);

      const totalPrice = data.cartItems.reduce((acc, item) => {
        return acc + item.product.price * item.quantitee;
      }, 0);

      setTotal(totalPrice);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (cartItemId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      const response = await fetch("/api/cart", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartItemId,
          quantity: newQuantity,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(
          data.error || "Erreur lors de la mise à jour du panier"
        );
      }

      // Rafraîchissons le panier
      fetchCartItems();
    } catch (err) {
      setError(err.message);
    }
  };

  const removeItem = async (cartItemId) => {
    try {
      const response = await fetch("/api/cart", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartItemId,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(
          data.error || "Erreur lors de la suppression de l'article"
        );
      }

      // Rafraîchissons le panier
      fetchCartItems();
    } catch (err) {
      setError(err.message);
    }
  };

  const checkout = () => {
    alert("Fonctionnalité de paiement à implémenter");
  };

  if (loading) return <div className="loading">Chargement du panier...</div>;
  if (error) return <div className="error">Erreur: {error}</div>;

  return (
    <div className="cart-page container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Votre Panier</h1>

      {cartItems.length === 0 ? (
        <div className="empty-cart text-center p-8">
          <p className="mb-4">Votre panier est vide.</p>
          <Link
            href="/shop"
            className="inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Continuer vos achats
          </Link>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items space-y-4 mb-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="cart-item flex border rounded p-4 gap-4"
              >
                <div className="cart-item-image w-24">
                  <Image
                    src={item.product.image_url}
                    alt={item.product.name}
                    width={100}
                    height={100}
                    objectFit="cover"
                    className="rounded"
                  />
                </div>

                <div className="cart-item-details flex-grow">
                  <h3 className="font-semibold">{item.product.name}</h3>
                  <p className="text-sm text-gray-600">
                    {item.product.description}
                  </p>
                  <p className="text-lg font-medium mt-2">
                    {item.product.price}€
                  </p>
                </div>

                <div className="cart-item-actions flex flex-col items-end gap-2">
                  <div className="quantity-controls flex items-center">
                    <button
                      className="decrease-btn bg-gray-200 px-2 py-1 rounded-l"
                      onClick={() =>
                        updateQuantity(item.id, item.quantitee - 1)
                      }
                    >
                      -
                    </button>
                    <span className="quantity-display px-4 py-1 bg-gray-100">
                      {item.quantitee}
                    </span>
                    <button
                      className="increase-btn bg-gray-200 px-2 py-1 rounded-r"
                      onClick={() =>
                        updateQuantity(item.id, item.quantitee + 1)
                      }
                    >
                      +
                    </button>
                  </div>

                  <div className="item-subtotal text-right">
                    <p>Sous-total: {item.product.price * item.quantitee}€</p>
                  </div>

                  <button
                    className="remove-btn text-red-600 hover:text-red-800"
                    onClick={() => removeItem(item.id)}
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary bg-gray-100 p-4 rounded">
            <div className="summary-items space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Sous-total</span>
                <span>{total}€</span>
              </div>
              <div className="flex justify-between">
                <span>Livraison</span>
                <span>Gratuite</span>
              </div>
            </div>

            <div className="total-price flex justify-between font-bold text-xl border-t pt-2">
              <span>Total</span>
              <span>{total}€</span>
            </div>

            <div className="checkout-actions mt-4 flex gap-4">
              <Link
                href="/shop"
                className="continue-shopping bg-gray-200 py-2 px-4 rounded hover:bg-gray-300 flex-grow text-center"
              >
                Continuer vos achats
              </Link>
              <button
                className="checkout-btn bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 flex-grow"
                onClick={checkout}
              >
                Passer à la caisse
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
