import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '../../../components/Shared/ProgressBar';
import { obtenerResultado, eliminarResultado } from '../../../services/perfilService';
import { storageKey, getCategoriaInfo } from '../../../utils/vocacionalCategorias';

const QUOTE = 'No se trata de tener todas las respuestas, sino de tener la curiosidad de descubrirlas. ¡Tú puedes!';

export default function ContinueSection({ perfilUsuarioId, userId }) {
  const navigate = useNavigate();
  const [estado, setEstado]             = useState('cargando');
  const [progreso, setProgreso]         = useState(0);
  const [perfilLabel, setPerfilLabel]   = useState('');
  const [eliminando, setEliminando]     = useState(false);
  const [confirmando, setConfirmando]   = useState(false);

  const cargar = async () => {
    setEstado('cargando');

    // 1. localStorage primero — tiene prioridad si hay un borrador activo
    if (userId) {
      try {
        const raw = localStorage.getItem(storageKey(userId));
        if (raw) {
          const draft = JSON.parse(raw);
          const totalRespondidas = Object.keys(draft.seleccionadas ?? {}).length;
          if (totalRespondidas > 0) {
            const pct = Math.min(Math.round(((draft.preguntaIdx ?? 0) / 30) * 100), 95);
            setProgreso(pct || 5); // mínimo 5% para que se vea el progreso
            setEstado('en-progreso');
            return;
          }
        }
      } catch {}
    }

    // 2. Luego verificar resultado completado en BD
    if (perfilUsuarioId) {
      try {
        const { data } = await obtenerResultado(perfilUsuarioId);
        if (data) {
          const pfVoc = data.perfil_vocacional;
          const cat   = pfVoc?.categoriaPrincipal ?? pfVoc?.perfil?.categoriaPrincipal ?? '';
          setPerfilLabel(getCategoriaInfo(cat).titulo);
          setProgreso(100);
          setEstado('completado');
          return;
        }
      } catch {}
    }

    setProgreso(0);
    setEstado('nuevo');
  };

  useEffect(() => {
    let cancelado = false;
    const cargarConCancel = async () => {
      await cargar();
    };
    cargarConCancel();
    return () => { cancelado = true; };
  }, [perfilUsuarioId, userId]);

  const handleEliminar = async () => {
    setEliminando(true);
    // Limpiar localStorage
    if (userId) localStorage.removeItem(storageKey(userId));
    // Borrar de la BD
    if (perfilUsuarioId) await eliminarResultado(perfilUsuarioId);
    setConfirmando(false);
    setEliminando(false);
    setProgreso(0);
    setEstado('nuevo');
    setPerfilLabel('');
  };

  const textoBoton = {
    completado:    'Ver resultado →',
    'en-progreso': 'Continuar →',
    nuevo:         'Comenzar →',
    cargando:      '...',
  }[estado];

  const iconoCard = {
    completado:    '🎉',
    'en-progreso': '📝',
    nuevo:         '🧑‍🎓',
    cargando:      '🌱',
  }[estado];

  const descripcion = {
    completado:    `Perfil: ${perfilLabel || 'Completado'}`,
    'en-progreso': 'En progreso — continúa donde lo dejaste',
    nuevo:         'Descubre tus intereses y fortalezas',
    cargando:      'Cargando...',
  }[estado];

  const puedeEliminar = estado === 'completado' || estado === 'en-progreso';

  return (
    <div>
      <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-3">
        Continúa donde lo dejaste
      </h2>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">

        {/* ── Tarjeta de progreso del test ── */}
        <div className="bg-white dark:bg-[#1a2e1f] rounded-2xl border border-gray-100 dark:border-[#334155] shadow-sm p-5 flex gap-4 items-center">
          <div className="w-20 h-20 rounded-xl bg-green-50 dark:bg-[#111c14] flex items-center justify-center text-4xl shrink-0">
            {iconoCard}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">Test vocacional</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{descripcion}</p>
            <ProgressBar value={progreso} />
            <p className="text-xs text-gray-400 mt-1">{progreso}% completado</p>

            <div className="flex gap-2 mt-3 flex-wrap items-center">
              <button
                onClick={() => navigate('/dashboard/test')}
                disabled={estado === 'cargando'}
                className="bg-green-600 hover:bg-green-700 disabled:bg-green-300 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                {textoBoton}
              </button>

              {/* Botón eliminar — solo si hay algo que borrar */}
              {puedeEliminar && !confirmando && (
                <button
                  onClick={() => setConfirmando(true)}
                  className="text-xs text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors px-2 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-[#1c0a0a]"
                  title="Eliminar test"
                >
                  🗑 Eliminar
                </button>
              )}

              {/* Confirmación inline */}
              {confirmando && (
                <span className="flex items-center gap-1.5">
                  <span className="text-xs text-red-500 font-medium">¿Seguro?</span>
                  <button
                    onClick={handleEliminar}
                    disabled={eliminando}
                    className="text-xs bg-red-500 hover:bg-red-600 text-white px-2.5 py-1.5 rounded-lg transition-colors disabled:opacity-50"
                  >
                    {eliminando ? '...' : 'Sí, borrar'}
                  </button>
                  <button
                    onClick={() => setConfirmando(false)}
                    className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 px-2 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-[#243d29] transition-colors"
                  >
                    Cancelar
                  </button>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* ── Frase motivacional ── */}
        <div className="bg-gray-50 dark:bg-[#111c14] rounded-2xl border border-gray-100 dark:border-[#334155] p-5 flex items-center gap-3 relative overflow-hidden">
          <span className="text-4xl opacity-10 absolute top-2 left-3 select-none">❝</span>
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed italic relative z-10">
            {QUOTE}
          </p>
        </div>

      </div>
    </div>
  );
}
