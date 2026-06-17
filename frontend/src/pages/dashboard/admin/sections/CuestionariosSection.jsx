const MOCK_CUESTIONARIOS = [
  { id: 1, nombre: 'Test Vocacional Brota', version: 'v1.0', preguntas: 20, activo: true,  fecha: '01/01/2024' },
  { id: 2, nombre: 'Test Vocacional Brota', version: 'v1.1', preguntas: 22, activo: false, fecha: '15/03/2024' },
  { id: 3, nombre: 'Test Vocacional Brota', version: 'v2.0', preguntas: 25, activo: false, fecha: '01/05/2024' },
];

export default function CuestionariosSection() {
  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="flex items-center justify-between p-5 border-b border-gray-100">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Cuestionarios</h2>
          <p className="text-sm text-gray-400">Gestiona las versiones del test vocacional.</p>
        </div>
        <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
          <span className="text-lg leading-none">+</span>
          Nuevo cuestionario
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-gray-100">
              <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">ID</th>
              <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Nombre</th>
              <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Versión</th>
              <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">N° Preguntas</th>
              <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Fecha creación</th>
              <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Estado</th>
              <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_CUESTIONARIOS.map(c => (
              <tr key={c.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="px-5 py-3.5 text-sm text-gray-500">{c.id}</td>
                <td className="px-5 py-3.5 text-sm font-medium text-gray-900">{c.nombre}</td>
                <td className="px-5 py-3.5">
                  <span className="bg-gray-100 text-gray-600 text-xs font-mono font-semibold px-2.5 py-1 rounded-full">{c.version}</span>
                </td>
                <td className="px-5 py-3.5 text-sm text-gray-500">{c.preguntas}</td>
                <td className="px-5 py-3.5 text-sm text-gray-500">{c.fecha}</td>
                <td className="px-5 py-3.5">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${c.activo ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {c.activo ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-1.5">
                    <button className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Editar">✏️</button>
                    <button className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors" title="Ver preguntas">👁️</button>
                    <button className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Eliminar">🗑️</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-5 py-3">
        <p className="text-sm text-gray-400">Mostrando 1 a 3 de 28 cuestionarios</p>
      </div>
    </div>
  );
}
