import { useState } from 'react';
import DashboardLayout from '../../components/Layout/DashboardLayout';

const CATEGORIAS = [
  { key: 'todos',        label: 'Todos',    emoji: '✨' },
  { key: 'guias',       label: 'Guías',    emoji: '📄' },
  { key: 'videos',      label: 'YouTube',  emoji: '▶️' },
  { key: 'becas',       label: 'Becas',    emoji: '🎓' },
  { key: 'herramientas',label: 'Podcasts', emoji: '🎧' },
];

const RECURSOS = [
  // ── GUÍAS ──────────────────────────────────────────────────────────────────
  {
    id: 1,
    categoria: 'guias',
    emoji: '🧭',
    titulo: 'Cómo elegir tu carrera',
    descripcion: 'Pasos concretos para tomar una decisión vocacional sin presión: intereses, habilidades, mercado laboral y valores personales.',
    tag: 'Guía esencial',
    tagColor: 'emerald',
    accion: 'Leer guía',
    url: 'https://www.mineducacion.gov.co/portal/Educacion-superior/',
  },
  {
    id: 2,
    categoria: 'guias',
    emoji: '📝',
    titulo: 'Todo sobre el ICFES / Saber 11',
    descripcion: 'Qué evalúa, cómo registrarte, fechas de inscripción, estrategias de estudio y cómo interpretar tu puntaje.',
    tag: 'Examen de estado',
    tagColor: 'blue',
    accion: 'Ver guía',
    url: 'https://www.icfes.gov.co/saber-11',
  },
  {
    id: 3,
    categoria: 'guias',
    emoji: '🏫',
    titulo: 'Universidad, SENA o técnico: ¿cuál es para ti?',
    descripcion: 'Comparación honesta entre las tres rutas: duración, costos, salidas laborales y compatibilidad con tu perfil.',
    tag: 'Rutas educativas',
    tagColor: 'purple',
    accion: 'Ver guía',
    url: 'https://www.sena.edu.co/es-co/Paginas/default.aspx',
  },
  {
    id: 4,
    categoria: 'guias',
    emoji: '🔍',
    titulo: 'Consultar programas acreditados (SNIES)',
    descripcion: 'El Sistema Nacional de Información de la Educación Superior te permite verificar si un programa está registrado y acreditado oficialmente.',
    tag: 'Verificación oficial',
    tagColor: 'teal',
    accion: 'Ir al SNIES',
    url: 'https://snies.mineducacion.gov.co/portal/',
  },
  {
    id: 5,
    categoria: 'guias',
    emoji: '💼',
    titulo: 'Cómo hacer tu primera hoja de vida',
    descripcion: 'Qué incluir cuando no tienes experiencia, cómo resaltar logros académicos y voluntariados, y cómo adaptarla a cada oferta.',
    tag: 'Empleabilidad',
    tagColor: 'amber',
    accion: 'Ver guía',
    url: 'https://www.mintrabajo.gov.co/',
  },

  // ── BECAS ──────────────────────────────────────────────────────────────────
  {
    id: 6,
    categoria: 'becas',
    emoji: '🎓',
    titulo: 'ICETEX — Crédito educativo',
    descripcion: 'Créditos condonables y subsidiados para estudiar en Colombia o en el exterior. El más grande fondo de financiación educativa del país.',
    tag: 'Crédito educativo',
    tagColor: 'blue',
    accion: 'Más información',
    url: 'https://portal.icetex.gov.co/',
  },
  {
    id: 7,
    categoria: 'becas',
    emoji: '⭐',
    titulo: 'Generación E — Excelencia',
    descripcion: 'Beca del MinEducación para los mejores puntajes ICFES de municipios con menores ingresos. Cubre matrícula en IES acreditadas.',
    tag: 'MinEducación',
    tagColor: 'emerald',
    accion: 'Más información',
    url: 'https://www.mineducacion.gov.co/generacione/',
  },
  {
    id: 8,
    categoria: 'becas',
    emoji: '🌟',
    titulo: 'Generación E — Equidad',
    descripcion: 'Subsidio de sostenimiento para estudiantes de estratos 1, 2 y 3 que ingresen a IES públicas. Apoya gastos de vida mientras estudias.',
    tag: 'MinEducación',
    tagColor: 'emerald',
    accion: 'Más información',
    url: 'https://www.mineducacion.gov.co/generacione/',
  },
  {
    id: 9,
    categoria: 'becas',
    emoji: '💡',
    titulo: 'Jóvenes en Acción',
    descripcion: 'Transferencia monetaria condicionada del Prosperidad Social para estudiantes de SENA o IES públicas. Apoya gastos de transporte y alimentación.',
    tag: 'Prosperidad Social',
    tagColor: 'orange',
    accion: 'Más información',
    url: 'https://prosperidadsocial.gov.co/sgpp/transferencias/jovenes-en-accion/',
  },
  {
    id: 10,
    categoria: 'becas',
    emoji: '🏆',
    titulo: 'Becas Banco de la República',
    descripcion: 'Convocatorias anuales para posgrados en el exterior destinadas a colombianos con trayectoria sobresaliente en artes, ciencias y humanidades.',
    tag: 'Banco República',
    tagColor: 'purple',
    accion: 'Más información',
    url: 'https://www.banrepcultural.org/becas-y-premios',
  },

  // ── HERRAMIENTAS ──────────────────────────────────────────────────────────
  {
    id: 11,
    categoria: 'herramientas',
    emoji: '📊',
    titulo: 'Oferta educativa SENA',
    descripcion: 'Explora todos los programas técnicos, tecnólogos y de formación complementaria disponibles en tu región. Muchos son completamente gratuitos.',
    tag: 'Gratuito',
    tagColor: 'emerald',
    accion: 'Explorar oferta',
    url: 'https://oferta.senasofiaplus.edu.co/',
  },
  {
    id: 12,
    categoria: 'herramientas',
    emoji: '🧪',
    titulo: 'Simulacro ICFES oficial',
    descripcion: 'Practica con los simulacros gratuitos del ICFES para familiarizarte con el formato, los tiempos y los tipos de preguntas del Saber 11.',
    tag: 'Preparación',
    tagColor: 'blue',
    accion: 'Ir al simulacro',
    url: 'https://www.icfes.gov.co/web/guest/acerca-del-examen-saber-11',
  },
  {
    id: 13,
    categoria: 'herramientas',
    emoji: '🗺️',
    titulo: 'Orientame — MinEducación',
    descripcion: 'Portal oficial de orientación socioocupacional del Ministerio de Educación. Incluye información de carreras, mercado laboral y test de orientación.',
    tag: 'Orientación oficial',
    tagColor: 'teal',
    accion: 'Ir al portal',
    url: 'https://www.mineducacion.gov.co/portal/Educacion-superior/',
  },
  {
    id: 14,
    categoria: 'herramientas',
    emoji: '💻',
    titulo: 'Coursera for Campus',
    descripcion: 'Accede a cursos gratuitos de universidades del mundo (Google, IBM, Meta). Muchas IES colombianas tienen convenio activo.',
    tag: 'Cursos gratis',
    tagColor: 'blue',
    accion: 'Ver cursos',
    url: 'https://www.coursera.org/',
  },

  // ── VIDEOS ─────────────────────────────────────────────────────────────────
  {
    id: 15,
    categoria: 'videos',
    emoji: '🎬',
    titulo: '¿Cómo saber qué estudiar? — TED',
    descripcion: 'Charla sobre cómo identificar tu pasión y convertirla en una carrera real. Subtitulada al español.',
    tag: 'TED Talk',
    tagColor: 'rose',
    accion: 'Ver video',
    url: 'https://www.youtube.com/watch?v=jpe-LKn-4gM',
  },
  {
    id: 16,
    categoria: 'videos',
    emoji: '🌱',
    titulo: 'SENA: qué es y cómo inscribirte',
    descripcion: 'Explicación completa del proceso de inscripción al SENA, tipos de programas disponibles y ventajas de estudiar ahí.',
    tag: 'Tutorial',
    tagColor: 'emerald',
    accion: 'Ver video',
    url: 'https://www.youtube.com/watch?v=2wZkSiC5OQg',
  },
  {
    id: 17,
    categoria: 'videos',
    emoji: '🚀',
    titulo: 'Cómo conseguir tu primera beca en Colombia',
    descripcion: 'Guía paso a paso en video: ICETEX, Generación E, plazos, documentos requeridos y errores comunes al aplicar.',
    tag: 'Guía en video',
    tagColor: 'amber',
    accion: 'Ver video',
    url: 'https://www.youtube.com/results?search_query=becas+colombia+jovenes',
  },
  {
    id: 18,
    categoria: 'videos',
    emoji: '🧠',
    titulo: 'Inteligencias múltiples y vocación',
    descripcion: 'Cómo la teoría de Howard Gardner puede ayudarte a entender en qué áreas naturalmente sobresales y qué carreras se alinean con tu tipo de inteligencia.',
    tag: 'Educativo',
    tagColor: 'purple',
    accion: 'Ver video',
    url: 'https://www.youtube.com/results?search_query=inteligencias+multiples+vocacion',
  },
];

