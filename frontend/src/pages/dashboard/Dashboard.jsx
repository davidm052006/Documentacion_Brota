// ==========================================
// DASHBOARD.JSX - PÁGINA PRINCIPAL DEL USUARIO
// ==========================================
// Este es el componente que ven los usuarios autenticados.
// Aquí pueden ver su perfil, hacer el cuestionario, ver recomendaciones, etc.
// 
// NOTA IMPORTANTE PARA EL COMPAÑERO QUE DISEÑA:
// Tu compañero de diseño puede editar este archivo libremente.
// La estructura actual es BÁSICA y está lista para que él agregue:
// - Componentes visuales (cards, tablas, gráficos)
// - Estilos con Tailwind CSS
// - Navegación interna (pestañas, secciones)
// - Cualquier elemento visual que creas necesario

import { useEffect, useState } from 'react';
import { supabase } from '../../config/supabase';
import { useNavigate } from 'react-router-dom';

function Dashboard({ user, isDemoMode = false }) {
  // ==========================================
  // ESTADOS DEL COMPONENTE
  // ==========================================
  
  // profile: almacena los datos adicionales del usuario (nombre, edad, ciudad, etc.)
  // Estos datos vienen de la tabla PERFILES_USUARIO en la base de datos
  const [profile, setProfile] = useState(null);

  // loadingProfile: mientras cargamos el perfil desde la BD, esto es true
  const [loadingProfile, setLoadingProfile] = useState(true);

  // error: si hay algún error al cargar, lo guardamos aquí
  const [error, setError] = useState(null);

  // Para redirigir al usuario (por ejemplo, después de logout)
  const navigate = useNavigate();

  // ==========================================
  // DATOS FICTICIOS PARA MODO DEMO
  // ==========================================
  const demoProfile = {
    id: 'demo-123',
    user_id: 'demo-user-123',
    nombre: 'Juan',
    apellido: 'Pérez',
    edad: 19,
    ciudad: 'Bogotá',
    nivel_educativo: 'Bachiller',
    condiciones_socioeconomicas: { estrato: 3 },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  // ==========================================
  // EFECTO: CARGAR PERFIL DEL USUARIO DESDE LA BASE DE DATOS
  // ==========================================
  useEffect(() => {
    const getProfile = async () => {
      try {
        // ========== MODO DEMO ==========
        if (isDemoMode) {
          console.log('📱 MODO DEMO: Usando datos ficticios');
          setProfile(demoProfile);
          setLoadingProfile(false);
          return;
        }

        // ========== MODO REAL (Supabase) ==========
        // Consultamos la tabla PERFILES_USUARIO
        // Buscamos el perfil que tenga user_id igual al id del usuario actual
        const { data, error: err } = await supabase
          .from('PERFILES_USUARIO')
          .select('*') // Traer todos los campos (id, nombre, apellido, edad, ciudad, etc.)
          .eq('user_id', user.id) // Filtrar por user_id
          .single(); // .single() porque esperamos UNO solo (cada usuario tiene 1 perfil)

        if (err) throw err;

        setProfile(data);
      } catch (err) {
        console.error('Error al cargar perfil:', err);
        setError(err.message);
      } finally {
        setLoadingProfile(false);
      }
    };

    if (user?.id) {
      getProfile();
    }
  }, [user?.id, isDemoMode]); // Solo ejecutar si user.id cambia

  // ==========================================
  // FUNCIÓN: CERRAR SESIÓN
  // ==========================================
  const handleLogout = async () => {
    try {
      // ========== MODO DEMO ==========
      if (isDemoMode) {
        console.log('📱 MODO DEMO: Cerrando sesión simulada');
        // Limpiar localStorage
        localStorage.removeItem('demoModeLoggedIn');
        localStorage.removeItem('demoUserEmail');
        localStorage.removeItem('demoUserName');
        navigate('/');
        return;
      }

      // ========== MODO REAL (Supabase) ==========
      // signOut() de Supabase cierra la sesión
      await supabase.auth.signOut();
      
      // Redirigir a la página principal (que ahora mostrará PreLoguin)
      // El useEffect en App.jsx detectará que user = null y cambiará la página automáticamente
      navigate('/');
    } catch (err) {
      console.error('Error al cerrar sesión:', err);
    }
  };

  // ==========================================
  // RENDERIZACIÓN
  // ==========================================
  
  // Si está cargando, mostrar un mensaje
  if (loadingProfile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Cargando tu perfil...</p>
      </div>
    );
  }

  // Si hay un error, mostrar el mensaje
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={handleLogout}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  // ==========================================
  // DISEÑO ACTUAL (BÁSICO)
  // ==========================================
  // Tu compañero de diseño puede reemplazar TODO esto con un diseño profesional
  // Usa Tailwind CSS para estilos (https://tailwindcss.com)
  // Ejemplo: className="bg-blue-500 text-white p-4 rounded-lg"
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* ==================== CABECERA ==================== */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-5xl font-bold text-gray-900 mb-2">
              🌱 Bienvenido a Brota
            </h1>
            <p className="text-xl text-gray-600">
              {profile?.nombre ? `Hola, ${profile.nombre}` : 'Tu plataforma de orientación vocacional'}
            </p>
            {isDemoMode && (
              <span className="inline-block mt-2 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
                📱 MODO DEMO - Datos ficticios
              </span>
            )}
          </div>
          
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg transition"
          >
            Cerrar Sesión
          </button>
        </div>

        {/* ==================== TARJETA DE PERFIL ==================== */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border-l-4 border-green-500">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">📋 Tu Perfil</h2>
          
          {profile ? (
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wide">Nombre Completo</p>
                <p className="text-xl font-semibold text-gray-900">
                  {profile.nombre} {profile.apellido}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wide">Correo</p>
                <p className="text-xl font-semibold text-gray-900">{user?.email}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wide">Edad</p>
                <p className="text-xl font-semibold text-gray-900">{profile.edad || 'No especificada'}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wide">Ciudad</p>
                <p className="text-xl font-semibold text-gray-900">{profile.ciudad || 'No especificada'}</p>
              </div>

              <div className="col-span-2">
                <p className="text-sm text-gray-500 uppercase tracking-wide">Nivel Educativo</p>
                <p className="text-xl font-semibold text-gray-900">
                  {profile.nivel_educativo || 'No especificado'}
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">Aún no has completado tu perfil</p>
              <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg">
                Completar Perfil
              </button>
            </div>
          )}
        </div>

        {/* ==================== ZONA DE DISEÑO PERSONALIZADO ==================== */}
        <div className="bg-blue-50 rounded-xl border-2 border-dashed border-blue-300 p-8 text-center">
          <h3 className="text-2xl font-bold text-blue-900 mb-2">🎨 Área de Diseño Personalizado</h3>
          <p className="text-blue-700 mb-4">
            Tu compañero de diseño puede agregar aquí todos los componentes visuales que quiera.
          </p>
          <p className="text-sm text-blue-600">
            Ejemplo: cuestionarios, recomendaciones, progreso, gráficos, etc.
          </p>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;