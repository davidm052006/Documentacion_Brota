import { useParams, useLocation, useNavigate } from 'react-router-dom';
import DashboardLayout from '../../../components/Layout/DashboardLayout';

const CONV_DETALLE = {
  c1: {
    requisitos: [
      'Ser colombiano/a y estar matriculado/a en una IES acreditada',
      'Tener ICFES (Saber 11) con puntaje mínimo de 310 puntos',
      'Pertenecer a los estratos 1, 2 o 3',
      'No tener título de educación superior previo',
      'Mantener promedio acumulado igual o superior a 3.5',
    ],
    pasos: [
      { num: 1, texto: 'Regístrate en el portal de ICETEX (icetex.gov.co)' },
      { num: 2, texto: 'Carga los documentos requeridos (ICFES, matrícula, certificado de estrato)' },
      { num: 3, texto: 'Diligencia el formulario de solicitud de beca antes de la fecha límite' },
      { num: 4, texto: 'Espera la notificación de preselección (15 días hábiles)' },
      { num: 5, texto: 'Entrevista virtual con el comité evaluador' },
    ],
    url: 'https://www.icetex.gov.co',
  },
  c2: {
    requisitos: [
      'Haber presentado el ICFES (Saber 11) en los últimos 5 años',
      'No tener título de pregrado de la Universidad Nacional',
      'Estar en los primeros puestos del listado de admitidos',
    ],
    pasos: [
      { num: 1, texto: 'Ingresa al sistema de inscripción en dniaspiranteunal.unal.edu.co' },
      { num: 2, texto: 'Paga el valor de inscripción ($180.000 aprox.)' },
      { num: 3, texto: 'Presenta el examen de admisión en la fecha programada' },
      { num: 4, texto: 'Consulta resultados 30 días después del examen' },
    ],
    url: 'https://www.unal.edu.co',
  },
  c3: {
    requisitos: [
      'Ser bachiller (grado 11 aprobado o título)',
      'Mayor de 16 años al momento de inicio del programa',
      'No tener contrato laboral activo con empresa del sector (varía por programa)',
    ],
    pasos: [
      { num: 1, texto: 'Consulta la oferta de programas en el portal del SENA (sena.edu.co)' },
      { num: 2, texto: 'Regístrate como aprendiz y crea tu hoja de vida en Sofía Plus' },
      { num: 3, texto: 'Inscríbete al programa en las fechas de apertura' },
      { num: 4, texto: 'Realiza las pruebas de conocimiento si el cupo es limitado' },
    ],
    url: 'https://www.sena.edu.co',
  },
  c4: {
    requisitos: [
      'Entrada libre — no se requiere inscripción previa',
      'Evento presencial en Corferias, Bogotá',
      'Recomendado para estudiantes de grado 10, 11 y recién egresados',
    ],
    pasos: [
      { num: 1, texto: 'Consulta el mapa de pabellones en el sitio oficial del evento' },
      { num: 2, texto: 'Agenda citas con orientadores vocacionales (registro en app del evento)' },
      { num: 3, texto: 'Asiste a los talleres y charlas de universidades participantes' },
    ],
    url: 'https://www.corferias.com',
  },
  c5: {
    requisitos: [
      'Ser beneficiario activo de Sisbén IV con puntaje inferior a 90 puntos',
      'Estar matriculado en educación superior (técnica, tecnológica o universitaria)',
      'No ser beneficiario simultáneo de otras transferencias del Estado para estudios',
    ],
    pasos: [
      { num: 1, texto: 'Verifica tu puntaje Sisbén en sisben.dnp.gov.co' },
      { num: 2, texto: 'Regístrate en el portal de Prosperidad Social con tu cédula' },
      { num: 3, texto: 'Adjunta certificado de matrícula del semestre vigente' },
      { num: 4, texto: 'Espera la liquidación del primer desembolso (aprox. 6 semanas)' },
    ],
    url: 'https://www.prosperidadsocial.gov.co',
  },
};

