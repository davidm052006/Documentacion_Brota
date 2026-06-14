// src/pages/dashboard/test-vocacional/TestVocacional.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../config/supabase';
import { obtenerCuestionario, guardarResultado } from '../../../services/perfilService';
import DashboardLayout from '../../../components/Layout/DashboardLayout';
import TestIntro    from './components/TestIntro';
import TestQuestion from './components/TestQuestion';
import TestProgress from './components/TestProgress';
import TestResult   from './components/TestResult';

// ── Calcula los scores sumando los pesos de cada opción elegida ──────────────
function calcularResultado(preguntas, seleccionadas) {
  const scores = {};

  preguntas.forEach((pregunta) => {
    const respuestasUsuario = seleccionadas[pregunta.id] ?? [];
    respuestasUsuario.forEach((opcionId) => {
      const opcion = pregunta.opciones?.find((o) => o.id === opcionId);
      if (!opcion?.pesos) return;
      Object.entries(opcion.pesos).forEach(([categoria, puntos]) => {
        scores[categoria] = (scores[categoria] ?? 0) + puntos;
      });
    });
  });

  const ordenados = Object.entries(scores).sort(([, a], [, b]) => b - a);
  const maxPuntos = ordenados[0]?.[1] ?? 1;

  return {
    categoriaPrincipal:  ordenados[0]?.[0] ?? null,
    categoriaSecundaria: ordenados[1]?.[0] ?? null,
    scores: ordenados.map(([categoria, puntos]) => ({
      categoria,
      puntos,
      porcentaje: Math.round((puntos / maxPuntos) * 100),
    })),
  };
}

export default function TestVocacional({ user, isDemoMode = false }) {
  const navigate = useNavigate();

  // ── Estado principal ────────────────────────────────────────────────────────
  const [fase, setFase]                       = useState('intro'); // intro | test | resultado
  const [preguntaIdx, setPreguntaIdx]         = useState(0);
  const [seleccionadas, setSeleccionadas]     = useState({});      // { [preguntaId]: string[] }

  // ── Estado de datos desde el backend ───────────────────────────────────────
  const [preguntas, setPreguntas]             = useState([]);
  const [cuestionarioId, setCuestionarioId]   = useState(null);
  const [cargando, setCargando]               = useState(true);
  const [errorCarga, setErrorCarga]           = useState(null);
  const [resultado, setResultado]             = useState(null);
  const [perfilUsuarioId, setPerfilUsuarioId] = useState(null);

  // ── Derivaciones ────────────────────────────────────────────────────────────
  const totalPreguntas = preguntas.length;
  const preguntaActual = preguntas[preguntaIdx];
  const progreso       = totalPreguntas > 0
    ? Math.round((preguntaIdx / totalPreguntas) * 100)
    : 0;
  const idsActuales  = seleccionadas[preguntaActual?.id] ?? [];
  const puedeAvanzar = idsActuales.length > 0;

  // ── Cargar datos al montar ──────────────────────────────────────────────────
  useEffect(() => {
    const inicializar = async () => {
      try {
        // 1. Obtener el id de perfiles_usuario (distinto al auth user.id)
        if (!isDemoMode && user?.id) {
          const { data: perfil } = await supabase
            .from('perfiles_usuario')
            .select('id')
            .eq('user_id', user.id)
            .single();
          if (perfil) setPerfilUsuarioId(perfil.id);
        }

        // 2. Cargar preguntas desde el backend
        const { success, data, error } = await obtenerCuestionario();
        if (!success) {
          setErrorCarga(error ?? 'No se pudo cargar el cuestionario.');
          return;
        }
        setPreguntas(data.preguntas ?? []);
        setCuestionarioId(data.cuestionario?.id ?? data.id ?? null);
      } catch (err) {
        console.error('TestVocacional — error al inicializar:', err);
        setErrorCarga('Ocurrió un error al cargar el test.');
      } finally {
        setCargando(false);
      }
    };

    inicializar();
  }, [user?.id, isDemoMode]);

  // ── Navegación entre preguntas ──────────────────────────────────────────────
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

  const irAnterior = () => {
    if (preguntaIdx > 0) setPreguntaIdx((i) => i - 1);
  };

  const irSiguiente = async () => {
    if (preguntaIdx < totalPreguntas - 1) {
      setPreguntaIdx((i) => i + 1);
      return;
    }

    // Última pregunta — calcular resultado
    const calculo = calcularResultado(preguntas, seleccionadas);

    // Guardar en el backend (no bloquea si falla)
    if (perfilUsuarioId && cuestionarioId) {
      guardarResultado(perfilUsuarioId, cuestionarioId, seleccionadas, calculo);
    }

    setResultado(calculo);
    setFase('resultado');
  };

  const reiniciarTest = () => {
    setFase('intro');
    setPreguntaIdx(0);
    setSeleccionadas({});
    setResultado(null);
  };

  // ── Render ──────────────────────────────────────────────────────────────────
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

        {/* ── Error de carga ── */}
        {errorCarga && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-2xl text-sm text-center">
            {errorCarga}
          </div>
        )}

        {/* ── FASE: Intro ── */}
        {fase === 'intro' && !errorCarga && (
          <TestIntro
            onStart={() => setFase('test')}
            loading={cargando}
            totalPreguntas={totalPreguntas}
          />
        )}

        {/* ── FASE: Preguntas ── */}
        {fase === 'test' && preguntaActual && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
        {fase === 'resultado' && resultado && (
          <TestResult
            resultado={resultado}
            onVerRutas={() => navigate('/dashboard/rutas')}
            onReiniciar={reiniciarTest}
          />
        )}

      </div>
    </DashboardLayout>
  );
}
