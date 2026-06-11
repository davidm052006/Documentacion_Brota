// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from './config/supabase';
import Login          from './pages/landing/Login';
import Dashboard      from './pages/dashboard/Dashboard';
import TestVocacional from './pages/dashboard/test-vocacional/TestVocacional';

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
        (event, session) => {
          setUser(session?.user || null);
          setIsDemoMode(false);
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
        <Route path="/" element={<Login isDemoMode={isDemoMode} />} />

        {/* Test vocacional — ANTES que /dashboard para evitar conflictos */}
        <Route
          path="/dashboard/test"
          element={puedeAcceder ? <TestVocacional user={user} isDemoMode={isDemoMode} /> : <Navigate to="/" replace />}
        />

        {/* Dashboard principal */}
        <Route
          path="/dashboard"
          element={puedeAcceder ? <Dashboard user={user} isDemoMode={isDemoMode} /> : <Navigate to="/" replace />}
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
