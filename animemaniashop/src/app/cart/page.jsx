"use client";

import React, { useState, useEffect } from "react";

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Exemple d'appel API pour récupérer les éléments du panier de l'utilisateur
    // Remplacer cette partie par une vraie API qui interroge la base de données
    const fetchCartItems = async () => {
      const response = await fetch("/api/cart"); // À remplacer par l'URL de ton API
      const data = await response.json();
      setCartItems(data.cartItems);

      // Calcul du total du panier
      const totalPrice = data.cartItems.reduce((acc, item) => {
        return acc + item.product.price * item.quantity;
      }, 0);
      setTotal(totalPrice);
    };

    fetchCartItems();
  }, []);

  return (
    <div className="cart-page">
      <h1>Votre Panier</h1>

      {cartItems.length === 0 ? (
        <p className="text-center m-2">Votre panier est vide.</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.product.image_url} alt={item.product.name} />
              <div className="cart-item-details">
                <h3>{item.product.name}</h3>
                <p>{item.product.description}</p>
                <p>Prix: {item.product.price}€</p>
                <p>Quantité: {item.quantity}</p>
                <p>Total: {item.product.price * item.quantity}€</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="cart-summary">
        <h3>Total du Panier: {total}€</h3>
        <button className="checkout-btn">Passer à la caisse</button>
      </div>
    </div>
  );
}

export default CartPage;
