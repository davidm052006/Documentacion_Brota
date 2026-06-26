function AuthCardShell({ title, description, children, className = '' }) {
  return (
    <div style={{
      width: '100%', maxWidth: 440,
      background: 'var(--surface)',
      border: '1px solid var(--line)',
      borderRadius: 24, padding: '32px 30px 28px',
      boxShadow: 'var(--shadow)',
      display: 'flex', flexDirection: 'column', gap: 20,
    }} className={className}>
      <div style={{ textAlign: 'center' }}>
        <h3 className="font-display" style={{ fontWeight: 800, fontSize: 24, color: 'var(--ink)' }}>{title}</h3>
        {description && (
          <p style={{ fontSize: 13, color: 'var(--ink-soft)', marginTop: 4 }}>{description}</p>
        )}
      </div>
      {children}
    </div>
  );
}

export default AuthCardShell;
