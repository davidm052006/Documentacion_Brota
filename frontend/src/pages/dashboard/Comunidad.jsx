import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/Layout/DashboardLayout';
import {
  getForos, getHistorias, getPreguntas, getConvocatorias,
  crearHistoria, crearPregunta,
} from '../../services/comunidadService';

// ── Color de avatar basado en inicial ─────────────────────────────────────────
const AV_PALETTE = ['#16A34A', '#2563eb', '#db2777', '#d97706', '#7c3aed', '#0891b2'];
function avatarColor(str = '') {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return AV_PALETTE[h % AV_PALETTE.length];
}

const TIPO_COLOR = {
  Beca:     { color: '#16A34A', bg: '#dcfce7' },
  Admisión: { color: '#2563eb', bg: '#dbeafe' },
  SENA:     { color: '#d97706', bg: '#fef3c7' },
  Evento:   { color: '#7c3aed', bg: '#ede9fe' },
};

const AREAS_CHIPS = ['Tecnología', 'Salud', 'Negocios', 'Artes', 'Educación', 'Ambiente'];
const CONV_FILTERS = ['Todas', 'Beca', 'Admisión', 'SENA', 'Evento'];

// ── Primitivos UI ─────────────────────────────────────────────────────────────

function Backdrop({ onClose, children }) {
  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 50,
      background: 'rgba(15,31,20,.32)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
    }}>
      <div onClick={e => e.stopPropagation()}>{children}</div>
    </div>
  );
}

function Toggle({ value, onChange, label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
      <span style={{ fontSize: 13.5, color: 'var(--ink-soft)', flex: 1 }}>{label}</span>
      <button onClick={() => onChange(!value)} style={{
        width: 44, height: 26, borderRadius: 999,
        background: value ? 'var(--primary)' : 'var(--surface-2)',
        border: 'none', cursor: 'pointer', position: 'relative', transition: 'background .2s',
      }}>
        <span style={{
          position: 'absolute', top: 3, left: value ? 'calc(100% - 22px)' : 3,
          width: 20, height: 20, borderRadius: '50%', background: '#fff',
          transition: 'left .2s', boxShadow: '0 1px 3px rgba(0,0,0,.18)',
        }} />
      </button>
    </div>
  );
}

function AreaChips({ value, onChange }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {AREAS_CHIPS.map(a => {
        const active = value === a;
        return (
          <button key={a} onClick={() => onChange(a)} style={{
            fontSize: 12.5, padding: '7px 14px', borderRadius: 999,
            border: active ? 'none' : '1px solid var(--line)',
            background: active ? 'var(--primary)' : 'var(--surface)',
            color: active ? '#fff' : 'var(--ink-soft)',
            fontWeight: active ? 700 : 600, cursor: 'pointer', fontFamily: 'inherit',
          }}>{a}</button>
        );
      })}
    </div>
  );
}

function Spinner() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '48px 0' }}>
      <div className="animate-spin" style={{
        width: 32, height: 32, border: '3px solid var(--line)',
        borderTopColor: 'var(--primary)', borderRadius: '50%',
      }} />
    </div>
  );
}

// ── Modal compartir historia ──────────────────────────────────────────────────

