import { useRouter } from "next/router";
import { getProductById } from "../../../lib/product.action"; // Tu devras créer cette fonction

export default async function ProductPage({ params }) {
  const { id } = params;
  const product = await getProductById(id); // Récupérer les infos du produit avec son ID

  const handleAddToCart = () => {
    // Logique pour ajouter au panier (côté client ou API)
    console.log(`Produit ajouté au panier : ${product.name}`);
  };

  return (
    <div>
      <h1>{product.name}</h1>
      <div>
        <img
          src={product.image_url}
          alt={product.name}
          width={300}
          height={300}
        />
      </div>
      <p>{product.description}</p>
      <p>Prix : {product.price} €</p>
      <button onClick={handleAddToCart}>Ajouter au panier</button>
    </div>
  );
}
