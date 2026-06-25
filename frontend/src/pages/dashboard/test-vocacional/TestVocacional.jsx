import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../config/supabase';
import { obtenerCuestionario, guardarResultado, obtenerResultado, eliminarResultado } from '../../../services/perfilService';
import DashboardLayout from '../../../components/Layout/DashboardLayout';
import TestIntro    from './components/TestIntro';
import TestQuestion from './components/TestQuestion';
import TestProgress from './components/TestProgress';
import TestResult   from './components/TestResult';
import { getCategoriaInfo, storageKey } from '../../../utils/vocacionalCategorias';

// Convierte el perfil_vocacional del backend al formato que espera TestResult
function calcToUI(perfilVocacional) {
  if (!perfilVocacional) return null;
  const principal  = getCategoriaInfo(perfilVocacional.categoriaPrincipal, 0);
  const secundaria = perfilVocacional.categoriaSecundaria
    ? getCategoriaInfo(perfilVocacional.categoriaSecundaria, 1)
    : null;
  const scores = (perfilVocacional.scores ?? []).slice(0, 5).map(({ categoria, porcentaje }, i) => ({
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
  const [resultadoId, setResultadoId]           = useState(null);
  const [perfilUsuarioId, setPerfilUsuarioId]   = useState(null);
  const [guardando, setGuardando]               = useState(false);

  const [tieneBorrador, setTieneBorrador]               = useState(false);
  const [tieneResultadoPrevio, setTieneResultadoPrevio] = useState(false);
  const [resultadoGuardadoDB, setResultadoGuardadoDB]   = useState(null);

  const totalPreguntas = preguntas.length;
  const preguntaActual = preguntas[preguntaIdx];
  const progreso       = totalPreguntas > 0 ? Math.round((preguntaIdx / totalPreguntas) * 100) : 0;
  const idsActuales    = seleccionadas[preguntaActual?.id] ?? [];
  const puedeAvanzar   = idsActuales.length > 0;

  // ── Inicialización ───────────────────────────────────────────────────────────
  useEffect(() => {
    const inicializar = async () => {
      try {
        let pUid = null;
        if (!isDemoMode && user?.id) {

          // ✅ Busca el perfil, si no existe lo crea automáticamente
          let { data: perfil, error: errorPerfil } = await supabase
            .from('perfiles_usuario')
            .select('id')
            .eq('user_id', user.id)
            .single();

          if (errorPerfil || !perfil) {
            const { data: perfilNuevo } = await supabase
              .from('perfiles_usuario')
              .insert({ user_id: user.id })
              .select('id')
              .single();
            perfil = perfilNuevo;
          }

          if (perfil) { setPerfilUsuarioId(perfil.id); pUid = perfil.id; }
        }

        const { success, data, error } = await obtenerCuestionario();
        if (!success) { setErrorCarga(error ?? 'No se pudo cargar el cuestionario.'); return; }

        const pregs = data.preguntas ?? [];
        const cId   = data.cuestionario?.id ?? data.id ?? null;
        setPreguntas(pregs);
        setCuestionarioId(cId);

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

        if (pUid) {
          try {
            const { data: resPrevio } = await obtenerResultado(pUid);
            if (resPrevio) {
              setResultadoGuardadoDB(resPrevio);
              setTieneResultadoPrevio(true);
            }
          } catch { /* no bloquea */ }
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

  // ── Autosave del borrador en localStorage ────────────────────────────────────
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
    setResultado(calcToUI({
      categoriaPrincipal:  pfVoc?.categoriaPrincipal  ?? pfVoc?.perfil?.categoriaPrincipal,
      categoriaSecundaria: pfVoc?.categoriaSecundaria ?? pfVoc?.perfil?.categoriaSecundaria,
      scores:              pfVoc?.scores              ?? pfVoc?.perfil?.scores ?? [],
    }));
    setResultadoId(resultadoGuardadoDB.id ?? null);
    setFase('resultado');
  };

  // ── Navegación entre preguntas ───────────────────────────────────────────────
  const toggleOpcion = (opcionId) => {
    const pregId = preguntaActual.id;
    const tipo   = preguntaActual.tipo;
    setSeleccionadas((prev) => {
      const actuales = prev[pregId] ?? [];
      // 'likert' y 'single' → solo una opción a la vez
      if (tipo === 'single' || tipo === 'likert') return { ...prev, [pregId]: [opcionId] };
      // 'multiple' → toggle normal
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

    // Última pregunta → el backend calcula el perfil a partir de las respuestas crudas
    setFase('calculando');
    setGuardando(true);

    try {
      if (perfilUsuarioId && cuestionarioId) {
        const res = await guardarResultado(perfilUsuarioId, cuestionarioId, seleccionadas);
        if (res.success && res.data) {
          setResultado(calcToUI(res.data.perfil_vocacional));
          setResultadoId(res.data.id);
        }
      }
    } catch (err) {
      console.error('Error al guardar resultado:', err);
    } finally {
      setGuardando(false);
      setFase('resultado');
      if (user?.id) localStorage.removeItem(storageKey(user.id));
    }
  };

  const reiniciarTest = async () => {
    if (perfilUsuarioId) await eliminarResultado(perfilUsuarioId);
    if (user?.id) localStorage.removeItem(storageKey(user.id));
    setFase('intro');
    setPreguntaIdx(0);
    setSeleccionadas({});
    setResultado(null);
    setResultadoId(null);
    setTieneBorrador(false);
    setTieneResultadoPrevio(false);
    setResultadoGuardadoDB(null);
  };

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <DashboardLayout isDemoMode={isDemoMode}>
      <div className="p-6 max-w-6xl mx-auto">

        {/* Encabezado + barra de progreso superior */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="text-lg font-bold text-gray-800 dark:text-white">
                Test vocacional
              </h1>
              <p className="text-xs text-gray-400 mt-0.5">
                No hay respuestas correctas o incorrectas. Elige lo que te represente.
              </p>
            </div>
            <div className="flex items-center gap-3">
              {fase === 'test' && (
                <span className="text-xs text-gray-400">
                  Pregunta {preguntaIdx + 1} / {totalPreguntas}
                </span>
              )}
              {fase !== 'intro' && fase !== 'calculando' && (
                <button
                  onClick={() => navigate('/dashboard')}
                  className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 border border-gray-200 dark:border-[#1e2a21] rounded-lg px-3 py-1.5 hover:bg-gray-50 dark:hover:bg-white/5 transition"
                >
                  Salir ✕
                </button>
              )}
            </div>
          </div>
          {fase === 'test' && totalPreguntas > 0 && (
            <div className="w-full bg-gray-100 dark:bg-white/5 rounded-full h-1.5">
              <div
                className="bg-green-500 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${progreso}%` }}
              />
            </div>
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
                guardando={guardando}
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

        {fase === 'calculando' && (
          <div className="flex items-center justify-center min-h-[50vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-emerald-500 mx-auto mb-4" />
              <p className="text-gray-600 text-sm font-medium">Analizando tus respuestas...</p>
              <p className="text-gray-400 text-xs mt-1">Esto solo toma un momento</p>
            </div>
          </div>
        )}

        {fase === 'resultado' && resultado && (
          <TestResult
            resultadoId={resultadoId}
            perfilPrincipal={resultado.perfilPrincipal}
            perfilSecundario={resultado.perfilSecundario}
            scores={resultado.scores}
            onVerRutas={() => navigate('/dashboard/rutas')}
            onReiniciar={reiniciarTest}
          />
        )}

      </div>
    </DashboardLayout>
  );
}