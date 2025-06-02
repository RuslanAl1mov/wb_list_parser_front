import React from "react";
import { Link } from "react-router-dom"; 
import "./ProductCard.css";

const ProductCard = ({ product }) => (
  <article className="product-card">
    <img src={product.photos[0]?.photo_url} alt={product.name} />
    <div className="product-card-body">
      <h3>{product.name}</h3>
      <span className="muted">Категория: {product.category.name}</span>
      <span className="muted">Артикул: {product.articul}</span>

      <div className="buttons">
        <a
          className="button-link"
          href={product.url}
          target="_blank"
          rel="noreferrer"
        >
          На Wildberries
        </a>

        <Link className="button-link secondary" to={`/products/${product.id}`}>
          Подробнее
        </Link>
      </div>
    </div>
  </article>
);

export default ProductCard;
