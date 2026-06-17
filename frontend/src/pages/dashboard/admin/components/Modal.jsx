// Componente modal genérico reutilizable en todo el panel admin
// Recibe: title (encabezado), onClose (función para cerrar), size (sm/md/lg)
const WIDTHS = { sm: 'max-w-sm', md: 'max-w-md', lg: 'max-w-lg' };

export default function Modal({ title, onClose, children, size = 'md' }) {
  return (
    // Overlay oscuro — clic fuera cierra el modal
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      {/* Contenedor del modal — stopPropagation evita cerrar al hacer clic dentro */}
      <div
        className={`bg-white rounded-2xl shadow-xl w-full ${WIDTHS[size]} mx-4 max-h-[90vh] overflow-y-auto`}
        onClick={e => e.stopPropagation()}
      >
        {/* Encabezado con título y botón de cerrar */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl">
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors text-xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Contenido dinámico */}
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}
