import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/Layout/DashboardLayout';

// ── Datos estáticos (reemplazar por API en siguiente iteración) ───────────────

const FOROS = [
  { id: 'tecnologia', icon: '💻', name: 'Tecnología e informática',    posts: 128, siguiendo: 1204 },
  { id: 'salud',      icon: '🩺', name: 'Salud y ciencias de la vida', posts: 94,  siguiendo: 876  },
  { id: 'negocios',   icon: '📊', name: 'Negocios y economía',          posts: 76,  siguiendo: 654  },
  { id: 'artes',      icon: '🎨', name: 'Artes y humanidades',          posts: 112, siguiendo: 931  },
  { id: 'educacion',  icon: '📚', name: 'Educación y pedagogía',        posts: 58,  siguiendo: 421  },
  { id: 'ambiente',   icon: '🌿', name: 'Ambiente y sostenibilidad',    posts: 41,  siguiendo: 318  },
];

const AV_COLORS = ['#16A34A', '#2563eb', '#db2777', '#d97706', '#7c3aed', '#0891b2'];

const HISTORIAS = [
  { id: 'h1', ini: 'V', av: AV_COLORS[2], name: 'Valentina R.', carrera: 'Diseño Gráfico',    inst: 'U. Nacional',   title: 'Por qué cambié de ingeniería a diseño',          excerpt: 'Pasé dos semestres en civil hasta que entendí que lo mío era crear, no calcular.',              tag: 'Artes',       likes: 214, date: 'hace 2 días'     },
  { id: 'h2', ini: 'S', av: AV_COLORS[0], name: 'Santiago M.',  carrera: 'Enfermería',         inst: 'U. El Bosque',  title: 'El test me mostró algo que yo ya sabía',          excerpt: 'Tenía miedo de decir que quería cuidar personas. La comunidad me dio el empujón.',              tag: 'Salud',       likes: 176, date: 'hace 4 días'     },
  { id: 'h3', ini: 'L', av: AV_COLORS[1], name: 'Laura G.',     carrera: 'Economía',           inst: 'U. Externado',  title: 'De no saber nada a tener un plan a 5 años',      excerpt: 'No tenía idea de qué estudiar. Empecé por explorar áreas, no carreras.',                      tag: 'Negocios',    likes: 143, date: 'hace 5 días'     },
  { id: 'h4', ini: 'J', av: AV_COLORS[3], name: 'Juan D.',      carrera: 'Tec. en Software',   inst: 'SENA',          title: 'Elegí el SENA y no me arrepiento',               excerpt: 'Todos me decían universidad. Hoy trabajo y estudio. Fue mi mejor decisión.',                  tag: 'Tecnología',  likes: 298, date: 'hace 1 semana'   },
  { id: 'h5', ini: 'M', av: AV_COLORS[4], name: 'Mariana T.',   carrera: 'Lic. en Biología',   inst: 'U. Pedagógica', title: 'Descubrí que enseñar también es ciencia',        excerpt: 'Creía que ser profe era "el plan B". Ahora sé que es vocación pura.',                         tag: 'Educación',   likes: 121, date: 'hace 1 semana'   },
  { id: 'h6', ini: 'C', av: AV_COLORS[5], name: 'Camilo P.',    carrera: 'Ing. Ambiental',     inst: 'U. Distrital',  title: 'Mi barrio inundado me dio una carrera',          excerpt: 'Quería resolver algo real de mi ciudad. Eso le dio sentido a todo.',                          tag: 'Ambiente',    likes: 187, date: 'hace 2 semanas'  },
];

