// ==========================================
// APP.JSX - ENRUTADOR PRINCIPAL DE LA APP
// ==========================================
// Este archivo es el "corazón" de la aplicación.
// Aquí definimos:
// 1. Las rutas (qué página ver según la URL)
// 2. La lógica de autenticación (si el usuario está logueado)
// 3. Las redirecciones (por ejemplo, si accedes a /login pero ya estás logueado, te lleva a /)

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from './config/supabase';
import PreLoguin from './pages/landing/PreLoguin';
import Dashboard from './pages/dashboard/Dashboard';

function App() {
  // ==========================================
  // ESTADO DE AUTENTICACIÓN
  // ==========================================
  
  // user: almacena los datos del usuario logueado (email, id, etc.)
  // Inicialmente es null porque no sabemos si hay alguien logueado
  const [user, setUser] = useState(null);

  // loading: mientras consultamos Supabase si hay sesión, loading=true
  // Esto evita "parpadeos" de la pantalla mientras cargamos
  const [loading, setLoading] = useState(true);

  // ==========================================
  // EFECTO: VERIFICAR USUARIO AL CARGAR LA APP
  // ==========================================
  useEffect(() => {
    // Función auxiliar para obtener la sesión del usuario
    const checkUser = async () => {
      try {
        // getSession() pregunta a Supabase: "¿hay alguien logueado?"
        // Si hay sesión, devuelve session.user con email, id, etc.
        const { data: { session } } = await supabase.auth.getSession();
        
        // Guardamos el usuario (o null si no hay sesión)
        setUser(session?.user || null);
      } catch (error) {
        console.error('Error al verificar usuario:', error);
      } finally {
        // Ya terminamos de cargar, indicamos que loading = false
        setLoading(false);
      }
    };

    // Ejecutamos la verificación
    checkUser();

    // ==========================================
    // ESCUCHAR CAMBIOS DE AUTENTICACIÓN EN TIEMPO REAL
    // ==========================================
    // Esto es como suscribirse a un "canal" de Supabase que dice:
    // "Hey, el usuario acaba de loguearse" o "Hey, el usuario se deslogueó"
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        // event puede ser: SIGNED_IN, SIGNED_OUT, TOKEN_REFRESHED
        // session contiene los datos del usuario si está logueado
        setUser(session?.user || null);
      }
    );

    // LIMPIEZA: cuando el componente se desmonta, cancelamos la suscripción
    // Esto evita "memory leaks" (fugas de memoria)
    return () => subscription?.unsubscribe();
  }, []); // El [] significa: ejecutar SOLO una vez al cargar la app

  // ==========================================
  // MIENTRAS CARGAMOS, MOSTRAR UN SPINNER
  // ==========================================
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  // ==========================================
  // DEFINIR LAS RUTAS DE LA APLICACIÓN
  // ==========================================
  return (
    <BrowserRouter>
      <Routes>
        {/* 
          Ruta raíz (/) - La página principal
          Si el usuario ESTÁ logueado → muestra Dashboard
          Si el usuario NO está logueado → muestra PreLoguin (login)
        */}
        <Route 
          path="/" 
          element={user ? <Dashboard user={user} /> : <PreLoguin />} 
        />

        {/* 
          Ruta /login - Página de login
          Si ya estás logueado, te redirige a / (no tiene sentido ir a login)
          Si no estás logueado, muestra PreLoguin
        */}
        <Route 
          path="/login" 
          element={user ? <Navigate to="/" replace /> : <PreLoguin />} 
        />

        {/* 
          Ruta comodín (*) - Cualquier ruta que no exista
          Por ejemplo: /xyz, /random, etc.
          Te redirige a / (la página principal)
        */}
        <Route 
          path="*" 
          element={<Navigate to="/" replace />} 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;