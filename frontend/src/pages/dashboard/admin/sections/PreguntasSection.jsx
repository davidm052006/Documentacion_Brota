const MOCK_PREGUNTAS = [
  { id: 1, texto: '¿Qué actividad disfrutas más en tu tiempo libre?', tipo: 'opcion_multiple', categoria: 'intereses',   orden: 1, opciones: 4 },
  { id: 2, texto: '¿Cómo prefieres trabajar?',                       tipo: 'opcion_multiple', categoria: 'habilidades', orden: 2, opciones: 4 },
  { id: 3, texto: '¿Qué tan importante es para ti ayudar a otros?',  tipo: 'likert',          categoria: 'vocacion',    orden: 3, opciones: 5 },
  { id: 4, texto: '¿En qué entorno te desenvuelves mejor?',          tipo: 'opcion_multiple', categoria: 'contexto',    orden: 4, opciones: 4 },
  { id: 5, texto: '¿Cuál de estas habilidades describes mejor?',     tipo: 'opcion_multiple', categoria: 'habilidades', orden: 5, opciones: 5 },
];

const TIPO_COLORS = {
  'opcion_multiple': 'bg-blue-100 text-blue-700',
  'likert':          'bg-purple-100 text-purple-700',
};

const CATEGORIA_COLORS = {
  'intereses':   'bg-yellow-100 text-yellow-700',
  'habilidades': 'bg-green-100 text-green-700',
  'vocacion':    'bg-pink-100 text-pink-700',
  'contexto':    'bg-orange-100 text-orange-700',
};

export default function PreguntasSection() {
  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="flex items-center justify-between p-5 border-b border-gray-100">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Preguntas</h2>
          <p className="text-sm text-gray-400">Gestiona las preguntas del test vocacional.</p>
        </div>
        <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
          <span className="text-lg leading-none">+</span>
          Nueva pregunta
        </button>
      </div>
      <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-3">
        <input
          type="text"
          placeholder="Buscar preguntas..."
          className="flex-1 max-w-sm pl-4 pr-10 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300"
        />
        <select className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-green-300 bg-white">
          <option>Todas las categorías</option>
          <option>intereses</option>
          <option>habilidades</option>
          <option>vocacion</option>
          <option>contexto</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-gray-100">
              <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Orden</th>
              <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Texto</th>
              <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Tipo</th>
              <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Categoría</th>
              <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Opciones</th>
              <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_PREGUNTAS.map(p => (
              <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="px-5 py-3.5 text-sm text-gray-500 font-mono">#{p.orden}</td>
                <td className="px-5 py-3.5 text-sm text-gray-900 max-w-xs">
                  <span className="line-clamp-2">{p.texto}</span>
                </td>
                <td className="px-5 py-3.5">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${TIPO_COLORS[p.tipo] || 'bg-gray-100 text-gray-600'}`}>{p.tipo}</span>
                </td>
                <td className="px-5 py-3.5">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${CATEGORIA_COLORS[p.categoria] || 'bg-gray-100 text-gray-600'}`}>{p.categoria}</span>
                </td>
                <td className="px-5 py-3.5 text-sm text-gray-500">{p.opciones} opciones</td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-1.5">
                    <button className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Editar">✏️</button>
                    <button className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors" title="Ver opciones">👁️</button>
                    <button className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Eliminar">🗑️</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-5 py-3">
        <p className="text-sm text-gray-400">Mostrando 1 a 5 de 412 preguntas</p>
      </div>
    </div>
  );
}