const TAG_COLORS = {
  emerald: 'bg-emerald-100 text-emerald-700 dark:bg-[#0a2018] dark:text-emerald-400',
  blue:    'bg-blue-100 text-blue-700 dark:bg-[#0d1a30] dark:text-blue-400',
  purple:  'bg-purple-100 text-purple-700 dark:bg-[#1a0f30] dark:text-purple-400',
  teal:    'bg-teal-100 text-teal-700 dark:bg-[#0a2220] dark:text-teal-400',
  amber:   'bg-amber-100 text-amber-700 dark:bg-[#2a1f00] dark:text-amber-400',
  rose:    'bg-rose-100 text-rose-700 dark:bg-[#280a0a] dark:text-rose-400',
  orange:  'bg-orange-100 text-orange-700 dark:bg-[#281200] dark:text-orange-400',
};

function RecursoCard({ recurso }) {
  const tagCls = TAG_COLORS[recurso.tagColor] ?? TAG_COLORS.emerald;
  return (
    <div className="bg-white dark:bg-[#1a1d24] rounded-2xl border border-gray-100 dark:border-[#2c3140] shadow-sm p-5 flex flex-col gap-3 hover:shadow-md hover:border-emerald-200 dark:hover:border-[#1a4030] transition-all group">
      <div className="flex items-start gap-3">
        <div className="text-2xl w-10 h-10 flex items-center justify-center bg-gray-50 dark:bg-[#14171e] rounded-xl flex-shrink-0">
          {recurso.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${tagCls}`}>
            {recurso.tag}
          </span>
          <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mt-1.5 leading-snug">
            {recurso.titulo}
          </h3>
        </div>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed flex-1">
        {recurso.descripcion}
      </p>
      <a
        href={recurso.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors mt-auto"
      >
        {recurso.accion} →
      </a>
    </div>
  );
}

export default function Recursos() {
  const [categoriaActiva, setCategoriaActiva] = useState('todos');
  const [busqueda, setBusqueda] = useState('');

  const filtrados = RECURSOS.filter((r) => {
    const matchCategoria = categoriaActiva === 'todos' || r.categoria === categoriaActiva;
    const matchBusqueda  = busqueda === '' ||
      r.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      r.descripcion.toLowerCase().includes(busqueda.toLowerCase());
    return matchCategoria && matchBusqueda;
  });

  return (
    <DashboardLayout>
      <div className="p-6 max-w-6xl mx-auto">

        {/* ── Encabezado ── */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-0.5">Recursos</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Herramientas, guías y oportunidades para tu camino educativo.
            </p>
          </div>
          <input
            type="text"
            placeholder="Buscar recurso..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="px-3 py-2 text-sm border border-gray-200 dark:border-[#2c3140] rounded-xl bg-white dark:bg-[#14171e] text-gray-700 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-300 dark:focus:ring-emerald-800 w-full sm:w-52"
          />
        </div>

        {/* ── Tabs de categoría ── */}
        <div className="flex gap-1.5 flex-wrap mb-6 border-b border-gray-100 dark:border-[#1e2a21] pb-4">
          {CATEGORIAS.map(({ key, label, emoji }) => (
            <button
              key={key}
              onClick={() => setCategoriaActiva(key)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                categoriaActiva === key
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
            >
              <span>{emoji}</span> {label}
            </button>
          ))}
        </div>

        {/* ── Grid de recursos ── */}
        {filtrados.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtrados.map((r) => <RecursoCard key={r.id} recurso={r} />)}
          </div>
        ) : (
          <div className="text-center py-16 text-gray-400 dark:text-gray-500">
            <p className="text-3xl mb-3">🔍</p>
            <p className="text-sm">No hay recursos que coincidan con tu búsqueda.</p>
          </div>
        )}

        {/* ── Footer informativo ── */}
        <div className="mt-8 bg-emerald-50 dark:bg-[#0a2018] border border-emerald-200 dark:border-[#1a4030] rounded-2xl p-5">
          <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400 mb-1">
            ¿Conoces un recurso útil que no está aquí?
          </p>
          <p className="text-xs text-emerald-600 dark:text-emerald-500">
            Próximamente podrás sugerir recursos desde esta sección. Por ahora, compártelo con tu orientador.
          </p>
        </div>

      </div>
    </DashboardLayout>
  );
}
