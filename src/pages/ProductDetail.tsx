import {
  useContext,
  useEffect,
  useState,
} from "react";

import {
  Link,
  useParams,
} from "react-router-dom";

import { CartContext } from "../context/CartContext";

import type { Product } from "../types/product";

function ProductDetail() {
  const [product, setProduct] =
    useState<Product | null>(null);

  const { id } = useParams();

  const context = useContext(CartContext);

  const savedSearch =
    localStorage.getItem("homeSearch");

  useEffect(() => {
    fetch(
      `https://api.escuelajs.co/api/v1/products/${id}`,
    )
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
      });
  }, [id]);

  if (!product || !context) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="container">
      <Link
        to={`/${
          savedSearch
            ? `?${savedSearch}`
            : ""
        }`}
        className="back-link"
      >
        ← Back To Home
      </Link>

      <div className="detail">
        <img
          src={product.images?.[0]}
          alt={product.title}
          onError={(e) => {
            e.currentTarget.src =
              "https://placehold.co/600x400?text=No+Image";
          }}
        />

        <div className="detail-content">
          <h1>{product.title}</h1>

          <p>{product.description}</p>

          <h2>₹ {product.price}</h2>

          <button
            onClick={() => {
              context.setCart([
                ...context.cart,
                product,
              ]);
            }}
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;