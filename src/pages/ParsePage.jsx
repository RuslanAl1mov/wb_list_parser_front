import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import "./ParsePage.css";

const API_BASE = "http://localhost:8000/api/v1/parser";

const ParsePage = () => {
  const [value, setValue] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) {
      toast.error("Введите артикула");
      return;
    }
    setSubmitting(true);
    fetch(`${API_BASE}/parse-products/?articules=${encodeURIComponent(trimmed)}`, {
      method: "POST",
    })
      .then(async (r) => {
        if (!r.ok) {
          const data = await r.json();
          throw new Error(data.detail || "Ошибка запроса");
        }
        return r.json();
      })
      .then((data) => {
        toast.success(`Товаров в очередь: ${data.count}`);
        setValue("");
      })
      .catch((err) => toast.error(err.message))
      .finally(() => setSubmitting(false));
  };

  return (
    <div className="parse-form-wrapper">
      <form onSubmit={handleSubmit} className="parse-form">
        <input
          className="input"
          placeholder="123,456,789"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button className="button" disabled={submitting} type="submit">
          {submitting ? <Loader2 className="spinner" /> : "Запустить"}
        </button>
      </form>
    </div>
  );
};

export default ParsePage;
