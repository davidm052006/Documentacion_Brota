// src/pages/dashboard/test-vocacional/components/TestIntro.jsx
// ── SOLO VISUAL — sin lógica de negocio ──────────────────────
// Props esperadas por el backend:
//   onStart: () => void   — acción al pulsar "Comenzar"
//   loading: boolean      — deshabilita botón mientras carga

export default function TestIntro({ onStart, loading }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[72vh] px-4">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-10 max-w-lg w-full text-center">

        {/* Ícono central */}
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
          🌱
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Test Vocacional
        </h1>
        <p className="text-gray-500 text-sm mb-8 leading-relaxed">
          No hay respuestas correctas o incorrectas.<br />
          Elige todo lo que realmente te represente.
        </p>

        {/* Fichas informativas */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            { icon: '❓', label: '30 preguntas' },
            { icon: '⏱️', label: '10–15 min' },
            { icon: '🎯', label: 'Perfil único' },
          ].map(({ icon, label }) => (
            <div key={label} className="bg-gray-50 rounded-2xl p-3">
              <div className="text-xl mb-1">{icon}</div>
              <p className="text-xs text-gray-600 font-medium">{label}</p>
            </div>
          ))}
        </div>

        {/* Cita motivacional */}
        <p className="text-xs text-gray-400 italic mb-8">
          "Tu camino comienza con un paso. Cada respuesta te acerca a descubrir tu mejor versión."
        </p>

        <button
          onClick={onStart}
          disabled={loading}
          className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-300 text-white font-semibold py-4 rounded-2xl transition-all duration-200 text-sm shadow-sm hover:shadow-md"
        >
          {loading ? 'Cargando...' : 'Comenzar test →'}
        </button>
      </div>
    </div>
  );
}
