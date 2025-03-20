// /app/product/[id]/page.js
"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function ProductPage() {
  const params = useParams();
  const productId = params.id;
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addingToCart, setAddingToCart] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        // Utilisez directement votre fonction getProductById via une API
        const response = await fetch(`/api/products/${productId}`);
        if (!response.ok) {
          throw new Error("Produit non trouvé");
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    // Assurons-nous que la quantité ne dépasse pas le stock disponible
    const maxQuantity = product?.stock || 1;
    setQuantity(Math.min(Math.max(1, value), maxQuantity));
  };

  const addToCart = async () => {
    try {
      setAddingToCart(true);
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: parseInt(productId),
          quantity,
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout au panier");
      }

      const data = await response.json();
      console.log("Ajout au panier réussi:", data);

      if (data.error) {
        throw new Error(data.error);
      }

      // Logique de succès
      setNotification({
        type: "success",
        message: `${quantity} ${product.name} ajouté(s) au panier !`,
      });

      // Mise à jour du stock
      setProduct({
        ...product,
        stock: product.stock - quantity,
      });

      setQuantity(1);
    } catch (err) {
      console.error("Erreur lors de l'ajout au panier:", err);
      setNotification({
        type: "error",
        message: err.message,
      });
    } finally {
      setAddingToCart(false);
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    }
  };

  if (loading) return <div className="loading">Chargement...</div>;
  if (error) return <div className="error">Erreur: {error}</div>;
  if (!product) return <div>Produit non trouvé</div>;

  return (
    <div className="product-detail container mx-auto p-4">
      {notification && (
        <div
          className={`notification ${notification.type} p-4 mb-4 rounded ${
            notification.type === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {notification.message}
        </div>
      )}

      <h1 className="product-title text-2xl font-bold mb-4">{product.name}</h1>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="product-image w-full md:w-1/2">
          <Image
            src={product.image_url}
            alt={product.name}
            width={400}
            height={400}
            objectFit="cover"
            className="rounded-lg"
          />
        </div>

        <div className="product-info w-full md:w-1/2">
          <p className="product-description mb-4">{product.description}</p>

          <p className="product-price text-xl font-semibold mb-4">
            Prix : {product.price} €
          </p>

          <p className="stock-info mb-4">
            En stock :{" "}
            <span
              className={product.stock > 10 ? "text-green-600" : "text-red-600"}
            >
              {product.stock} disponible(s)
            </span>
          </p>

          <div className="quantity mb-4">
            <label htmlFor="quantity" className="block mb-2">
              Quantité :{" "}
            </label>
            <input
              type="number"
              id="quantity"
              min="1"
              max={product.stock}
              value={quantity}
              onChange={handleQuantityChange}
              className="quantity-input p-2 border rounded w-20"
            />
          </div>

          <button
            className={`add-to-cart py-2 px-4 rounded ${
              product.stock > 0
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            onClick={addToCart}
            disabled={product.stock === 0 || addingToCart}
          >
            {addingToCart ? "Ajout en cours..." : "Ajouter au panier"}
          </button>
        </div>
      </div>
    </div>
  );
}
