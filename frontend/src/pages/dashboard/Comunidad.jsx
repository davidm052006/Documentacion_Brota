import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DashboardLayout from '../../components/Layout/DashboardLayout';

// ── Datos estáticos (reemplazar por API en siguiente iteración) ───────────────

const FOROS = [
  { icon: '💻', name: 'Tecnología e informática',    posts: 128 },
  { icon: '🩺', name: 'Salud y ciencias de la vida', posts: 94  },
  { icon: '📊', name: 'Negocios y economía',          posts: 76  },
  { icon: '🎨', name: 'Artes y humanidades',          posts: 112 },
  { icon: '📚', name: 'Educación y pedagogía',        posts: 58  },
  { icon: '🌿', name: 'Ambiente y sostenibilidad',    posts: 41  },
];

const AV_COLORS = ['#16A34A', '#2563eb', '#db2777', '#d97706', '#7c3aed', '#0891b2'];

const HISTORIAS = [
  { ini: 'V', av: AV_COLORS[2], name: 'Valentina R.', carrera: 'Diseño Gráfico',    inst: 'U. Nacional',   title: 'Por qué cambié de ingeniería a diseño',          excerpt: 'Pasé dos semestres en civil hasta que entendí que lo mío era crear, no calcular.',              tag: 'Artes',       likes: 214, date: 'hace 2 días'     },
  { ini: 'S', av: AV_COLORS[0], name: 'Santiago M.',  carrera: 'Enfermería',         inst: 'U. El Bosque',  title: 'El test me mostró algo que yo ya sabía',          excerpt: 'Tenía miedo de decir que quería cuidar personas. La comunidad me dio el empujón.',              tag: 'Salud',       likes: 176, date: 'hace 4 días'     },
  { ini: 'L', av: AV_COLORS[1], name: 'Laura G.',     carrera: 'Economía',           inst: 'U. Externado',  title: 'De no saber nada a tener un plan a 5 años',      excerpt: 'No tenía idea de qué estudiar. Empecé por explorar áreas, no carreras.',                      tag: 'Negocios',    likes: 143, date: 'hace 5 días'     },
  { ini: 'J', av: AV_COLORS[3], name: 'Juan D.',      carrera: 'Tec. en Software',   inst: 'SENA',          title: 'Elegí el SENA y no me arrepiento',               excerpt: 'Todos me decían universidad. Hoy trabajo y estudio. Fue mi mejor decisión.',                  tag: 'Tecnología',  likes: 298, date: 'hace 1 semana'   },
  { ini: 'M', av: AV_COLORS[4], name: 'Mariana T.',   carrera: 'Lic. en Biología',   inst: 'U. Pedagógica', title: 'Descubrí que enseñar también es ciencia',        excerpt: 'Creía que ser profe era "el plan B". Ahora sé que es vocación pura.',                         tag: 'Educación',   likes: 121, date: 'hace 1 semana'   },
  { ini: 'C', av: AV_COLORS[5], name: 'Camilo P.',    carrera: 'Ing. Ambiental',     inst: 'U. Distrital',  title: 'Mi barrio inundado me dio una carrera',          excerpt: 'Quería resolver algo real de mi ciudad. Eso le dio sentido a todo.',                          tag: 'Ambiente',    likes: 187, date: 'hace 2 semanas'  },
];

const PREGUNTAS = [
  { ini: 'A', av: AV_COLORS[1], name: 'Anónimo',     time: 'hace 1 h',  title: '¿Vale la pena estudiar una carrera técnica antes de la universidad?',        area: 'Tecnología', answers: 7,  resolved: true  },
  { ini: 'D', av: AV_COLORS[0], name: 'Daniela O.',  time: 'hace 3 h',  title: '¿Qué puntaje del ICFES necesito para Medicina en pública?',                  area: 'Salud',      answers: 12, resolved: true  },
  { ini: 'A', av: AV_COLORS[3], name: 'Anónimo',     time: 'hace 6 h',  title: 'Me gustan el arte y las matemáticas a la vez. ¿Qué carreras mezclan eso?',   area: 'Artes',      answers: 4,  resolved: false },
  { ini: 'F', av: AV_COLORS[4], name: 'Felipe N.',   time: 'hace 1 día', title: '¿Cómo aplico a una beca si mi familia no tiene cómo pagar matrícula?',       area: 'Becas',      answers: 9,  resolved: false },
  { ini: 'A', av: AV_COLORS[5], name: 'Anónimo',     time: 'hace 2 días',title: '¿Es muy difícil cambiarse de carrera en segundo semestre?',                  area: 'General',    answers: 5,  resolved: false },
];

