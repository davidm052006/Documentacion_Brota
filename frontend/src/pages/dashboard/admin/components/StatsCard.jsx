const TINTS = {
  green:  'var(--primary-soft)',
  yellow: 'var(--accent-soft)',
  blue:   'var(--primary-soft)',
  purple: 'var(--accent-soft)',
  red:    'var(--accent-soft)',
};

export default function StatsCard({ label, value, icon, color }) {
  const tint = TINTS[color] ?? 'var(--primary-soft)';

  return (
    <div style={{
      background: 'var(--surface)', border: '1px solid var(--line)',
      borderRadius: 16, padding: 16, boxShadow: 'var(--shadow)',
      display: 'flex', alignItems: 'center', gap: 13,
    }}>
      <div style={{
        width: 46, height: 46, borderRadius: 13, background: tint,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 20, flexShrink: 0,
      }}>
        {icon}
      </div>
      <div>
        <div style={{ fontSize: 11.5, color: 'var(--ink-soft)' }}>{label}</div>
        <div className="font-display" style={{ fontWeight: 800, fontSize: 23, lineHeight: 1 }}>{value}</div>
      </div>
    </div>
  );
}
