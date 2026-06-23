import { NavLink, useNavigate } from 'react-router-dom';
import { useAdmin } from '../../hooks/useAdmin';
import { useDarkMode } from '../../hooks/useDarkMode';
import { handleLogout } from '../../utils/auth';

const NAV_ITEMS = [
  { to: '/dashboard',              label: 'Inicio',         end: true },
  { to: '/dashboard/profesiones',  label: 'Explorar' },
  { to: '/dashboard/test',         label: 'Test vocacional' },
  { to: '/dashboard/rutas',        label: 'Rutas' },
  { to: '/dashboard/recursos',     label: 'Recursos' },
  { to: '/dashboard/comunidad',    label: 'Comunidad' },
];

function Avatar({ nombre }) {
  const initial = (nombre || 'U').charAt(0).toUpperCase();
  return (
    <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white text-sm font-bold shrink-0">
      {initial}
    </div>
  );
}

export default function TopNavbar({ profile, isDemoMode = false }) {
  const { isAdmin, loading: adminLoading } = useAdmin();
  const [dark, toggleDark] = useDarkMode();
  const navigate = useNavigate();

  const nombre = profile?.nombre || profile?.primer_nombre || '';

  return (
    <header className="sticky top-0 z-30 bg-white dark:bg-[#111318] border-b border-gray-100 dark:border-[#1e2520]">
      <div className="flex items-center h-14 px-5 gap-4">

        {/* Logo */}
        <NavLink to="/dashboard" className="flex items-center gap-2 shrink-0 mr-2">
          <img src="/logo-brota.png" alt="Brota" className="h-7 w-auto" />
          <span className="text-base font-bold text-green-800 dark:text-green-300 tracking-tight">BROTA</span>
        </NavLink>

        {/* Nav tabs */}
        <nav className="flex items-center gap-0.5 flex-1 overflow-x-auto scrollbar-none">
          {NAV_ITEMS.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-green-50 dark:bg-green-950/50 text-green-700 dark:text-green-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Acciones derecha */}
        <div className="flex items-center gap-2 shrink-0">
          {!adminLoading && isAdmin && (
            <NavLink
              to="/dashboard/admin"
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  isActive
                    ? 'bg-green-600 text-white'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`
              }
            >
              🛡️ Panel Admin
            </NavLink>
          )}

          <button
            onClick={() => navigate('/dashboard/favoritos')}
            title="Favoritos"
            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-950/20 transition-colors text-sm"
          >
            ⭐
          </button>

          <button
            onClick={toggleDark}
            title={dark ? 'Modo claro' : 'Modo oscuro'}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors text-sm"
          >
            {dark ? '☀️' : '🌙'}
          </button>

          <button
            onClick={() => navigate('/dashboard/ajustes')}
            title="Mi perfil"
            className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
          >
            <Avatar nombre={nombre} />
            {nombre && (
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300 hidden lg:inline max-w-[80px] truncate">
                {nombre}
              </span>
            )}
          </button>

          <button
            onClick={() => handleLogout(isDemoMode)}
            title="Cerrar sesión"
            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors text-sm"
          >
            ↩
          </button>
        </div>

      </div>
    </header>
  );
}
