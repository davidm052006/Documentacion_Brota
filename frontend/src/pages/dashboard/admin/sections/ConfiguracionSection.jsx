export default function ConfiguracionSection() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900">Configuración general</h2>
        <p className="text-sm text-gray-400">Ajustes globales del sistema Brota.</p>
      </div>
      <div className="grid grid-cols-1 gap-5 max-w-xl">
        <div className="border border-gray-100 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Modo del sistema</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Modo mantenimiento</p>
              <p className="text-xs text-gray-400">Bloquea el acceso a usuarios durante actualizaciones</p>
            </div>
            <div className="w-11 h-6 bg-gray-200 rounded-full relative cursor-pointer">
              <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 shadow-sm transition-all" />
            </div>
          </div>
        </div>
        <div className="border border-gray-100 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Registro de usuarios</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Permitir nuevos registros</p>
              <p className="text-xs text-gray-400">Habilita el formulario de registro público</p>
            </div>
            <div className="w-11 h-6 bg-green-500 rounded-full relative cursor-pointer">
              <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 shadow-sm transition-all" />
            </div>
          </div>
        </div>
        <div className="border border-gray-100 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Límite de preguntas por sesión</h3>
          <input
            type="number"
            defaultValue={20}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-300"
          />
          <p className="text-xs text-gray-400 mt-1.5">Número máximo de preguntas por test</p>
        </div>
        <button className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors self-start">
          Guardar cambios
        </button>
      </div>
    </div>
  );
}
