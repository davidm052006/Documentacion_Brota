import React from 'react';
import Button from '../../../components/Shared/Button';
import Input from '../../../components/Shared/Input';
import AuthCardShell from './AuthCardShell';

function LoginCard({
  email,
  password,
  validationErrors,
  error,
  loading,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  onSwitchToSignup,
  onSwitchToForgotPassword,
}) {
  return (
    <AuthCardShell title="Accede a tu cuenta">
      {error && (
        <div className="bg-red-500/20 border border-red-500 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <Input
          placeholder="Escribe tu correo..."
          value={email}
          onChange={onEmailChange}
          error={validationErrors.email}
        />
        <Input
          placeholder="Contraseña..."
          type="password"
          value={password}
          onChange={onPasswordChange}
          error={validationErrors.password}
        />
        <Button variant="secondary" className="w-full mt-2" disabled={loading} type="submit">
          {loading ? 'Ingresando...' : 'Ingresar'}
        </Button>
      </form>

      <div className="flex flex-col gap-3 text-sm text-center text-black">
        <p>
          ¿Aún no eres parte?{' '}
          <button
            onClick={onSwitchToSignup}
            className="text-[var(--color-primary)] font-bold hover:underline bg-transparent border-none cursor-pointer"
            type="button"
          >
            Regístrate
          </button>
        </p>
        <button
          onClick={onSwitchToForgotPassword}
          className="text-[var(--color-primary)] font-bold hover:underline bg-transparent border-none cursor-pointer"
          type="button"
        >
          ¿Olvidaste tu contraseña?
        </button>
      </div>
    </AuthCardShell>
  );
}

export default LoginCard;