function ModalCompartirHistoria({ onClose }) {
  const [form, setForm] = useState({ titulo: '', area: 'Artes', contenido: '', carrera: '', institucion: '', anonimo: true });
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState(null);

  async function handleEnviar(e) {
    e.preventDefault();
    setEnviando(true);
    setError(null);
    const res = await crearHistoria(form);
    setEnviando(false);
    if (res.success) setEnviado(true);
    else setError(res.error || 'Error al enviar. Intenta de nuevo.');
  }

  if (enviado) return (
    <Backdrop onClose={onClose}>
      <div style={{
        background: 'var(--surface)', borderRadius: 20, padding: '48px 40px',
        maxWidth: 500, width: '100%', boxShadow: '0 24px 60px rgba(0,0,0,.25)', textAlign: 'center',
      }}>
        <div style={{ fontSize: 44, marginBottom: 16 }}>🌱</div>
        <div className="font-display" style={{ fontWeight: 800, fontSize: 20, marginBottom: 10 }}>
          ¡Gracias por compartir tu historia!
        </div>
        <div style={{ fontSize: 13.5, color: 'var(--ink-soft)', lineHeight: 1.6, marginBottom: 28 }}>
          🛡️ Tu historia pasa por revisión antes de publicarse.<br />En menos de 24h estará visible.
        </div>
        <button onClick={onClose} style={{
          background: 'var(--primary)', color: 'var(--primary-ink)',
          fontWeight: 700, fontSize: 14.5, padding: '13px 32px',
          borderRadius: 999, border: 'none', cursor: 'pointer', fontFamily: 'inherit',
        }}>Perfecto</button>
      </div>
    </Backdrop>
  );

  return (
    <Backdrop onClose={onClose}>
      <form onSubmit={handleEnviar} style={{
        background: 'var(--surface)', borderRadius: 20, padding: '28px 32px',
        maxWidth: 620, width: '100%', boxShadow: '0 24px 60px rgba(0,0,0,.25)',
        display: 'flex', flexDirection: 'column', gap: 16,
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <div style={{ flex: 1 }}>
            <div className="font-display" style={{ fontWeight: 800, fontSize: 22, lineHeight: 1.15 }}>
              Comparte tu historia 🌱
            </div>
            <div style={{ fontSize: 13, color: 'var(--ink-soft)', marginTop: 6 }}>
              Tu experiencia puede orientar a alguien que viene detrás.
            </div>
          </div>
          <button type="button" onClick={onClose} style={{
            width: 34, height: 34, borderRadius: '50%', background: 'var(--surface-2)',
            border: 'none', cursor: 'pointer', fontSize: 16, color: 'var(--ink-soft)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>✕</button>
        </div>

        {[
          { key: 'titulo', label: 'Título', placeholder: '¿Cómo fue tu camino?' },
          { key: 'carrera', label: 'Carrera', placeholder: 'Ej: Diseño Gráfico (opcional)' },
          { key: 'institucion', label: 'Institución', placeholder: 'Ej: U. Nacional (opcional)' },
        ].map(({ key, label, placeholder }) => (
          <div key={key}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-soft)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '.4px' }}>{label}</div>
            <input value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
              placeholder={placeholder} required={key === 'titulo'}
              style={{ width: '100%', boxSizing: 'border-box', background: 'var(--surface-2)', border: '1px solid var(--line)', borderRadius: 11, padding: '11px 14px', fontSize: 14, color: 'var(--ink)', fontFamily: 'inherit', outline: 'none' }} />
          </div>
        ))}

        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-soft)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '.4px' }}>Área</div>
          <AreaChips value={form.area} onChange={a => setForm(f => ({ ...f, area: a }))} />
        </div>

        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-soft)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '.4px' }}>Tu historia</div>
          <textarea value={form.contenido} onChange={e => setForm(f => ({ ...f, contenido: e.target.value }))}
            placeholder="Cuéntanos cómo fue tu proceso…" required rows={5}
            style={{ width: '100%', boxSizing: 'border-box', background: 'var(--surface-2)', border: '1px solid var(--line)', borderRadius: 11, padding: '11px 14px', fontSize: 14, color: 'var(--ink)', fontFamily: 'inherit', resize: 'vertical', outline: 'none', lineHeight: 1.6 }} />
        </div>

        <Toggle value={form.anonimo} onChange={v => setForm(f => ({ ...f, anonimo: v }))} label="Publicar como anónimo · Tu nombre no será visible." />

        {error && <div style={{ fontSize: 12.5, color: '#dc2626', textAlign: 'center' }}>{error}</div>}

        <button type="submit" disabled={enviando} style={{
          background: 'var(--primary)', color: 'var(--primary-ink)', fontWeight: 700,
          fontSize: 15, padding: 14, borderRadius: 999, border: 'none',
          cursor: enviando ? 'wait' : 'pointer', fontFamily: 'inherit', opacity: enviando ? .7 : 1,
        }}>
          {enviando ? 'Enviando…' : 'Enviar historia'}
        </button>
        <div style={{ textAlign: 'center', fontSize: 11.5, color: 'var(--ink-soft)' }}>
          🛡️ Tu historia pasa por revisión antes de publicarse.
        </div>
      </form>
    </Backdrop>
  );
}

