"use server";
import Image from "next/image";
import { getAllProducts } from "../../../lib/product.action";

export default async function ShopPage() {
  const products = await getAllProducts();
  return (
    <>
      <h1>Shop Page</h1>
      <div className="products">
        {products.map((product) => (
          <div key={product.id}>
            <Image
              src={product.image_url}
              alt={product.name}
              height={200}
              width={200}
            />
            <div>{product.name} </div>
            <div>{product.description} </div>
            <div>Prix : {product.price} €</div>
          </div>
        ))}
      </div>
    </>
  );
}
