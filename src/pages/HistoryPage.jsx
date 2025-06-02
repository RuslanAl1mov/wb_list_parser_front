import React, { useEffect, useState } from "react";
import { Loader2, CheckCircle } from "lucide-react";
import "./HistoryPage.css";

const API_BASE = "http://localhost:8000/api/v1/parser";

const HistoryPage = () => {
  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE}/parser-history/`)
      .then((r) => r.json())
      .then(setItems)
      .catch(() => setError("Не удалось загрузить историю"))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="center">
        <Loader2 className="spinner" />
      </div>
    );

  if (error) return <p className="error">{error}</p>;
  if (!items?.length) return <p>Нет данных</p>;

  return (
    <div className="history-table-wrapper">
      <table className="history-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Артикул</th>
            <th>Товар</th>
            <th>Статус</th>
          </tr>
        </thead>
        <tbody>
          {items.map((h) => (
            <tr key={h.id}>
              <td>{h.id}</td>
              <td>{h.articul}</td>
              <td className="col-name">{h.product}</td>
              <td>
                {h.is_completed ? (
                  <CheckCircle className="status-icon complete" />
                ) : (
                  <Loader2 className="spinner status-icon" />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryPage;
