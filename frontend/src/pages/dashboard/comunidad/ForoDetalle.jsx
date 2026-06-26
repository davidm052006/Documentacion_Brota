import { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import DashboardLayout from '../../../components/Layout/DashboardLayout';

const AV_COLORS = ['#16A34A', '#2563eb', '#db2777', '#d97706', '#7c3aed', '#0891b2'];

const POSTS_BY_FORO = {
  tecnologia: [
    { id: 'post-t1', ini: 'J', av: AV_COLORS[0], name: 'Juan D.',     time: 'hace 2 h',   title: '¿Cuánto dura realmente el Tecnólogo en Software del SENA?',          preview: 'He visto que dicen 2 años pero otros hablan de 3. ¿Hay diferencia entre virtual y presencial?', votos: 34, respuestas: 12 },
    { id: 'post-t2', ini: 'A', av: AV_COLORS[2], name: 'Anónimo',     time: 'hace 5 h',   title: 'Python vs Java para empezar: ¿cuál recomiendan?',                    preview: 'Estoy entrando a Ingeniería de Sistemas y el profe dijo que usaremos Java, pero todos mis amigos aprenden Python.', votos: 28, respuestas: 19 },
    { id: 'post-t3', ini: 'C', av: AV_COLORS[4], name: 'Camila R.',   time: 'hace 1 día', title: 'Ciberseguridad en Colombia — ¿hay campo laboral real?',               preview: 'Me encanta el tema pero no sé si hay empresas acá que contraten o si toca emigrar.', votos: 21, respuestas: 8  },
    { id: 'post-t4', ini: 'S', av: AV_COLORS[1], name: 'Sebastián V.',time: 'hace 2 días', title: '¿Vale la pena un bootcamp de programación si estoy en la U?',        preview: 'Tengo acceso a un bootcamp de 6 meses pero ya estoy en segundo semestre de sistemas. ¿Lo hago o espero?', votos: 17, respuestas: 14 },
    { id: 'post-t5', ini: 'M', av: AV_COLORS[3], name: 'Mariana L.',  time: 'hace 3 días', title: 'Diferencias reales entre Sistemas, Telemática e Informática',        preview: 'Los tres suenan igual pero las salidas laborales parecen distintas. ¿Alguien que esté en esas carreras me explica?', votos: 45, respuestas: 23 },
  ],
  salud: [
    { id: 'post-s1', ini: 'D', av: AV_COLORS[0], name: 'Daniela O.', time: 'hace 1 h',   title: '¿Cuántos años son realmente Medicina?',                              preview: '6 años de carrera más internado, ¿y luego especialización? ¿Cuándo uno puede ejercer?', votos: 41, respuestas: 17 },
    { id: 'post-s2', ini: 'F', av: AV_COLORS[1], name: 'Felipe N.',  time: 'hace 4 h',   title: 'Nutrición vs Enfermería — ¿cuál tiene más campo en Colombia?',       preview: 'Tengo vocación de cuidar personas pero no quiero Medicina por el tiempo. ¿Cuál me recomiendan?', votos: 19, respuestas: 9  },
    { id: 'post-s3', ini: 'A', av: AV_COLORS[3], name: 'Anónimo',    time: 'hace 2 días', title: 'Becas para estudiar Medicina fuera de Colombia',                    preview: 'Sé de becas en Cuba pero ¿hay otras opciones con retorno garantizado?', votos: 33, respuestas: 21 },
  ],
  artes: [
    { id: 'post-a1', ini: 'V', av: AV_COLORS[2], name: 'Valentina R.', time: 'hace 3 h', title: '¿Diseño Gráfico o Comunicación Visual — qué diferencia hay?',       preview: 'En varias universidades vi los dos y no entiendo bien la diferencia en el mercado laboral.', votos: 29, respuestas: 11 },
    { id: 'post-a2', ini: 'L', av: AV_COLORS[5], name: 'Lucas G.',     time: 'hace 1 día', title: 'Música en la U vs conservatorio — pros y contras',                 preview: 'Tengo 17 años y toco guitarra hace 6. ¿Carrera universitaria o conservatorio me da más salidas?', votos: 22, respuestas: 8  },
  ],
};

function VoteControl({ votos }) {
  const [count, setCount] = useState(votos);
  const [voted, setVoted] = useState(null);

  function vote(dir) {
    if (voted === dir) {
      setCount(votos);
      setVoted(null);
    } else {
      setCount(votos + (dir === 'up' ? 1 : -1));
      setVoted(dir);
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, flexShrink: 0 }}>
      <button onClick={() => vote('up')} style={{
        background: 'none', border: 'none', cursor: 'pointer', fontSize: 18,
        color: voted === 'up' ? 'var(--primary)' : 'var(--ink-soft)',
        lineHeight: 1, padding: '2px 6px',
      }}>▲</button>
      <span style={{ fontWeight: 800, fontSize: 15, color: 'var(--primary-deep)' }}>{count}</span>
    </div>
  );
}

