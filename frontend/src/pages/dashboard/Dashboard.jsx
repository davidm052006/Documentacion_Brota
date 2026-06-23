import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { obtenerPerfil } from "../../services/perfilService";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import ContinueSection from "./components/ContinueSection";

// ─── Hero banner de bienvenida ────────────────────────────────────────────────

function HeroBanner({ nombre, estado }) {
  const navigate = useNavigate();

  const testCompletado = estado === 'completado';

  return (
    <div className="bg-gradient-to-r from-green-600 to-green-700 dark:from-green-700 dark:to-green-800 rounded-2xl p-6 text-white relative overflow-hidden">
      <div className="relative z-10">
        <h1 className="text-2xl font-bold mb-1">
          ¡Hola, {nombre || 'estudiante'}! 🌱
        </h1>
        <p className="text-green-100 text-sm mb-4">
          Tu orientación vocacional está en marcha.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          {testCompletado ? (
            <span className="inline-flex items-center gap-1.5 bg-white/20 px-3 py-1.5 rounded-lg text-xs font-semibold">
              ✓ Test completado 100%
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 bg-white/20 px-3 py-1.5 rounded-lg text-xs font-semibold">
              📝 Test pendiente
            </span>
          )}
          <button
            onClick={() => navigate('/dashboard/test')}
            className="inline-flex items-center gap-1.5 bg-white text-green-700 hover:bg-green-50 px-4 py-1.5 rounded-lg text-xs font-bold transition-colors"
          >
            {testCompletado ? 'Ver resultado →' : 'Realizar test →'}
          </button>
        </div>
      </div>
      <div className="absolute right-4 bottom-0 text-[80px] opacity-10 select-none pointer-events-none leading-none">
        🌿
      </div>
    </div>
  );
}

// ─── Acciones rápidas ─────────────────────────────────────────────────────────

const ACTIONS = [
  {
    icon: '🧭',
    title: 'Explorar profesiones',
    desc: 'Descubre carreras que se alinean contigo',
    to: '/dashboard/profesiones',
    bg: 'bg-green-50 dark:bg-green-950/30',
    iconBg: 'bg-green-100 dark:bg-green-900/50',
  },
  {
    icon: '✅',
    title: 'Realizar test vocacional',
    desc: 'Conoce tus intereses y fortalezas',
    to: '/dashboard/test',
    bg: 'bg-teal-50 dark:bg-teal-950/30',
    iconBg: 'bg-teal-100 dark:bg-teal-900/50',
  },
  {
    icon: '🗺️',
    title: 'Rutas formativas',
    desc: 'Encuentra caminos educativos para tu futuro',
    to: '/dashboard/rutas',
    bg: 'bg-amber-50 dark:bg-amber-950/30',
    iconBg: 'bg-amber-100 dark:bg-amber-900/50',
  },
  {
    icon: '📖',
    title: 'Explorar recursos',
    desc: 'Guías, videos y herramientas',
    to: '/dashboard/recursos',
    bg: 'bg-blue-50 dark:bg-blue-950/30',
    iconBg: 'bg-blue-100 dark:bg-blue-900/50',
  },
];

