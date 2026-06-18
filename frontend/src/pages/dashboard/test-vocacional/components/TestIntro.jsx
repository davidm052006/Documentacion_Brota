export default function TestIntro({
  onStart,
  onContinuar,
  onVerResultado,
  loading,
  totalPreguntas,
  tieneBorrador  = false,
  tieneResultado = false,
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[72vh] px-4">
      <div className="bg-white dark:bg-[#1a2e1f] rounded-3xl shadow-sm border border-gray-100 dark:border-[#334155] p-10 max-w-lg w-full text-center">

        <div className="w-20 h-20 bg-emerald-100 dark:bg-[#064e3b] rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
          🌱
        </div>

        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          Test Vocacional
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-8 leading-relaxed">
          No hay respuestas correctas o incorrectas.<br />
          Elige todo lo que realmente te represente.
        </p>

        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            { icon: '❓', label: `${totalPreguntas || 30} preguntas` },
            { icon: '⏱️', label: '10–15 min' },
            { icon: '🎯', label: 'Perfil único' },
          ].map(({ icon, label }) => (
            <div key={label} className="bg-gray-50 dark:bg-[#111c14] rounded-2xl p-3">
              <div className="text-xl mb-1">{icon}</div>
              <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">{label}</p>
            </div>
          ))}
        </div>

        <p className="text-xs text-gray-400 italic mb-8">
          "Tu camino comienza con un paso. Cada respuesta te acerca a descubrir tu mejor versión."
        </p>

        {/* ── Botones según estado ── */}

        {/* Tiene resultado previo en BD */}
        {tieneResultado && (
          <div className="flex flex-col gap-3">
            <button
              onClick={onVerResultado}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-4 rounded-2xl transition-all text-sm shadow-sm"
            >
              ✓ Ver mi resultado anterior
            </button>
            {tieneBorrador && (
              <button
                onClick={onContinuar}
                className="w-full border border-emerald-300 dark:border-emerald-700 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-[#052e16] font-medium py-3 rounded-2xl text-sm transition"
              >
                ▶ Continuar test en progreso
              </button>
            )}
            <button
              onClick={onStart}
              className="w-full border border-gray-200 dark:border-[#334155] text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#243d29] font-medium py-3 rounded-2xl text-sm transition"
            >
              ↺ Reiniciar test
            </button>
          </div>
        )}

        {/* Tiene borrador pero no resultado previo */}
        {tieneBorrador && !tieneResultado && (
          <div className="flex flex-col gap-3">
            <button
              onClick={onContinuar}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-4 rounded-2xl transition-all text-sm shadow-sm"
            >
              ▶ Continuar donde lo dejé
            </button>
            <button
              onClick={onStart}
              className="w-full border border-gray-200 dark:border-[#334155] text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#243d29] font-medium py-3 rounded-2xl text-sm transition"
            >
              ↺ Empezar de nuevo
            </button>
          </div>
        )}

        {/* Test nuevo */}
        {!tieneBorrador && !tieneResultado && (
          <button
            onClick={onStart}
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-300 text-white font-semibold py-4 rounded-2xl transition-all duration-200 text-sm shadow-sm hover:shadow-md"
          >
            {loading ? 'Cargando...' : 'Comenzar test →'}
          </button>
        )}

      </div>
    </div>
  );
}
