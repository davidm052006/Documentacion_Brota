import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import DashboardLayout from '../../../components/Layout/DashboardLayout';
import { getConvocatoria } from '../../../services/comunidadService';

const TIPO_COLOR = {
  Beca:     { color: '#16A34A', bg: '#dcfce7' },
  Admisión: { color: '#2563eb', bg: '#dbeafe' },
  SENA:     { color: '#d97706', bg: '#fef3c7' },
  Evento:   { color: '#7c3aed', bg: '#ede9fe' },
};

export default function ConvocatoriaDetalle() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [datos, setDatos] = useState(location.state?.conv || null);
  const [cargando, setCargando] = useState(!datos?.detalles);

  useEffect(() => {
    if (datos?.detalles) return;
    setCargando(true);
    getConvocatoria(id).then(res => {
      if (res.success) setDatos(res.data);
      setCargando(false);
    });
  }, [id, datos?.detalles]);

  if (cargando) return (
    <DashboardLayout>
      <div style={{ display: 'flex', justifyContent: 'center', padding: '80px 0' }}>
        <div className="animate-spin" style={{ width: 36, height: 36, border: '3px solid var(--line)', borderTopColor: 'var(--primary)', borderRadius: '50%' }} />
      </div>
    </DashboardLayout>
  );

  if (!datos) return (
    <DashboardLayout>
      <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--ink-soft)' }}>
        <div style={{ fontSize: 36 }}>😕</div>
        <div style={{ fontWeight: 700, marginTop: 14 }}>Convocatoria no encontrada.</div>
        <button onClick={() => navigate('/dashboard/comunidad')} style={{ marginTop: 20, background: 'var(--primary)', color: 'var(--primary-ink)', fontWeight: 700, padding: '11px 22px', borderRadius: 12, border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>Volver</button>
      </div>
    </DashboardLayout>
  );

  const { color = '#16A34A', bg = '#dcfce7' } = TIPO_COLOR[datos.type] ?? {};
  const requisitos = datos.detalles?.requisitos ?? [];
  const pasos      = datos.detalles?.pasos      ?? [];
  const urgente    = (datos.days ?? 99) < 7;

  return (
    <DashboardLayout>
      <div style={{ background: 'var(--bg)', minHeight: 'calc(100vh - 66px)', padding: '28px 28px 60px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>

          <button onClick={() => navigate('/dashboard/comunidad')} style={{
            background: 'none', border: 'none', cursor: 'pointer', fontSize: 13.5,
            color: 'var(--ink-soft)', fontFamily: 'inherit', padding: 0, marginBottom: 22,
            display: 'flex', alignItems: 'center', gap: 6,
          }}>← Comunidad · Convocatorias</button>

          {/* Cabecera */}
          <div style={{ background: 'var(--surface)', border: `1px solid var(--line)`, borderRadius: 20, padding: '26px 28px', borderLeft: `5px solid ${color}`, marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14, flexWrap: 'wrap' }}>
              <span style={{ background: bg, color, fontSize: 12, fontWeight: 800, padding: '4px 12px', borderRadius: 999, textTransform: 'uppercase', letterSpacing: '.5px' }}>
                {datos.type}
              </span>
              <span style={{ fontSize: 12.5, fontWeight: urgente ? 800 : 600, color: urgente ? '#dc2626' : 'var(--ink-soft)' }}>
                ⏳ Cierra en {datos.days} días
              </span>
            </div>
            <div className="font-display" style={{ fontWeight: 800, fontSize: 24, lineHeight: 1.2, letterSpacing: '-.5px', marginBottom: 10 }}>
              {datos.title || datos.titulo}
            </div>
            <div style={{ fontSize: 13.5, color: 'var(--ink-soft)' }}>
              🏛️ {datos.inst || datos.institucion} · 📍 {datos.city || datos.ciudad}
            </div>
            {datos.descripcion && (
              <div style={{ fontSize: 14, color: 'var(--ink)', lineHeight: 1.65, marginTop: 14 }}>
                {datos.descripcion}
              </div>
            )}
          </div>

          {/* Requisitos */}
          {requisitos.length > 0 && (
            <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 18, padding: '22px 24px', marginBottom: 16 }}>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 14 }}>📋 Requisitos</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
                {requisitos.map((r, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--primary)', fontWeight: 800, fontSize: 15, marginTop: 1 }}>✓</span>
                    <span style={{ fontSize: 13.5, color: 'var(--ink)', lineHeight: 1.5 }}>{r}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pasos */}
          {pasos.length > 0 && (
            <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 18, padding: '22px 24px', marginBottom: 20 }}>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 14 }}>🗂️ Cómo aplicar</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {pasos.map(p => (
                  <div key={p.num} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                    <span style={{
                      width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
                      background: 'var(--primary-soft)', color: 'var(--primary-deep)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: 800, fontSize: 13,
                    }}>{p.num}</span>
                    <span style={{ fontSize: 13.5, color: 'var(--ink)', lineHeight: 1.5, paddingTop: 4 }}>{p.texto}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div style={{ display: 'flex', gap: 12 }}>
            {datos.url && (
              <a href={datos.url} target="_blank" rel="noopener noreferrer" style={{
                flex: 1, display: 'block', textAlign: 'center',
                background: 'var(--primary)', color: 'var(--primary-ink)',
                fontWeight: 800, fontSize: 14.5, padding: '14px',
                borderRadius: 14, textDecoration: 'none',
                boxShadow: '0 8px 20px var(--primary-glow)',
              }}>
                Ir al portal oficial →
              </a>
            )}
            <button onClick={() => navigate('/dashboard/comunidad')} style={{
              background: 'var(--surface-2)', color: 'var(--ink-soft)',
              fontWeight: 600, fontSize: 13.5, padding: '14px 22px',
              borderRadius: 14, border: '1px solid var(--line)', cursor: 'pointer', fontFamily: 'inherit',
            }}>
              ← Volver
            </button>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}
