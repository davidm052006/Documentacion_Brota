// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from './config/supabase';
import Login          from './pages/landing/Login';
import Servicios      from './pages/landing/Servicios';
import SaberMas      from './pages/landing/SaberMas';
import ResetPassword  from './pages/landing/ResetPassword';
import Terminos       from './pages/landing/components/Terminos';
import Privacidad     from './pages/landing/components/Privacidad';
import Dashboard      from './pages/dashboard/Dashboard';
import TestVocacional from './pages/dashboard/test-vocacional/TestVocacional';
import DashboardLayout from './components/Layout/DashboardLayout';
import AdminPanel     from './pages/dashboard/admin/AdminPanel';
import Recursos       from './pages/dashboard/Recursos';

function PaginaEnConstruccion({ titulo }) {
  return (
    <DashboardLayout>
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <p className="text-4xl mb-4">🚧</p>
          <p className="text-gray-700 font-semibold text-lg">{titulo}</p>
          <p className="text-gray-400 text-sm mt-1">Esta sección está en construcción</p>
        </div>
      </div>
    </DashboardLayout>
  );
}

function App() {
  const [user, setUser]             = useState(null);
  const [loading, setLoading]       = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

        if (!supabaseUrl || !supabaseKey) {
          console.warn('⚠️ MODO DEMO: No hay keys de Supabase. Usando datos ficticios.');
          setIsDemoMode(true);
          const demoLoggedIn = localStorage.getItem('demoModeLoggedIn') === 'true';
          if (demoLoggedIn) {
            setUser({
              id: 'demo-user-123',
              email: localStorage.getItem('demoUserEmail') || 'demo@brota.com',
              user_metadata: {
                nombre: localStorage.getItem('demoUserName') || 'Demo User',
              },
            });
          } else {
            setUser(null);
          }
          setLoading(false);
          return;
        }

        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user || null);
      } catch (error) {
        console.error('Error al verificar usuario:', error);
        setIsDemoMode(false);
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    try {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (_event, session) => {
          setUser(session?.user || null);
        }
      );
      return () => subscription?.unsubscribe();
    } catch (err) {
      console.warn('Supabase no disponible, usando modo demo');
      setIsDemoMode(true);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto" />
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  const puedeAcceder = user || isDemoMode;

  return (
    <BrowserRouter>
      <Routes>
        {/* Punto de entrada */}
        <Route path="/" element={<Login isDemoMode={isDemoMode} />} />

        {/* Páginas públicas de información */}
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/saber-mas" element={<SaberMas />} />
        <Route path="/terminos" element={<Terminos />} />
        <Route path="/privacidad" element={<Privacidad />} />

        {/* Recuperación de contraseña */}
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Test vocacional */}
        <Route
          path="/dashboard/test"
          element={puedeAcceder ? <TestVocacional user={user} isDemoMode={isDemoMode} /> : <Navigate to="/" replace />}
        />

        {/* Dashboard principal */}
        <Route
          path="/dashboard"
          element={puedeAcceder ? <Dashboard user={user} isDemoMode={isDemoMode} /> : <Navigate to="/" replace />}
        />

        {/* Recursos educativos */}
        <Route
          path="/dashboard/recursos"
          element={puedeAcceder ? <Recursos /> : <Navigate to="/" replace />}
        />

        {/* Rutas en construcción */}
        {[
          { path: '/dashboard/profesiones', titulo: 'Explorar profesiones' },
          { path: '/dashboard/rutas',       titulo: 'Rutas formativas' },
          { path: '/dashboard/favoritos',   titulo: 'Favoritos' },
          { path: '/dashboard/comunidad',   titulo: 'Comunidad' },
          { path: '/dashboard/mensajes',    titulo: 'Mensajes' },
          { path: '/dashboard/ajustes',     titulo: 'Ajustes' },
        ].map(({ path, titulo }) => (
          <Route
            key={path}
            path={path}
            element={puedeAcceder ? <PaginaEnConstruccion titulo={titulo} /> : <Navigate to="/" replace />}
          />
        ))}

        {/* Panel de administración — solo admins */}
        <Route
          path="/dashboard/admin"
          element={puedeAcceder ? <AdminPanel user={user} /> : <Navigate to="/" replace />}
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;