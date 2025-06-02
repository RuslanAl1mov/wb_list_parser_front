import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import "./ProductDetailPage.css";

const API_BASE = "http://127.0.0.1:8000/api/v1/parser";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE}/products/${id}/`)
      .then((r) => r.json())
      .then(setProduct)
      .catch(() => setError("Не удалось получить товар"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <div className="center">
        <Loader2 className="spinner" />
      </div>
    );

  if (error) return <p className="error">{error}</p>;
  if (!product) return null;

  return (
    <div className="product-detail">
      <header className="detail-header">
        <h1>{product.name}</h1>
        <span className="muted">
          Категория: {product.category.name} • Артикул: {product.articul}
        </span>
        <a
          className="button-link"
          href={product.url}
          target="_blank"
          rel="noreferrer"
        >
          Посмотреть на Wildberries
        </a>
      </header>

      {/* Галерея фото */}
      <section className="photo-grid">
        {product.photos.map((p, idx) => (
          <img key={idx} src={p.photo_url} alt={`Фото ${idx + 1}`} />
        ))}
      </section>

      {/* Таблица параметров */}
      <section className="params">
        <h2>Характеристики</h2>
        <table className="params-table">
          <tbody>
            {product.params.map((pr, idx) => (
              <tr key={idx}>
                <th>{pr.name}</th>
                <td>{pr.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <Link to="/products" className="back-link">
        ← К списку товаров
      </Link>
    </div>
  );
};

export default ProductDetailPage;
