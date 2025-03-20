import Image from "next/image";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import {
  getProductById,
  getAvisbyProductID,
  addAvis,
  getCurrentUser,
} from "../../../../lib/product.action";

export default async function ProductDetailPage({ params }) {
  const resolvedParams = await params;
  const productId = parseInt(resolvedParams.id);
  const product = await getProductById(productId);
  const avis = await getAvisbyProductID(productId);
  const currentUser = await getCurrentUser();
  const isLoggedIn = !!currentUser;

  if (!product) {
    return <div>Produit non trouvé</div>;
  }

  async function handleAddAvis(formData) {
    "use server";

    const note = formData.get("note");
    const content = formData.get("content");

    try {
      await addAvis(productId, note, content);
      revalidatePath(`/product/${productId}`);
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'avis:", error);
    }
  }

  // Fonction pour générer les étoiles selon la note
  const renderStars = (note) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= note) {
        stars.push("★"); // Étoile pleine
      } else {
        stars.push("☆"); // Étoile vide
      }
    }
    return stars.join("");
  };

  return (
    <div>
      <div className="product-detail container mx-auto p-4">
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
                Quantité :{" "}
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

      <div className="reviews-container">
        <h2 className="reviews-title">Avis des clients</h2>

        {isLoggedIn ? (
          <div className="review-form-container">
            <h3 className="form-title">Ajouter votre avis</h3>
            <form action={handleAddAvis} className="review-form">
              <div className="form-group">
                <label htmlFor="note">Note:</label>
                <div className="star-rating">
                  <select
                    id="note"
                    name="note"
                    required
                    className="form-control"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="content">Votre avis:</label>
                <textarea
                  id="content"
                  name="content"
                  required
                  className="form-control"
                  rows="3"
                  placeholder="Partagez votre expérience avec ce produit..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="action-button submit-review-button"
              >
                Envoyer mon avis
              </button>
            </form>
          </div>
        ) : (
          <div className="login-to-review">
            <p>Vous souhaitez partager votre avis sur ce produit ?</p>
            <Link href="/login" className="login-link">
              Connectez-vous pour ajouter un avis
            </Link>
          </div>
        )}

        <div className="reviews-list">
          {avis.length > 0 ? (
            <div className="reviews-count">{avis.length} avis</div>
          ) : null}

          {avis.length > 0 ? (
            avis.map((avi) => (
              <div key={avi.id} className="review-card">
                <div className="review-header">
                  <div className="review-user">
                    {avi.user.firstname} {avi.user.lastname}
                  </div>
                  <div className="review-date">
                    {/* Si vous avez une date, vous pouvez l'afficher ici */}
                  </div>
                </div>
                <div className="review-stars">
                  <span className="stars">{renderStars(avi.note)}</span>
                  <span className="note-value">{avi.note}/5</span>
                </div>
                <div className="review-content">
                  <p>"{avi.content}"</p>
                </div>
              </div>
            ))
          ) : (
            <div className="no-reviews">
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
