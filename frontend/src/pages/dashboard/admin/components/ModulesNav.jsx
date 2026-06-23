const MODULES = [
  { key: 'usuarios',       icon: '👥', label: 'Usuarios' },
  { key: 'oportunidades',  icon: '💼', label: 'Oportunidades' },
  { key: 'instituciones',  icon: '🏛️', label: 'Instituciones' },
  { key: 'cuestionarios',  icon: '📋', label: 'Cuestionarios' },
  { key: 'preguntas',      icon: '❓', label: 'Preguntas' },
  { key: 'contactos',      icon: '📬', label: 'Solicitudes' },
  { key: 'configuracion',  icon: '⚙️', label: 'Configuración' },
];

export default function ModulesNav({ active, onChange }) {
  return (
    <div className="flex gap-1 flex-wrap">
      {MODULES.map(({ key, icon, label }) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
            active === key
              ? 'bg-green-600 text-white shadow-sm'
              : 'bg-white dark:bg-[#141a16] text-gray-500 dark:text-gray-400 border border-gray-100 dark:border-[#1e2a21] hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-700 dark:hover:text-gray-200'
          }`}
        >
          <span className="text-sm">{icon}</span>
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}
