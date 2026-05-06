import { Link } from "react-router-dom";
import type { Product } from "../types/product";


type Props = {
  product: Product;
};

function ProductCard({ product }: Props) {
  return (
    <Link
      to={`/product/${product.id}`}
      className="card"
    >
      <img
        src={product.images?.[0]}
        alt={product.title}
      />

      <div className="card-content">
        <h3>{product.title}</h3>

        <p>₹ {product.price}</p>
      </div>
    </Link>
  );
}

export default ProductCard;