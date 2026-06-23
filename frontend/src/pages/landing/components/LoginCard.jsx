import { useState } from 'react';
import AuthCardShell from './AuthCardShell';

function FieldInput({ placeholder, value, onChange, error, type = 'text' }) {
  const [show, setShow] = useState(false);
  const isPassword = type === 'password';

  return (
    <div className="relative flex flex-col">
      <input
        type={isPassword && !show ? 'password' : 'text'}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete="off"
        className={`w-full bg-gray-50 dark:bg-[#0d110e] border rounded-xl px-4 py-3 text-sm text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-600 outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500 transition-all ${
          error ? 'border-red-400' : 'border-gray-200 dark:border-[#1e2a21]'
        }`}
      />
      {isPassword && (
        <button
          type="button"
          onClick={() => setShow(s => !s)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm"
          tabIndex={-1}
        >
          {show ? '🙈' : '👁️'}
        </button>
      )}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

function LoginCard({
  email, password, validationErrors, error, loading,
  onEmailChange, onPasswordChange, onSubmit,
  onSwitchToSignup, onSwitchToForgotPassword,
}) {
  return (
    <AuthCardShell title="Accede a tu cuenta" description="¡Qué bueno verte de nuevo! 🌱">
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-xl text-sm">
          {error}
        </div>
      )}

      <form onSubmit={onSubmit} className="flex flex-col gap-3">
        <FieldInput
          placeholder="Escribe tu correo..."
          value={email}
          onChange={onEmailChange}
          error={validationErrors.email}
        />
        <FieldInput
          placeholder="Contraseña..."
          type="password"
          value={password}
          onChange={onPasswordChange}
          error={validationErrors.password}
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-1 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold text-sm transition-colors disabled:opacity-60"
        >
          {loading ? 'Ingresando...' : 'Ingresar'}
        </button>
      </form>

      <div className="flex flex-col items-center gap-2 text-sm">
        <p className="text-gray-500 dark:text-gray-400">
          ¿Aún no eres parte?{' '}
          <button
            type="button"
            onClick={onSwitchToSignup}
            className="text-green-600 dark:text-green-400 font-semibold hover:underline"
          >
            Regístrate
          </button>
        </p>
        <button
          type="button"
          onClick={onSwitchToForgotPassword}
          className="text-green-600 dark:text-green-400 font-semibold hover:underline text-sm"
        >
          ¿Olvidaste tu contraseña?
        </button>
      </div>
    </AuthCardShell>
  );
}

export default LoginCard;