const PREGUNTAS = [
  { id: 'p1', ini: 'A', av: AV_COLORS[1], name: 'Anónimo',     time: 'hace 1 h',   title: '¿Vale la pena estudiar una carrera técnica antes de la universidad?',        area: 'Tecnología', answers: 7,  resolved: true  },
  { id: 'p2', ini: 'D', av: AV_COLORS[0], name: 'Daniela O.',  time: 'hace 3 h',   title: '¿Qué puntaje del ICFES necesito para Medicina en pública?',                  area: 'Salud',      answers: 12, resolved: true  },
  { id: 'p3', ini: 'A', av: AV_COLORS[3], name: 'Anónimo',     time: 'hace 6 h',   title: 'Me gustan el arte y las matemáticas a la vez. ¿Qué carreras mezclan eso?',   area: 'Artes',      answers: 4,  resolved: false },
  { id: 'p4', ini: 'F', av: AV_COLORS[4], name: 'Felipe N.',   time: 'hace 1 día', title: '¿Cómo aplico a una beca si mi familia no tiene cómo pagar matrícula?',       area: 'Becas',      answers: 9,  resolved: false },
  { id: 'p5', ini: 'A', av: AV_COLORS[5], name: 'Anónimo',     time: 'hace 2 días',title: '¿Es muy difícil cambiarse de carrera en segundo semestre?',                  area: 'General',    answers: 5,  resolved: false },
];

const CONV_FILTERS = ['Todas', 'Becas', 'Admisiones', 'Eventos', 'SENA'];

const CONVOCATORIAS = [
  { id: 'c1', type: 'Beca',     color: '#16A34A', bg: '#dcfce7', title: "Beca Saber Pa' Pilo — matrícula completa",   inst: 'ICETEX',             city: 'Nacional', days: 4  },
  { id: 'c2', type: 'Admisión', color: '#2563eb', bg: '#dbeafe', title: 'Inscripciones pregrado 2026-2',               inst: 'U. Nacional',        city: 'Bogotá',   days: 12 },
  { id: 'c3', type: 'SENA',     color: '#d97706', bg: '#fef3c7', title: 'Tecnólogo en Análisis de Datos',              inst: 'SENA',               city: 'Bogotá',   days: 6  },
  { id: 'c4', type: 'Evento',   color: '#7c3aed', bg: '#ede9fe', title: 'Feria de universidades — entrada libre',       inst: 'Corferias',          city: 'Bogotá',   days: 19 },
  { id: 'c5', type: 'Beca',     color: '#16A34A', bg: '#dcfce7', title: 'Jóvenes en Acción — apoyo de sostenimiento',  inst: 'Prosperidad Social', city: 'Nacional', days: 3  },
];

const UNANSWERED = [
  { title: '¿Diseño industrial o arquitectura?',              area: 'Artes y humanidades' },
  { title: '¿Sirve un técnico del SENA para luego validar la U?', area: 'Tecnología'     },
  { title: '¿Qué hago si me arrepentí de mi carrera?',        area: 'General'            },
];

const CLOSING = [
  { days: 3, title: 'Jóvenes en Acción',   inst: 'Prosperidad Social', color: '#16A34A', bg: '#dcfce7' },
  { days: 4, title: "Beca Saber Pa' Pilo", inst: 'ICETEX',             color: '#16A34A', bg: '#dcfce7' },
];

const AREAS = ['Tecnología', 'Salud', 'Negocios', 'Artes', 'Educación', 'Ambiente'];

// ── Modales ──────────────────────────────────────────────────────────────────

function Backdrop({ onClose, children }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 50,
        background: 'rgba(15,31,20,.32)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 20,
      }}
    >
      <div onClick={e => e.stopPropagation()}>{children}</div>
    </div>
  );
}

function Toggle({ value, onChange, label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
      <span style={{ fontSize: 13.5, color: 'var(--ink-soft)', flex: 1 }}>{label}</span>
      <button
        onClick={() => onChange(!value)}
        style={{
          width: 44, height: 26, borderRadius: 999,
          background: value ? 'var(--primary)' : 'var(--surface-2)',
          border: 'none', cursor: 'pointer', position: 'relative',
          transition: 'background .2s', flexShrink: 0,
        }}
      >
        <span style={{
          position: 'absolute', top: 3,
          left: value ? 'calc(100% - 22px)' : 3,
          width: 20, height: 20, borderRadius: '50%',
          background: '#fff', transition: 'left .2s',
          boxShadow: '0 1px 3px rgba(0,0,0,.18)',
        }} />
      </button>
    </div>
  );
}

