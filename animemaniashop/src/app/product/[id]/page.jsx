"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  getProductById,
  getAvisbyProductID,
  addAvis,
  getCurrentUser,
} from "../../../../lib/product.action";

export default function ProductDetailPage({ params }) {
  const [message, setMessage] = useState(null);
  const [productId, setProductId] = useState(null);
  const [product, setProduct] = useState(null);
  const [avis, setAvis] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // Handle the params and fetch the productId correctly
  useEffect(() => {
    async function fetchData() {
      const resolvedParams = await params; // Await the Promise to resolve it
      const productId = parseInt(resolvedParams.id); // Now it's safe to access `id`
      setProductId(productId);

      const fetchedProduct = await getProductById(productId);
      const fetchedAvis = await getAvisbyProductID(productId);
      const user = await getCurrentUser();
      setProduct(fetchedProduct);
      setAvis(fetchedAvis);
      setCurrentUser(user);
    }

    fetchData();
  }, [params]);

  if (!product) {
    return <div>Produit non trouvé</div>;
  }

  async function handleAddAvis(event) {
    event.preventDefault(); // Empêche la page de se recharger

    const formData = new FormData(event.target);
    const note = formData.get("note");
    const content = formData.get("content");

    if (!note || !content) {
      setMessage("Veuillez remplir tous les champs !");
      return;
    }

    try {
      await addAvis(productId, parseInt(note), content);
      setMessage("Avis ajouté avec succès !");
      event.target.reset(); // Réinitialise le formulaire

      // Met à jour la liste des avis après l'ajout
      const updatedAvis = await getAvisbyProductID(productId);
      setAvis(updatedAvis);
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'avis:", error);
      setMessage("Erreur lors de l'ajout de l'avis.");
    }
  }

  // Fonction pour générer les étoiles selon la note
  const renderStars = (note) => {
    return "★".repeat(note) + "☆".repeat(5 - note);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="product-detail">
        <h1 className="product-title text-2xl font-bold mb-4">
          {product.name}
        </h1>
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
                className={
                  product.stock > 10 ? "text-green-600" : "text-red-600"
                }
              >
                {product.stock} disponible(s)
              </span>
            </p>

            <div className="quantity mb-4">
              <label htmlFor="quantity" className="block mb-2">
                Quantité :
              </label>
              <input
                type="number"
                id="quantity"
                min="1"
                defaultValue="1"
                max={product.stock}
                className="quantity-input p-2 border rounded w-20"
              />
            </div>

            <button
              className={`add-to-cart py-2 px-4 rounded ${
                product.stock > 0
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Ajouter au panier
            </button>
          </div>
        </div>
      </div>

      <div className="reviews-container mt-8">
        <h2 className="reviews-title text-xl font-bold">Avis des clients</h2>

        {currentUser ? (
          <div className="review-form-container mt-4">
            <h3 className="form-title font-semibold">Ajouter votre avis</h3>
            {message && <p className="message text-red-500">{message}</p>}
            <form onSubmit={handleAddAvis} className="review-form mt-2">
              <div className="form-group mb-2">
                <label htmlFor="note">Note:</label>
                <select
                  id="note"
                  name="note"
                  required
                  className="form-control border p-2"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
              <div className="form-group mb-2">
                <label htmlFor="content">Votre avis:</label>
                <textarea
                  id="content"
                  name="content"
                  required
                  className="form-control border p-2 w-full"
                  rows="3"
                  placeholder="Partagez votre expérience avec ce produit..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="action-button submit-review-button bg-blue-500 text-white py-2 px-4 rounded"
              >
                Envoyer mon avis
              </button>
            </form>
          </div>
        ) : (
          <div className="login-to-review mt-4">
            <p>Vous souhaitez partager votre avis sur ce produit ?</p>
            <Link href="/login" className="login-link text-blue-500">
              Connectez-vous pour ajouter un avis
            </Link>
          </div>
        )}

        <div className="reviews-list mt-6">
          {avis.length > 0 ? (
            <div className="reviews-count text-lg">{avis.length} avis</div>
          ) : null}

          {avis.length > 0 ? (
            avis.map((avi) => (
              <div key={avi.id} className="review-card border p-4 rounded mb-2">
                <div className="review-header flex justify-between">
                  <div className="review-user font-semibold">
                    {avi.user.firstname} {avi.user.lastname}
                  </div>
                  <div className="review-date text-gray-500 text-sm">
                    {new Date(avi.date_review).toLocaleDateString()}
                  </div>
                </div>
                <div className="review-stars text-yellow-500 text-lg">
                  <span className="stars">{renderStars(avi.note)}</span>
                  <span className="note-value text-sm ml-2">{avi.note}/5</span>
                </div>
                <div className="review-content mt-2">
                  <p>"{avi.content}"</p>
                </div>
              </div>
            ))
          ) : (
            <div className="no-reviews text-gray-600 mt-4">
              <p>
                Aucun avis pour le moment. Soyez le premier à donner votre avis
                !
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
