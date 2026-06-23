// src/pages/dashboard/test-vocacional/components/TestResult.jsx
// Conectado a Supabase via perfilService — carga recomendaciones reales.

import { useEffect, useState } from 'react';
import { obtenerRecomendaciones, marcarRecomendacionVista } from '../../../../services/perfilService';

// ── Mapa de áreas académicas → etiqueta + emoji ───────────────────────────────
const AREA_INFO = {
  tecnologia:     { label: 'Tecnología',         emoji: '💻' },
  salud:          { label: 'Salud',              emoji: '🏥' },
  ciencias:       { label: 'Ciencias',           emoji: '🔬' },
  diseño:         { label: 'Diseño',             emoji: '🎨' },
  arte:           { label: 'Arte',               emoji: '🎭' },
  educacion:      { label: 'Educación',          emoji: '📚' },
  social:         { label: 'Ciencias Sociales',  emoji: '🤝' },
  comunicacion:   { label: 'Comunicación',       emoji: '📡' },
  juridico:       { label: 'Derecho',            emoji: '⚖️' },
  negocios:       { label: 'Negocios',           emoji: '📈' },
  administrativo: { label: 'Administración',     emoji: '🏢' },
  humanidades:    { label: 'Humanidades',        emoji: '📖' },
  ambiental:      { label: 'Ambiental',          emoji: '🌿' },
  deporte:        { label: 'Deportes',           emoji: '⚽' },
};

// ── Color map por perfil ─────────────────────────────────────────────────────
const COLOR_STYLES = {
  amber:   { bg: 'bg-amber-50',   border: 'border-amber-200',   text: 'text-amber-700',   bar: 'bg-amber-400',   badge: 'bg-amber-100 text-amber-700'   },
  emerald: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', bar: 'bg-emerald-500', badge: 'bg-emerald-100 text-emerald-700' },
  blue:    { bg: 'bg-blue-50',    border: 'border-blue-200',    text: 'text-blue-700',    bar: 'bg-blue-400',    badge: 'bg-blue-100 text-blue-700'       },
  purple:  { bg: 'bg-purple-50',  border: 'border-purple-200',  text: 'text-purple-700',  bar: 'bg-purple-400',  badge: 'bg-purple-100 text-purple-700'   },
  rose:    { bg: 'bg-rose-50',    border: 'border-rose-200',    text: 'text-rose-700',    bar: 'bg-rose-400',    badge: 'bg-rose-100 text-rose-700'       },
  teal:    { bg: 'bg-teal-50',    border: 'border-teal-200',    text: 'text-teal-700',    bar: 'bg-teal-400',    badge: 'bg-teal-100 text-teal-700'       },
};

// ── Skeleton de carga ────────────────────────────────────────────────────────
function SkeletonCard({ className = '' }) {
  return (
    <div className={`animate-pulse bg-gray-100 rounded-2xl ${className}`} />
  );
}