function AreaChips({ value, onChange }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {AREAS.map(a => {
        const active = value === a;
        return (
          <button key={a} onClick={() => onChange(a)} style={{
            fontSize: 12.5, padding: '7px 14px', borderRadius: 999,
            border: active ? 'none' : '1px solid var(--line)',
            background: active ? 'var(--primary)' : 'var(--surface)',
            color: active ? '#fff' : 'var(--ink-soft)',
            fontWeight: active ? 700 : 600,
            cursor: 'pointer', fontFamily: 'inherit', transition: 'all .15s',
          }}>{a}</button>
        );
      })}
    </div>
  );
}

function ModalCompartirHistoria({ onClose }) {
  const [form, setForm] = useState({ titulo: '', area: 'Artes', historia: '', anonimo: true });
  const [enviado, setEnviado] = useState(false);

  function handleEnviar(e) {
    e.preventDefault();
    setEnviado(true);
  }

  if (enviado) {
    return (
      <Backdrop onClose={onClose}>
        <div style={{
          background: 'var(--surface)', borderRadius: 20,
          padding: '48px 40px', maxWidth: 500, width: '100%',
          boxShadow: '0 24px 60px rgba(0,0,0,.25)', textAlign: 'center',
        }}>
          <div style={{ fontSize: 44, marginBottom: 16 }}>🌱</div>
          <div className="font-display" style={{ fontWeight: 800, fontSize: 20, letterSpacing: '-.4px', marginBottom: 10 }}>
            ¡Gracias por compartir tu historia!
          </div>
          <div style={{ fontSize: 13.5, color: 'var(--ink-soft)', lineHeight: 1.6, marginBottom: 28 }}>
            🛡️ Tu historia pasa por revisión antes de publicarse.<br />
            En menos de 24h estará visible para la comunidad.
          </div>
          <button onClick={onClose} style={{
            background: 'var(--primary)', color: 'var(--primary-ink)',
            fontWeight: 700, fontSize: 14.5, padding: '13px 32px',
            borderRadius: 999, border: 'none', cursor: 'pointer',
            fontFamily: 'inherit', boxShadow: '0 8px 20px var(--primary-glow)',
          }}>
            Perfecto
          </button>
        </div>
      </Backdrop>
    );
  }

  return (
    <Backdrop onClose={onClose}>
      <form onSubmit={handleEnviar} style={{
        background: 'var(--surface)', borderRadius: 20,
        padding: '28px 32px', maxWidth: 620, width: '100%',
        boxShadow: '0 24px 60px rgba(0,0,0,.25)',
        display: 'flex', flexDirection: 'column', gap: 18,
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <div style={{ flex: 1 }}>
            <div className="font-display" style={{ fontWeight: 800, fontSize: 22, letterSpacing: '-.4px', lineHeight: 1.15 }}>
              Comparte tu historia 🌱
            </div>
            <div style={{ fontSize: 13, color: 'var(--ink-soft)', marginTop: 6, lineHeight: 1.5 }}>
              Tu experiencia puede orientar a alguien que viene detrás.
            </div>
          </div>
          <button type="button" onClick={onClose} style={{
            width: 34, height: 34, borderRadius: '50%',
            background: 'var(--surface-2)', border: 'none',
            cursor: 'pointer', fontSize: 16, color: 'var(--ink-soft)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>✕</button>
        </div>

        {/* Título */}
        <div>
          <div style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--ink-soft)', marginBottom: 7, textTransform: 'uppercase', letterSpacing: '.4px' }}>
            Título
          </div>
          <input
            value={form.titulo}
            onChange={e => setForm(f => ({ ...f, titulo: e.target.value }))}
            placeholder="¿Cómo fue tu camino?"
            required
            style={{
              width: '100%', boxSizing: 'border-box',
              background: 'var(--surface-2)', border: '1px solid var(--line)',
              borderRadius: 11, padding: '12px 14px',
              fontSize: 14, color: 'var(--ink)', fontFamily: 'inherit',
              outline: 'none',
            }}
          />
        </div>

        {/* Área */}
        <div>
          <div style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--ink-soft)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '.4px' }}>
            Área
          </div>
          <AreaChips value={form.area} onChange={a => setForm(f => ({ ...f, area: a }))} />
        </div>

        {/* Historia */}
        <div>
          <div style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--ink-soft)', marginBottom: 7, textTransform: 'uppercase', letterSpacing: '.4px' }}>
            Tu historia
          </div>
          <textarea
            value={form.historia}
            onChange={e => setForm(f => ({ ...f, historia: e.target.value }))}
            placeholder="Cuéntanos cómo fue tu proceso de elección de carrera, qué dudas tuviste, cómo las resolviste y qué aprendiste en el camino…"
            required
            rows={5}
            style={{
              width: '100%', boxSizing: 'border-box',
              background: 'var(--surface-2)', border: '1px solid var(--line)',
              borderRadius: 11, padding: '12px 14px',
              fontSize: 14, color: 'var(--ink)', fontFamily: 'inherit',
              resize: 'vertical', outline: 'none', lineHeight: 1.6,
            }}
          />
        </div>

        {/* Toggle anónimo */}
        <Toggle
          value={form.anonimo}
          onChange={v => setForm(f => ({ ...f, anonimo: v }))}
          label="Publicar como anónimo · Tu nombre no será visible."
        />

        {/* CTA */}
        <button type="submit" style={{
          background: 'var(--primary)', color: 'var(--primary-ink)',
          fontWeight: 700, fontSize: 15, padding: '14px',
          borderRadius: 999, border: 'none', cursor: 'pointer',
          fontFamily: 'inherit', boxShadow: '0 8px 20px var(--primary-glow)',
          transition: 'background .15s',
        }}>
          Enviar historia
        </button>

        <div style={{ textAlign: 'center', fontSize: 11.5, color: 'var(--ink-soft)' }}>
          🛡️ Tu historia pasa por revisión antes de publicarse.
        </div>
      </form>
    </Backdrop>
  );
}