// ── Modal hacer pregunta ──────────────────────────────────────────────────────

function ModalHacerPregunta({ onClose, onPublicada }) {
  const [form, setForm] = useState({ titulo: '', area: 'Tecnología', anonimo: false });
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState(null);

  async function handleEnviar(e) {
    e.preventDefault();
    setEnviando(true);
    setError(null);
    const res = await crearPregunta(form);
    setEnviando(false);
    if (res.success) { setEnviado(true); onPublicada?.(); }
    else setError(res.error || 'Error al publicar. Intenta de nuevo.');
  }

  if (enviado) return (
    <Backdrop onClose={onClose}>
      <div style={{
        background: 'var(--surface)', borderRadius: 20, padding: '48px 40px',
        maxWidth: 500, width: '100%', boxShadow: '0 24px 60px rgba(0,0,0,.25)', textAlign: 'center',
      }}>
        <div style={{ fontSize: 44, marginBottom: 16 }}>⚡</div>
        <div className="font-display" style={{ fontWeight: 800, fontSize: 20, marginBottom: 10 }}>
          ¡Pregunta publicada!
        </div>
        <div style={{ fontSize: 13.5, color: 'var(--ink-soft)', lineHeight: 1.6, marginBottom: 28 }}>
          La comunidad responde en menos de 24h.
        </div>
        <button onClick={onClose} style={{
          background: 'var(--primary)', color: 'var(--primary-ink)',
          fontWeight: 700, fontSize: 14.5, padding: '13px 32px',
          borderRadius: 999, border: 'none', cursor: 'pointer', fontFamily: 'inherit',
        }}>Ver comunidad</button>
      </div>
    </Backdrop>
  );

  return (
    <Backdrop onClose={onClose}>
      <form onSubmit={handleEnviar} style={{
        background: 'var(--surface)', borderRadius: 20, padding: '28px 32px',
        maxWidth: 560, width: '100%', boxShadow: '0 24px 60px rgba(0,0,0,.25)',
        display: 'flex', flexDirection: 'column', gap: 16,
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <div style={{ flex: 1 }}>
            <div className="font-display" style={{ fontWeight: 800, fontSize: 22, lineHeight: 1.15 }}>
              Hazle una pregunta a la comunidad
            </div>
            <div style={{ fontSize: 13, color: 'var(--ink-soft)', marginTop: 6 }}>Miles de estudiantes pasaron por lo mismo.</div>
          </div>
          <button type="button" onClick={onClose} style={{
            width: 34, height: 34, borderRadius: '50%', background: 'var(--surface-2)',
            border: 'none', cursor: 'pointer', fontSize: 16, color: 'var(--ink-soft)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>✕</button>
        </div>

        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-soft)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '.4px' }}>Tu pregunta</div>
          <textarea value={form.titulo} onChange={e => setForm(f => ({ ...f, titulo: e.target.value }))}
            placeholder="¿Qué quieres saber?" required rows={3}
            style={{ width: '100%', boxSizing: 'border-box', background: 'var(--surface-2)', border: '1px solid var(--line)', borderRadius: 11, padding: '11px 14px', fontSize: 14, color: 'var(--ink)', fontFamily: 'inherit', resize: 'vertical', outline: 'none', lineHeight: 1.6 }} />
        </div>

        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-soft)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '.4px' }}>Área</div>
          <AreaChips value={form.area} onChange={a => setForm(f => ({ ...f, area: a }))} />
        </div>

        <Toggle value={form.anonimo} onChange={v => setForm(f => ({ ...f, anonimo: v }))} label="Publicar como anónimo." />

        {error && <div style={{ fontSize: 12.5, color: '#dc2626', textAlign: 'center' }}>{error}</div>}

        <button type="submit" disabled={enviando} style={{
          background: 'var(--primary)', color: 'var(--primary-ink)', fontWeight: 700,
          fontSize: 15, padding: 14, borderRadius: 999, border: 'none',
          cursor: enviando ? 'wait' : 'pointer', fontFamily: 'inherit', opacity: enviando ? .7 : 1,
        }}>
          {enviando ? 'Publicando…' : 'Publicar pregunta'}
        </button>
      </form>
    </Backdrop>
  );
}

