import Image from "next/image";
import { getProductById } from "../../../../lib/product.action";

export default async function ProductDetailPage({ params }) {
  const resolvedParams = await params;
  const productId = parseInt(resolvedParams.id);
  const product = await getProductById(productId);

  if (!product) {
    return <div>Produit non trouvé</div>;
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

        <button className="add-to-cart">Ajouter au panier</button>
      </div>
    </div>
  );
}
