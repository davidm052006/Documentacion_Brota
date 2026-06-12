// src/pages/dashboard/test-vocacional/TestVocacional.jsx
// ── ORQUESTADOR VISUAL — la lógica va aquí cuando el backend la entregue ──
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../../components/Layout/DashboardLayout';
import TestIntro    from './components/TestIntro';
import TestQuestion from './components/TestQuestion';
import TestProgress from './components/TestProgress';
import TestResult   from './components/TestResult';

// ── Preguntas de demo (tu compañero las reemplazará con datos reales) ──
const PREGUNTAS_DEMO = [
  {
    id: 'p1', texto: '¿Qué actividades disfrutas hacer en tu tiempo libre?',
    tipo: 'multiple',
    opciones: [
      { id: 'a', label: 'Dibujar, diseñar o crear cosas',               icon: '🎨' },
      { id: 'b', label: 'Pasar tiempo con amigos o conocer gente nueva', icon: '🤝' },
      { id: 'c', label: 'Jugar videojuegos',                             icon: '🎮' },
      { id: 'd', label: 'Leer, escribir o aprender sobre temas nuevos',  icon: '📚' },
      { id: 'e', label: 'Resolver problemas o retos mentales',           icon: '🧩' },
      { id: 'f', label: 'Tomar fotos, grabar videos o editar contenido', icon: '📷' },
      { id: 'g', label: 'Programar, usar tecnología o investigar',       icon: '💻' },
      { id: 'h', label: 'Hacer deporte o actividades al aire libre',     icon: '🏃' },
    ],
  },
  {
    id: 'p2', texto: '¿Cómo prefieres trabajar en tu día a día?',
    tipo: 'single',
    opciones: [
      { id: 'a', label: 'Solo/a, con concentración total',          icon: '🧘' },
      { id: 'b', label: 'En equipo colaborando con otros',          icon: '👥' },
      { id: 'c', label: 'Siguiendo un plan organizado',             icon: '📋' },
      { id: 'd', label: 'Con libertad creativa, sin reglas fijas',  icon: '🎨' },
      { id: 'e', label: 'Con retos constantes y situaciones nuevas',icon: '⚡' },
      { id: 'f', label: 'Ayudando o enseñando a otras personas',   icon: '🤲' },
    ],
  },
];

export default function TestVocacional({ user, isDemoMode = false }) {
  console.log('🟢 TestVocacional montado');
  const navigate = useNavigate();

  // ── Estado de UI (tu compañero reemplazará esto con el hook real) ──
  const [fase, setFase]               = useState('intro');   // intro | test | resultado
  const [preguntaIdx, setPreguntaIdx] = useState(0);
  const [seleccionadas, setSeleccionadas] = useState({});    // { [preguntaId]: string[] }

  const totalPreguntas = PREGUNTAS_DEMO.length;
  const preguntaActual = PREGUNTAS_DEMO[preguntaIdx];
  const progreso       = Math.round(((preguntaIdx) / totalPreguntas) * 100);
  const idsActuales    = seleccionadas[preguntaActual?.id] ?? [];
  const puedeAvanzar   = idsActuales.length > 0;

  const toggleOpcion = (opcionId) => {
    const pregId = preguntaActual.id;
    const tipo   = preguntaActual.tipo;
    setSeleccionadas((prev) => {
      const actuales = prev[pregId] ?? [];
      if (tipo === 'single') return { ...prev, [pregId]: [opcionId] };
      return {
        ...prev,
        [pregId]: actuales.includes(opcionId)
          ? actuales.filter((id) => id !== opcionId)
          : [...actuales, opcionId],
      };
    });
  };

  const irSiguiente = () => {
    if (preguntaIdx < totalPreguntas - 1) setPreguntaIdx((i) => i + 1);
    else setFase('resultado');
  };

  const irAnterior = () => {
    if (preguntaIdx > 0) setPreguntaIdx((i) => i - 1);
  };

  return (
    <DashboardLayout isDemoMode={isDemoMode}>
      <div className="p-6 max-w-6xl mx-auto">

        {/* ── Top bar ── */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-lg font-bold text-gray-800">Cuestionario vocacional</h1>
            <p className="text-xs text-gray-400 mt-0.5">
              No hay respuestas correctas o incorrectas. Elige todo lo que te represente.
            </p>
          </div>
          {fase !== 'intro' && (
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 border border-gray-200 rounded-xl px-4 py-2 hover:bg-gray-50 transition"
            >
              Salir del test ✕
            </button>
          )}
        </div>

        {/* ── FASE: Intro ── */}
        {fase === 'intro' && (
          <TestIntro
            onStart={() => setFase('test')}
            loading={false}
          />
        )}

        {/* ── FASE: Preguntas ── */}
        {fase === 'test' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Pregunta (2/3) */}
            <div className="lg:col-span-2">
              <TestQuestion
                pregunta={preguntaActual}
                preguntaNumero={preguntaIdx + 1}
                totalPreguntas={totalPreguntas}
                seleccionadas={idsActuales}
                onSeleccionar={toggleOpcion}
                onAnterior={irAnterior}
                onSiguiente={irSiguiente}
                puedeAvanzar={puedeAvanzar}
                guardando={false}
                esUltima={preguntaIdx === totalPreguntas - 1}
              />
            </div>
            {/* Progreso (1/3) */}
            <div className="lg:col-span-1">
              <TestProgress
                preguntaActual={preguntaIdx}
                totalPreguntas={totalPreguntas}
                progreso={progreso}
              />
            </div>
          </div>
        )}

        {/* ── FASE: Resultado ── */}
        {fase === 'resultado' && (
          <TestResult
            onVerRutas={() => navigate('/dashboard/rutas')}
            onReiniciar={() => { setFase('intro'); setPreguntaIdx(0); setSeleccionadas({}); }}
          />
        )}

      </div>
    </DashboardLayout>
  );
}