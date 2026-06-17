const MODULES = [
  { key: 'usuarios',       icon: '👥', label: 'Usuarios' },
  { key: 'oportunidades',  icon: '💼', label: 'Oportunidades' },
  { key: 'instituciones',  icon: '🏛️', label: 'Instituciones' },
  { key: 'cuestionarios',  icon: '📋', label: 'Cuestionarios' },
  { key: 'preguntas',      icon: '❓', label: 'Preguntas' },
  { key: 'configuracion',  icon: '⚙️', label: 'Configuración general' },
];

export default function ModulesNav({ active, onChange }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm self-start">
      <h2 className="text-sm font-semibold text-gray-700 mb-3 px-1">Módulos de administración</h2>
      <div className="flex flex-col gap-0.5">
        {MODULES.map(({ key, icon, label }) => (
          <button
            key={key}
            onClick={() => onChange(key)}
            className={`flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-sm transition-all ${
              active === key
                ? 'bg-green-50 text-green-700 font-semibold border border-green-200'
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="text-base">{icon}</span>
              <span>{label}</span>
            </div>
            <span className="text-gray-300 text-lg leading-none">›</span>
          </button>
        ))}
      </div>
    </div>
  );
}
