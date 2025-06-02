import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import ProductsToolbar from "../components/ProductsToolbar";
import { Loader2 } from "lucide-react";
import "./ProductsPage.css";

const API_BASE = "http://127.0.0.1:8000/api/v1/parser";

const ProductsPage = () => {
  const [products, setProducts] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const buildQuery = () => {
    const p = new URLSearchParams();
    if (selectedCategories.length) p.set("category", selectedCategories.join(","));
    if (searchTerm.trim()) p.set("search", searchTerm.trim());
    return p.toString();
  };

  const fetchProducts = () => {
    setLoading(true);
    fetch(`${API_BASE}/products/${buildQuery() ? "?" + buildQuery() : ""}`)
      .then((r) => r.json())
      .then((data) => {
        setProducts(data);
        if (!categories.length) {
          const map = new Map();
          data.forEach((p) => map.set(p.category.id, p.category));
          setCategories(Array.from(map.values()));
        }
      })
      .catch(() => setError("Не удалось загрузить товары"))
      .finally(() => setLoading(false));
  };

  useEffect(fetchProducts, []);

  useEffect(() => {
    const t = setTimeout(fetchProducts, 400);
    return () => clearTimeout(t);
  }, [selectedCategories, searchTerm]);

  // сброс фильтров
  const resetFilters = () => {
    setSelectedCategories([]);
    setSearchTerm("");
  };

  if (loading)
    return (
      <div className="center">
        <Loader2 className="spinner" />
      </div>
    );

  if (error) return <p className="error">{error}</p>;
  if (!products?.length) return <p>Нет данных</p>;

  return (
    <>
      <ProductsToolbar
        categories={categories}
        selectedCategories={selectedCategories}
        onChangeCategories={setSelectedCategories}
        searchTerm={searchTerm}
        onChangeSearch={setSearchTerm}
        onReset={resetFilters}
      />

      <div className="products-grid">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </>
  );
};

export default ProductsPage;
