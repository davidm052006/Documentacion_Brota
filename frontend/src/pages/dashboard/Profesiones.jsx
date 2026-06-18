import { useState, useEffect, useCallback, useRef } from 'react';
import DashboardLayout from '../../components/Layout/DashboardLayout';
import { obtenerProgramas, obtenerEstadisticas } from '../../services/programasService';

// ── Definición de categorías ──────────────────────────────────────────────────
const CATEGORIAS = [
  { key: 'todos',          emoji: '✨', label: 'Todos',           color: 'gray' },
  { key: 'tecnologia',     emoji: '💻', label: 'Tecnología',      color: 'blue' },
  { key: 'salud',          emoji: '🏥', label: 'Salud',           color: 'emerald' },
  { key: 'ciencias',       emoji: '🔬', label: 'Ciencias',        color: 'purple' },
  { key: 'diseño',         emoji: '🎨', label: 'Diseño',          color: 'pink' },
  { key: 'arte',           emoji: '🎭', label: 'Arte',            color: 'violet' },
  { key: 'educacion',      emoji: '📚', label: 'Educación',       color: 'amber' },
  { key: 'social',         emoji: '🤝', label: 'Ciencias Sociales', color: 'teal' },
  { key: 'comunicacion',   emoji: '📡', label: 'Comunicación',    color: 'sky' },
  { key: 'juridico',       emoji: '⚖️', label: 'Derecho',         color: 'slate' },
  { key: 'negocios',       emoji: '📈', label: 'Negocios',        color: 'yellow' },
  { key: 'administrativo', emoji: '🏢', label: 'Administración',  color: 'orange' },
  { key: 'humanidades',    emoji: '📖', label: 'Humanidades',     color: 'rose' },
  { key: 'ambiental',      emoji: '🌿', label: 'Ambiental',       color: 'green' },
  { key: 'deporte',        emoji: '⚽', label: 'Deportes',        color: 'lime' },
];

const CAT_MAP = Object.fromEntries(CATEGORIAS.map(c => [c.key, c]));

// Paleta de colores por categoría (Tailwind compatible)
const BADGE_CLS = {
  blue:    'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  emerald: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  purple:  'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
  pink:    'bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300',
  violet:  'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300',
  amber:   'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  teal:    'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300',
  sky:     'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',
  slate:   'bg-slate-100 text-slate-700 dark:bg-slate-900/40 dark:text-slate-300',
  yellow:  'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300',
  orange:  'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
  rose:    'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
  green:   'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
  lime:    'bg-lime-100 text-lime-700 dark:bg-lime-900/40 dark:text-lime-300',
  gray:    'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300',
};

const PILL_ACTIVE = {
  blue:    'bg-blue-600 text-white shadow-blue-200 dark:shadow-blue-900',
  emerald: 'bg-emerald-600 text-white shadow-emerald-200 dark:shadow-emerald-900',
  purple:  'bg-purple-600 text-white shadow-purple-200 dark:shadow-purple-900',
  pink:    'bg-pink-500 text-white shadow-pink-200 dark:shadow-pink-900',
  violet:  'bg-violet-600 text-white shadow-violet-200 dark:shadow-violet-900',
  amber:   'bg-amber-500 text-white shadow-amber-200 dark:shadow-amber-900',
  teal:    'bg-teal-600 text-white shadow-teal-200 dark:shadow-teal-900',
  sky:     'bg-sky-500 text-white shadow-sky-200 dark:shadow-sky-900',
  slate:   'bg-slate-600 text-white shadow-slate-200 dark:shadow-slate-900',
  yellow:  'bg-yellow-500 text-white shadow-yellow-200 dark:shadow-yellow-900',
  orange:  'bg-orange-500 text-white shadow-orange-200 dark:shadow-orange-900',
  rose:    'bg-rose-500 text-white shadow-rose-200 dark:shadow-rose-900',
  green:   'bg-green-600 text-white shadow-green-200 dark:shadow-green-900',
  lime:    'bg-lime-500 text-white shadow-lime-200 dark:shadow-lime-900',
  gray:    'bg-gray-700 text-white shadow-gray-200 dark:shadow-gray-900',
};

// ── Chip de detalle en la tarjeta ─────────────────────────────────────────────
function Chip({ children }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-medium bg-gray-100 dark:bg-[#252830] text-gray-500 dark:text-gray-400">
      {children}
    </span>
  );
}

// ── Skeleton card ─────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-[#1a1d24] rounded-2xl border border-gray-100 dark:border-[#2c3140] p-5 animate-pulse">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-[#252830] flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-3 bg-gray-100 dark:bg-[#252830] rounded-full w-1/3" />
          <div className="h-4 bg-gray-100 dark:bg-[#252830] rounded-full w-5/6" />
          <div className="h-4 bg-gray-100 dark:bg-[#252830] rounded-full w-2/3" />
        </div>
      </div>
      <div className="h-3 bg-gray-100 dark:bg-[#252830] rounded-full w-1/2 mt-3" />
      <div className="flex gap-1.5 mt-3">
        <div className="h-5 bg-gray-100 dark:bg-[#252830] rounded-md w-16" />
        <div className="h-5 bg-gray-100 dark:bg-[#252830] rounded-md w-20" />
        <div className="h-5 bg-gray-100 dark:bg-[#252830] rounded-md w-14" />
      </div>
    </div>
  );
}