function ModalHacerPregunta({ onClose }) {
  const [form, setForm] = useState({ pregunta: '', area: 'Tecnología', anonimo: false });
  const [enviado, setEnviado] = useState(false);

  function handleEnviar(e) {
    e.preventDefault();
    setEnviado(true);
  }

  if (enviado) {
    return (
      <Backdrop onClose={onClose}>
        <div style={{
          background: 'var(--surface)', borderRadius: 20,
          padding: '48px 40px', maxWidth: 500, width: '100%',
          boxShadow: '0 24px 60px rgba(0,0,0,.25)', textAlign: 'center',
        }}>
          <div style={{ fontSize: 44, marginBottom: 16 }}>⚡</div>
          <div className="font-display" style={{ fontWeight: 800, fontSize: 20, letterSpacing: '-.4px', marginBottom: 10 }}>
            ¡Pregunta publicada!
          </div>
          <div style={{ fontSize: 13.5, color: 'var(--ink-soft)', lineHeight: 1.6, marginBottom: 28 }}>
            La comunidad responde en menos de 24h.
          </div>
          <button onClick={onClose} style={{
            background: 'var(--primary)', color: 'var(--primary-ink)',
            fontWeight: 700, fontSize: 14.5, padding: '13px 32px',
            borderRadius: 999, border: 'none', cursor: 'pointer',
            fontFamily: 'inherit', boxShadow: '0 8px 20px var(--primary-glow)',
          }}>
            Ver mis preguntas
          </button>
        </div>
      </Backdrop>
    );
  }

  return (
    <Backdrop onClose={onClose}>
      <form onSubmit={handleEnviar} style={{
        background: 'var(--surface)', borderRadius: 20,
        padding: '28px 32px', maxWidth: 560, width: '100%',
        boxShadow: '0 24px 60px rgba(0,0,0,.25)',
        display: 'flex', flexDirection: 'column', gap: 18,
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <div style={{ flex: 1 }}>
            <div className="font-display" style={{ fontWeight: 800, fontSize: 22, letterSpacing: '-.4px', lineHeight: 1.15 }}>
              Hazle una pregunta a la comunidad
            </div>
            <div style={{ fontSize: 13, color: 'var(--ink-soft)', marginTop: 6, lineHeight: 1.5 }}>
              Miles de estudiantes pasaron por lo mismo.
            </div>
          </div>
          <button type="button" onClick={onClose} style={{
            width: 34, height: 34, borderRadius: '50%',
            background: 'var(--surface-2)', border: 'none',
            cursor: 'pointer', fontSize: 16, color: 'var(--ink-soft)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>✕</button>
        </div>

        {/* Pregunta */}
        <div>
          <div style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--ink-soft)', marginBottom: 7, textTransform: 'uppercase', letterSpacing: '.4px' }}>
            Tu pregunta
          </div>
          <textarea
            value={form.pregunta}
            onChange={e => setForm(f => ({ ...f, pregunta: e.target.value }))}
            placeholder="¿Qué quieres saber?"
            required
            rows={3}
            style={{
              width: '100%', boxSizing: 'border-box',
              background: 'var(--surface-2)', border: '1px solid var(--line)',
              borderRadius: 11, padding: '12px 14px',
              fontSize: 14, color: 'var(--ink)', fontFamily: 'inherit',
              resize: 'vertical', outline: 'none', lineHeight: 1.6,
            }}
          />
        </div>

        {/* Área */}
        <div>
          <div style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--ink-soft)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '.4px' }}>
            Área
          </div>
          <AreaChips value={form.area} onChange={a => setForm(f => ({ ...f, area: a }))} />
        </div>

        {/* Toggle anónimo */}
        <Toggle
          value={form.anonimo}
          onChange={v => setForm(f => ({ ...f, anonimo: v }))}
          label="Publicar como anónimo · Pregunta sin mostrar tu nombre."
        />

        <button type="submit" style={{
          background: 'var(--primary)', color: 'var(--primary-ink)',
          fontWeight: 700, fontSize: 15, padding: '14px',
          borderRadius: 999, border: 'none', cursor: 'pointer',
          fontFamily: 'inherit', boxShadow: '0 8px 20px var(--primary-glow)',
        }}>
          Preguntar
        </button>

        <div style={{ textAlign: 'center', fontSize: 11.5, color: 'var(--ink-soft)' }}>
          ⚡ La comunidad responde en menos de 24h.
        </div>
      </form>
    </Backdrop>
  );
}

