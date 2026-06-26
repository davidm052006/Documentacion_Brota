import { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import DashboardLayout from '../../../components/Layout/DashboardLayout';

const AV_COLORS = ['#16A34A', '#2563eb', '#db2777', '#d97706', '#7c3aed', '#0891b2'];

const HISTORIA_CONTENIDO = {
  h1: {
    body: [
      'Entré a Ingeniería Civil porque era lo que "sonaba bien" en mi familia. Mi papá es maestro de obras, mi abuelo levantó casas toda su vida. Parecía lo lógico.',
      'Pasé los dos primeros semestres luchando con cálculo y resistencia de materiales. Sacaba notas aceptables, pero cada vez que abría el cuaderno sentía que algo no encajaba. No era que fuera difícil — era que no me importaba.',
      'Un semestre, tuve que hacer un proyecto de presentación de un puente. Me obsesioné con la infografía. Pasé más horas diseñando la carátula que calculando las cargas. Mi profe me dijo "esto está muy bonito pero los números están mal." Yo pensé: exactamente.',
      'Pedí traslado a Diseño Gráfico. Mis papás no entendían. Tardé meses en explicarles que no era rendirse, era redirigir. Hoy estoy en cuarto semestre, tengo dos clientes freelance y por primera vez me levanto con ganas de abrir el computador.',
      'Si estás leyendo esto y sientes ese vacío de "algo no encaja" — escúchalo. No lo ignores. Ese vacío tiene información valiosa.',
    ],
  },
  h2: {
    body: [
      'Cuando el test vocacional me mostró Salud como área principal, pensé que era un error. Yo siempre había creído que lo mío era la ingeniería porque soy bueno en matemáticas.',
      'Pero si soy honesto, lo que más disfruto es cuando alguien está mal y yo puedo hacer algo. Desde chico cuidaba a mi abuela, le tomaba la presión, le daba sus medicamentos. Me gustaba. Me daba calma.',
      'Lo que me detuvo siempre fue el miedo a que dijeran que era "cosa de mujeres". Aquí en la comunidad encontré a otros hombres estudiando Enfermería y contando sus experiencias sin pena. Eso me dio el empujón que necesitaba.',
      'Hoy estoy en primer semestre de Enfermería en El Bosque. Es duro, es mucho estudio, pero cada práctica hospitalaria me confirma que estoy en el lugar correcto.',
    ],
  },
};

const RELACIONADAS = [
  { id: 'h2', ini: 'S', av: AV_COLORS[0], name: 'Santiago M.',  title: 'El test me mostró algo que yo ya sabía',         likes: 176 },
  { id: 'h4', ini: 'J', av: AV_COLORS[3], name: 'Juan D.',      title: 'Elegí el SENA y no me arrepiento',               likes: 298 },
  { id: 'h5', ini: 'M', av: AV_COLORS[4], name: 'Mariana T.',   title: 'Descubrí que enseñar también es ciencia',        likes: 121 },
  { id: 'h6', ini: 'C', av: AV_COLORS[5], name: 'Camilo P.',    title: 'Mi barrio inundado me dio una carrera',          likes: 187 },
];

export default function HistoriaDetalle() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const historia = location.state?.historia || {
    id, ini: '?', av: AV_COLORS[0], name: 'Autor', carrera: '', inst: '',
    title: 'Historia', tag: 'General', likes: 0, date: '',
  };

  const [likes, setLikes] = useState(historia.likes);
  const [liked, setLiked] = useState(false);

  function toggleLike() {
    setLikes(l => liked ? l - 1 : l + 1);
    setLiked(v => !v);
  }

  const contenido = HISTORIA_CONTENIDO[id] || HISTORIA_CONTENIDO.h1;
  const relacionadas = RELACIONADAS.filter(r => r.id !== id).slice(0, 4);

  return (
    <DashboardLayout>
      <div style={{ background: 'var(--bg)', minHeight: 'calc(100vh - 66px)', padding: '28px 28px 60px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>

          {/* Breadcrumb */}
          <button onClick={() => navigate('/dashboard/comunidad', { state: { tab: 'historias' } })} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: 13.5, color: 'var(--ink-soft)', fontFamily: 'inherit',
            padding: 0, marginBottom: 28, display: 'flex', alignItems: 'center', gap: 6,
          }}>
            ← Volver a historias
          </button>

          {/* Cabecera de autor */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
            <span style={{
              width: 56, height: 56, borderRadius: '50%', background: historia.av,
              color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 800, fontSize: 22, flexShrink: 0,
            }}>
              {historia.ini}
            </span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 15 }}>{historia.name}</div>
              <div style={{ fontSize: 13, color: 'var(--ink-soft)', marginTop: 2 }}>
                {historia.carrera} · {historia.inst}
              </div>
            </div>
            <span style={{
              background: 'var(--primary-soft)', color: 'var(--primary-deep)',
              fontSize: 12, fontWeight: 700, padding: '6px 14px', borderRadius: 999,
            }}>
              🎨 {historia.tag}
            </span>
          </div>

          {/* Título */}
          <h1 className="font-display" style={{
            fontWeight: 800, fontSize: 28, lineHeight: 1.15,
            letterSpacing: '-.6px', margin: '0 0 24px',
          }}>
            {historia.title}
          </h1>

          {/* Cuerpo */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {contenido.body.map((p, i) => (
              <p key={i} style={{
                fontSize: 14.5, lineHeight: 1.75, color: 'var(--ink)', margin: 0,
              }}>
                {p}
              </p>
            ))}
          </div>

          {/* Barra de reacción */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 14,
            marginTop: 36, flexWrap: 'wrap',
          }}>
            <button
              onClick={toggleLike}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                background: liked ? 'var(--accent)' : 'var(--accent-soft)',
                color: liked ? '#fff' : 'var(--accent)',
                fontWeight: 700, fontSize: 14, padding: '10px 20px',
                borderRadius: 999, border: 'none', cursor: 'pointer',
                fontFamily: 'inherit', transition: 'all .18s',
              }}
            >
              ❤️ {likes} · ¿Te identificas?
            </button>
            <span style={{ fontSize: 13, color: 'var(--ink-soft)' }}>
              Publicado {historia.date || 'recientemente'}
            </span>
          </div>

          {/* Divisor */}
          <div style={{ height: 1, background: 'var(--line)', margin: '36px 0' }} />

          {/* Historias relacionadas */}
          <div>
            <h2 className="font-display" style={{
              fontWeight: 800, fontSize: 18, letterSpacing: '-.4px',
              margin: '0 0 18px',
            }}>
              ¿Te pasó algo similar?
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {relacionadas.map(r => (
                <div
                  key={r.id}
                  onClick={() => navigate(`/dashboard/comunidad/historia/${r.id}`, { state: { historia: r } })}
                  style={{
                    background: 'var(--surface)', border: '1px solid var(--line)',
                    borderRadius: 14, padding: '16px 18px',
                    cursor: 'pointer', transition: 'border-color .15s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--primary)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--line)'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 11 }}>
                    <span style={{
                      width: 32, height: 32, borderRadius: '50%', background: r.av,
                      color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: 800, fontSize: 12, flexShrink: 0,
                    }}>
                      {r.ini}
                    </span>
                    <span style={{ fontSize: 13, fontWeight: 700 }}>{r.name}</span>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: 14, lineHeight: 1.3 }}>{r.title}</div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 }}>
                    <span style={{ fontSize: 12.5, color: 'var(--ink-soft)' }}>❤️ {r.likes}</span>
                    <span style={{ color: 'var(--primary)', fontWeight: 700, fontSize: 13 }}>Leer →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}