export default function ConvocatoriaDetalle() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const conv = location.state?.conv || {
    id, type: 'Convocatoria', color: '#16A34A', bg: '#dcfce7',
    title: 'Convocatoria', inst: '—', city: '—', days: 0,
  };

  const detalle = CONV_DETALLE[id] || CONV_DETALLE.c1;
  const urgente = conv.days < 7;

  return (
    <DashboardLayout>
      <div style={{ background: 'var(--bg)', minHeight: 'calc(100vh - 66px)', padding: '28px 28px 60px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>

          {/* Breadcrumb */}
          <button onClick={() => navigate('/dashboard/comunidad')} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: 13.5, color: 'var(--ink-soft)', fontFamily: 'inherit',
            padding: 0, marginBottom: 28, display: 'flex', alignItems: 'center', gap: 6,
          }}>
            ← Volver a convocatorias
          </button>

          {/* Badges */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14, flexWrap: 'wrap' }}>
            <span style={{
              background: conv.bg, color: conv.color,
              fontSize: 11, fontWeight: 800, padding: '5px 13px',
              borderRadius: 999, textTransform: 'uppercase', letterSpacing: '.5px',
            }}>
              {conv.type}
            </span>
            <span style={{
              background: urgente ? '#fee2e2' : 'var(--surface-2)',
              color: urgente ? '#dc2626' : 'var(--ink-soft)',
              fontSize: 12, fontWeight: urgente ? 800 : 600,
              padding: '5px 13px', borderRadius: 999,
            }}>
              ⏳ Cierra en {conv.days} días
            </span>
          </div>

          {/* Título */}
          <h1 className="font-display" style={{
            fontWeight: 800, fontSize: 27, lineHeight: 1.15,
            letterSpacing: '-.5px', margin: '0 0 16px',
          }}>
            {conv.title}
          </h1>

          {/* Meta */}
          <div style={{
            fontSize: 14, color: 'var(--ink-soft)', marginBottom: 32,
            display: 'flex', gap: 18, flexWrap: 'wrap',
          }}>
            <span>🏛️ {conv.inst}</span>
            <span>📍 {conv.city}</span>
            <span>📅 Cierra {new Date(Date.now() + conv.days * 86400000).toLocaleDateString('es-CO', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
          </div>

          {/* Requisitos */}
          <section style={{ marginBottom: 32 }}>
            <h2 className="font-display" style={{
              fontWeight: 800, fontSize: 17, letterSpacing: '-.3px',
              margin: '0 0 14px',
            }}>
              Requisitos
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {detalle.requisitos.map((r, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <span style={{
                    color: 'var(--primary)', fontWeight: 800, fontSize: 15,
                    flexShrink: 0, marginTop: 1,
                  }}>✓</span>
                  <span style={{ fontSize: 13.5, lineHeight: 1.5, color: 'var(--ink)' }}>{r}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Cómo aplicar */}
          <section style={{ marginBottom: 40 }}>
            <h2 className="font-display" style={{
              fontWeight: 800, fontSize: 17, letterSpacing: '-.3px',
              margin: '0 0 14px',
            }}>
              Cómo aplicar
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {detalle.pasos.map(p => (
                <div key={p.num} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <span style={{
                    width: 26, height: 26, borderRadius: '50%',
                    background: 'var(--primary-soft)', color: 'var(--primary-deep)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 800, fontSize: 12, flexShrink: 0,
                  }}>
                    {p.num}
                  </span>
                  <span style={{ fontSize: 13.5, lineHeight: 1.5, color: 'var(--ink)', paddingTop: 3 }}>{p.texto}</span>
                </div>
              ))}
            </div>
          </section>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a
              href={detalle.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: 'var(--primary)', color: 'var(--primary-ink)',
                fontWeight: 700, fontSize: 14.5, padding: '13px 28px',
                borderRadius: 999, textDecoration: 'none',
                boxShadow: '0 8px 20px var(--primary-glow)',
                display: 'inline-flex', alignItems: 'center', gap: 6,
              }}
            >
              Ir al sitio oficial →
            </a>
            <button onClick={() => navigate(-1)} style={{
              background: 'var(--surface)', color: 'var(--ink)',
              fontWeight: 700, fontSize: 14.5, padding: '13px 28px',
              borderRadius: 999, border: '1px solid var(--line)',
              cursor: 'pointer', fontFamily: 'inherit',
            }}>
              ← Volver
            </button>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}
