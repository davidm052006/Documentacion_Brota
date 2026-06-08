import React from 'react';
import Button from '../../../components/Shared/Button';
import Input from '../../../components/Shared/Input';
import AuthCardShell from './AuthCardShell';

function ForgotPasswordCard({
  email,
  validationErrors,
  error,
  successMessage,
  loading,
  onEmailChange,
  onSubmit,
  onSwitchToLogin,
}) {
  return (
    <AuthCardShell
      title="Recupera tu contraseña"
      description="Ingresa tu correo electrónico y te enviaremos instrucciones para restablecer tu contraseña."
    >
      {successMessage && (
        <div className="bg-green-500/20 border border-green-500 text-green-800 px-4 py-3 rounded-lg">
          {successMessage}
        </div>
      )}
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
        <Button variant="secondary" className="w-full mt-2" disabled={loading} type="submit">
          {loading ? 'Enviando...' : 'Enviar correo'}
        </Button>
      </form>

      <p className="text-sm text-center text-black">
        ¿Recordaste tu contraseña?{' '}
        <button
          onClick={onSwitchToLogin}
          className="text-[var(--color-primary)] font-bold hover:underline bg-transparent border-none cursor-pointer"
          type="button"
        >
          Volver a iniciar sesión
        </button>
      </p>
    </AuthCardShell>
  );
}

export default ForgotPasswordCard;
