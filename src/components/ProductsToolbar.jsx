import React from "react";
import "./ProductsToolbar.css";

const ProductsToolbar = ({
  categories,
  selectedCategories,
  onChangeCategories,
  searchTerm,
  onChangeSearch,
  onReset,
}) => {
  const handleCategoryChange = (e) => {
    const ids = Array.from(e.target.selectedOptions).map((o) => +o.value);
    onChangeCategories(ids);
  };

  return (
    <div className="products-toolbar">
      <input
        className="input search-input"
        type="text"
        placeholder="Поиск…"
        value={searchTerm}
        onChange={(e) => onChangeSearch(e.target.value)}
      />

      <select
        multiple
        size="4"
        className="select"
        value={selectedCategories}
        onChange={handleCategoryChange}
      >
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      <button className="button reset-btn" onClick={onReset}>
        Сбросить
      </button>
    </div>
  );
};

export default ProductsToolbar;
