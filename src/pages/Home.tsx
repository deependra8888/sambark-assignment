import { useEffect, useState } from "react";

import {
  useSearchParams,
} from "react-router-dom";

import ProductCard from "../components/ProductCard";
import type { Product } from "../types/product";


function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  const [categories, setCategories] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  const [searchParams, setSearchParams] =
    useSearchParams();

  const selectedCategories =
    searchParams.get("categories")?.split(",") || [];

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
          const res = await fetch(
            "https://api.escuelajs.co/api/v1/products",
          );

          allProducts = await res.json();
        } else {
          const promises = selectedCategories.map(
            async (id) => {
              const res = await fetch(
                `https://api.escuelajs.co/api/v1/products/?categoryId=${id}`,
              );

              return res.json();
            },
          );

          const results = await Promise.all(promises);

          allProducts = results.flat();

          allProducts = allProducts.filter(
            (item, index, self) =>
              index ===
              self.findIndex((p) => p.id === item.id),
          );
        }

        if (sort === "low") {
          allProducts.sort(
            (a, b) => a.price - b.price,
          );
        }

        if (sort === "high") {
          allProducts.sort(
            (a, b) => b.price - a.price,
          );
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
      updated = updated.filter(
        (item) => item !== id,
      );
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
              <label
                key={item.id}
                className="checkbox"
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(
                    String(item.id),
                  )}
                  onChange={() =>
                    handleCategory(String(item.id))
                  }
                />

                {item.name}
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3>Sort</h3>

          <select
            value={sort}
            onChange={(e) =>
              handleSort(e.target.value)
            }
          >
            <option value="">Select</option>

            <option value="low">
              Price Low To High
            </option>

            <option value="high">
              Price High To Low
            </option>
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
            <ProductCard
              key={item.id}
              product={item}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;