const CONV_FILTERS = ['Todas', 'Becas', 'Admisiones', 'Eventos', 'SENA'];

const CONVOCATORIAS = [
  { type: 'Beca',     color: '#16A34A', bg: '#dcfce7', title: "Beca Saber Pa' Pilo — matrícula completa",   inst: 'ICETEX',            city: 'Nacional', days: 4  },
  { type: 'Admisión', color: '#2563eb', bg: '#dbeafe', title: 'Inscripciones pregrado 2026-2',               inst: 'U. Nacional',       city: 'Bogotá',   days: 12 },
  { type: 'SENA',     color: '#d97706', bg: '#fef3c7', title: 'Tecnólogo en Análisis de Datos',              inst: 'SENA',              city: 'Bogotá',   days: 6  },
  { type: 'Evento',   color: '#7c3aed', bg: '#ede9fe', title: 'Feria de universidades — entrada libre',       inst: 'Corferias',         city: 'Bogotá',   days: 19 },
  { type: 'Beca',     color: '#16A34A', bg: '#dcfce7', title: 'Jóvenes en Acción — apoyo de sostenimiento',  inst: 'Prosperidad Social', city: 'Nacional', days: 3  },
];

const UNANSWERED = [
  { title: '¿Diseño industrial o arquitectura?',              area: 'Artes y humanidades' },
  { title: '¿Sirve un técnico del SENA para luego validar la U?', area: 'Tecnología'     },
  { title: '¿Qué hago si me arrepentí de mi carrera?',        area: 'General'            },
];

const CLOSING = [
  { days: 3, title: 'Jóvenes en Acción',  inst: 'Prosperidad Social', color: '#16A34A', bg: '#dcfce7' },
  { days: 4, title: "Beca Saber Pa' Pilo", inst: 'ICETEX',            color: '#16A34A', bg: '#dcfce7' },
];

// ── Sub-componentes por tab ──────────────────────────────────────────────────

