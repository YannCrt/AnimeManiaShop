"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  getProductById,
  getAvisbyProductID,
  addAvis,
  getCurrentUser,
  deleteAvis,
} from "../../../../lib/product.action";

export default function ProductDetailPage() {
  const params = useParams();
  const [productId, setProductId] = useState(null);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addingToCart, setAddingToCart] = useState(false);
  const [notification, setNotification] = useState(null);

  // Reviews states
  const [avis, setAvis] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        if (!params.id) return;

        const productId = parseInt(params.id);
        setProductId(productId);

        // Fetch product details
        const fetchedProduct = await getProductById(productId);
        setProduct(fetchedProduct);

        // Fetch product reviews
        const fetchedAvis = await getAvisbyProductID(productId);
        setAvis(fetchedAvis);

        // Fetch current user
        const user = await getCurrentUser();
        setCurrentUser(user);

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }

    fetchData();
  }, [params.id]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
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

  async function handleAddAvis(event) {
    event.preventDefault();
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
      event.target.reset();

      // Met à jour la liste des avis après l'ajout
      const updatedAvis = await getAvisbyProductID(productId);
      setAvis(updatedAvis);
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'avis:", error);
      setMessage("Erreur lors de l'ajout de l'avis.");
    }
  }

  const handleDeleteAvis = async (avisId) => {
    try {
      await deleteAvis(avisId);
      setAvis(avis.filter((avi) => avi.id !== avisId));
      setMessage("Avis supprimé avec succès !");
    } catch (error) {
      console.error("Erreur lors de la suppression de l'avis:", error);
      setMessage("Erreur lors de la suppression de l'avis.");
    }
  };

  const renderStars = (note) => {
    return "★".repeat(note) + "☆".repeat(5 - note);
  };

  if (loading) return <div className="loading">Chargement...</div>;
  if (error) return <div className="error">Erreur: {error}</div>;
  if (!product) return <div>Produit non trouvé</div>;

  return (
    <div className="container mx-auto p-4">
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
                <div className="review-content">
                  <p>"{avi.content}"</p>
                  {currentUser && currentUser.id === avi.user.id && (
                    <div className="review-actions">
                      <a
                        className="review-edit-button "
                        href={`${productId}/modifier-avis/${avi.id}`}
                      >
                        Modifier
                      </a>
                      <button
                        className="review-delete-button"
                        onClick={() => handleDeleteAvis(avi.id)}
                      >
                        Supprimer
                      </button>
                    </div>
                  )}
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
