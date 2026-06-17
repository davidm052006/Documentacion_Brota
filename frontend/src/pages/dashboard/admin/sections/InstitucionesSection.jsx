const MOCK_INSTITUCIONES = [
  { id: 1, nombre: 'Universidad Nacional de Colombia', tipo: 'Universidad', ciudad: 'Bogotá',    telefono: '601 316 5000', estado: 'Activa' },
  { id: 2, nombre: 'SENA Regional Bogotá',             tipo: 'SENA',        ciudad: 'Bogotá',    telefono: '601 546 1500', estado: 'Activa' },
  { id: 3, nombre: 'Uniminuto',                        tipo: 'Universidad', ciudad: 'Medellín',  telefono: '604 890 1000', estado: 'Activa' },
  { id: 4, nombre: 'Pontificia Universidad Javeriana', tipo: 'Universidad', ciudad: 'Bogotá',    telefono: '601 320 8320', estado: 'Activa' },
  { id: 5, nombre: 'ITM Medellín',                     tipo: 'Tecnológica', ciudad: 'Medellín',  telefono: '604 440 5100', estado: 'Inactiva' },
];

const TIPO_COLORS = {
  'Universidad': 'bg-blue-100 text-blue-700',
  'SENA':        'bg-green-100 text-green-700',
  'Tecnológica': 'bg-purple-100 text-purple-700',
  'Técnica':     'bg-yellow-100 text-yellow-700',
};

export default function InstitucionesSection() {
  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="flex items-center justify-between p-5 border-b border-gray-100">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Instituciones</h2>
          <p className="text-sm text-gray-400">Gestiona las instituciones educativas del sistema.</p>
        </div>
        <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
          <span className="text-lg leading-none">+</span>
          Nueva institución
        </button>
      </div>
      <div className="px-5 py-3 border-b border-gray-100">
        <input
          type="text"
          placeholder="Buscar instituciones..."
          className="w-full max-w-sm pl-4 pr-10 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-gray-100">
              <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">ID</th>
              <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Nombre</th>
              <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Tipo</th>
              <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Ciudad</th>
              <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Teléfono</th>
              <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Estado</th>
              <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_INSTITUCIONES.map(inst => (
              <tr key={inst.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="px-5 py-3.5 text-sm text-gray-500">{inst.id}</td>
                <td className="px-5 py-3.5 text-sm font-medium text-gray-900">{inst.nombre}</td>
                <td className="px-5 py-3.5">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${TIPO_COLORS[inst.tipo] || 'bg-gray-100 text-gray-600'}`}>{inst.tipo}</span>
                </td>
                <td className="px-5 py-3.5 text-sm text-gray-500">{inst.ciudad}</td>
                <td className="px-5 py-3.5 text-sm text-gray-500">{inst.telefono}</td>
                <td className="px-5 py-3.5">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${inst.estado === 'Activa' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>{inst.estado}</span>
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
        <p className="text-sm text-gray-400">Mostrando 1 a 5 de 156 instituciones</p>
      </div>
    </div>
  );
}
