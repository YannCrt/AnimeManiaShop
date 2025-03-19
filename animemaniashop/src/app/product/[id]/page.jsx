// /app/product/[id]/page.js
"use server";
import { getProductById } from "../../../../lib/product.action"; // Assure-toi que cette fonction est correcte
import Image from "next/image";

export default async function ProductPage({ params }) {
  const { id } = params; // Récupère l'ID depuis les paramètres d'URL
  const product = await getProductById(id); // Appelle la fonction pour obtenir le produit par ID

  if (!product) {
    return <div>Produit non trouvé</div>; // Affiche ce message si le produit n'existe pas
  }

  return (
    <div className="product-detail">
      <h1 className="product-title">{product.name}</h1>

      <div className="product-image">
        <Image
          src={product.image_url}
          alt={product.name}
          height={300}
          width={300}
          objectFit="cover"
        />
      </div>

      <div className="product-info">
        <p className="product-description">{product.description}</p>

        <p className="product-price">
          <strong>Prix : </strong>
          {product.price} €
        </p>

        <div className="quantity">
          <label htmlFor="quantity">Quantité: </label>
          <input
            type="number"
            id="quantity"
            min="1"
            defaultValue="1"
            className="quantity-input"
          />
        </div>

        <div>
          <button className="add-to-cart">Ajouter au panier</button>
        </div>
      </div>
    </div>
  );
}
