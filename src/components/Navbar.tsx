import { useContext } from "react";

import { Link } from "react-router-dom";

import { CartContext } from "../context/CartContext";

function Navbar() {
  const context = useContext(CartContext);

  if (!context) return null;

  return (
    <div className="navbar">
      <Link to="/" className="logo">
        Shop
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>

        <Link to="/cart">
          Cart ({context.cart.length})
        </Link>
      </div>
    </div>
  );
}

export default Navbar;