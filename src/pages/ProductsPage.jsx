import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { Loader2 } from "lucide-react";
import "./ProductsPage.css";

const API_BASE = "http://localhost:8000/api/v1/parser";

const ProductsPage = () => {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE}/products/`)
      .then((r) => r.json())
      .then(setProducts)
      .catch(() => setError("Не удалось загрузить товары"))
      .finally(() => setLoading(false));

    console.log(products)
  }, []);



  if (loading)
    return (
      <div className="center">
        <Loader2 className="spinner" />
      </div>
    );

  if (error) return <p className="error">{error}</p>;
  if (!products?.length) return <p>Нет данных</p>;

  return (
    <div className="products-grid">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
};

export default ProductsPage;
