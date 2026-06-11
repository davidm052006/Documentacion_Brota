// src/pages/dashboard/test-vocacional/components/TestProgress.jsx
// ── SOLO VISUAL ───────────────────────────────────────────────
// Props esperadas:
//   preguntaActual: number   — índice base 0
//   totalPreguntas: number   — total de preguntas
//   progreso: number         — 0-100

export default function TestProgress({ preguntaActual = 3, totalPreguntas = 24, progreso = 16 }) {
  const completadas = preguntaActual + 1;

  return (
    <div className="flex flex-col gap-4">

      {/* ── Tarjeta de progreso ── */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Tu progreso</h3>

        <div className="flex items-center gap-4 mb-4">
          {/* Círculo SVG */}
          <div className="relative w-16 h-16 flex-shrink-0">
            <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
              <circle cx="32" cy="32" r="26" fill="none" stroke="#e5e7eb" strokeWidth="6" />
              <circle
                cx="32" cy="32" r="26"
                fill="none"
                stroke="#059669"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 26}`}
                strokeDashoffset={`${2 * Math.PI * 26 * (1 - progreso / 100)}`}
                style={{ transition: 'stroke-dashoffset 0.5s ease' }}
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-gray-700">
              {progreso}%
            </span>
          </div>

          <div>
            <p className="text-xs font-semibold text-emerald-600 mb-0.5">¡Vas por buen camino!</p>
            <p className="text-xs text-gray-400 leading-snug">
              {completadas} de {totalPreguntas} preguntas<br />completadas
            </p>
          </div>
        </div>

        {/* Barra lineal */}
        <div className="w-full bg-gray-100 rounded-full h-2">
          <div
            className="bg-emerald-500 h-2 rounded-full"
            style={{ width: `${progreso}%`, transition: 'width 0.5s ease' }}
          />
        </div>
      </div>

      {/* ── Mini reto ── */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 mb-1">
          <span>⚡</span>
          <h3 className="text-sm font-semibold text-gray-700">Mini reto</h3>
        </div>
        <p className="text-xs font-semibold text-gray-800 mb-0.5">¡Desafía tu mente!</p>
        <p className="text-xs text-gray-500 mb-4 leading-relaxed">
          Completa este reto rápido y toma un descanso activo.
        </p>

        <p className="text-xs font-medium text-gray-600 mb-3">
          Encuentra la pareja — une cada habilidad con su ícono correspondiente.
        </p>

        {/* Pares del reto */}
        <div className="space-y-3">
          {[
            { label: 'Creatividad', icono: '💬' },
            { label: 'Lógica',      icono: '🧠' },
            { label: 'Comunicación', icono: '💡' },
          ].map(({ label, icono }) => (
            <div key={label} className="flex items-center justify-between gap-2">
              <span className="text-xs text-gray-600">{label}</span>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <div className="w-6 border-t border-dashed border-gray-300" />
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
              </div>
              <div className="w-8 h-8 bg-gray-50 rounded-xl flex items-center justify-center text-base border border-gray-100">
                {icono}
              </div>
            </div>
          ))}
        </div>

        <button className="w-full mt-4 text-xs text-gray-500 border border-gray-200 rounded-xl py-2 hover:bg-gray-50 transition flex items-center justify-center gap-1">
          ↺ Reiniciar reto
        </button>
        <button className="w-full mt-1 text-xs text-emerald-600 py-1 hover:underline transition">
          Saltar reto →
        </button>
      </div>

      {/* ── Tarjeta lateral inferior (igual al dashboard) ── */}
      <div className="bg-emerald-700 rounded-2xl p-4 text-white">
        <p className="text-xs font-semibold mb-1">Tu camino comienza con un paso.</p>
        <p className="text-xs text-emerald-200 leading-relaxed">
          Cada respuesta te acerca a descubrir tu mejor versión.
        </p>
        <div className="flex items-end justify-between mt-3">
          <div>
            <p className="text-xs text-emerald-300">Paso {completadas} de 6</p>
            <div className="w-24 bg-emerald-600 rounded-full h-1.5 mt-1">
              <div className="bg-white h-1.5 rounded-full" style={{ width: `${(completadas / 6) * 100}%` }} />
            </div>
          </div>
          <span className="text-3xl">🌱</span>
        </div>
      </div>

    </div>
  );
}