// ── Tabs de contenido ─────────────────────────────────────────────────────────

function Foros({ data, cargando, onEntrar }) {
  if (cargando) return <Spinner />;
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
      {data.map(f => (
        <div key={f.id} onClick={() => onEntrar(f)} style={{
          background: 'var(--surface)', border: '1px solid var(--line)',
          borderRadius: 14, padding: 20, cursor: 'pointer', transition: 'all .15s',
        }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.transform = ''; }}
        >
          <div style={{ fontSize: 30 }}>{f.icon}</div>
          <div className="font-display" style={{ fontWeight: 700, fontSize: 15.5, marginTop: 10, lineHeight: 1.25 }}>
            {f.nombre}
          </div>
          <div style={{ fontSize: 12.5, color: 'var(--ink-soft)', marginTop: 4 }}>
            {f.posts} posts activos
          </div>
          <div style={{
            display: 'inline-flex', marginTop: 14,
            background: 'var(--primary-soft)', color: 'var(--primary-deep)',
            fontWeight: 700, fontSize: 13, padding: '8px 14px', borderRadius: 9,
          }}>
            Entrar →
          </div>
        </div>
      ))}
      {!cargando && data.length === 0 && (
        <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px 0', color: 'var(--ink-soft)' }}>
          No hay foros disponibles aún.
        </div>
      )}
    </div>
  );
}