function Foros() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
      {FOROS.map(f => (
        <div key={f.name} style={{
          background: 'var(--surface)', border: '1px solid var(--line)',
          borderRadius: 12, padding: 18, cursor: 'pointer', transition: 'all .18s',
        }}
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

function Historias() {
  return (
    <>
      {/* CTA compartir historia */}
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
        <button style={{
          background: 'var(--primary)', color: 'var(--primary-ink)',
          fontWeight: 700, fontSize: 13.5, padding: '10px 18px',
          borderRadius: 10, border: 'none', cursor: 'pointer',
          whiteSpace: 'nowrap', fontFamily: 'inherit',
          boxShadow: '0 4px 14px var(--primary-glow)',
        }}>
          + Compartir tu historia
        </button>
      </div>

      {/* Grid de historias */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        {HISTORIAS.map(h => (
          <div key={h.title} style={{
            background: 'var(--surface)', border: '1px solid var(--line)',
            borderRadius: 12, padding: 18, display: 'flex', flexDirection: 'column',
          }}>
            {/* Autor */}
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

            {/* Título */}
            <div className="font-display" style={{ fontWeight: 800, fontSize: 16, marginTop: 13, lineHeight: 1.25, letterSpacing: '-.2px' }}>
              {h.title}
            </div>

            {/* Excerpt */}
            <div style={{ fontSize: 13, color: 'var(--ink-soft)', marginTop: 7, lineHeight: 1.5 }}>
              {h.excerpt}
            </div>

            {/* Footer */}
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
            <div style={{ color: 'var(--primary)', fontWeight: 700, fontSize: 13.5, marginTop: 14, cursor: 'pointer' }}>
              Leer historia →
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function Preguntas() {
  return (
    <>
      {/* Ask box */}
      <div style={{
        display: 'flex', gap: 10, background: 'var(--surface)',
        border: '1px solid var(--line)', borderRadius: 12,
        padding: 13, marginBottom: 14,
      }}>
        <div style={{
          flex: 1, background: 'var(--surface-2)', border: '1px solid var(--line)',
          borderRadius: 10, padding: '12px 15px',
          fontSize: 13.5, color: 'var(--ink-soft)',
        }}>
          ¿Tienes una duda? Pregúntale a la comunidad…
        </div>
        <button style={{
          background: 'var(--primary)', color: 'var(--primary-ink)',
          fontWeight: 700, fontSize: 13.5, padding: '0 20px',
          borderRadius: 10, border: 'none', cursor: 'pointer',
          whiteSpace: 'nowrap', fontFamily: 'inherit',
        }}>
          Preguntar
        </button>
      </div>

      {/* Lista de preguntas */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
        {PREGUNTAS.map(q => (
          <div key={q.title} style={{
            background: 'var(--surface)', border: '1px solid var(--line)',
            borderRadius: 12, padding: '16px 18px', cursor: 'pointer',
            transition: 'border-color .15s',
          }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--primary)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--line)'}
          >
            {/* Autor + tiempo + badge */}
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

            {/* Título de la pregunta */}
            <div style={{ fontWeight: 700, fontSize: 15, marginTop: 11, lineHeight: 1.3 }}>
              {q.title}
            </div>

            {/* Área + respuestas */}
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

function Convocatorias() {
  const [filtroActivo, setFiltroActivo] = useState('Todas');

  const filtradas = CONVOCATORIAS.filter(c =>
    filtroActivo === 'Todas' || c.type === filtroActivo
  );

  return (
    <>
      {/* Filter pills */}
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

      {/* Lista de convocatorias */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {filtradas.map(c => (
          <div key={c.title} style={{
            background: 'var(--surface)', border: '1px solid var(--line)',
            borderRadius: 12, padding: '16px 18px',
            borderLeft: `4px solid ${c.color}`,
            display: 'flex', alignItems: 'center', gap: 14,
          }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              {/* Tipo + días */}
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

              {/* Título */}
              <div className="font-display" style={{ fontWeight: 700, fontSize: 15.5, marginTop: 9, lineHeight: 1.25 }}>
                {c.title}
              </div>

              {/* Institución + ciudad */}
              <div style={{ fontSize: 12.5, color: 'var(--ink-soft)', marginTop: 4 }}>
                🏛️ {c.inst} · 📍 {c.city}
              </div>
            </div>

            <button style={{
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

      {/* Preguntas sin respuesta */}
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

      {/* Próximas a cerrar */}
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

      {/* Historia de la semana */}
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

const TAB_CONTENT = {
  foros:         <Foros />,
  historias:     <Historias />,
  preguntas:     <Preguntas />,
  convocatorias: <Convocatorias />,
};

const FAB_ICON = { foros: '+', historias: '✍️', preguntas: '?', convocatorias: null };

export default function Comunidad() {
  const [tabActiva, setTabActiva] = useState('foros');
  const location = useLocation();

  // Cuando el logo BROTA se pulsa estando en Comunidad, resetea al tab inicial
  // (en el futuro también disparará un re-fetch del feed personalizado)
  useEffect(() => {
    if (location.state?.resetAt) {
      setTabActiva('foros');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.state?.resetAt]);

  const fabIcon = FAB_ICON[tabActiva];

  return (
    <DashboardLayout>
      <div style={{ padding: '22px 28px 0', background: 'var(--bg)' }}>

        {/* Encabezado */}
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

        {/* Inner tabs — sticky */}
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

      {/* Body: content + sidebar */}
      <div style={{
        display: 'flex', gap: 22, padding: '8px 28px 40px',
        alignItems: 'flex-start', background: 'var(--bg)',
        minHeight: 'calc(100vh - 200px)',
      }}>
        {/* Contenido del tab activo */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {TAB_CONTENT[tabActiva]}
        </div>

        {/* Sidebar */}
        <Sidebar />
      </div>

      {/* FAB (solo si hay acción contextual) */}
      {fabIcon && (
        <div style={{
          position: 'fixed', bottom: 24, right: 24,
          width: 56, height: 56, borderRadius: '50%',
          background: 'var(--primary)', color: 'var(--primary-ink)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 24, fontWeight: 700, cursor: 'pointer',
          boxShadow: '0 10px 26px var(--primary-glow)', zIndex: 40,
        }}>
          {fabIcon}
        </div>
      )}
    </DashboardLayout>
  );
}