function QuickActions() {
  const navigate = useNavigate();
  return (
    <div>
      <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
        ¿Qué te gustaría hacer hoy?
      </h2>
      <div className="grid grid-cols-2 gap-3">
        {ACTIONS.map(({ icon, title, desc, to, bg, iconBg }) => (
          <button
            key={to}
            onClick={() => navigate(to)}
            className={`${bg} rounded-2xl p-4 text-left border border-transparent hover:border-green-200 dark:hover:border-green-800 hover:shadow-sm transition-all group`}
          >
            <div className={`${iconBg} w-9 h-9 rounded-xl flex items-center justify-center text-lg mb-3`}>
              {icon}
            </div>
            <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 leading-snug mb-1">{title}</p>
            <p className="text-xs text-gray-400 dark:text-gray-500 leading-snug">{desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Sidebar de perfil ────────────────────────────────────────────────────────

function ProfileSidebar({ profile, userEmail, isAdmin }) {
  const navigate = useNavigate();

  const nombre = [profile?.nombre, profile?.apellido].filter(Boolean).join(' ') ||
                 [profile?.primer_nombre, profile?.primer_apellido].filter(Boolean).join(' ') || '—';
  const initial = nombre.charAt(0).toUpperCase();

  const diasRacha = 3;

  return (
    <aside className="w-64 shrink-0 flex flex-col gap-4">

      {/* Tarjeta de perfil */}
      <div className="bg-white dark:bg-[#141a16] rounded-2xl border border-gray-100 dark:border-[#1e2a21] p-5">

        {/* Avatar + nombre */}
        <div className="flex flex-col items-center text-center mb-4">
          <div className="w-14 h-14 rounded-full bg-green-600 flex items-center justify-center text-white text-xl font-bold mb-2">
            {initial}
          </div>
          <p className="font-semibold text-gray-900 dark:text-white text-sm">{nombre}</p>
          {isAdmin && (
            <span className="mt-1 inline-block text-[10px] font-semibold bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full">
              admin
            </span>
          )}
          {userEmail && (
            <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-1 truncate max-w-full">{userEmail}</p>
          )}
        </div>

        <button
          onClick={() => navigate('/dashboard/ajustes')}
          className="w-full py-2 rounded-xl bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-xs font-semibold text-gray-700 dark:text-gray-300 transition-colors"
        >
          Completar perfil
        </button>

        {/* Info del perfil */}
        <div className="mt-4 flex flex-col gap-2">
          {[
            { label: 'Ciudad',   value: profile?.ciudad },
            { label: 'Nivel',    value: profile?.nivel_educativo },
            { label: 'Grado',    value: profile?.grado ? `${profile.grado}°` : null },
          ].filter(f => f.value).map(({ label, value }) => (
            <div key={label} className="flex justify-between items-center">
              <span className="text-[11px] text-gray-400 dark:text-gray-500">{label}</span>
              <span className="text-[11px] font-medium text-gray-700 dark:text-gray-300">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Racha */}
      <div className="bg-white dark:bg-[#141a16] rounded-2xl border border-gray-100 dark:border-[#1e2a21] p-5">
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
          Racha de aprendizaje
        </p>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl font-bold text-green-600 dark:text-green-400">{diasRacha}</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">días</span>
        </div>
        <div className="flex gap-1.5">
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              className={`w-6 h-6 rounded-full text-center leading-6 text-[10px] font-semibold ${
                i < diasRacha
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 dark:bg-white/5 text-gray-300 dark:text-gray-600'
              }`}
            >
              {['L','M','X','J','V','S','D'][i]}
            </div>
          ))}
        </div>
        <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-3">
          ¡Sigue así! No se te olvide explorar hoy.
        </p>
      </div>

    </aside>
  );
}

// ─── Página principal ─────────────────────────────────────────────────────────

export default function Dashboard({ user, isDemoMode = false }) {
  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getProfile = async () => {
      try {
        const { success, data, error: err } = await obtenerPerfil(user.id);
        if (!success) throw new Error(err);
        setProfile(data);
        setIsAdmin(data?.rol === 'admin');
      } catch (err) {
        console.error('Error al cargar perfil:', err);
        setError(err.message);
      } finally {
        setLoadingProfile(false);
      }
    };

    if (user?.id) getProfile();
  }, [user?.id]);

  if (loadingProfile) {
    return (
      <DashboardLayout isDemoMode={isDemoMode}>
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-gray-400 text-sm animate-pulse">Cargando tu perfil…</p>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout isDemoMode={isDemoMode}>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <p className="text-red-500 font-semibold mb-2">Ocurrió un error</p>
            <p className="text-gray-500 text-sm mb-4">{error}</p>
            <button
              onClick={() => navigate('/')}
              className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition"
            >
              Volver al inicio
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const profileFull = { ...profile, email: user?.email };

  return (
    <DashboardLayout profile={profileFull} isDemoMode={isDemoMode}>
      <div className="max-w-6xl mx-auto px-5 py-6 flex gap-6">

        {/* ── Contenido principal ── */}
        <div className="flex-1 min-w-0 flex flex-col gap-5">
          <HeroBanner nombre={profile?.nombre || profile?.primer_nombre} estado={null} />
          <QuickActions />
          <ContinueSection perfilUsuarioId={profile?.id} userId={user?.id} />
        </div>

        {/* ── Sidebar derecho ── */}
        <ProfileSidebar
          profile={profile}
          userEmail={user?.email}
          isAdmin={isAdmin}
        />

      </div>
    </DashboardLayout>
  );
}
