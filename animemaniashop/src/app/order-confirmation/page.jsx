"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function OrderConfirmation() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function clearCart() {
      try {
        const response = await fetch("/api/cart/clear", { method: "DELETE" });

        if (!response.ok) {
        }
      } catch (error) {
        console.error("Erreur:", error);
      } finally {
        setLoading(false);
      }
    }

    clearCart();
  }, []);

  return (
    <div className="order-confirmation">
      {loading ? (
        <p className="loading-text">Traitement de votre commande...</p>
      ) : (
        <div className="order-confirmation-container">
          <h1>Merci pour votre commande !</h1>
          <p>Votre commande a été validée avec succès.</p>
          <p>Vous recevrez bientôt un email de confirmation.</p>
          <button onClick={() => router.push("/")} className="return-button">
            Retour à l'accueil
          </button>
        </div>
      )}
    </div>
  );
}

export default OrderConfirmation;
