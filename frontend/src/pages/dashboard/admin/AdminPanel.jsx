import { useState, useEffect } from 'react';
import { supabase } from '../../../config/supabase';
import { getStats } from '../../../services/adminService';
import DashboardLayout from '../../../components/Layout/DashboardLayout';
import StatsCard from './components/StatsCard';
import ModulesNav from './components/ModulesNav';
import UsuariosSection from './sections/UsuariosSection';
import OportunidadesSection from './sections/OportunidadesSection';
import InstitucionesSection from './sections/InstitucionesSection';
import CuestionariosSection from './sections/CuestionariosSection';
import PreguntasSection from './sections/PreguntasSection';
import ConfiguracionSection from './sections/ConfiguracionSection';

// Mapa de secciones: clave → componente a renderizar
const SECTIONS = {
  usuarios:      UsuariosSection,
  oportunidades: OportunidadesSection,
  instituciones: InstitucionesSection,
  cuestionarios: CuestionariosSection,
  preguntas:     PreguntasSection,
  configuracion: ConfiguracionSection,
};

// Cada stat sabe qué tabla consultar para obtener su conteo real
const STAT_DEFS = [
  { key: 'perfiles_usuario', label: 'Usuarios',   icon: '👥', color: 'green',  table: 'perfiles_usuario' },
  { key: 'programas',     label: 'Programas',     icon: '💼', color: 'yellow', table: 'programas' },
  { key: 'instituciones', label: 'Instituciones', icon: '🏛️', color: 'blue',   table: 'instituciones' },
  { key: 'cuestionarios', label: 'Cuestionarios', icon: '📋', color: 'purple', table: 'cuestionarios' },
  { key: 'preguntas',     label: 'Preguntas',     icon: '❓', color: 'red',    table: 'preguntas' },
];

export default function AdminPanel({ user, profile }) {
  const [activeSection, setActiveSection] = useState('usuarios');

  // null = verificando | true = es admin | false = sin permiso
  const [isAdmin, setIsAdmin] = useState(null);

  // Conteos reales de cada tabla para las tarjetas de estadísticas
  const [stats, setStats] = useState({});

  // Al montar, consulta la tabla perfiles para verificar si el usuario tiene rol 'admin'
  useEffect(() => {
    const checkAdminRole = async () => {
      if (!user?.id) { setIsAdmin(false); return; }

      const { data, error } = await supabase
        .from('perfiles')
        .select('rol')
        .eq('id', user.id)
        .single();

      // Solo permite acceso si el rol es exactamente 'admin'
      setIsAdmin(!error && data?.rol === 'admin');
    };

    checkAdminRole();
  }, [user]);

  // Una vez confirmado el acceso, carga los conteos desde el backend
  useEffect(() => {
    if (!isAdmin) return;

    const fetchStats = async () => {
      const { success, data } = await getStats();
      if (success) setStats(data);
    };

    fetchStats();
  }, [isAdmin]);

  // Pantalla de carga mientras se verifica el rol en Supabase
  if (isAdmin === null) {
    return (
      <DashboardLayout profile={profile}>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-green-500 mx-auto mb-3" />
            <p className="text-sm text-gray-500">Verificando acceso...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Pantalla de acceso denegado si el rol no es 'admin'
  if (!isAdmin) {
    return (
      <DashboardLayout profile={profile}>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <p className="text-5xl mb-4">🔒</p>
            <h2 className="text-xl font-bold text-gray-800 mb-1">Acceso restringido</h2>
            <p className="text-sm text-gray-500">Solo los administradores pueden ver esta sección.</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const SectionComponent = SECTIONS[activeSection];

  return (
    <DashboardLayout profile={profile}>
      <div className="p-6 min-h-screen" style={{ backgroundColor: 'inherit' }}>

        {/* Encabezado del panel */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold text-gray-900">Panel de administración</h1>
            <span className="text-2xl">🛡️</span>
          </div>
          <p className="text-sm text-gray-500">Gestiona y administra todas las partes del sistema.</p>
        </div>

        {/* Tarjetas de estadísticas con conteos reales desde Supabase */}
        <div className="grid grid-cols-5 gap-4 mb-6">
          {STAT_DEFS.map(({ key, label, icon, color }) => (
            <StatsCard
              key={key}
              label={label}
              // Muestra '—' mientras carga, luego el número formateado
              value={stats[key] !== undefined ? stats[key].toLocaleString('es-CO') : '—'}
              icon={icon}
              color={color}
            />
          ))}
        </div>

        {/* Layout de dos columnas: navegación izquierda + contenido derecho */}
        <div className="grid gap-4" style={{ gridTemplateColumns: '260px 1fr' }}>
          <ModulesNav active={activeSection} onChange={setActiveSection} />
          <SectionComponent />
        </div>

      </div>
    </DashboardLayout>
  );
}