function Historias({ data, cargando, onCompartir, onLeer }) {
  if (cargando) return <Spinner />;
  return (
    <>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'var(--surface)', border: '1px solid var(--line)',
        borderRadius: 12, padding: '14px 18px', marginBottom: 14,
      }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: 14.5 }}>¿Tu camino dio un giro? 🌱</div>
          <div style={{ fontSize: 12.5, color: 'var(--ink-soft)', marginTop: 2 }}>
            Tu experiencia puede orientar a alguien más.
          </div>
        </div>
        <button onClick={onCompartir} style={{
          background: 'var(--primary)', color: 'var(--primary-ink)',
          fontWeight: 700, fontSize: 13.5, padding: '10px 18px',
          borderRadius: 10, border: 'none', cursor: 'pointer',
          whiteSpace: 'nowrap', fontFamily: 'inherit', boxShadow: '0 4px 14px var(--primary-glow)',
        }}>+ Compartir tu historia</button>
      </div>

      {data.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--ink-soft)' }}>
          <div style={{ fontSize: 34, marginBottom: 12 }}>✍️</div>
          <div style={{ fontWeight: 700, fontSize: 15 }}>Sé el primero en compartir tu historia.</div>
          <div style={{ fontSize: 13, marginTop: 6 }}>Tu experiencia puede orientar a alguien más.</div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          {data.map(h => (
            <div key={h.id} style={{
              background: 'var(--surface)', border: '1px solid var(--line)',
              borderRadius: 12, padding: 18, display: 'flex', flexDirection: 'column',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                <span style={{
                  width: 42, height: 42, borderRadius: '50%',
                  background: avatarColor(h.ini), color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 800, fontSize: 16, flexShrink: 0,
                }}>{h.ini}</span>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{h.name}</div>
                  <div style={{ fontSize: 11.5, color: 'var(--ink-soft)' }}>
                    {h.carrera}{h.carrera && h.inst ? ' · ' : ''}{h.inst}
                  </div>
                </div>
              </div>
              <div className="font-display" style={{ fontWeight: 800, fontSize: 16, marginTop: 13, lineHeight: 1.25, letterSpacing: '-.2px' }}>
                {h.title}
              </div>
              <div style={{ fontSize: 13, color: 'var(--ink-soft)', marginTop: 7, lineHeight: 1.5 }}>
                {h.excerpt}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 13 }}>
                <span style={{ background: 'var(--primary-soft)', color: 'var(--primary-deep)', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 999 }}>
                  {h.tag}
                </span>
                <span style={{ fontSize: 12, color: 'var(--ink-soft)' }}>❤️ {h.likes}</span>
                <span style={{ fontSize: 12, color: 'var(--ink-soft)' }}>· {h.date}</span>
              </div>
              <div style={{ flex: 1 }} />
              <div onClick={() => onLeer(h)} style={{ color: 'var(--primary)', fontWeight: 700, fontSize: 13.5, marginTop: 14, cursor: 'pointer' }}>
                Leer historia →
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

function Preguntas({ data, cargando, onPreguntar, onPreguntaClick }) {
  if (cargando) return <Spinner />;
  return (
    <>
      <div style={{
        display: 'flex', gap: 10, background: 'var(--surface)',
        border: '1px solid var(--line)', borderRadius: 12, padding: 13, marginBottom: 14,
      }}>
        <div onClick={onPreguntar} style={{
          flex: 1, background: 'var(--surface-2)', border: '1px solid var(--line)',
          borderRadius: 10, padding: '12px 15px', fontSize: 13.5, color: 'var(--ink-soft)', cursor: 'text',
        }}>
          ¿Tienes una duda? Pregúntale a la comunidad…
        </div>
        <button onClick={onPreguntar} style={{
          background: 'var(--primary)', color: 'var(--primary-ink)',
          fontWeight: 700, fontSize: 13.5, padding: '0 20px',
          borderRadius: 10, border: 'none', cursor: 'pointer',
          whiteSpace: 'nowrap', fontFamily: 'inherit',
        }}>Preguntar</button>
      </div>

      {data.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--ink-soft)' }}>
          <div style={{ fontSize: 34, marginBottom: 12 }}>💬</div>
          <div style={{ fontWeight: 700, fontSize: 15 }}>No hay preguntas aún.</div>
          <div style={{ fontSize: 13, marginTop: 6 }}>¡Sé el primero en preguntar!</div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
          {data.map(q => (
            <div key={q.id} style={{
              background: 'var(--surface)', border: '1px solid var(--line)',
              borderRadius: 12, padding: '16px 18px', cursor: 'pointer', transition: 'border-color .15s',
            }}
              onClick={() => onPreguntaClick(q)}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--primary)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--line)'}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{
                  width: 34, height: 34, borderRadius: '50%',
                  background: avatarColor(q.ini), color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 800, fontSize: 13, flexShrink: 0,
                }}>{q.ini}</span>
                <span style={{ fontSize: 13, fontWeight: 700 }}>{q.name}</span>
                <span style={{ fontSize: 12, color: 'var(--ink-soft)' }}>· {q.time}</span>
                {q.resolved && (
                  <span style={{
                    marginLeft: 'auto', background: 'var(--primary-soft)',
                    color: 'var(--primary-deep)', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 999,
                  }}>Resuelta ✓</span>
                )}
              </div>
              <div style={{ fontWeight: 700, fontSize: 15, marginTop: 11, lineHeight: 1.3 }}>
                {q.title}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 11 }}>
                <span style={{ background: 'var(--surface-2)', color: 'var(--ink-soft)', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 999 }}>
                  {q.area}
                </span>
                <span style={{ fontSize: 12.5, color: 'var(--ink-soft)' }}>💬 {q.answers} respuestas</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

function Convocatorias({ data, cargando, onVerMas }) {
  const [filtroActivo, setFiltroActivo] = useState('Todas');
  if (cargando) return <Spinner />;

  const filtradas = filtroActivo === 'Todas' ? data : data.filter(c => c.type === filtroActivo);

  return (
    <>
      <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
        {CONV_FILTERS.map(f => {
          const active = filtroActivo === f;
          return (
            <button key={f} onClick={() => setFiltroActivo(f)} style={{
              fontSize: 12.5, fontWeight: active ? 700 : 600, padding: '8px 15px', borderRadius: 999,
              border: active ? 'none' : '1px solid var(--line)',
              background: active ? 'var(--primary)' : 'var(--surface)',
              color: active ? 'var(--primary-ink)' : 'var(--ink-soft)',
              cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap',
            }}>{f}</button>
          );
        })}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {filtradas.map(c => {
          const { color = '#16A34A', bg = '#dcfce7' } = TIPO_COLOR[c.type] ?? {};
          return (
            <div key={c.id} style={{
              background: 'var(--surface)', border: '1px solid var(--line)',
              borderRadius: 12, padding: '16px 18px', borderLeft: `4px solid ${color}`,
              display: 'flex', alignItems: 'center', gap: 14,
            }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 9, flexWrap: 'wrap' }}>
                  <span style={{ background: bg, color, fontSize: 11, fontWeight: 800, padding: '3px 10px', borderRadius: 999, textTransform: 'uppercase', letterSpacing: '.4px' }}>
                    {c.type}
                  </span>
                  <span style={{ fontSize: 11.5, fontWeight: c.days < 7 ? 800 : 600, color: c.days < 7 ? '#dc2626' : 'var(--ink-soft)' }}>
                    ⏳ Cierra en {c.days} días
                  </span>
                </div>
                <div className="font-display" style={{ fontWeight: 700, fontSize: 15.5, marginTop: 9, lineHeight: 1.25 }}>
                  {c.title}
                </div>
                <div style={{ fontSize: 12.5, color: 'var(--ink-soft)', marginTop: 4 }}>
                  🏛️ {c.inst} · 📍 {c.city}
                </div>
              </div>
              <button onClick={() => onVerMas(c)} style={{
                background: 'var(--primary-soft)', color: 'var(--primary-deep)',
                fontWeight: 700, fontSize: 13, padding: '9px 15px',
                borderRadius: 9, border: 'none', cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'inherit',
              }}>Ver más →</button>
            </div>
          );
        })}
        {filtradas.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--ink-soft)' }}>
            <div style={{ fontSize: 32, marginBottom: 10 }}>📭</div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>No hay convocatorias en esta categoría.</div>
          </div>
        )}
      </div>
    </>
  );
}

