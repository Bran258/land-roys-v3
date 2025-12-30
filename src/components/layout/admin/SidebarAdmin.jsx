import { Link, useLocation } from "react-router-dom";
import "./SidebarAdmin.css";

import { MdDashboard, MdPeople, MdShoppingCart, MdBarChart, MdSlideshow } from "react-icons/md";
import { FaMotorcycle } from "react-icons/fa";

export default function SidebarAdmin() {

  const { pathname } = useLocation(); // detectar ruta actual

  // función para validar si está activa
  const isActive = (path) => pathname.startsWith(path);

  return (
    <aside className="admin-sidebar">

      <div className="admin-sidebar-body">
        <h1 className="admin-sidebar-section title-center">Admin Panel</h1>

        <nav className="admin-sidebar-nav">

          <Link
            to="/admin"
            className={`admin-sidebar-link ${isActive("/admin/dashboard") ? "active" : ""}`}
          >
            <MdDashboard size={20} className="admin-icon" />
            <p>Panel Principal</p>
          </Link>

        <Link
        to="/admin/gestion-carrusel"
        className={`admin-sidebar-link ${isActive("/admin/gestion-carrusel") ? "active" : ""}`}
        >
        <MdSlideshow size={20} className="admin-icon" />
        <p>Gestión de Carrusel</p>
        </Link>


          <Link
            to="/admin/modelos"
            className={`admin-sidebar-link ${isActive("/admin/modelos") ? "active" : ""}`}
          >
            <FaMotorcycle size={20} className="admin-icon" />
            <p>Gestión de Modelos</p>
          </Link>

          <Link
            to="/admin/pedidos"
            className={`admin-sidebar-link ${isActive("/admin/pedidos") ? "active" : ""}`}
          >
            <MdShoppingCart size={20} className="admin-icon" />
            <p>Pedidos / Consultas</p>
          </Link>

          <Link
            to="/admin/users"
            className={`admin-sidebar-link ${isActive("/admin/users") ? "active" : ""}`}
          >
            <MdPeople size={20} className="admin-icon" />
            <p>Gestión de Usuarios</p>
          </Link>

          <Link
            to="/admin/reportes"
            className={`admin-sidebar-link ${isActive("/admin/reportes") ? "active" : ""}`}
          >
            <MdBarChart size={20} className="admin-icon" />
            <p>Reportes y Estadísticas</p>
          </Link>

        </nav>
      </div>

    </aside>
  );
}

