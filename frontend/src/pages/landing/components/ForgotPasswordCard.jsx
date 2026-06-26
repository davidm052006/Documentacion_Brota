import AuthCardShell from './AuthCardShell';

function ForgotPasswordCard({
  email, validationErrors, error, successMessage, loading,
  onEmailChange, onSubmit, onSwitchToLogin,
}) {
  const inputStyle = {
    width: '100%', boxSizing: 'border-box',
    background: 'var(--surface-2)',
    border: `1px solid ${validationErrors.email ? '#e53e3e' : 'var(--line)'}`,
    borderRadius: 13, padding: '13px 15px',
    fontSize: 13.5, color: 'var(--ink)',
    outline: 'none', fontFamily: 'inherit',
  };

  return (
    <AuthCardShell
      title="Recupera tu contraseña"
      description="Ingresa tu correo y te enviamos instrucciones."
    >
      {successMessage && (
        <div style={{
          background: 'var(--primary-soft)', border: '1px solid var(--primary)',
          color: 'var(--primary-deep)', borderRadius: 12, padding: '12px 16px', fontSize: 13,
        }}>
          {successMessage}
        </div>
      )}
      {error && (
        <div style={{
          background: 'var(--accent-soft)', border: '1px solid var(--accent)',
          color: 'var(--accent)', borderRadius: 12, padding: '12px 16px', fontSize: 13,
        }}>
          {error}
        </div>
      )}

      <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
        <div>
          <input
            placeholder="Escribe tu correo…"
            value={email}
            onChange={onEmailChange}
            style={inputStyle}
          />
          {validationErrors.email && (
            <p style={{ color: '#e53e3e', fontSize: 11, marginTop: 3 }}>{validationErrors.email}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{
            background: 'var(--primary)', color: 'var(--primary-ink)',
            fontWeight: 800, fontSize: 15, padding: 14,
            borderRadius: 13, border: 'none', cursor: 'pointer',
            boxShadow: '0 8px 20px var(--primary-glow)',
            opacity: loading ? .6 : 1,
          }}
        >
          {loading ? 'Enviando…' : 'Enviar correo'}
        </button>
      </form>

      <p style={{ fontSize: 13, textAlign: 'center', color: 'var(--ink-soft)' }}>
        ¿Recordaste tu contraseña?{' '}
        <button type="button" onClick={onSwitchToLogin} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          color: 'var(--primary)', fontWeight: 700, fontSize: 13,
        }}>
          Volver al inicio de sesión
        </button>
      </p>
    </AuthCardShell>
  );
}

export default ForgotPasswordCard;