// ── Tarjeta de programa recomendado ─────────────────────────────────────────
function ProgramaCard({ rec, c, onVer }) {
  const pct = rec.compatibilidad;
  const ringColor =
    pct >= 85 ? 'border-emerald-300 hover:bg-emerald-50/40' :
    pct >= 70 ? 'border-blue-200 hover:bg-blue-50/30' :
                'border-gray-100 hover:bg-gray-50/60';
  const badgeBg =
    pct >= 85 ? 'bg-emerald-100 text-emerald-700' :
    pct >= 70 ? 'bg-blue-100 text-blue-700' :
                'bg-gray-100 text-gray-500';

  const areaInfo = AREA_INFO[rec.area] ?? null;

  return (
    <div
      className={`border ${ringColor} rounded-2xl p-4 transition cursor-pointer group`}
      onClick={() => onVer(rec)}
    >
      {/* Nombre del programa + badge % */}
      <div className="flex items-start justify-between gap-2 mb-1.5">
        <p className="text-sm font-bold text-gray-800 dark:text-gray-100 leading-snug group-hover:text-emerald-700 transition">
          {rec.nombre}
        </p>
        <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 font-semibold ${badgeBg}`}>
          {pct}%
        </span>
      </div>

      {/* Descripción del programa (nbc · nivel) */}
      {rec.descripcion && (
        <p className="text-[11px] text-gray-400 mb-2 leading-relaxed">{rec.descripcion}</p>
      )}

      {/* Institución y ciudad */}
      <p className="text-xs text-gray-600 dark:text-gray-400 font-medium leading-snug">{rec.institucion}</p>
      {rec.ciudad && (
        <p className="text-[11px] text-gray-400 mt-0.5">
          {rec.ciudad}{rec.departamento && rec.departamento !== rec.ciudad ? `, ${rec.departamento}` : ''}
        </p>
      )}

      {/* Chips */}
      <div className="flex flex-wrap gap-1 mt-2.5">
        {areaInfo && (
          <span className="text-xs bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 px-2 py-0.5 rounded-full font-medium">
            {areaInfo.emoji} {areaInfo.label}
          </span>
        )}
        {rec.modalidad && (
          <span className="text-xs bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 px-2 py-0.5 rounded-full">
            {rec.modalidad}
          </span>
        )}
        {rec.duracion && (
          <span className="text-xs bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 px-2 py-0.5 rounded-full">
            {rec.duracion}
          </span>
        )}
      </div>
    </div>
  );
}

// ── Componente principal ─────────────────────────────────────────────────────
// Props:
//   resultadoId      : string (UUID de resultados) — requerido para cargar recomendaciones
//   perfilPrincipal  : { emoji, titulo, descripcion, color }
//   perfilSecundario : { emoji, titulo } | null
//   scores           : [{ categoria, porcentaje, emoji }]  — máx 5
//   onVerRutas       : () => void
//   onReiniciar      : () => void
//   onVerPrograma    : (rec) => void   — llamado al hacer clic en un programa
export default function TestResult({
  resultadoId,
  perfilPrincipal,
  perfilSecundario  = null,
  scores            = [],
  onVerRutas        = () => {},
  onReiniciar       = () => {},
  onVerPrograma     = () => {},
}) {
  const [recomendaciones, setRecomendaciones] = useState([]);
  const [cargando, setCargando]               = useState(!!resultadoId);
  const [error, setError]                     = useState(null);

  // Cargar recomendaciones con reintentos (el algoritmo corre en paralelo en el backend)
  useEffect(() => {
    if (!resultadoId) return;
    let cancelado = false;

    (async () => {
      setCargando(true);
      setError(null);

      const MAX_INTENTOS = 4;
      const ESPERA_MS    = 1500;

      for (let intento = 0; intento < MAX_INTENTOS; intento++) {
        if (cancelado) return;
        if (intento > 0) await new Promise(r => setTimeout(r, ESPERA_MS));
        if (cancelado) return;

        const res = await obtenerRecomendaciones(resultadoId);
        if (cancelado) return;

        if (!res.success) { setError(res.error); break; }
        if (res.data.length > 0) { setRecomendaciones(res.data); break; }
        // Si vacío y quedan intentos, seguir esperando
      }

      if (!cancelado) setCargando(false);
    })();

    return () => { cancelado = true; };
  }, [resultadoId]);

  // Marcar como vista + propagar al padre
  const handleVerPrograma = async (rec) => {
    if (!rec.vista) {
      await marcarRecomendacionVista(rec.id);
      setRecomendaciones(prev =>
        prev.map(r => r.id === rec.id ? { ...r, vista: true } : r)
      );
    }
    onVerPrograma(rec);
  };

  // Fallback seguro si no llega perfilPrincipal
  const perfil = perfilPrincipal ?? {
    emoji: '🎯', titulo: 'Tu perfil', descripcion: '', color: 'emerald',
  };
  const c = COLOR_STYLES[perfil.color] ?? COLOR_STYLES.emerald;

  return (
    <div className="max-w-3xl mx-auto space-y-5">

      {/* ── Perfil principal ── */}
      <div className={`${c.bg} border ${c.border} rounded-3xl p-8 text-center`}>
        <div className="text-5xl mb-4">{perfil.emoji}</div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">
          Tu perfil vocacional
        </p>
        <h1 className={`text-2xl font-bold ${c.text} mb-3`}>
          {perfil.titulo}
        </h1>
        {perfil.descripcion && (
          <p className="text-sm text-gray-600 leading-relaxed max-w-md mx-auto">
            {perfil.descripcion}
          </p>
        )}
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
                      <span className={`text-xs font-semibold ${c.text}`}>Principal</span>
                    )}
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className={`${c.bar} h-2 rounded-full transition-all duration-700`}
                      style={{ width: `${porcentaje}%` }}
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
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-4">
          🎓 Programas recomendados para ti
        </h2>

        {/* Estado: cargando / reintentando */}
        {cargando && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
              <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-emerald-500" />
              <span>Buscando programas para tu perfil...</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[1, 2, 3, 4].map(i => (
                <SkeletonCard key={i} className="h-28" />
              ))}
            </div>
          </div>
        )}

        {/* Estado: error */}
        {!cargando && error && (
          <div className="text-center py-8">
            <p className="text-sm text-gray-400 mb-3">
              No pudimos cargar los programas en este momento.
            </p>
            <button
              onClick={() => {
                setError(null);
                setCargando(true);
                obtenerRecomendaciones(resultadoId).then(res => {
                  if (res.success) setRecomendaciones(res.data);
                  else setError(res.error);
                  setCargando(false);
                });
              }}
              className="text-xs text-emerald-600 underline"
            >
              Reintentar
            </button>
          </div>
        )}

        {/* Estado: sin resultados tras todos los reintentos */}
        {!cargando && !error && recomendaciones.length === 0 && (
          <div className="text-center py-8 space-y-2">
            <p className="text-2xl">📭</p>
            <p className="text-sm text-gray-500">
              No encontramos programas para tu perfil en este momento.
            </p>
            <p className="text-xs text-gray-400">Intenta explorar la sección de Profesiones.</p>
          </div>
        )}

        {/* Estado: recomendaciones cargadas */}
        {!cargando && !error && recomendaciones.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {recomendaciones.map((rec) => (
              <ProgramaCard
                key={rec.id}
                rec={rec}
                c={c}
                onVer={handleVerPrograma}
              />
            ))}
          </div>
        )}
      </div>

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
