import { useState, useEffect, useCallback } from 'react';
import { getContactos, actualizarContacto } from '../../../../services/contactoService';

const ESTADOS = [
  { key: '',           label: 'Todos' },
  { key: 'pendiente',  label: 'Pendientes' },
  { key: 'leido',      label: 'Leídos' },
  { key: 'respondido', label: 'Respondidos' },
  { key: 'archivado',  label: 'Archivados' },
];

const ESTADO_BADGE = {
  pendiente:  'bg-yellow-100 text-yellow-700',
  leido:      'bg-blue-100   text-blue-700',
  respondido: 'bg-green-100  text-green-700',
  archivado:  'bg-gray-100   text-gray-500',
};

const ESTADO_LABEL = {
  pendiente:  'Pendiente',
  leido:      'Leído',
  respondido: 'Respondido',
  archivado:  'Archivado',
};

function formatFecha(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleString('es-CO', {
    dateStyle: 'medium', timeStyle: 'short',
  });
}

function ContactoCard({ contacto, onActualizar }) {
  const [expandido, setExpandido]   = useState(false);
  const [notas, setNotas]           = useState(contacto.notas_admin || '');
  const [guardando, setGuardando]   = useState(false);
  const [savedMsg, setSavedMsg]     = useState('');

  const cambiarEstado = async (nuevoEstado) => {
    setGuardando(true);
    const { success } = await actualizarContacto(contacto.id, { estado: nuevoEstado });
    setGuardando(false);
    if (success) onActualizar();
  };

  const guardarNotas = async () => {
    setGuardando(true);
    const { success } = await actualizarContacto(contacto.id, { notas_admin: notas });
    setGuardando(false);
    if (success) { setSavedMsg('Guardado'); setTimeout(() => setSavedMsg(''), 2000); }
  };

  const marcarLeido = () => {
    if (contacto.estado === 'pendiente') cambiarEstado('leido');
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">

      <button
        onClick={() => { setExpandido(e => !e); marcarLeido(); }}
        className="w-full text-left px-5 py-4 flex items-start gap-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="font-semibold text-sm text-gray-800">{contacto.nombre}</span>
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${ESTADO_BADGE[contacto.estado] || 'bg-gray-100 text-gray-500'}`}>
              {ESTADO_LABEL[contacto.estado] || contacto.estado}
            </span>
            {contacto.estado === 'pendiente' && (
              <span className="w-2 h-2 rounded-full bg-yellow-400 flex-shrink-0" />
            )}
          </div>
          <p className="text-xs text-gray-500 mb-1.5">
            {contacto.email}
            {contacto.telefono && <> · {contacto.telefono}</>}
          </p>
          <p className="text-xs font-medium text-emerald-600 mb-1">{contacto.asunto}</p>
          <p className="text-xs text-gray-400 line-clamp-2">{contacto.mensaje}</p>
        </div>
        <div className="flex flex-col items-end gap-1 flex-shrink-0">
          <span className="text-xs text-gray-400">{formatFecha(contacto.created_at)}</span>
          <span className="text-gray-300 text-lg">{expandido ? '▴' : '▾'}</span>
        </div>
      </button>

      {expandido && (
        <div className="border-t border-gray-100 px-5 py-5 bg-gray-50 space-y-5">

          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Mensaje completo</p>
            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap bg-white rounded-lg border border-gray-100 px-4 py-3">
              {contacto.mensaje}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Notas internas</p>
            <textarea
              rows={3}
              value={notas}
              onChange={e => setNotas(e.target.value)}
              placeholder="Agrega notas sobre esta solicitud..."
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-emerald-300"
            />
            <div className="flex justify-end mt-1.5">
              {savedMsg && <span className="text-xs text-emerald-600 mr-2 mt-1">{savedMsg}</span>}
              <button
                onClick={guardarNotas}
                disabled={guardando}
                className="text-xs px-3 py-1.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 transition-colors"
              >
                {guardando ? 'Guardando...' : 'Guardar notas'}
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {contacto.estado !== 'leido' && contacto.estado !== 'respondido' && contacto.estado !== 'archivado' && (
              <button
                onClick={() => cambiarEstado('leido')}
                disabled={guardando}
                className="text-xs px-3 py-1.5 rounded-lg border border-blue-200 text-blue-600 hover:bg-blue-50 disabled:opacity-50 transition-colors"
              >
                ✓ Marcar como leído
              </button>
            )}
            {contacto.estado !== 'respondido' && contacto.estado !== 'archivado' && (
              <button
                onClick={() => cambiarEstado('respondido')}
                disabled={guardando}
                className="text-xs px-3 py-1.5 rounded-lg border border-green-200 text-green-600 hover:bg-green-50 disabled:opacity-50 transition-colors"
              >
                ✅ Marcar como respondido
              </button>
            )}
            {contacto.estado !== 'archivado' && (
              <button
                onClick={() => cambiarEstado('archivado')}
                disabled={guardando}
                className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-100 disabled:opacity-50 transition-colors"
              >
                🗃️ Archivar
              </button>
            )}
            {contacto.estado === 'archivado' && (
              <button
                onClick={() => cambiarEstado('pendiente')}
                disabled={guardando}
                className="text-xs px-3 py-1.5 rounded-lg border border-yellow-200 text-yellow-600 hover:bg-yellow-50 disabled:opacity-50 transition-colors"
              >
                ↩ Restaurar a pendiente
              </button>
            )}
          </div>

        </div>
      )}
    </div>
  );
}

export default function ContactosSection() {
  const [contactos, setContactos] = useState([]);
  const [meta, setMeta]           = useState(null);
  const [loading, setLoading]     = useState(true);
  const [filtroEstado, setFiltroEstado] = useState('');
  const [pagina, setPagina]       = useState(1);
  const [error, setError]         = useState('');

  const cargar = useCallback(async () => {
    setLoading(true);
    setError('');
    const { success, data, meta: m, error: err } = await getContactos({
      estado: filtroEstado,
      pagina,
      limite: 20,
    });
    setLoading(false);
    if (success) { setContactos(data || []); setMeta(m); }
    else setError(err || 'Error al cargar contactos.');
  }, [filtroEstado, pagina]);

  useEffect(() => { cargar(); }, [cargar]);

  const handleFiltro = (estado) => {
    setFiltroEstado(estado);
    setPagina(1);
  };

  const pendientes = contactos.filter(c => c.estado === 'pendiente').length;

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">

      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-base font-bold text-gray-800">Solicitudes de contacto</h2>
          {meta && (
            <p className="text-xs text-gray-400 mt-0.5">
              {meta.total} solicitudes
              {pendientes > 0 && <span className="ml-2 text-yellow-600 font-medium">· {pendientes} sin leer</span>}
            </p>
          )}
        </div>
        <button
          onClick={cargar}
          className="text-xs text-gray-400 hover:text-emerald-600 transition-colors"
          disabled={loading}
        >
          ↻ Actualizar
        </button>
      </div>

      <div className="flex gap-1 mb-5 border-b border-gray-100 pb-3">
        {ESTADOS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => handleFiltro(key)}
            className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
              filtroEstado === key
                ? 'bg-emerald-600 text-white'
                : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {loading && (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-emerald-500" />
        </div>
      )}

      {!loading && error && (
        <div className="text-center py-8 text-sm text-red-500">{error}</div>
      )}

      {!loading && !error && contactos.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <p className="text-3xl mb-3">📭</p>
          <p className="text-sm">No hay solicitudes {filtroEstado ? `con estado "${ESTADO_LABEL[filtroEstado]}"` : ''}.</p>
        </div>
      )}

      {!loading && !error && contactos.length > 0 && (
        <div className="space-y-3">
          {contactos.map(c => (
            <ContactoCard key={c.id} contacto={c} onActualizar={cargar} />
          ))}
        </div>
      )}

      {meta && meta.totalPaginas > 1 && (
        <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
          <button
            onClick={() => setPagina(p => Math.max(1, p - 1))}
            disabled={pagina <= 1 || loading}
            className="text-xs px-3 py-1.5 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 disabled:opacity-40 transition-colors"
          >
            ← Anterior
          </button>
          <span className="text-xs text-gray-400">
            Página {pagina} de {meta.totalPaginas}
          </span>
          <button
            onClick={() => setPagina(p => Math.min(meta.totalPaginas, p + 1))}
            disabled={pagina >= meta.totalPaginas || loading}
            className="text-xs px-3 py-1.5 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 disabled:opacity-40 transition-colors"
          >
            Siguiente →
          </button>
        </div>
      )}

    </div>
  );
}