// ── Sub-componentes por tab ──────────────────────────────────────────────────

function Foros({ onEntrar }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
      {FOROS.map(f => (
        <div key={f.name} style={{
          background: 'var(--surface)', border: '1px solid var(--line)',
          borderRadius: 12, padding: 18, cursor: 'pointer', transition: 'all .18s',
        }}
          onClick={() => onEntrar(f)}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'var(--primary)';
            e.currentTarget.style.boxShadow = '0 8px 22px var(--primary-glow)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'var(--line)';
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.style.transform = '';
          }}
        >
          <div style={{ fontSize: 30 }}>{f.icon}</div>
          <div className="font-display" style={{ fontWeight: 700, fontSize: 15.5, marginTop: 10, lineHeight: 1.25 }}>
            {f.name}
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
    </div>
  );
}

function Historias({ onCompartir, onLeer }) {
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
          whiteSpace: 'nowrap', fontFamily: 'inherit',
          boxShadow: '0 4px 14px var(--primary-glow)',
        }}>
          + Compartir tu historia
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        {HISTORIAS.map(h => (
          <div key={h.id} style={{
            background: 'var(--surface)', border: '1px solid var(--line)',
            borderRadius: 12, padding: 18, display: 'flex', flexDirection: 'column',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
              <span style={{
                width: 42, height: 42, borderRadius: '50%', background: h.av,
                color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 800, fontSize: 16, flexShrink: 0,
              }}>
                {h.ini}
              </span>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{h.name}</div>
                <div style={{ fontSize: 11.5, color: 'var(--ink-soft)' }}>
                  {h.carrera} · {h.inst}
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
              <span style={{
                background: 'var(--primary-soft)', color: 'var(--primary-deep)',
                fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 999,
              }}>
                {h.tag}
              </span>
              <span style={{ fontSize: 12, color: 'var(--ink-soft)' }}>❤️ {h.likes}</span>
              <span style={{ fontSize: 12, color: 'var(--ink-soft)' }}>· {h.date}</span>
            </div>

            <div style={{ flex: 1 }} />
            <div
              onClick={() => onLeer(h)}
              style={{ color: 'var(--primary)', fontWeight: 700, fontSize: 13.5, marginTop: 14, cursor: 'pointer' }}
            >
              Leer historia →
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function Preguntas({ onPreguntar, onPreguntaClick }) {
  return (
    <>
      <div style={{
        display: 'flex', gap: 10, background: 'var(--surface)',
        border: '1px solid var(--line)', borderRadius: 12,
        padding: 13, marginBottom: 14,
      }}>
        <div
          onClick={onPreguntar}
          style={{
            flex: 1, background: 'var(--surface-2)', border: '1px solid var(--line)',
            borderRadius: 10, padding: '12px 15px',
            fontSize: 13.5, color: 'var(--ink-soft)', cursor: 'text',
          }}
        >
          ¿Tienes una duda? Pregúntale a la comunidad…
        </div>
        <button onClick={onPreguntar} style={{
          background: 'var(--primary)', color: 'var(--primary-ink)',
          fontWeight: 700, fontSize: 13.5, padding: '0 20px',
          borderRadius: 10, border: 'none', cursor: 'pointer',
          whiteSpace: 'nowrap', fontFamily: 'inherit',
        }}>
          Preguntar
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
        {PREGUNTAS.map(q => (
          <div key={q.id} style={{
            background: 'var(--surface)', border: '1px solid var(--line)',
            borderRadius: 12, padding: '16px 18px', cursor: 'pointer',
            transition: 'border-color .15s',
          }}
            onClick={() => onPreguntaClick(q)}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--primary)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--line)'}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{
                width: 34, height: 34, borderRadius: '50%', background: q.av,
                color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 800, fontSize: 13, flexShrink: 0,
              }}>
                {q.ini}
              </span>
              <span style={{ fontSize: 13, fontWeight: 700 }}>{q.name}</span>
              <span style={{ fontSize: 12, color: 'var(--ink-soft)' }}>· {q.time}</span>
              {q.resolved && (
                <span style={{
                  marginLeft: 'auto',
                  background: 'var(--primary-soft)', color: 'var(--primary-deep)',
                  fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 999,
                }}>
                  Resuelta ✓
                </span>
              )}
            </div>

            <div style={{ fontWeight: 700, fontSize: 15, marginTop: 11, lineHeight: 1.3 }}>
              {q.title}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 11 }}>
              <span style={{
                background: 'var(--surface-2)', color: 'var(--ink-soft)',
                fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 999,
              }}>
                {q.area}
              </span>
              <span style={{ fontSize: 12.5, color: 'var(--ink-soft)' }}>
                💬 {q.answers} respuestas
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function Convocatorias({ onVerMas }) {
  const [filtroActivo, setFiltroActivo] = useState('Todas');

  const filtradas = CONVOCATORIAS.filter(c =>
    filtroActivo === 'Todas' || c.type === filtroActivo
  );

  return (
    <>
      <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
        {CONV_FILTERS.map(f => {
          const active = filtroActivo === f;
          return (
            <button key={f} onClick={() => setFiltroActivo(f)} style={{
              fontSize: 12.5, fontWeight: active ? 700 : 600,
              padding: '8px 15px', borderRadius: 999,
              border: active ? 'none' : '1px solid var(--line)',
              background: active ? 'var(--primary)' : 'var(--surface)',
              color: active ? 'var(--primary-ink)' : 'var(--ink-soft)',
              cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap',
            }}>
              {f}
            </button>
          );
        })}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {filtradas.map(c => (
          <div key={c.id} style={{
            background: 'var(--surface)', border: '1px solid var(--line)',
            borderRadius: 12, padding: '16px 18px',
            borderLeft: `4px solid ${c.color}`,
            display: 'flex', alignItems: 'center', gap: 14,
          }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 9, flexWrap: 'wrap' }}>
                <span style={{
                  background: c.bg, color: c.color,
                  fontSize: 11, fontWeight: 800, padding: '3px 10px',
                  borderRadius: 999, textTransform: 'uppercase', letterSpacing: '.4px',
                }}>
                  {c.type}
                </span>
                <span style={{
                  fontSize: 11.5,
                  fontWeight: c.days < 7 ? 800 : 600,
                  color: c.days < 7 ? '#dc2626' : 'var(--ink-soft)',
                }}>
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
              borderRadius: 9, border: 'none', cursor: 'pointer',
              whiteSpace: 'nowrap', fontFamily: 'inherit',
            }}>
              Ver más →
            </button>
          </div>
        ))}

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

// ── Sidebar ──────────────────────────────────────────────────────────────────

function Sidebar() {
  return (
    <div style={{ width: 300, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>

      <div style={{
        background: 'var(--surface)', border: '1px solid var(--line)',
        borderRadius: 12, padding: 16,
      }}>
        <div className="font-display" style={{ fontWeight: 800, fontSize: 14 }}>
          Preguntas sin respuesta
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 11, marginTop: 12 }}>
          {UNANSWERED.map(u => (
            <div key={u.title} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12.5, fontWeight: 600, lineHeight: 1.3 }}>{u.title}</div>
                <div style={{ fontSize: 11, color: 'var(--ink-soft)', marginTop: 2 }}>{u.area}</div>
              </div>
              <button style={{
                background: 'var(--primary-soft)', color: 'var(--primary-deep)',
                fontSize: 11.5, fontWeight: 700, padding: '6px 11px',
                borderRadius: 8, border: 'none', cursor: 'pointer',
                whiteSpace: 'nowrap', fontFamily: 'inherit',
              }}>
                Responder
              </button>
            </div>
          ))}
        </div>
      </div>

      <div style={{
        background: 'var(--surface)', border: '1px solid var(--line)',
        borderRadius: 12, padding: 16,
      }}>
        <div className="font-display" style={{ fontWeight: 800, fontSize: 14 }}>
          Próximas a cerrar
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 11, marginTop: 12 }}>
          {CLOSING.map(c => (
            <div key={c.title} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{
                width: 38, height: 38, borderRadius: 10,
                background: c.bg, color: c.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexDirection: 'column', fontWeight: 800, fontSize: 14,
                flexShrink: 0, lineHeight: 1,
              }}>
                {c.days}
                <span style={{ fontSize: 8, fontWeight: 600 }}>días</span>
              </span>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 12.5, fontWeight: 600, lineHeight: 1.3 }}>{c.title}</div>
                <div style={{ fontSize: 11, color: 'var(--ink-soft)', marginTop: 2 }}>{c.inst}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{
        background: 'linear-gradient(135deg, var(--primary-deep), var(--primary))',
        borderRadius: 12, padding: 16, color: '#fff',
      }}>
        <div style={{ fontSize: 11, fontWeight: 700, opacity: .85, textTransform: 'uppercase', letterSpacing: '.5px' }}>
          ⭐ Historia de la semana
        </div>
        <div className="font-display" style={{ fontWeight: 800, fontSize: 15, marginTop: 9, lineHeight: 1.25 }}>
          De repitente a primer puesto en la U
        </div>
        <div style={{ fontSize: 12.5, opacity: .92, marginTop: 7, lineHeight: 1.5 }}>
          "Perdí un año, pero ese tropiezo me enseñó cómo estudiar de verdad…"
        </div>
        <div style={{ fontWeight: 700, fontSize: 13, marginTop: 12, cursor: 'pointer' }}>
          Leer →
        </div>
      </div>

    </div>
  );
}

