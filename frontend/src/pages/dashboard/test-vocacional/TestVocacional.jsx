import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../config/supabase';
import { obtenerCuestionario, guardarResultado, obtenerResultado } from '../../../services/perfilService';
import DashboardLayout from '../../../components/Layout/DashboardLayout';
import TestIntro    from './components/TestIntro';
import TestQuestion from './components/TestQuestion';
import TestProgress from './components/TestProgress';
import TestResult   from './components/TestResult';
import { getCategoriaInfo, storageKey } from '../../../utils/vocacionalCategorias';
import { eliminarResultado } from '../../../services/perfilService';

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

// ── Convierte el calculo interno al formato que espera TestResult ─────────────
function calcToUI(calculo) {
  if (!calculo) return null;
  const principal  = getCategoriaInfo(calculo.categoriaPrincipal, 0);
  const secundaria = calculo.categoriaSecundaria
    ? getCategoriaInfo(calculo.categoriaSecundaria, 1)
    : null;
  const scores = (calculo.scores ?? []).slice(0, 5).map(({ categoria, porcentaje }, i) => ({
    categoria: getCategoriaInfo(categoria, i).titulo,
    porcentaje,
    emoji:     getCategoriaInfo(categoria, i).emoji,
  }));
  return { perfilPrincipal: principal, perfilSecundario: secundaria, scores };
}

