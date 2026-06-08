// src/components/Layout/Sidebar.jsx
import { NavLink, useNavigate } from "react-router-dom";
import { supabase } from "../../config/supabase";

const NAV_ITEMS = [
  { to: "/dashboard",            icon: "⊞", label: "Inicio" },
  { to: "/dashboard/profesiones",icon: "🧭", label: "Explorar profesiones" },
  { to: "/dashboard/test",       icon: "✅", label: "Test vocacional" },
  { to: "/dashboard/rutas",      icon: "🗺️", label: "Rutas formativas" },
  { to: "/dashboard/recursos",   icon: "📖", label: "Recursos" },
  { to: "/dashboard/favoritos",  icon: "♡",  label: "Favoritos" },
  { to: "/dashboard/comunidad",  icon: "👥", label: "Comunidad" },
  { to: "/dashboard/mensajes",   icon: "💬", label: "Mensajes" },
  { to: "/dashboard/ajustes",    icon: "⚙️", label: "Ajustes" },
];

export default function Sidebar({ isDemoMode = false }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (isDemoMode) {
      localStorage.removeItem("demoModeLoggedIn");
      localStorage.removeItem("demoUserEmail");
      localStorage.removeItem("demoUserName");
    } else {
      await supabase.auth.signOut();
    }
    navigate("/");
  };

  return (
    <aside className="w-56 min-h-screen bg-white border-r border-gray-100 flex flex-col fixed left-0 top-0 z-30">
      <div className="px-5 pt-7 pb-5 border-b border-gray-100">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-2xl">🌿</span>
          <span className="text-xl font-bold text-gray-900 tracking-tight">BROTA</span>
        </div>
        <p className="text-[11px] text-gray-400 leading-tight pl-9">
          Descubre tu camino,<br />construye tu futuro
        </p>
      </div>

      <nav className="flex-1 py-4 overflow-y-auto">
        {NAV_ITEMS.map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/dashboard"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-5 py-2.5 mx-2 rounded-lg text-sm transition-all duration-150 mb-0.5 ` +
              (isActive
                ? "bg-green-600 text-white font-semibold shadow-sm"
                : "text-gray-500 hover:bg-green-50 hover:text-green-700")
            }
          >
            <span className="text-base w-5 text-center">{icon}</span>
            {label}
          </NavLink>
        ))}

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-5 py-2.5 mx-2 rounded-lg text-sm text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all w-[calc(100%-16px)] mt-2"
        >
          <span className="text-base w-5 text-center">↪</span>
          Cerrar sesión
        </button>
      </nav>

      <div className="m-3 rounded-xl bg-green-600 p-4 text-white relative overflow-hidden">
        <p className="text-xs font-semibold leading-snug relative z-10">
          Crece hoy,<br />inspira tu mañana.
        </p>
        <span className="text-2xl absolute right-3 bottom-2 opacity-30">🌱</span>
      </div>
    </aside>
  );
}
