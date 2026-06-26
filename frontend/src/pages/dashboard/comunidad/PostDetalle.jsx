import { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import DashboardLayout from '../../../components/Layout/DashboardLayout';

const AV_COLORS = ['#16A34A', '#2563eb', '#db2777', '#d97706', '#7c3aed', '#0891b2'];

const POST_DATA = {
  'post-t1': {
    ini: 'J', av: AV_COLORS[0], name: 'Juan D.', time: 'hace 2 h',
    title: '¿Cuánto dura realmente el Tecnólogo en Software del SENA?',
    body: 'He visto que dicen 2 años pero otros hablan de 3. ¿Hay diferencia entre virtual y presencial? Estoy considerando inscribirme pero antes quiero saber cuánto tiempo real le dedicaré. También me interesa saber qué tan reconocido es ese título en el mercado laboral.',
    votos: 34,
    respuestas: [
      { id: 'r1', ini: 'C', av: AV_COLORS[4], name: 'Camila R.', time: 'hace 1 h',  votos: 18, mejor: true,  texto: 'El tecnólogo en Análisis y Desarrollo de Software del SENA dura 2 años (4 trimestres de formación + etapa productiva de 6 meses). En la modalidad virtual los tiempos son los mismos pero flexibles. El título es reconocido — varias empresas en Colombia prefieren tecnólogos del SENA por la formación práctica.' },
      { id: 'r2', ini: 'S', av: AV_COLORS[1], name: 'Sebastián V.', time: 'hace 45 min', votos: 7,  mejor: false, texto: 'Confirmando lo de Camila. Yo terminé en 2 años y medio porque me tomé un trimestre libre. La etapa productiva la hice en una empresa real y eso fue lo mejor — salí con experiencia laboral de verdad.' },
      { id: 'r3', ini: 'A', av: AV_COLORS[3], name: 'Anónimo', time: 'hace 20 min', votos: 3,  mejor: false, texto: 'Ten en cuenta que el SENA tiene cupos limitados y a veces hay que esperar una convocatoria. Inscríbete en Sofía Plus y activa las alertas.' },
    ],
  },
  'post-t2': {
    ini: 'A', av: AV_COLORS[2], name: 'Anónimo', time: 'hace 5 h',
    title: 'Python vs Java para empezar: ¿cuál recomiendan?',
    body: 'Estoy entrando a Ingeniería de Sistemas y el profe dijo que usaremos Java, pero todos mis amigos aprenden Python. Quiero saber cuál conviene más aprender primero si quiero trabajar en desarrollo de software en Colombia.',
    votos: 28,
    respuestas: [
      { id: 'r1', ini: 'J', av: AV_COLORS[3], name: 'Juan P.', time: 'hace 4 h',  votos: 22, mejor: true,  texto: 'Para empezar, Python es más sencillo de leer y escribir — te permite enfocarte en lógica sin que la sintaxis te estrese. Java te enseña más disciplina en tipos y POO. La recomendación práctica: aprende bien los fundamentos con Python y cuando llegues a Java en la U ya vas con la lógica clara. No son excluyentes.' },
      { id: 'r2', ini: 'L', av: AV_COLORS[1], name: 'Laura G.', time: 'hace 3 h',  votos: 9,  mejor: false, texto: 'En Colombia las ofertas laborales para desarrolladores son bastante mezcladas. Python tiene mucha demanda en datos y backend. Java sigue fuerte en empresas grandes y banca. Aprende los dos con el tiempo.' },
    ],
  },
  p1: {
    ini: 'A', av: AV_COLORS[1], name: 'Anónimo', time: 'hace 1 h',
    title: '¿Vale la pena estudiar una carrera técnica antes de la universidad?',
    body: 'Tengo 17 años y tengo la opción de hacer un técnico en el SENA mientras termino el colegio. Mis papás dicen que pierdo el tiempo y que mejor me enfoco en el ICFES para entrar directo a la universidad. ¿Qué experiencia tienen?',
    votos: 19,
    respuestas: [
      { id: 'r1', ini: 'J', av: AV_COLORS[3], name: 'Juan D.', time: 'hace 45 min', votos: 14, mejor: true,  texto: 'Yo hice exactamente eso y no me arrepiento. El técnico del SENA me dio herramientas reales antes de entrar a la U. Además, en muchas universidades puedes validar materias si el técnico es del área. Eso sí — requiere disciplina porque son dos cosas al tiempo.' },
      { id: 'r2', ini: 'D', av: AV_COLORS[0], name: 'Daniela O.', time: 'hace 30 min', votos: 6,  mejor: false, texto: 'Depende mucho del técnico y de qué quieras estudiar. Si el técnico es en tu área de interés, suma experiencia y puede darte certeza de que eso es lo tuyo. Si es solo "para hacer algo", tal vez mejor enfocarte en el ICFES como dicen tus papás.' },
      { id: 'r3', ini: 'A', av: AV_COLORS[5], name: 'Anónimo', time: 'hace 15 min', votos: 2,  mejor: false, texto: 'El SENA tiene programas especiales para estudiantes de bachillerato — Técnico en Articulación. Búscalos, son menos intensos y están diseñados para hacerlos simultáneamente con el colegio.' },
    ],
  },
};

function VoteControl({ votos, vertical = false }) {
  const [count, setCount] = useState(votos);
  const [voted, setVoted] = useState(null);

  function vote(dir) {
    if (voted === dir) { setCount(votos); setVoted(null); }
    else { setCount(votos + (dir === 'up' ? 1 : -1)); setVoted(dir); }
  }

  const style = vertical
    ? { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }
    : { display: 'flex', alignItems: 'center', gap: 6 };

  return (
    <div style={style}>
      <button onClick={() => vote('up')} style={{
        background: 'none', border: 'none', cursor: 'pointer', fontSize: vertical ? 18 : 15,
        color: voted === 'up' ? 'var(--primary)' : 'var(--ink-soft)', lineHeight: 1, padding: '2px 5px',
      }}>▲</button>
      <span style={{ fontWeight: 800, fontSize: vertical ? 16 : 13, color: 'var(--primary-deep)' }}>{count}</span>
      {vertical && (
        <button onClick={() => vote('down')} style={{
          background: 'none', border: 'none', cursor: 'pointer', fontSize: 18,
          color: voted === 'down' ? '#dc2626' : 'var(--ink-soft)', lineHeight: 1, padding: '2px 5px',
        }}>▼</button>
      )}
    </div>
  );
}

export default function PostDetalle() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [respuesta, setRespuesta] = useState('');
  const [mejor, setMejor] = useState(null);

  const foro = location.state?.foro;
  const data = POST_DATA[id] || POST_DATA['post-t1'];

  function handlePublicar(e) {
    e.preventDefault();
    setRespuesta('');
  }

  const breadcrumbLabel = foro ? foro.name : 'Comunidad';
  const breadcrumbPath = foro
    ? `/dashboard/comunidad/foro/${foro.id}`
    : '/dashboard/comunidad';

  return (
    <DashboardLayout>
      <div style={{ background: 'var(--bg)', minHeight: 'calc(100vh - 66px)', padding: '28px 28px 60px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>

          {/* Breadcrumb */}
          <button onClick={() => navigate(breadcrumbPath, { state: { foro } })} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: 13.5, color: 'var(--ink-soft)', fontFamily: 'inherit',
            padding: 0, marginBottom: 28, display: 'flex', alignItems: 'center', gap: 6,
          }}>
            ← {breadcrumbLabel}
          </button>

          {/* Post original */}
          <div style={{
            background: 'var(--surface)', border: '1px solid var(--line)',
            borderRadius: 16, padding: '22px 24px',
            display: 'flex', gap: 20, marginBottom: 28,
          }}>
            <VoteControl votos={data.votos} vertical />

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <span style={{
                  width: 36, height: 36, borderRadius: '50%', background: data.av,
                  color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 800, fontSize: 13, flexShrink: 0,
                }}>
                  {data.ini}
                </span>
                <span style={{ fontSize: 14, fontWeight: 700 }}>{data.name}</span>
                <span style={{ fontSize: 12.5, color: 'var(--ink-soft)' }}>· {data.time}</span>
              </div>

              <h1 className="font-display" style={{
                fontWeight: 800, fontSize: 23, lineHeight: 1.2,
                letterSpacing: '-.4px', margin: '0 0 14px',
              }}>
                {data.title}
              </h1>

              <p style={{ fontSize: 14.5, lineHeight: 1.7, color: 'var(--ink)', margin: 0 }}>
                {data.body}
              </p>
            </div>
          </div>

          {/* Divisor + conteo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
            <div style={{ flex: 1, height: 1, background: 'var(--line)' }} />
            <span style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--ink-soft)', whiteSpace: 'nowrap' }}>
              {data.respuestas.length} respuesta{data.respuestas.length !== 1 ? 's' : ''}
            </span>
            <div style={{ flex: 1, height: 1, background: 'var(--line)' }} />
          </div>

          {/* Respuestas */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
            {data.respuestas.map(r => {
              const esMejor = mejor === r.id || r.mejor;
              return (
                <div key={r.id} style={{
                  background: 'var(--surface)', border: `1px solid ${esMejor ? 'var(--primary)' : 'var(--line)'}`,
                  borderRadius: 14, padding: '18px 20px',
                  display: 'flex', gap: 18,
                  boxShadow: esMejor ? '0 4px 14px var(--primary-glow)' : 'none',
                  transition: 'all .18s',
                }}>
                  <VoteControl votos={r.votos} />

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 11, flexWrap: 'wrap' }}>
                      <span style={{
                        width: 32, height: 32, borderRadius: '50%', background: r.av,
                        color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontWeight: 800, fontSize: 12, flexShrink: 0,
                      }}>
                        {r.ini}
                      </span>
                      <span style={{ fontSize: 13.5, fontWeight: 700 }}>{r.name}</span>
                      <span style={{ fontSize: 12, color: 'var(--ink-soft)' }}>· {r.time}</span>
                      {esMejor && (
                        <span style={{
                          marginLeft: 'auto',
                          background: 'var(--primary-soft)', color: 'var(--primary-deep)',
                          fontSize: 11.5, fontWeight: 800,
                          padding: '4px 12px', borderRadius: 999,
                          whiteSpace: 'nowrap',
                        }}>
                          ★ Mejor respuesta
                        </span>
                      )}
                    </div>

                    <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--ink)', margin: '0 0 12px' }}>
                      {r.texto}
                    </p>

                    <button
                      onClick={() => {}}
                      style={{
                        background: 'none', border: 'none', cursor: 'pointer',
                        fontSize: 12.5, color: 'var(--ink-soft)', fontFamily: 'inherit',
                        fontWeight: 600, padding: 0,
                      }}
                    >
                      ↳ Responder
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Composer */}
          <div style={{
            background: 'var(--surface)', border: '1px solid var(--line)',
            borderRadius: 14, padding: '18px 20px',
          }}>
            <div className="font-display" style={{ fontWeight: 800, fontSize: 15, marginBottom: 14 }}>
              Tu respuesta
            </div>
            <form onSubmit={handlePublicar}>
              <textarea
                value={respuesta}
                onChange={e => setRespuesta(e.target.value)}
                placeholder="Comparte lo que sabes o lo que viviste…"
                rows={3}
                style={{
                  width: '100%', boxSizing: 'border-box',
                  background: 'var(--surface-2)', border: '1px solid var(--line)',
                  borderRadius: 11, padding: '12px 14px',
                  fontSize: 14, color: 'var(--ink)', fontFamily: 'inherit',
                  resize: 'vertical', outline: 'none', lineHeight: 1.6,
                  marginBottom: 12,
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button type="submit" disabled={!respuesta.trim()} style={{
                  background: respuesta.trim() ? 'var(--primary)' : 'var(--surface-2)',
                  color: respuesta.trim() ? 'var(--primary-ink)' : 'var(--ink-soft)',
                  fontWeight: 700, fontSize: 14, padding: '11px 28px',
                  borderRadius: 999, border: 'none', cursor: respuesta.trim() ? 'pointer' : 'default',
                  fontFamily: 'inherit', transition: 'all .18s',
                  boxShadow: respuesta.trim() ? '0 6px 16px var(--primary-glow)' : 'none',
                }}>
                  Publicar
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}
