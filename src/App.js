import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import ProductsPage from "./pages/ProductsPage";
import HistoryPage from "./pages/HistoryPage";
import ParsePage from "./pages/ParsePage";
import { Toaster } from "sonner";

const App = () => (
  <Router>
    <div className="app">
      <Sidebar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<ProductsPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/parse" element={<ParsePage />} />
        </Routes>
      </main>
      <Toaster richColors position="top-right" />
    </div>
  </Router>
);

export default App;
