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
import ContactosSection    from './sections/ContactosSection';

// Mapa de secciones: clave → componente a renderizar
const SECTIONS = {
  usuarios:      UsuariosSection,
  oportunidades: OportunidadesSection,
  instituciones: InstitucionesSection,
  cuestionarios: CuestionariosSection,
  preguntas:     PreguntasSection,
  contactos:     ContactosSection,
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
        .from('perfiles_usuario')
        .select('rol')
        .eq('user_id', user.id)
        .single();

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
      <div className="p-6 max-w-7xl mx-auto">

        {/* Encabezado */}
        <div className="mb-5 flex items-center gap-2">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Panel de administración</h1>
          <span className="text-xl">🛡️</span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-5">
          {STAT_DEFS.map(({ key, label, icon, color }) => (
            <StatsCard
              key={key}
              label={label}
              value={stats[key] !== undefined ? stats[key].toLocaleString('es-CO') : '—'}
              icon={icon}
              color={color}
            />
          ))}
        </div>

        {/* Tabs de módulos */}
        <div className="mb-4">
          <ModulesNav active={activeSection} onChange={setActiveSection} />
        </div>

        {/* Contenido de la sección activa */}
        <SectionComponent />

      </div>
    </DashboardLayout>
  );
}