// ── Tarjeta de programa ───────────────────────────────────────────────────────
function ProgramaCard({ programa, index }) {
  const cat    = CAT_MAP[programa.area_academica] ?? CAT_MAP.todos;
  const badge  = BADGE_CLS[cat.color] ?? BADGE_CLS.gray;
  const inst   = programa.instituciones;
  const delay  = Math.min(index, 11) * 40; // stagger cap a 440ms

  return (
    <div
      className="programa-card bg-white dark:bg-[#1a1d24] rounded-2xl border border-gray-100 dark:border-[#2c3140] shadow-sm p-5 flex flex-col gap-3 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-default"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Área badge + emoji */}
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-[#14171e] flex items-center justify-center text-xl flex-shrink-0">
          {cat.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${badge}`}>
            {cat.label}
          </span>
          <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mt-1.5 leading-snug line-clamp-2">
            {programa.nombre}
          </h3>
        </div>
      </div>

      {/* Institución */}
      {inst && (
        <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
          <span className="text-gray-300 dark:text-gray-600">🏛️</span>
          <span className="line-clamp-1">{inst.nombre}</span>
        </p>
      )}

      {/* Chips de detalle */}
      <div className="flex flex-wrap gap-1.5 mt-auto">
        {programa.modalidad && <Chip>{programa.modalidad}</Chip>}
        {programa.duracion   && <Chip>{programa.duracion}</Chip>}
        {programa.tipo       && programa.tipo !== 'Universidad' && <Chip>{programa.tipo}</Chip>}
      </div>
    </div>
  );
}

// ── Componente principal ──────────────────────────────────────────────────────
export default function Profesiones() {
  const [categoriaActiva, setCategoriaActiva] = useState('todos');
  const [busqueda, setBusqueda]               = useState('');
  const [programas, setProgramas]             = useState([]);
  const [stats, setStats]                     = useState({ total: 0, areas: [] });
  const [cargando, setCargando]               = useState(true);
  const [cargandoMas, setCargandoMas]         = useState(false);
  const [total, setTotal]                     = useState(0);
  const [totalPages, setTotalPages]           = useState(1);
  const [paginaActual, setPaginaActual]       = useState(1);
  const [gridKey, setGridKey]                 = useState(0); // fuerza re-animación
  const debounceRef = useRef(null);

  // Cargar estadísticas al montar
  useEffect(() => {
    obtenerEstadisticas().then(res => {
      if (res.success) setStats(res);
    });
  }, []);

  // Función de carga de programas
  const cargarProgramas = useCallback(async (area, search, page, append = false) => {
    if (!append) setCargando(true);
    else setCargandoMas(true);

    const res = await obtenerProgramas({ area, search, page, limit: 24 });

    if (res.success) {
      setProgramas(prev => append ? [...prev, ...res.data] : res.data);
      setTotal(res.total);
      setTotalPages(res.totalPages);
      if (!append) setGridKey(k => k + 1);
    }
    setCargando(false);
    setCargandoMas(false);
  }, []);

  // Al cambiar categoría o búsqueda — nueva búsqueda desde página 1
  useEffect(() => {
    setPaginaActual(1);
    if (debounceRef.current) clearTimeout(debounceRef.current);

    // Debounce solo para búsqueda de texto
    const delay = busqueda ? 350 : 0;
    debounceRef.current = setTimeout(() => {
      cargarProgramas(categoriaActiva, busqueda, 1, false);
    }, delay);

    return () => clearTimeout(debounceRef.current);
  }, [categoriaActiva, busqueda, cargarProgramas]);

  const handleCategoriaClick = (key) => {
    setBusqueda('');
    setCategoriaActiva(key);
  };

  const handleCargarMas = () => {
    const next = paginaActual + 1;
    setPaginaActual(next);
    cargarProgramas(categoriaActiva, busqueda, next, true);
  };

  const conteoCategoria = (key) => {
    if (key === 'todos') return stats.total;
    return stats.areas.find(a => a.area === key)?.count ?? 0;
  };

  const catActual = CAT_MAP[categoriaActiva];

  return (
    <DashboardLayout>
      <div className="p-6 max-w-7xl mx-auto">

        {/* ── Encabezado ────────────────────────────────────────────────────── */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-end gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Explorar Profesiones
              </h1>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Programas académicos registrados en el SNIES —{' '}
              <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                🏙️ Solo Bogotá, D.C.
              </span>
            </p>
          </div>
          {stats.total > 0 && (
            <div className="flex items-center gap-2 bg-emerald-50 dark:bg-[#0a2018] border border-emerald-200 dark:border-[#1a4030] rounded-xl px-4 py-2">
              <span className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">
                {stats.total.toLocaleString('es-CO')}
              </span>
              <span className="text-xs text-emerald-600 dark:text-emerald-500 leading-tight">
                programas<br />disponibles
              </span>
            </div>
          )}
        </div>

        {/* ── Búsqueda ──────────────────────────────────────────────────────── */}
        <div className="relative mb-5">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none">
            🔍
          </span>
          <input
            type="text"
            placeholder="Buscar por nombre de programa o institución..."
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 dark:border-[#2c3140] rounded-xl bg-white dark:bg-[#14171e] text-gray-700 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-300 dark:focus:ring-emerald-800"
          />
          {busqueda && (
            <button
              onClick={() => setBusqueda('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-lg leading-none"
            >
              ×
            </button>
          )}
        </div>

        {/* ── Pills de categoría ────────────────────────────────────────────── */}
        <div className="flex gap-2 flex-wrap mb-6">
          {CATEGORIAS.map(({ key, emoji, label, color }) => {
            const activo = categoriaActiva === key;
            const count  = conteoCategoria(key);
            return (
              <button
                key={key}
                onClick={() => handleCategoriaClick(key)}
                className={`
                  flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold
                  transition-all duration-200
                  ${activo
                    ? `${PILL_ACTIVE[color]} shadow-sm`
                    : 'bg-white dark:bg-[#1a1d24] text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-[#2c3140] hover:border-gray-300 dark:hover:border-[#3a4155] hover:text-gray-700 dark:hover:text-gray-200'
                  }
                `}
              >
                <span>{emoji}</span>
                <span>{label}</span>
                {count > 0 && (
                  <span className={`text-[10px] ${activo ? 'opacity-80' : 'text-gray-400 dark:text-gray-500'}`}>
                    {count >= 1000 ? `${(count/1000).toFixed(1)}k` : count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ── Resultado count ───────────────────────────────────────────────── */}
        {!cargando && (
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-4">
            {busqueda
              ? `${total.toLocaleString('es-CO')} resultado${total !== 1 ? 's' : ''} para "${busqueda}"`
              : `${total.toLocaleString('es-CO')} programa${total !== 1 ? 's' : ''} en ${catActual?.label ?? 'todas las áreas'}`
            }
          </p>
        )}

        {/* ── Grid de programas ─────────────────────────────────────────────── */}
        {cargando ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {Array.from({ length: 12 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : programas.length === 0 ? (
          <div className="text-center py-20 text-gray-400 dark:text-gray-500">
            <p className="text-4xl mb-3">🔍</p>
            <p className="text-sm font-medium">No hay programas que coincidan.</p>
            <button
              onClick={() => { setBusqueda(''); setCategoriaActiva('todos'); }}
              className="mt-3 text-xs text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              Limpiar filtros
            </button>
          </div>
        ) : (
          <>
            <div
              key={gridKey}
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"
            >
              {programas.map((p, i) => (
                <ProgramaCard key={p.id} programa={p} index={i} />
              ))}
            </div>

            {/* ── Cargar más ──────────────────────────────────────────────── */}
            {paginaActual < totalPages && (
              <div className="mt-8 flex flex-col items-center gap-2">
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  Mostrando {programas.length.toLocaleString('es-CO')} de {total.toLocaleString('es-CO')}
                </p>
                <button
                  onClick={handleCargarMas}
                  disabled={cargandoMas}
                  className="px-6 py-2.5 text-sm font-semibold rounded-xl bg-white dark:bg-[#1a1d24] border border-gray-200 dark:border-[#2c3140] text-gray-700 dark:text-gray-200 hover:border-emerald-400 hover:text-emerald-600 dark:hover:border-emerald-700 dark:hover:text-emerald-400 transition-all disabled:opacity-50"
                >
                  {cargandoMas ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                      Cargando...
                    </span>
                  ) : (
                    'Cargar más programas ↓'
                  )}
                </button>
              </div>
            )}
          </>
        )}

        {/* ── Footer informativo ────────────────────────────────────────────── */}
        <div className="mt-10 bg-blue-50 dark:bg-[#0d1a30] border border-blue-100 dark:border-[#1e3a5f] rounded-2xl p-5 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <span className="text-2xl flex-shrink-0">🏙️</span>
          <div>
            <p className="text-sm font-semibold text-blue-700 dark:text-blue-400">
              Datos exclusivos de Bogotá, D.C.
            </p>
            <p className="text-xs text-blue-500 dark:text-blue-500 mt-0.5">
              Esta información proviene del SNIES (Sistema Nacional de Información de la Educación Superior)
              del Ministerio de Educación Nacional. Solo incluye programas ofrecidos en Bogotá.
              Próximamente agregaremos más ciudades.
            </p>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
