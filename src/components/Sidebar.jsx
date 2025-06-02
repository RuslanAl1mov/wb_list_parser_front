import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const linkClass = ({ isActive }) =>
  isActive ? "sidebar-link active" : "sidebar-link";

const Sidebar = () => (
  <aside className="sidebar">
    <nav>
      <NavLink className={linkClass} to="/products">
        Список товаров
      </NavLink>
      <NavLink className={linkClass} to="/history">
        История парсинга
      </NavLink>
      <NavLink className={linkClass} to="/parse">
        Запустить парсинг
      </NavLink>
    </nav>
  </aside>
);

export default Sidebar;
