import Image from "next/image";
import { prisma } from "../../../../lib/prisma";

// Fonction pour récupérer un produit par son ID
async function getProductById(id) {
  return await prisma.product.findUnique({
    where: { id: parseInt(id) },
    include: {
      anime: true,
      categories: {
        include: {
          category: true,
        },
      },
    },
  });
}

export default async function ProductDetailPage({ params }) {
  const product = await getProductById(params.id);

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

        {product.categories.length > 0 && (
          <div className="categories">
            <p>Catégories:</p>
            <ul>
              {product.categories.map((item) => (
                <li key={item.categoryId}>{item.category.category_name}</li>
              ))}
            </ul>
          </div>
        )}

        <button className="add-to-cart">Ajouter au panier</button>
      </div>
    </div>
  );
}