export default function TestVocacional({ user, isDemoMode = false }) {
  const navigate = useNavigate();

  const [fase, setFase]                         = useState('intro');
  const [preguntaIdx, setPreguntaIdx]           = useState(0);
  const [seleccionadas, setSeleccionadas]       = useState({});
  const [preguntas, setPreguntas]               = useState([]);
  const [cuestionarioId, setCuestionarioId]     = useState(null);
  const [cargando, setCargando]                 = useState(true);
  const [errorCarga, setErrorCarga]             = useState(null);
  const [resultado, setResultado]               = useState(null);
  const [perfilUsuarioId, setPerfilUsuarioId]   = useState(null);
  const [guardando, setGuardando]               = useState(false);

  // Estado de borrador / resultado previo en BD
  const [tieneBorrador, setTieneBorrador]             = useState(false);
  const [tieneResultadoPrevio, setTieneResultadoPrevio] = useState(false);
  const [resultadoGuardadoDB, setResultadoGuardadoDB]   = useState(null);

  const totalPreguntas = preguntas.length;
  const preguntaActual = preguntas[preguntaIdx];
  const progreso       = totalPreguntas > 0 ? Math.round((preguntaIdx / totalPreguntas) * 100) : 0;
  const idsActuales    = seleccionadas[preguntaActual?.id] ?? [];
  const puedeAvanzar   = idsActuales.length > 0;

  // ── Cargar al montar ────────────────────────────────────────────────────────
  useEffect(() => {
    const inicializar = async () => {
      try {
        // 1. Obtener perfilUsuarioId
        let pUid = null;
        if (!isDemoMode && user?.id) {
          const { data: perfil } = await supabase
            .from('perfiles_usuario')
            .select('id')
            .eq('user_id', user.id)
            .single();
          if (perfil) { setPerfilUsuarioId(perfil.id); pUid = perfil.id; }
        }

        // 2. Cargar preguntas
        const { success, data, error } = await obtenerCuestionario();
        if (!success) { setErrorCarga(error ?? 'No se pudo cargar el cuestionario.'); return; }
        const pregs = data.preguntas ?? [];
        const cId   = data.cuestionario?.id ?? data.id ?? null;
        setPreguntas(pregs);
        setCuestionarioId(cId);

        // 3. Verificar borrador en localStorage
        if (user?.id) {
          try {
            const raw = localStorage.getItem(storageKey(user.id));
            if (raw) {
              const draft = JSON.parse(raw);
              if (draft.cuestionarioId === cId && Object.keys(draft.seleccionadas ?? {}).length > 0) {
                setTieneBorrador(true);
              } else {
                localStorage.removeItem(storageKey(user.id));
              }
            }
          } catch { localStorage.removeItem(storageKey(user.id)); }
        }

        // 4. Verificar resultado previo en BD
        if (pUid) {
          try {
            const { data: resPrevio } = await obtenerResultado(pUid);
            if (resPrevio) {
              setResultadoGuardadoDB(resPrevio);
              setTieneResultadoPrevio(true);
            }
          } catch { /* No bloquea si falla */ }
        }
      } catch (err) {
        console.error('TestVocacional init:', err);
        setErrorCarga('Error al cargar el test.');
      } finally {
        setCargando(false);
      }
    };

    inicializar();
  }, [user?.id, isDemoMode]);

  // ── Guardar progreso en localStorage mientras el test está activo ────────────
  useEffect(() => {
    if (fase !== 'test' || !user?.id || !cuestionarioId) return;
    localStorage.setItem(storageKey(user.id), JSON.stringify({
      cuestionarioId,
      preguntaIdx,
      seleccionadas,
      savedAt: Date.now(),
    }));
  }, [fase, preguntaIdx, seleccionadas, cuestionarioId, user?.id]);

  // ── Acciones del intro ───────────────────────────────────────────────────────
  const continuarBorrador = () => {
    if (!user?.id) return;
    try {
      const raw = localStorage.getItem(storageKey(user.id));
      if (!raw) return;
      const draft = JSON.parse(raw);
      setPreguntaIdx(draft.preguntaIdx ?? 0);
      setSeleccionadas(draft.seleccionadas ?? {});
    } catch {}
    setFase('test');
  };

  const empezarNuevo = () => {
    if (user?.id) localStorage.removeItem(storageKey(user.id));
    setPreguntaIdx(0);
    setSeleccionadas({});
    setFase('test');
  };

  const verResultadoPrevio = () => {
    if (!resultadoGuardadoDB) return;
    const pfVoc = resultadoGuardadoDB.perfil_vocacional;
    const calculo = {
      categoriaPrincipal:  pfVoc?.categoriaPrincipal  ?? pfVoc?.perfil?.categoriaPrincipal,
      categoriaSecundaria: pfVoc?.categoriaSecundaria ?? pfVoc?.perfil?.categoriaSecundaria,
      scores:              pfVoc?.scores              ?? pfVoc?.perfil?.scores ?? [],
    };
    setResultado(calcToUI(calculo));
    setFase('resultado');
  };

  // ── Navegación entre preguntas ───────────────────────────────────────────────
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

  const irAnterior = () => { if (preguntaIdx > 0) setPreguntaIdx((i) => i - 1); };

  const irSiguiente = async () => {
    if (preguntaIdx < totalPreguntas - 1) {
      setPreguntaIdx((i) => i + 1);
      return;
    }

    // Última pregunta → calcular, guardar y mostrar resultado
    const calculo = calcularResultado(preguntas, seleccionadas);
    setResultado(calcToUI(calculo));

    if (perfilUsuarioId && cuestionarioId) {
      setGuardando(true);
      await guardarResultado(perfilUsuarioId, cuestionarioId, seleccionadas, calculo);
      setGuardando(false);
    }

    if (user?.id) localStorage.removeItem(storageKey(user.id));
    setFase('resultado');
  };

  const reiniciarTest = async () => {
    if (perfilUsuarioId) await eliminarResultado(perfilUsuarioId);
    if (user?.id) localStorage.removeItem(storageKey(user.id));
    setFase('intro');
    setPreguntaIdx(0);
    setSeleccionadas({});
    setResultado(null);
    setTieneBorrador(false);
    setTieneResultadoPrevio(false);
    setResultadoGuardadoDB(null);
  };

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <DashboardLayout isDemoMode={isDemoMode}>
      <div className="p-6 max-w-6xl mx-auto">

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

        {errorCarga && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-2xl text-sm text-center">
            {errorCarga}
          </div>
        )}

        {fase === 'intro' && !errorCarga && (
          <TestIntro
            onStart={empezarNuevo}
            onContinuar={continuarBorrador}
            onVerResultado={verResultadoPrevio}
            loading={cargando}
            totalPreguntas={totalPreguntas}
            tieneBorrador={tieneBorrador}
            tieneResultado={tieneResultadoPrevio}
          />
        )}

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
                guardando={guardando && preguntaIdx === totalPreguntas - 1}
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

        {fase === 'resultado' && resultado && (
          <TestResult
            perfilPrincipal={resultado.perfilPrincipal}
            perfilSecundario={resultado.perfilSecundario}
            scores={resultado.scores}
            recomendaciones={[]}
            onVerRutas={() => navigate('/dashboard/rutas')}
            onReiniciar={reiniciarTest}
          />
        )}

      </div>
    </DashboardLayout>
  );
}
