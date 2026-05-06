import React, { createContext, useContext, useEffect, useState } from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams,
  useSearchParams,
} from "react-router-dom";

import "./index.css";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
};

type CartContextType = {
  cart: Product[];
  setCart: React.Dispatch<React.SetStateAction<Product[]>>;
};

const CartContext = createContext<CartContextType | null>(null);

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

        <Link to="/cart">Cart ({context.cart.length})</Link>
      </div>
    </div>
  );
}

function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  const [categories, setCategories] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategories = searchParams.get("categories")?.split(",") || [];

  const sort = searchParams.get("sort") || "";

  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.slice(0, 5));
      });
  }, []);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);

        let allProducts: Product[] = [];

        if (selectedCategories.length === 0) {
          const res = await fetch("https://api.escuelajs.co/api/v1/products");

          const data = await res.json();

          allProducts = data;
        } else {
          const promises = selectedCategories.map(async (id) => {
            const res = await fetch(
              `https://api.escuelajs.co/api/v1/products/?categoryId=${id}`,
            );

            return res.json();
          });

          const results = await Promise.all(promises);

          allProducts = results.flat();

          allProducts = allProducts.filter(
            (item, index, self) =>
              index === self.findIndex((p) => p.id === item.id),
          );
        }

        if (sort === "low") {
          allProducts.sort((a, b) => a.price - b.price);
        }

        if (sort === "high") {
          allProducts.sort((a, b) => b.price - a.price);
        }

        setProducts(allProducts);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [selectedCategories.join(","), sort]);

  function handleCategory(id: string) {
    let updated = [...selectedCategories];

    if (updated.includes(id)) {
      updated = updated.filter((item) => item !== id);
    } else {
      updated.push(id);
    }

    setSearchParams({
      categories: updated.join(","),
      sort,
    });
  }

  function handleSort(value: string) {
    setSearchParams({
      categories: selectedCategories.join(","),
      sort: value,
    });
  }

  return (
    <div className="container">
      <h1 className="page-title">Products</h1>

      <div className="filters">
        <div>
          <h3>Categories</h3>

          <div className="category-list">
            {categories.map((item) => (
              <label key={item.id} className="checkbox">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(String(item.id))}
                  onChange={() => handleCategory(String(item.id))}
                />

                {item.name}
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3>Sort</h3>

          <select value={sort} onChange={(e) => handleSort(e.target.value)}>
            <option value="">Select</option>

            <option value="low">Price Low To High</option>

            <option value="high">Price High To Low</option>
          </select>
        </div>
      </div>

      {loading ? (
        <h2>Loading...</h2>
      ) : products.length === 0 ? (
        <h2>No Products Found</h2>
      ) : (
        <div className="grid">
          {products.map((item) => (
            <Link key={item.id} to={`/product/${item.id}`} className="card">
              <img src={item.images?.[0]} alt={item.title} />

              <div className="card-content">
                <h3>{item.title}</h3>

                <p>₹ {item.price}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function ProductDetail() {
  const [product, setProduct] = useState<Product | null>(null);

  const { id } = useParams();

  const context = useContext(CartContext);

  useEffect(() => {
    fetch(`https://api.escuelajs.co/api/v1/products/${id}`)
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
      <Link to="/" className="back-link">
        ← Back To Home
      </Link>

      <div className="detail">
        <img src={product.images?.[0]} alt={product.title} />

        <div className="detail-content">
          <h1>{product.title}</h1>

          <p>{product.description}</p>

          <h2>₹ {product.price}</h2>

          <button
            onClick={() => {
              context.setCart([...context.cart, product]);
            }}
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}

function Cart() {
  const context = useContext(CartContext);

  if (!context) return null;

  const total = context.cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="container">
      <h1 className="page-title">Cart</h1>

      <div className="cart-info">
        <h3>Total Items: {context.cart.length}</h3>

        <h3>Total Price: ₹ {total}</h3>
      </div>

      {context.cart.length === 0 ? (
        <h2>Your cart is empty</h2>
      ) : (
        <div className="grid">
          {context.cart.map((item, index) => (
            <div className="card" key={`${item.id}-${index}`}>
              <img src={item.images?.[0]} alt={item.title} />

              <div className="card-content">
                <h3>{item.title}</h3>

                <p>₹ {item.price}</p>

                <button
                  onClick={() => {
                    const updated = [...context.cart];

                    updated.splice(index, 1);

                    context.setCart(updated);
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function App() {
  const [cart, setCart] = useState<Product[]>(() => {
    const data = localStorage.getItem("cart");

    return data ? JSON.parse(data) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/product/:id" element={<ProductDetail />} />

          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </CartContext.Provider>
  );
}

export default App;
