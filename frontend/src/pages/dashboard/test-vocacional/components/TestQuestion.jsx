// src/pages/dashboard/test-vocacional/components/TestQuestion.jsx
// ── SOLO VISUAL ───────────────────────────────────────────────
// Props esperadas:
//   pregunta: { id, texto, tipo, opciones: [{id, label, icon}] }
//   preguntaNumero: number        — 1-based display
//   totalPreguntas: number
//   seleccionadas: string[]       — ids de opciones marcadas
//   onSeleccionar: (id) => void   — toggle de opción
//   onAnterior: () => void
//   onSiguiente: () => void
//   puedeAvanzar: boolean         — habilita botón siguiente
//   guardando: boolean
//   esUltima: boolean

const PREGUNTA_DEMO = {
  id: 'demo',
  texto: '¿Qué actividades disfrutas hacer en tu tiempo libre?',
  tipo: 'multiple',
  opciones: [
    { id: 'a', label: 'Dibujar, diseñar o crear cosas',              icon: '🎨' },
    { id: 'b', label: 'Pasar tiempo con amigos o conocer gente nueva', icon: '🤝' },
    { id: 'c', label: 'Jugar videojuegos',                            icon: '🎮' },
    { id: 'd', label: 'Leer, escribir o aprender sobre temas nuevos', icon: '📚' },
    { id: 'e', label: 'Resolver problemas o retos mentales',          icon: '🧩' },
    { id: 'f', label: 'Tomar fotos, grabar videos o editar contenido',icon: '📷' },
    { id: 'g', label: 'Programar, usar tecnología o investigar',      icon: '💻' },
    { id: 'h', label: 'Hacer deporte o actividades al aire libre',    icon: '🏃' },
  ],
};

// Ilustración decorativa por número de pregunta
const ILUSTRACIONES = ['🎮', '🎨', '📚', '🔬', '💡', '🌍', '🚀', '🧠',
                       '🎭', '⚗️', '🏗️', '🎯', '🤝', '🌱', '💼', '🎵'];

export default function TestQuestion({
  pregunta       = PREGUNTA_DEMO,
  preguntaNumero = 4,
  totalPreguntas = 24,
  seleccionadas  = [],
  onSeleccionar  = () => {},
  onAnterior     = () => {},
  onSiguiente    = () => {},
  puedeAvanzar   = false,
  guardando      = false,
  esUltima       = false,
}) {
  const esMultiple  = pregunta.tipo === 'multiple';
  const ilustracion = ILUSTRACIONES[(preguntaNumero - 1) % ILUSTRACIONES.length];

  // Partir el texto en dos líneas: antes y después de la primera coma o "en"
  const partes = partirTexto(pregunta.texto);

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">

      {/* ── Cabecera ── */}
      <div className="px-8 pt-7 pb-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            {/* Badge */}
            <span className="inline-block text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full mb-4">
              Pregunta {preguntaNumero} de {totalPreguntas}
            </span>

            {/* Título bicolor — igual al mockup */}
            <h2 className="text-xl font-bold leading-snug mb-1">
              <span className="text-gray-800">{partes.normal}</span>
              {partes.verde && (
                <>
                  {' '}
                  <span className="text-emerald-500">{partes.verde}</span>
                </>
              )}
            </h2>

            <p className="text-xs text-gray-400 mt-2">
              {esMultiple
                ? 'Selecciona todas las que apliquen para ti.'
                : 'Selecciona la opción que mejor te represente.'}
            </p>
          </div>


          {/* Ilustración */}
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0 hidden sm:flex">
            {ilustracion}
          </div>
        </div>
      </div>

      {/* ── Opciones ── */}
      <div className="px-8 pb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {pregunta.opciones.map((opcion) => {
            const activa = seleccionadas.includes(opcion.id);
            return (
              <button
                key={opcion.id}
                onClick={() => onSeleccionar(opcion.id)}
                className={`
                  flex items-center gap-3 p-4 rounded-2xl border-2 text-left
                  transition-all duration-150 group
                  ${activa
                    ? 'border-emerald-400 bg-emerald-50'
                    : 'border-gray-100 bg-gray-50 hover:border-emerald-200 hover:bg-emerald-50/40'
                  }
                `}
              >
                {/* Ícono */}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0 transition-colors ${activa ? 'bg-emerald-100' : 'bg-white'}`}>
                  {opcion.icon ?? '•'}
                </div>

                {/* Texto */}
                <span className={`text-sm leading-snug flex-1 ${activa ? 'text-emerald-800 font-medium' : 'text-gray-700'}`}>
                  {opcion.label}
                </span>

                {/* Checkbox */}
                <div className={`
                  w-5 h-5 rounded flex-shrink-0 flex items-center justify-center border-2 transition-all
                  ${activa ? 'bg-emerald-500 border-emerald-500' : 'border-gray-300 group-hover:border-emerald-300'}
                  ${esMultiple ? 'rounded-md' : 'rounded-full'}
                `}>
                  {activa && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 12 12">
                      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2"
                            strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {esMultiple && (
          <p className="text-xs text-gray-400 mt-3 flex items-center gap-1">
            <span>💡</span> Puedes seleccionar varias opciones
          </p>
        )}
      </div>

      {/* ── Navegación ── */}
      <div className="px-8 pb-6 pt-2 flex items-center justify-between">
        <button
          onClick={onAnterior}
          disabled={preguntaNumero === 1}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed px-4 py-2 rounded-xl hover:bg-gray-50 transition"
        >
          ← Anterior
        </button>

        <button
          onClick={onSiguiente}
          disabled={!puedeAvanzar || guardando}
          className={`
            flex items-center gap-2 text-sm font-semibold px-7 py-3 rounded-2xl transition-all duration-200
            ${puedeAvanzar && !guardando
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm hover:shadow-md'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }
          `}
        >
          {guardando ? 'Guardando...' : esUltima ? 'Ver resultados →' : 'Siguiente →'}
        </button>
      </div>

      {/* ── Banner motivacional inferior ── */}
      <div className="mx-8 mb-7 bg-amber-50 rounded-2xl p-4 flex items-start gap-3">
        <span className="text-xl flex-shrink-0">⭐</span>
        <div>
          <p className="text-xs font-semibold text-amber-800">
            Cada pregunta es una oportunidad para conocerte mejor.
          </p>
          <p className="text-xs text-amber-600 mt-0.5">
            Tómate tu tiempo y elige lo que realmente te representa.
          </p>
        </div>
      </div>

    </div>
  );
}

// ── Helpers ──────────────────────────────────────────────────
// Divide el texto para que la segunda parte sea verde,
// replicando el estilo del mockup ("¿Qué actividades... / en tu tiempo libre?")
function partirTexto(texto) {
  if (!texto) return { normal: '', verde: '' };

  // Busca "en tu", "para tu", "sobre tu", "de tu" como punto de corte natural
  const patron = /^(.+?)\s+(en tu\b.+|para tu\b.+|sobre tu\b.+|de tu\b.+|con tu\b.+)$/i;
  const match  = texto.match(patron);

  if (match) return { normal: match[1], verde: match[2] };

  // Fallback: cortar por la mitad de palabras
  const palabras = texto.split(' ');
  const mitad    = Math.ceil(palabras.length / 2);
  return {
    normal: palabras.slice(0, mitad).join(' '),
    verde:  palabras.slice(mitad).join(' '),
  };
}
