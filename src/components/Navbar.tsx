import { useContext } from "react";

import {
  Link,
  useLocation,
} from "react-router-dom";

import { CartContext } from "../context/CartContext";

function Navbar() {
  const context = useContext(CartContext);

  const location = useLocation();

  if (!context) return null;

  const search =
    location.pathname === "/cart"
      ? localStorage.getItem("homeSearch") || ""
      : location.search.replace("?", "");

  const homeLink = search
    ? `/?${search}`
    : "/";

  return (
    <nav className="navbar">
      <Link
        to={homeLink}
        className="logo"
      >
       E-Commerce
      </Link>

      <div className="nav-links">
        <Link to={homeLink}>
          Home
        </Link>

        <Link to="/cart">
          Cart ({context.cart.length})
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;