export default function ForoDetalle() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [orden, setOrden] = useState('recientes');

  const foro = location.state?.foro || {
    id, icon: '💬', name: id, posts: 0, siguiendo: 0,
  };

  const posts = POSTS_BY_FORO[id] || POSTS_BY_FORO.tecnologia;
  const sorted = orden === 'votados'
    ? [...posts].sort((a, b) => b.votos - a.votos)
    : posts;

  return (
    <DashboardLayout>
      <div style={{ background: 'var(--bg)', minHeight: 'calc(100vh - 66px)', padding: '28px 28px 48px' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>

          {/* Breadcrumb */}
          <button onClick={() => navigate('/dashboard/comunidad')} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: 13.5, color: 'var(--ink-soft)', fontFamily: 'inherit',
            padding: 0, marginBottom: 22, display: 'flex', alignItems: 'center', gap: 6,
          }}>
            ← Comunidad · Foros
          </button>

          {/* Header del foro */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 18,
            marginBottom: 28, flexWrap: 'wrap',
          }}>
            <div style={{
              width: 58, height: 58, borderRadius: 16,
              background: 'var(--primary-soft)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 28, flexShrink: 0,
            }}>
              {foro.icon}
            </div>
            <div style={{ flex: 1 }}>
              <h1 className="font-display" style={{
                fontWeight: 800, fontSize: 25, letterSpacing: '-.5px',
                margin: 0, lineHeight: 1.15,
              }}>
                {foro.name}
              </h1>
              <div style={{ fontSize: 13, color: 'var(--ink-soft)', marginTop: 5 }}>
                {foro.posts} posts activos · {(foro.siguiendo || 0).toLocaleString()} estudiantes siguiendo
              </div>
            </div>
            <button style={{
              background: 'var(--primary)', color: 'var(--primary-ink)',
              fontWeight: 700, fontSize: 13.5, padding: '11px 20px',
              borderRadius: 999, border: 'none', cursor: 'pointer',
              fontFamily: 'inherit', boxShadow: '0 6px 16px var(--primary-glow)',
              whiteSpace: 'nowrap',
            }}>
              + Nuevo post
            </button>
          </div>

          {/* Sub-tabs */}
          <div style={{ display: 'flex', gap: 4, marginBottom: 22 }}>
            {['recientes', 'votados'].map(o => (
              <button key={o} onClick={() => setOrden(o)} style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: 'inherit', fontSize: 14, fontWeight: orden === o ? 700 : 600,
                color: orden === o ? 'var(--primary)' : 'var(--ink-soft)',
                padding: '8px 14px',
                borderBottom: orden === o ? '2.5px solid var(--primary)' : '2.5px solid transparent',
                borderRadius: 0,
                textTransform: 'capitalize',
              }}>
                {o === 'recientes' ? 'Recientes' : 'Más votados'}
              </button>
            ))}
          </div>

          {/* Lista de posts */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {sorted.map(p => (
              <div
                key={p.id}
                onClick={() => navigate(`/dashboard/comunidad/post/${p.id}`, { state: { post: p, foro } })}
                style={{
                  background: 'var(--surface)', border: '1px solid var(--line)',
                  borderRadius: 14, padding: '18px 20px',
                  display: 'flex', gap: 18, cursor: 'pointer',
                  transition: 'all .18s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--primary)';
                  e.currentTarget.style.boxShadow = '0 6px 20px var(--primary-glow)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--line)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <VoteControl votos={p.votos} />

                <div style={{ flex: 1, minWidth: 0 }}>
                  {/* Autor */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 10 }}>
                    <span style={{
                      width: 28, height: 28, borderRadius: '50%', background: p.av,
                      color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: 800, fontSize: 11, flexShrink: 0,
                    }}>
                      {p.ini}
                    </span>
                    <span style={{ fontSize: 13, fontWeight: 700 }}>{p.name}</span>
                    <span style={{ fontSize: 12, color: 'var(--ink-soft)' }}>· {p.time}</span>
                  </div>

                  <div className="font-display" style={{ fontWeight: 700, fontSize: 17, lineHeight: 1.25, letterSpacing: '-.2px' }}>
                    {p.title}
                  </div>

                  <div style={{ fontSize: 13.5, color: 'var(--ink-soft)', marginTop: 7, lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {p.preview}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 12 }}>
                    <span style={{
                      background: 'var(--primary-soft)', color: 'var(--primary-deep)',
                      fontSize: 12, fontWeight: 700, padding: '4px 11px', borderRadius: 999,
                    }}>
                      ▲ {p.votos} votos
                    </span>
                    <span style={{
                      background: 'var(--surface-2)', color: 'var(--ink-soft)',
                      fontSize: 12, fontWeight: 600, padding: '4px 11px', borderRadius: 999,
                    }}>
                      💬 {p.respuestas} respuestas
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}