function Sidebar({ preguntas, convocatorias }) {
  const sinRespuesta = preguntas.filter(p => p.answers === 0).slice(0, 3);
  const proximas     = convocatorias.filter(c => c.days <= 7).slice(0, 3);

  return (
    <div style={{ width: 300, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 12, padding: 16 }}>
        <div className="font-display" style={{ fontWeight: 800, fontSize: 14 }}>
          Preguntas sin respuesta
        </div>
        {sinRespuesta.length === 0 ? (
          <div style={{ fontSize: 12.5, color: 'var(--ink-soft)', marginTop: 10 }}>
            Todas las preguntas tienen respuesta 🎉
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 11, marginTop: 12 }}>
            {sinRespuesta.map(u => (
              <div key={u.id} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 600, lineHeight: 1.3 }}>{u.title}</div>
                  <div style={{ fontSize: 11, color: 'var(--ink-soft)', marginTop: 2 }}>{u.area}</div>
                </div>
                <button style={{
                  background: 'var(--primary-soft)', color: 'var(--primary-deep)',
                  fontSize: 11.5, fontWeight: 700, padding: '6px 11px',
                  borderRadius: 8, border: 'none', cursor: 'pointer',
                  whiteSpace: 'nowrap', fontFamily: 'inherit',
                }}>Responder</button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 12, padding: 16 }}>
        <div className="font-display" style={{ fontWeight: 800, fontSize: 14 }}>
          Próximas a cerrar
        </div>
        {proximas.length === 0 ? (
          <div style={{ fontSize: 12.5, color: 'var(--ink-soft)', marginTop: 10 }}>
            No hay convocatorias urgentes.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 11, marginTop: 12 }}>
            {proximas.map(c => {
              const { color = '#16A34A', bg = '#dcfce7' } = TIPO_COLOR[c.type] ?? {};
              return (
                <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{
                    width: 38, height: 38, borderRadius: 10, background: bg, color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexDirection: 'column', fontWeight: 800, fontSize: 14, flexShrink: 0, lineHeight: 1,
                  }}>
                    {c.days}<span style={{ fontSize: 8, fontWeight: 600 }}>días</span>
                  </span>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 12.5, fontWeight: 600, lineHeight: 1.3 }}>{c.title}</div>
                    <div style={{ fontSize: 11, color: 'var(--ink-soft)', marginTop: 2 }}>{c.inst}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div style={{ background: 'linear-gradient(135deg, var(--primary-deep), var(--primary))', borderRadius: 12, padding: 16, color: '#fff' }}>
        <div style={{ fontSize: 11, fontWeight: 700, opacity: .85, textTransform: 'uppercase', letterSpacing: '.5px' }}>
          ⭐ Consejo
        </div>
        <div className="font-display" style={{ fontWeight: 800, fontSize: 15, marginTop: 9, lineHeight: 1.25 }}>
          El primer paso siempre es explorar
        </div>
        <div style={{ fontSize: 12.5, opacity: .92, marginTop: 7, lineHeight: 1.5 }}>
          No tienes que saberlo todo hoy. Cada pregunta que haces es un paso hacia tu camino.
        </div>
      </div>
    </div>
  );
}

