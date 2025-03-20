import Image from "next/image";
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

  return (
    <div className="product-detail">
      <h1>{product.name}</h1>
      <div className="product-image">
        <Image
          src={product.image_url}
          alt={product.name}
          width={400}
          height={400}
          priority
        />
      </div>
      <div className="product-info">
        <p className="description">{product.description}</p>
        <p className="anime">Anime: {product.anime.Anime_name}</p>
        <p className="price">Prix: {product.price} €</p>
        <p className="stock">Stock disponible: {product.stock}</p>

        {product.anime.categories && product.anime.categories.length > 0 && (
          <div className="categories">
            <p>Catégories:</p>
            <ul>
              {product.anime.categories.map((category) => (
                <li key={category.id}>{category.category_name}</li>
              ))}
            </ul>
          </div>
        )}

        {isLoggedIn && (
          <div className="add-avis-form">
            <h3>Ajouter votre avis</h3>
            <form action={handleAddAvis}>
              <div className="form-group">
                <label htmlFor="note">Note (1-5):</label>
                <select id="note" name="note" required className="form-control">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="content">Votre avis:</label>
                <textarea
                  id="content"
                  name="content"
                  required
                  className="form-control"
                  rows="2"
                ></textarea>
              </div>
              <button type="submit" className="submit-avis">
                Envoyer
              </button>
            </form>
            <br />
          </div>
        )}

        <div className="avis">
          <p>Avis :</p>
          {avis.length > 0 ? (
            avis.map((avi) => (
              <div key={avi.id} className="avis-item">
                <p className="avis-user">
                  {avi.user.firstname} {avi.user.lastname}
                </p>
                <p className="avis-note">Note : {avi.note}</p>
                <p className="avis-content">{avi.content}</p>
                <br />
              </div>
            ))
          ) : (
            <p>Aucun avis pour le moment</p>
          )}
        </div>

        <button className="add-to-cart">Ajouter au panier</button>
      </div>
    </div>
  );
}
