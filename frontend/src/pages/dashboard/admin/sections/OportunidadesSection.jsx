const MOCK_OPORTUNIDADES = [
  { id: 1, nombre: 'Ingeniería de Sistemas', institucion: 'Universidad Nacional', tipo: 'Universitario', estado: 'Activo', cupos: 80, cierre: '30/06/2024' },
  { id: 2, nombre: 'Diseño Gráfico',         institucion: 'SENA Regional Bogotá', tipo: 'Técnico',       estado: 'Activo', cupos: 40, cierre: '15/07/2024' },
  { id: 3, nombre: 'Administración de Empresas', institucion: 'Uniminuto',       tipo: 'Universitario', estado: 'Activo', cupos: 120, cierre: '01/07/2024' },
  { id: 4, nombre: 'Desarrollo de Software', institucion: 'SENA Virtual',        tipo: 'Tecnológico',   estado: 'Inactivo', cupos: 0, cierre: '01/05/2024' },
  { id: 5, nombre: 'Medicina',               institucion: 'Universidad Javeriana', tipo: 'Universitario', estado: 'Activo', cupos: 60, cierre: '20/07/2024' },
];

const TIPO_COLORS = {
  'Universitario': 'bg-blue-100 text-blue-700',
  'Técnico':       'bg-yellow-100 text-yellow-700',
  'Tecnológico':   'bg-purple-100 text-purple-700',
};

export default function OportunidadesSection() {
  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="flex items-center justify-between p-5 border-b border-gray-100">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Oportunidades</h2>
          <p className="text-sm text-gray-400">Gestiona convocatorias y programas disponibles.</p>
        </div>
        <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
          <span className="text-lg leading-none">+</span>
          Nueva oportunidad
        </button>
      </div>
      <div className="px-5 py-3 border-b border-gray-100">
        <input
          type="text"
          placeholder="Buscar oportunidades..."
          className="w-full max-w-sm pl-4 pr-10 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-gray-100">
              <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">ID</th>
              <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Nombre del programa</th>
              <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Institución</th>
              <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Tipo</th>
              <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Cupos</th>
              <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Cierre</th>
              <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Estado</th>
              <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_OPORTUNIDADES.map(o => (
              <tr key={o.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="px-5 py-3.5 text-sm text-gray-500">{o.id}</td>
                <td className="px-5 py-3.5 text-sm font-medium text-gray-900">{o.nombre}</td>
                <td className="px-5 py-3.5 text-sm text-gray-500">{o.institucion}</td>
                <td className="px-5 py-3.5">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${TIPO_COLORS[o.tipo] || 'bg-gray-100 text-gray-600'}`}>{o.tipo}</span>
                </td>
                <td className="px-5 py-3.5 text-sm text-gray-500">{o.cupos}</td>
                <td className="px-5 py-3.5 text-sm text-gray-500">{o.cierre}</td>
                <td className="px-5 py-3.5">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${o.estado === 'Activo' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>{o.estado}</span>
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-1.5">
                    <button className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Editar">✏️</button>
                    <button className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors" title="Ver">👁️</button>
                    <button className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Eliminar">🗑️</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-5 py-3">
        <p className="text-sm text-gray-400">Mostrando 1 a 5 de 342 oportunidades</p>
      </div>
    </div>
  );
}
