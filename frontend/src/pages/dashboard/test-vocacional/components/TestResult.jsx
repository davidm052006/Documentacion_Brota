// src/pages/dashboard/test-vocacional/components/TestResult.jsx
// ── SOLO VISUAL ───────────────────────────────────────────────
// Props esperadas:
//   perfilPrincipal: { emoji, titulo, descripcion, color }
//   perfilSecundario: { emoji, titulo } | null
//   scores: [{ categoria, porcentaje, emoji }]   — max 5 items
//   recomendaciones: [{ nombre, institucion, area, duracion, compatibilidad }]
//   onVerRutas: () => void
//   onReiniciar: () => void

const RESULTADO_DEMO = {
  perfilPrincipal: {
    emoji: '🚀',
    titulo: 'Emprendedor Nato',
    descripcion: 'Tienes visión de futuro y te emociona construir cosas con impacto real. Eres creativo, ambicioso y sabes motivar a quienes te rodean.',
    color: 'amber',
  },
  perfilSecundario: { emoji: '🧠', titulo: 'Pensador Analítico' },
  scores: [
    { categoria: 'Vocación',     porcentaje: 92, emoji: '🚀' },
    { categoria: 'Habilidades',  porcentaje: 78, emoji: '🧠' },
    { categoria: 'Valores',      porcentaje: 65, emoji: '❤️' },
    { categoria: 'Intereses',    porcentaje: 54, emoji: '🎯' },
    { categoria: 'Académico',    porcentaje: 41, emoji: '📚' },
  ],
  recomendaciones: [
    { nombre: 'Administración de Empresas', institucion: 'Universidad de los Andes', area: 'Ciencias Económicas', duracion: '8 semestres', compatibilidad: 95 },
    { nombre: 'Ingeniería Industrial',      institucion: 'Universidad Nacional',     area: 'Ingeniería',         duracion: '10 semestres', compatibilidad: 88 },
    { nombre: 'Marketing Digital',          institucion: 'EAFIT',                   area: 'Comunicación',       duracion: '8 semestres', compatibilidad: 82 },
    { nombre: 'Diseño de Producto',         institucion: 'Universidad Jorge Tadeo',  area: 'Diseño',             duracion: '8 semestres', compatibilidad: 75 },
  ],
};

const COLOR_STYLES = {
  amber:   { bg: 'bg-amber-50',   border: 'border-amber-200',   text: 'text-amber-700',   bar: 'bg-amber-400'   },
  emerald: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', bar: 'bg-emerald-500' },
  blue:    { bg: 'bg-blue-50',    border: 'border-blue-200',    text: 'text-blue-700',    bar: 'bg-blue-400'    },
  purple:  { bg: 'bg-purple-50',  border: 'border-purple-200',  text: 'text-purple-700',  bar: 'bg-purple-400'  },
  rose:    { bg: 'bg-rose-50',    border: 'border-rose-200',    text: 'text-rose-700',    bar: 'bg-rose-400'    },
  teal:    { bg: 'bg-teal-50',    border: 'border-teal-200',    text: 'text-teal-700',    bar: 'bg-teal-400'    },
};

export default function TestResult({
  perfilPrincipal  = RESULTADO_DEMO.perfilPrincipal,
  perfilSecundario = RESULTADO_DEMO.perfilSecundario,
  scores           = RESULTADO_DEMO.scores,
  recomendaciones  = RESULTADO_DEMO.recomendaciones,
  onVerRutas       = () => {},
  onReiniciar      = () => {},
}) {
  const c = COLOR_STYLES[perfilPrincipal.color] ?? COLOR_STYLES.emerald;

  return (
    <div className="max-w-3xl mx-auto space-y-5">

      {/* ── Tarjeta de perfil principal ── */}
      <div className={`${c.bg} border ${c.border} rounded-3xl p-8 text-center`}>
        <div className="text-5xl mb-4">{perfilPrincipal.emoji}</div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">
          Tu perfil vocacional
        </p>
        <h1 className={`text-2xl font-bold ${c.text} mb-3`}>
          {perfilPrincipal.titulo}
        </h1>
        <p className="text-sm text-gray-600 leading-relaxed max-w-md mx-auto">
          {perfilPrincipal.descripcion}
        </p>

        {perfilSecundario && (
          <div className="mt-5 inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 text-xs text-gray-500 border border-gray-100">
            <span>{perfilSecundario.emoji}</span>
            <span>Perfil secundario: <strong>{perfilSecundario.titulo}</strong></span>
          </div>
        )}
      </div>

      {/* ── Distribución de habilidades ── */}
      {scores.length > 0 && (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-5">
            📊 Distribución de tu perfil
          </h2>
          <div className="space-y-4">
            {scores.map(({ categoria, porcentaje, emoji }, idx) => (
              <div key={categoria} className="flex items-center gap-3">
                <span className="text-base w-6 text-center">{emoji}</span>
                <div className="flex-1">
                  <div className="flex justify-between mb-1.5">
                    <span className="text-xs font-medium text-gray-700">{categoria}</span>
                    {idx === 0 && (
                      <span className="text-xs text-emerald-600 font-semibold">Principal</span>
                    )}
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className={`${c.bar} h-2 rounded-full`}
                      style={{ width: `${porcentaje}%`, transition: 'width 0.7s ease' }}
                    />
                  </div>
                </div>
                <span className="text-xs text-gray-400 w-8 text-right">{porcentaje}%</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Recomendaciones ── */}
      {recomendaciones.length > 0 && (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">
            🎓 Programas recomendados para ti
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {recomendaciones.map((rec, i) => (
              <div
                key={i}
                className="border border-gray-100 rounded-2xl p-4 hover:border-emerald-200 hover:bg-emerald-50/30 transition cursor-pointer"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <p className="text-sm font-semibold text-gray-800 leading-snug">
                    {rec.nombre}
                  </p>
                  <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full flex-shrink-0">
                    {rec.compatibilidad}%
                  </span>
                </div>
                <p className="text-xs text-gray-500 mb-0.5">{rec.institucion}</p>
                <p className="text-xs text-gray-400">{rec.area} · {rec.duracion}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Acciones ── */}
      <div className="flex flex-col sm:flex-row gap-3 pb-4">
        <button
          onClick={onVerRutas}
          className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-4 rounded-2xl text-sm shadow-sm hover:shadow-md transition-all"
        >
          Ver rutas formativas →
        </button>
        <button
          onClick={onReiniciar}
          className="flex-1 border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium py-4 rounded-2xl text-sm transition"
        >
          ↺ Volver a hacer el test
        </button>
      </div>

    </div>
  );
}