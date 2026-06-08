// src/pages/dashboard/Dashboard.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../config/supabase';
 
import DashboardLayout   from '../../components/Layout/DashboardLayout';
import Avatar            from '../../components/Shared/Avatar';
import HeroBanner        from './components/HeroBanner';
import ProfileCard       from './components/ProfileCard';
import QuickActions      from './components/QuickActions';
import ContinueSection   from './components/ContinueSection';
 
// ─── Datos ficticios para modo demo ───────────────────────────────────────────
const DEMO_PROFILE = {
  id: 'demo-123',
  user_id: 'demo-user-123',
  nombre: 'Juan',
  apellido: 'Camilo Pérez',
  edad: 17,
  ciudad: 'Medellín, Antioquia',
  nivel_educativo: 'Bachillerato',
  grado: 11,
  condiciones_socioeconomicas: { estrato: 3 },
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};
 
export default function Dashboard({ user, isDemoMode = false }) {
  const [profile, setProfile]               = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [error, setError]                   = useState(null);
  const navigate = useNavigate();
 
  // ─── Cargar perfil ──────────────────────────────────────────────────────────
  useEffect(() => {
    const getProfile = async () => {
      try {
        if (isDemoMode) {
          setProfile(DEMO_PROFILE);
          return;
        }
        const { data, error: err } = await supabase
          .from('PERFILES_USUARIO')
          .select('*')
          .eq('user_id', user.id)
          .single();
        if (err) throw err;
        setProfile(data);
      } catch (err) {
        console.error('Error al cargar perfil:', err);
        setError(err.message);
      } finally {
        setLoadingProfile(false);
      }
    };
 
    if (isDemoMode || user?.id) getProfile();
  }, [user?.id, isDemoMode]);
 
  // ─── Estados de carga / error ───────────────────────────────────────────────
  if (loadingProfile) {
    return (
      <DashboardLayout isDemoMode={isDemoMode}>
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-gray-400 text-sm animate-pulse">Cargando tu perfil…</p>
        </div>
      </DashboardLayout>
    );
  }
 
  if (error) {
    return (
      <DashboardLayout isDemoMode={isDemoMode}>
        <div className="flex items-center justify-center min-h-screen">
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
 
  // ─── Render principal ───────────────────────────────────────────────────────
  return (
    <DashboardLayout isDemoMode={isDemoMode}>
      <div className="p-6 max-w-6xl mx-auto">
 
        {/* ── Top bar ── */}
        <div className="flex items-center justify-between mb-6">
          {/* Campana de notificaciones */}
          <div /> {/* spacer */}
          <div className="flex items-center gap-3">
            {isDemoMode && (
              <span className="text-xs bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-medium">
                📱 Modo demo
              </span>
            )}
            <button className="text-gray-400 hover:text-gray-600 transition text-xl">🔔</button>
            <div className="flex items-center gap-2 cursor-pointer group">
              <span className="text-sm text-gray-600 font-medium group-hover:text-gray-800 transition">
                ¡Hola, {profile?.nombre ?? 'estudiante'}!
              </span>
              <span className="text-gray-400 text-xs">▾</span>
              <Avatar name={profile?.nombre} size="md" />
            </div>
          </div>
        </div>
 
        {/* ── Hero + Perfil (lado a lado) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-6">
          <div className="lg:col-span-3">
            <HeroBanner name={profile?.nombre} />
          </div>
          <div className="lg:col-span-2">
            <ProfileCard profile={profile} userEmail={user?.email} />
          </div>
        </div>
 
        {/* ── Acciones rápidas ── */}
        <div className="mb-6">
          <QuickActions />
        </div>
 
        {/* ── Continuar + Frase motivacional ── */}
        <ContinueSection />
 
      </div>
    </DashboardLayout>
  );
}
 