import { Link, useLocation } from "react-router-dom";

import type { Product } from "../types/product";

type Props = {
  product: Product;
};

function ProductCard({
  product,
}: Props) {
  const location = useLocation();

  return (
    <Link
      to={`/product/${product.id}${location.search}`}
      className="card"
    >
      <img
        src={product.images?.[0]}
        alt={product.title}
        loading="lazy"
        onError={(e) => {
          e.currentTarget.src =
            "https://placehold.co/600x400?text=No+Image";
        }}
      />

      <div className="card-content">
        <h3>{product.title}</h3>

        <p>₹ {product.price}</p>
      </div>
    </Link>
  );
}

export default ProductCard;