// ── Página principal ─────────────────────────────────────────────────────────

const TABS = [
  { key: 'foros',          label: 'Foros'           },
  { key: 'historias',      label: 'Historias reales' },
  { key: 'preguntas',      label: 'Preguntas'        },
  { key: 'convocatorias',  label: 'Convocatorias'    },
];

const FAB_LABEL = { foros: '+', historias: '✍️', preguntas: '?', convocatorias: null };

export default function Comunidad() {
  const [tabActiva, setTabActiva] = useState('foros');
  const [modalHistoria, setModalHistoria] = useState(false);
  const [modalPregunta, setModalPregunta] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.resetAt) {
      setTabActiva('foros');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.state?.resetAt]);

  function handleFAB() {
    if (tabActiva === 'historias') setModalHistoria(true);
    else if (tabActiva === 'preguntas' || tabActiva === 'foros') setModalPregunta(true);
  }

  const fabLabel = FAB_LABEL[tabActiva];

  function renderTab() {
    switch (tabActiva) {
      case 'foros':
        return <Foros onEntrar={f => navigate(`/dashboard/comunidad/foro/${f.id}`, { state: { foro: f } })} />;
      case 'historias':
        return (
          <Historias
            onCompartir={() => setModalHistoria(true)}
            onLeer={h => navigate(`/dashboard/comunidad/historia/${h.id}`, { state: { historia: h } })}
          />
        );
      case 'preguntas':
        return (
          <Preguntas
            onPreguntar={() => setModalPregunta(true)}
            onPreguntaClick={q => navigate(`/dashboard/comunidad/post/${q.id}`, { state: { post: q, tipo: 'pregunta' } })}
          />
        );
      case 'convocatorias':
        return <Convocatorias onVerMas={c => navigate(`/dashboard/comunidad/convocatoria/${c.id}`, { state: { conv: c } })} />;
      default:
        return null;
    }
  }

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
          }}>
            🌱 3.240 estudiantes
          </span>
        </div>

        <div style={{ fontSize: 13.5, color: 'var(--ink-soft)', marginTop: 7, maxWidth: 560, lineHeight: 1.5 }}>
          Aquí, otros estudiantes ya encontraron su camino. El tuyo también está aquí.
        </div>

        <div style={{
          position: 'sticky', top: 66, zIndex: 5,
          display: 'flex', gap: 6, marginTop: 18,
          padding: '10px 0', background: 'var(--bg)',
          overflowX: 'auto',
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
              }}>
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      <div style={{
        display: 'flex', gap: 22, padding: '8px 28px 40px',
        alignItems: 'flex-start', background: 'var(--bg)',
        minHeight: 'calc(100vh - 200px)',
      }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          {renderTab()}
        </div>
        <Sidebar />
      </div>

      {fabLabel && (
        <button
          onClick={handleFAB}
          style={{
            position: 'fixed', bottom: 24, right: 24,
            width: 56, height: 56, borderRadius: '50%',
            background: 'var(--primary)', color: 'var(--primary-ink)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 24, fontWeight: 700, cursor: 'pointer',
            boxShadow: '0 10px 26px var(--primary-glow)', zIndex: 40,
            border: 'none', fontFamily: 'inherit',
          }}
        >
          {fabLabel}
        </button>
      )}

      {modalHistoria && <ModalCompartirHistoria onClose={() => setModalHistoria(false)} />}
      {modalPregunta && <ModalHacerPregunta onClose={() => setModalPregunta(false)} />}
    </DashboardLayout>
  );
}