// ── Página principal ──────────────────────────────────────────────────────────

const TABS = [
  { key: 'foros',         label: 'Foros'            },
  { key: 'historias',     label: 'Historias reales'  },
  { key: 'preguntas',     label: 'Preguntas'         },
  { key: 'convocatorias', label: 'Convocatorias'     },
];

export default function Comunidad() {
  const [tabActiva, setTabActiva]         = useState('foros');
  const [modalHistoria, setModalHistoria] = useState(false);
  const [modalPregunta, setModalPregunta] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const [foros,         setForos]         = useState([]);
  const [historias,     setHistorias]     = useState([]);
  const [preguntas,     setPreguntas]     = useState([]);
  const [convocatorias, setConvocatorias] = useState([]);
  const [cargando,      setCargando]      = useState({
    foros: true, historias: true, preguntas: true, convocatorias: true,
  });

  const cargar = useCallback(async () => {
    const [rf, rh, rp, rc] = await Promise.all([
      getForos(), getHistorias(), getPreguntas(), getConvocatorias(),
    ]);
    if (rf.success) setForos(rf.data ?? []);
    if (rh.success) setHistorias(rh.data ?? []);
    if (rp.success) setPreguntas(rp.data ?? []);
    if (rc.success) setConvocatorias(rc.data ?? []);
    setCargando({ foros: false, historias: false, preguntas: false, convocatorias: false });
  }, []);

  useEffect(() => { cargar(); }, [cargar]);

  useEffect(() => {
    if (location.state?.resetAt) {
      setTabActiva('foros');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.state?.resetAt]);

  function handleFAB() {
    if (tabActiva === 'historias') setModalHistoria(true);
    else setModalPregunta(true);
  }

  const fabLabel = tabActiva === 'convocatorias' ? null : tabActiva === 'historias' ? '✍️' : '+';

  return (
    <DashboardLayout>
      <div style={{ padding: '22px 28px 0', background: 'var(--bg)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
          <div className="font-display" style={{ fontWeight: 800, fontSize: 26, letterSpacing: '-.6px', margin: 0 }}>
            Comunidad
          </div>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'var(--primary-soft)', color: 'var(--primary-deep)',
            fontSize: 12.5, fontWeight: 700, padding: '6px 13px', borderRadius: 999,
          }}>🌱 Espacio para crecer juntos</span>
        </div>
        <div style={{ fontSize: 13.5, color: 'var(--ink-soft)', marginTop: 7, maxWidth: 560, lineHeight: 1.5 }}>
          Aquí, otros estudiantes ya encontraron su camino. El tuyo también está aquí.
        </div>
        <div style={{
          position: 'sticky', top: 66, zIndex: 5,
          display: 'flex', gap: 6, marginTop: 18, padding: '10px 0',
          background: 'var(--bg)', overflowX: 'auto',
        }}>
          {TABS.map(t => {
            const active = tabActiva === t.key;
            return (
              <button key={t.key} onClick={() => setTabActiva(t.key)} style={{
                fontSize: 13.5, fontWeight: active ? 700 : 600,
                padding: '9px 16px', borderRadius: 999, whiteSpace: 'nowrap',
                border: active ? 'none' : '1px solid var(--line)',
                background: active ? 'var(--primary)' : 'var(--surface)',
                color: active ? 'var(--primary-ink)' : 'var(--ink-soft)',
                cursor: 'pointer', fontFamily: 'inherit', transition: 'all .15s',
              }}>{t.label}</button>
            );
          })}
        </div>
      </div>

      <div style={{
        display: 'flex', gap: 22, padding: '8px 28px 40px',
        alignItems: 'flex-start', background: 'var(--bg)', minHeight: 'calc(100vh - 200px)',
      }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          {tabActiva === 'foros' && (
            <Foros data={foros} cargando={cargando.foros}
              onEntrar={f => navigate(`/dashboard/comunidad/foro/${f.id}`, { state: { foro: f } })}
            />
          )}
          {tabActiva === 'historias' && (
            <Historias data={historias} cargando={cargando.historias}
              onCompartir={() => setModalHistoria(true)}
              onLeer={h => navigate(`/dashboard/comunidad/historia/${h.id}`, { state: { historia: h } })}
            />
          )}
          {tabActiva === 'preguntas' && (
            <Preguntas data={preguntas} cargando={cargando.preguntas}
              onPreguntar={() => setModalPregunta(true)}
              onPreguntaClick={q => navigate(`/dashboard/comunidad/post/${q.id}`, { state: { post: q, tipo: 'pregunta' } })}
            />
          )}
          {tabActiva === 'convocatorias' && (
            <Convocatorias data={convocatorias} cargando={cargando.convocatorias}
              onVerMas={c => navigate(`/dashboard/comunidad/convocatoria/${c.id}`, { state: { conv: c } })}
            />
          )}
        </div>
        <Sidebar preguntas={preguntas} convocatorias={convocatorias} />
      </div>

      {fabLabel && (
        <button onClick={handleFAB} style={{
          position: 'fixed', bottom: 24, right: 24,
          width: 56, height: 56, borderRadius: '50%',
          background: 'var(--primary)', color: 'var(--primary-ink)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 24, fontWeight: 700, cursor: 'pointer',
          boxShadow: '0 10px 26px var(--primary-glow)', zIndex: 40,
          border: 'none', fontFamily: 'inherit',
        }}>{fabLabel}</button>
      )}

      {modalHistoria && <ModalCompartirHistoria onClose={() => setModalHistoria(false)} />}
      {modalPregunta && (
        <ModalHacerPregunta
          onClose={() => setModalPregunta(false)}
          onPublicada={() => getPreguntas().then(r => r.success && setPreguntas(r.data ?? []))}
        />
      )}
    </DashboardLayout>
  );
}
